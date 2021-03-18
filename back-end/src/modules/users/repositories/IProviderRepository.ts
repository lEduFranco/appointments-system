import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import IEditProviderDTO from '../dtos/IEditProviderDTO';

export default interface IProviderRepository {
  create(data: ICreateProviderDTO): Promise<Provider>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<Provider[]>;
  findAllShowProviders(): Promise<Provider[]>;
  searchAllProviders(nameFilter: string): Promise<Provider[]>;
  updateProvider(data: IEditProviderDTO): Promise<Provider | undefined>;
}
