import { injectable, inject } from 'tsyringe';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';

import Provider from '@modules/users/infra/typeorm/entities/Provider';

@injectable()
class ShowProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute(): Promise<Provider[]> {
    const providers = await this.providerRepository.findAllShowProviders();

    return providers;
  }
}

export default ShowProvidersService;
