import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    except_user_id,
    period,
    dates,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let periods: Array<IFindAllProvidersDTO['period']> = [
      'integral',
      'part_time_morning',
      'part_time_afternoon',
    ];

    if (period === 'part_time_morning' || period === 'part_time_afternoon') {
      periods = ['integral', period];
    }

    const users: User[] = await this.ormRepository
      .createQueryBuilder('user')
      .where('user.id != :id', { id: except_user_id })
      .andWhere('role = :role', { role: 'provider' })
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(Appointment, 'appointment')
          .where('appointment.period IN (:...periods)')
          .andWhere('appointment.provider_id = user.id')
          .andWhere('appointment.date IN (:...dates)')
          .getQuery();
        return `NOT EXISTS (${subQuery})`;
      })
      .setParameter('periods', periods)
      .setParameter('dates', dates)
      .getMany();

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
