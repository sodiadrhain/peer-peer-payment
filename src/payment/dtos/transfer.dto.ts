/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class MakeTransferDto {
  @IsNotEmpty({ message: 'fromUserId must not be empty' })
  @IsString({ message: 'fromUserId must be string' })
  fromUserId: string;

  @IsNotEmpty({ message: 'toUserId must not be empty' })
  @IsString({ message: 'toUserId must be string' })
  toUserId: string;

  @IsNotEmpty({ message: 'amount must not be empty' })
  @IsString({ message: 'amount must be string' })
  amount: string;

  @IsNotEmpty({ message: 'reference must not be empty' })
  @IsString({ message: 'reference must be string' })
  reference: string;
}
