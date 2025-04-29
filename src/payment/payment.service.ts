import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MakeTransferDto } from './dtos/transfer.dto';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';
import { Payments } from './payment.entity';
import { Users } from '../user/user.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly userservice: UserService,
    private readonly dataSource: DataSource,
    private readonly paymentRepo: PaymentRepository,
  ) {}
  async doTransfer(makeTransferData: MakeTransferDto) {
    // Debit the fromUserId wallet only if sufficient funds
    // Credit the toUserId wallet
    // Use transactions (e.g., DB transaction via TypeORM, Prisma, etc.)
    // Handle concurrent debits (simulate concurrency if asked)
    // Implement idempotency to prevent double processing
    // Return status: "success" or "insufficient funds" or "duplicate transaction"

    try {
      // check if reference exists/duplictae transaction
      const reference = makeTransferData.reference;
      const payment = await this.paymentRepo.findOne({
        reference: makeTransferData.reference,
      });
      if (payment) {
        throw new BadRequestException('Duplicate transaction');
      }

      // get fromUser
      const fromUser = await this.userservice.getUser({
        id: makeTransferData.fromUserId,
      });
      if (!fromUser) {
        throw new NotFoundException('From user not found');
      }

      // get toUser
      const toUser = await this.userservice.getUser({
        id: makeTransferData.toUserId,
      });
      if (!toUser) {
        throw new NotFoundException('To user not found');
      }

      // get amount
      const amount = makeTransferData.amount;

      // get fromUserId balance
      const fromUserBalance = fromUser.balance;

      // check if fromUserId has sufficient funds
      if (Number(amount) > Number(fromUserBalance)) {
        throw new BadRequestException('Insufficient funds');
      }

      const transfer = await this.transferTx(
        fromUser,
        toUser,
        amount,
        reference,
      );

      return {
        status: 'success',
        data: { ...transfer },
        message: 'Transfer created successfully',
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  // transferTx performs a money transfer from one user to the other.
  // it creates the transfer, add payment entries, and update users balance within a database transaction
  async transferTx(
    fromUser: Users,
    toUser: Users,
    amount: string,
    reference: string,
  ) {
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();

    // establish database connection using our new query runner
    await queryRunner.connect();

    // open a new transaction:
    await queryRunner.startTransaction();

    try {
      // create payment
      const newTransfer = queryRunner.manager.create(Payments, {
        fromUserId: fromUser.id,
        toUserId: toUser.id,
        amount,
        reference,
      });

      await queryRunner.manager.save(newTransfer);

      // debit fromUser
      const newFromUserBalance = Number(fromUser.balance) - Number(amount);
      fromUser.balance = newFromUserBalance.toString();
      await queryRunner.manager.save(fromUser);

      // credit toUser
      const newToUserBalance = Number(amount) + Number(toUser.balance);
      toUser.balance = newToUserBalance.toString();
      await queryRunner.manager.save(toUser);

      // commit transaction now:
      await queryRunner.commitTransaction();
      return newTransfer;
    } catch (err) {
      // rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException(err);
    } finally {
      // release query runner:
      await queryRunner.release();
    }
  }
}
