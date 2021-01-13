import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

export default Address;
