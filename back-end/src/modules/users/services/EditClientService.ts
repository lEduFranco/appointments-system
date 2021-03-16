import { injectable, inject } from 'tsyringe';
import IClientRepository from '../repositories/IClientRepository';

import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  id: string;
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inative' | 'suspended';
  user_id: string;
  user: {
    user_profile: {
      firstname: string;
      lastname: string;
      rg: string;
      cpf: string;
      cnpj: string;
      tel: string;
      cel: string;
      birth_date: Date;
    };
  };
}

@injectable()
class EditClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute(data: IRequest): Promise<Client> {
    const updatedClient = await this.clientsRepository.updateClient(data);

    return updatedClient;
  }
}

export default EditClientService;
