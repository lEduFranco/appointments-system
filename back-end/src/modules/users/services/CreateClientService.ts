import { inject, injectable } from 'tsyringe';

import IClientRepository from '../repositories/IClientRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  cf_df: string;
  profession: string;
  condominium_name: string;
  reference_points: string;
  nearest_subway_station: string;
  company_responsible: string;
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
    profession,
    condominium_name,
    reference_points,
    nearest_subway_station,
    company_responsible,
    user_id,
  }: IRequest): Promise<Client> {
    const createClient = await this.clientsRepository.create({
      cf_df,
      profession,
      condominium_name,
      reference_points,
      nearest_subway_station,
      company_responsible,
      user_id,
    });

    return createClient;
  }
}

export default CreateClientService;
