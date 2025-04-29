import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column()
  amount: string;

  @Column()
  reference: string;

  @Column({ default: true })
  status: boolean;
}
