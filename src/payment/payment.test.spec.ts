import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { generateRandomEmail, getRandomString } from '../utils/random.util';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { UserController } from '../user/user.controller';
import { UserRepository } from '../user/user.repository';
import { PaymentRepository } from './payment.repository';
import { Payments } from './payment.entity';
import { Users } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/database.config';

describe('Make Payment', () => {
  let paymentController: PaymentController;
  let userController: UserController;
  let fromUserId: string;
  let toUserId: string;
  let userService: UserService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseConfig, TypeOrmModule.forFeature([Payments, Users])],
      controllers: [PaymentController, UserController],
      providers: [
        PaymentService,
        UserService,
        PaymentRepository,
        UserRepository,
      ],
    }).compile();

    paymentController = app.get<PaymentController>(PaymentController);
    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('should create from user', async () => {
    // Create From User
    const email = generateRandomEmail();
    const name = getRandomString(6);
    const res = await userController.create({
      name,
      email,
    });

    fromUserId = res.data.id;
    expect(res.status).toBe('success');
    expect(res.data.email).toBe(email);
    expect(res.data.name).toBe(name);
  });

  it('should create to user', async () => {
    // Create To User
    const email = generateRandomEmail();
    const name = getRandomString(6);
    const res = await userController.create({
      name,
      email,
    });

    toUserId = res.data.id;
    expect(res.status).toBe('success');
    expect(res.data.email).toBe(email);
    expect(res.data.name).toBe(name);
  });

  it('should fund from-user balance', async () => {
    const res = await userController.fundBalance({
      userId: fromUserId,
      amount: '10000',
    });

    expect(res.status).toBe('success');
    expect(res.message).toBe('Balance funded successfully');
  });

  it('should transfer 5000 from-user, to-user', async () => {
    const amount = '5000';
    const reference = getRandomString(10);
    const res = await paymentController.transfer({
      fromUserId,
      toUserId,
      amount,
      reference,
    });

    expect(res.status).toBe('success');
    expect(res.data.fromUserId).toBe(fromUserId);
    expect(res.data.toUserId).toBe(toUserId);
    expect(res.data.amount).toBe(amount);
    expect(res.data.reference).toBe(reference);
    expect(res.message).toBe('Transfer created successfully');

    // confirm to user was credited the amount
    const toUser = await userService.getUser({ id: toUserId });
    expect(toUser?.balance).toBe(amount);
  });
});
