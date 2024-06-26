import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import Appointment from '../../../../appointments/infra/typeorm/entities/Appointment';
import User from './User';

export type ClientStatusType = 'active' | 'inactive' | 'suspended';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  cf_df: string;

  @Column({ nullable: true })
  occuppation: string;

  @Column({ nullable: true })
  company_responsible: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  })
  status: ClientStatusType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @OneToMany(() => Appointment, appointment => appointment.client)
  @JoinColumn({ name: 'client_id' })
  appointment: Appointment[];

  @OneToOne(() => User, user => user.client)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Client;
