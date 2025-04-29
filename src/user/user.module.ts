import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [UserService],
})
export class UserModule {}
