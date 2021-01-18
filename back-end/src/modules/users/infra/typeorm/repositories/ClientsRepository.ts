import { getRepository, Repository } from 'typeorm';

import IClientRepository from '@modules/users/repositories/IClientRepository';
import ICreateClientDTO from '@modules/users/dtos/ICreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findAllClients(): Promise<Client[]> {
    const clients = await this.ormRepository.find({
      relations: ['user', 'user.user_profile'],
    });

    return clients;
  }

  public async create(userData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(userData);

    await this.ormRepository.save(client);

    return client;
  }
}

export default ClientsRepository;
