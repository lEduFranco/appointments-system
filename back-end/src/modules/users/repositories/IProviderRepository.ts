import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IProviderRepository {
  create(data: ICreateProviderDTO): Promise<Provider>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<Provider[]>;
}
