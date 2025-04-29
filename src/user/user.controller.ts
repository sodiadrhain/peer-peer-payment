import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FundBalanceDto } from './dtos/fund-balance.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/balance')
  fundBalance(@Body() fundBalanceDto: FundBalanceDto) {
    return this.userService.fundUserBalance(fundBalanceDto);
  }
}
