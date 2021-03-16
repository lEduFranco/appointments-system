import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IEditClientDTO from '../dtos/IEditClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findAllClients(nameFilter: string): Promise<Client[]>;
  findAllShowClients(): Promise<Client[]>;
  findClient(id: string): Promise<Client>;
  updateClient(data: IEditClientDTO): Promise<Client>;
}
