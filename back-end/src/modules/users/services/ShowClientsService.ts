import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import Client from '@modules/users/infra/typeorm/entities/Client';

@injectable()
class ShowClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.findAllShowClients();

    return clients;
  }
}

export default ShowClientsService;
