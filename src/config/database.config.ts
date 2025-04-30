import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from '../payment/payment.entity';
import { Users } from '../user/user.entity';

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ivory-test',
  entities: [Users, Payments],
  synchronize: true,
});
