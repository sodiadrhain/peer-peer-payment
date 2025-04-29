import { Body, Controller, Post } from '@nestjs/common';
import { MakeTransferDto } from './dtos/transfer.dto';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/transfer')
  transfer(@Body() makeTransferDto: MakeTransferDto) {
    return this.paymentService.doTransfer(makeTransferDto);
  }
}
