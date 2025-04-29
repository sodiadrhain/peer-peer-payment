/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class FundBalanceDto {
  @IsNotEmpty({ message: 'userId must not be empty' })
  @IsString({ message: 'userId must be string' })
  userId: string;

  @IsNotEmpty({ message: 'amount must not be empty' })
  @IsString({ message: 'amount must be string' })
  amount: string;
}
