import { getRepository, Repository } from 'typeorm';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';
import ICreateProviderDTO from '@modules/users/dtos/ICreateProviderDTO';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProviderRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async create(userData: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(userData);

    await this.ormRepository.save(provider);

    return provider;
  }
}

export default ProvidersRepository;
