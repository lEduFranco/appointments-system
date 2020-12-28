import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

export type UserPeriodType =
  | 'integral'
  | 'part_time_morning'
  | 'part_time_afternoon';
export type UserFrequencyType =
  | 'first_contact'
  | 'weekly'
  | 'biweekly'
  | 'monthly';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  initial_appointment_id: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'initial_appointment_id' })
  appointmnets: Appointment;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column({
    type: 'enum',
    enum: ['integral', 'part_time_morning', 'part_time_afternoon'],
  })
  period: UserPeriodType;

  @Column({
    type: 'enum',
    enum: ['first_contact', 'weekly', 'biweekly', 'monthly'],
  })
  frequency: UserFrequencyType;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
