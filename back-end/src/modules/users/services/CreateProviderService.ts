import { inject, injectable } from 'tsyringe';

import IProviderRepository from '../repositories/IProviderRepository';
import Provider from '../infra/typeorm/entities/Provider';

interface IRequest {
  begin_date: string;
  final_date: string;
  demission_reason: string;
  uniform_size: string;
  voter_registration: string;
  voting_zone: string;
  voting_section: string;
  password_mei: string;
  status: 'active' | 'inactive' | 'suspended';
  uniform_amount: number;
  relatives_contacts: string;
  disc: 'dominante' | 'influente' | 'estabilidade' | 'conformidade';
  user_id: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,
  ) {}

  public async execute({
    begin_date,
    final_date,
    demission_reason,
    uniform_size,
    voter_registration,
    voting_zone,
    voting_section,
    password_mei,
    status,
    uniform_amount,
    relatives_contacts,
    disc,
    user_id,
  }: IRequest): Promise<Provider> {
    const createProvider = await this.providersRepository.create({
      begin_date,
      final_date,
      demission_reason,
      uniform_size,
      voter_registration,
      voting_zone,
      voting_section,
      password_mei,
      status,
      uniform_amount,
      relatives_contacts,
      disc,
      user_id,
    });

    return createProvider;
  }
}

export default CreateProviderService;
