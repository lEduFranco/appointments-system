import { injectable, inject } from 'tsyringe';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';

import Provider from '@modules/users/infra/typeorm/entities/Provider';

@injectable()
class SearchProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute(nameFilter: string): Promise<Provider[]> {
    const providers = await this.providerRepository.searchAllProviders(
      nameFilter,
    );

    return providers;
  }
}

export default SearchProvidersService;
