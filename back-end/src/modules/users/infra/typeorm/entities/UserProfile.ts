import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  AfterLoad,
} from 'typeorm';

import User from './User';

@Entity('user_profiles')
class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ length: 10, nullable: true })
  rg: string;

  @Column({ length: 11, nullable: true })
  cpf: string;

  @Column({ length: 14, nullable: true })
  cnpj: string;

  @Column({ length: 11, nullable: true })
  tel: string;

  @Column({ length: 11, nullable: true })
  cel: string;

  @Column({ nullable: true })
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  fullname: string;

  @AfterLoad()
  afterLoad(): void {
    this.fullname = `${this.firstname} ${this.lastname}`;
  }
}

export default UserProfile;
