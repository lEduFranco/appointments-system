import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Provider from '../../../../users/infra/typeorm/entities/Provider';
import Client from '../../../../users/infra/typeorm/entities/Client';

export type UserPeriodType =
  | 'integral'
  | 'part_time_morning'
  | 'part_time_afternoon';
export type UserFrequencyType =
  | 'first_contact'
  | 'weekly'
  | 'biweekly'
  | 'detached'
  | 'fixed_available';

export type AppointmentStatusType =
  | 'created'
  | 'confirmed'
  | 'suspended'
  | 'appeared'
  | 'not_appeared';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  initial_appointment_id: string;

  @Column({ nullable: true })
  observation: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'initial_appointment_id' })
  appointmnets: Appointment;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider, provider => provider.appointment)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  client_id: string;

  @ManyToOne(() => Client, client => client.appointment)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({
    type: 'enum',
    enum: ['integral', 'part_time_morning', 'part_time_afternoon'],
  })
  period: UserPeriodType;

  @Column({
    type: 'enum',
    enum: [
      'first_contact',
      'weekly',
      'biweekly',
      'detached',
      'fixed_available',
    ],
  })
  frequency: UserFrequencyType;

  @Column({ length: 2, nullable: true })
  uf: string;

  @Column({ nullable: true })
  city: string;

  @Column({ length: 8, nullable: true })
  zip_code: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  reference_points: string;

  @Column({ nullable: true })
  nearest_subway_station: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: ['created', 'confirmed', 'suspended', 'appeared', 'not_appeared'],
    default: 'created',
  })
  status: AppointmentStatusType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
