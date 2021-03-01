import { getRepository, Repository } from 'typeorm';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';
import ICreateProviderDTO from '@modules/users/dtos/ICreateProviderDTO';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProviderRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findAllProviders({
    period,
    dates,
  }: IFindAllProvidersDTO): Promise<Provider[]> {
    let periods: Array<IFindAllProvidersDTO['period']> = [
      'integral',
      'part_time_morning',
      'part_time_afternoon',
    ];

    if (period === 'part_time_morning' || period === 'part_time_afternoon') {
      periods = ['integral', period];
    }

    const providers: Provider[] = await this.ormRepository
      .createQueryBuilder('provider')
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(Appointment, 'appointment')
          .where('appointment.period IN (:...periods)')
          .andWhere('appointment.provider_id = provider.id')
          .andWhere('appointment.date IN (:...dates)')
          .getQuery();
        return `NOT EXISTS (${subQuery})`;
      })
      .setParameter('periods', periods)
      .setParameter('dates', dates)
      .leftJoinAndSelect('provider.user', 'user')
      .leftJoinAndSelect('user.user_profile', 'user_profile')
      .getMany();

    return providers;
  }

  public async findAllShowProviders(): Promise<Provider[]> {
    const providers = await this.ormRepository.find({
      relations: ['user', 'user.user_profile'],
    });

    return providers;
  }

  public async create(userData: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(userData);

    await this.ormRepository.save(provider);

    return provider;
  }
}

export default ProvidersRepository;
