import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  create(user: IUser): Promise<Users> {
    return this.usersRepository.save(user);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(user: IUser): Promise<Users | null> {
    return this.usersRepository.findOneBy(user);
  }

  async remove(user: IUser): Promise<void> {
    await this.usersRepository.delete(user.id as string);
  }

  update(user: IUser) {
    return this.usersRepository.update({ id: user.id }, user);
  }
}
