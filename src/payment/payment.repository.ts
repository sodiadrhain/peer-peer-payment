import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payments } from './payment.entity';
import { IPayment } from './payment.interface';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentRepository: Repository<Payments>,
  ) {}

  findAll(): Promise<Payments[]> {
    return this.paymentRepository.find();
  }

  findOne(payment: IPayment): Promise<Payments | null> {
    return this.paymentRepository.findOneBy(payment);
  }

  async remove(payment: IPayment): Promise<void> {
    await this.paymentRepository.delete(payment.id as string);
  }
}
