import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { IUser } from './user.interface';
import { FundBalanceDto } from './dtos/fund-balance.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  getUser(user: IUser) {
    return this.userRepo.findOne(user);
  }

  async createUser(createUserData: CreateUserDto) {
    const user = await this.getUser({ email: createUserData.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const res = await this.userRepo.create({
      name: createUserData.name,
      email: createUserData.email,
    });

    return {
      status: 'success',
      data: { ...res },
      message: 'User created successfully',
    };
  }

  async fundUserBalance(fundBalance: FundBalanceDto) {
    const user = await this.getUser({ id: fundBalance.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // new balance === balance + amount
    const newBalance = Number(user.balance) + Number(fundBalance.amount);

    await this.userRepo.update({
      balance: newBalance.toString(),
      id: fundBalance.userId,
    });

    return {
      status: 'success',
      data: null,
      message: 'Balance funded successfully',
    };
  }
}
