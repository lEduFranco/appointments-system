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

@Entity('user_profiles')
class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, nullable: true })
  rg: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 14, nullable: true })
  cnpj: string;

  @Column({ length: 11 })
  tel: string;

  @Column({ length: 11 })
  cel: string;

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

export default UserProfile;
