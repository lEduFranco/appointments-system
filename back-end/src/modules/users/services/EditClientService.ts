import { injectable, inject } from 'tsyringe';
import IClientRepository from '../repositories/IClientRepository';

import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  id: string;
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inactive' | 'suspended';
}

@injectable()
class EditClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute(data: IRequest): Promise<Client | undefined> {
    const updatedClient = await this.clientsRepository.updateClient(data);

    return updatedClient;
  }
}

export default EditClientService;
