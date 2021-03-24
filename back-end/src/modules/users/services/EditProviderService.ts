import { injectable, inject } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

import Provider from '../infra/typeorm/entities/Provider';

interface IRequest {
  id: string;
  begin_date: string;
  final_date: string;
  demission_reason: string;
  uniform_size: string;
  uniform_amount: number;
  voter_registration: string;
  voting_zone: string;
  voting_section: string;
  password_mei: string;
  status: 'active' | 'inactive' | 'suspended';
  relatives_contacts: string;
  disc: 'dominante' | 'influente' | 'estabilidade' | 'conformidade';
}

@injectable()
class EditClientService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,
  ) {}

  public async execute(data: IRequest): Promise<Provider | undefined> {
    const updatedProvider = await this.providersRepository.updateProvider(data);

    return updatedProvider;
  }
}

export default EditClientService;
