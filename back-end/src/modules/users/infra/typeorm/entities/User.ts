import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Address from './Address';
import uploadConfig from '../../../../../config/upload';
import UserProfile from './UserProfile';
import Client from './Client';
import Provider from './Provider';

export type UserRoleType = 'admin' | 'rh' | 'secretary' | 'provider' | 'client';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'rh', 'secretary', 'provider', 'client'],
  })
  role: UserRoleType;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToOne(() => UserProfile, user_profile => user_profile.user)
  user_profile: UserProfile;

  @OneToOne(() => Provider, provider => provider.user)
  provider: Provider;

  @OneToOne(() => Client, client => client.user)
  client: Client;

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
