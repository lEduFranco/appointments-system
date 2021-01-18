import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import Client from '@modules/users/infra/typeorm/entities/Client';

@injectable()
class ListProvidersService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients();

    return clients;
  }
}

export default ListProvidersService;
