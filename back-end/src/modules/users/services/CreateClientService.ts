import { inject, injectable } from 'tsyringe';

import IClientRepository from '../repositories/IClientRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inactive' | 'suspended';
  user_id: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute({
    cf_df,
    occuppation,
    company_responsible,
    status,
    user_id,
  }: IRequest): Promise<Client> {
    const createClient = await this.clientsRepository.create({
      cf_df,
      occuppation,
      company_responsible,
      status,
      user_id,
    });

    return createClient;
  }
}

export default CreateClientService;
