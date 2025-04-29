/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Invalid email passed' })
  email: string;

  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be string' })
  name: string;
}
