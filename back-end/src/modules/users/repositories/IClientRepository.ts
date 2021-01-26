import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findAllClients(nameFilter: string): Promise<Client[]>;
  findClient(id: string): Promise<Client>;
}
