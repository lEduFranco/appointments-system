import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import Client from '@modules/users/infra/typeorm/entities/Client';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute(nameFilter: string): Promise<Client[]> {
    const clients = await this.clientRepository.findAllClients(nameFilter);

    return clients;
  }
}

export default ListClientsService;
