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

export type UserRoleType = 'admin' | 'rh' | 'secretary' | 'provider' | 'client';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  cf_df: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  condominium_name: string;

  @Column({ nullable: true })
  reference_points: string;

  @Column({ nullable: true })
  nearest_subway_station: string;

  @Column({ nullable: true })
  company_responsible: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Client;
