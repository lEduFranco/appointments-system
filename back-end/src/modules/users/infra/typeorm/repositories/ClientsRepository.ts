import { getRepository, Repository } from 'typeorm';

import IClientRepository from '@modules/users/repositories/IClientRepository';
import ICreateClientDTO from '@modules/users/dtos/ICreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findClient(id: string): Promise<Client> {
    const client = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'user.addresses'],
    });

    return client;
  }

  public async findAllShowClients(): Promise<Client[]> {
    const client = await this.ormRepository.find({
      relations: ['user', 'user.user_profile'],
    });

    return client;
  }

  public async findAllClients(nameFilter: string): Promise<Client[]> {
    const clients = await this.ormRepository
      .createQueryBuilder('clients')
      .innerJoinAndSelect('clients.user', 'user')
      .innerJoinAndSelect('user.user_profile', 'user_profile')
      .where(`LOWER(user_profile.firstname) LIKE LOWER('%${nameFilter}%')`)
      .orWhere(`LOWER(user_profile.lastname) LIKE LOWER('%${nameFilter}%')`)
      .limit(20)
      .getMany();

    return clients;
  }

  public async create(userData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(userData);

    await this.ormRepository.save(client);

    return client;
  }
}

export default ClientsRepository;
