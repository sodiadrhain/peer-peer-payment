import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [DatabaseConfig, UserModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
