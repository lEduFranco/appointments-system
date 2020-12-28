import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Address from '@modules/users/infra/typeorm/entities/Address';
import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import Client from '@modules/users/infra/typeorm/entities/Client';

export type UserRoleType = 'admin' | 'rh' | 'secretary' | 'provider' | 'client';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'rh', 'secretary', 'provider', 'client'],
  })
  role: UserRoleType;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];

  @OneToOne(() => Address, address => address.user)
  addresses: Address[];

  @OneToOne(() => UserProfile, user_profile => user_profile.user)
  user_profiles: UserProfile[];

  @OneToOne(() => Client, client => client.user)
  clients: Client[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
