import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';

export default interface IProviderRepository {
  create(data: ICreateProviderDTO): Promise<Provider>;
}
