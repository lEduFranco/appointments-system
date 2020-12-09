import { getRepository, Repository } from 'typeorm';

import IAddressRepository from '@modules/users/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO';

import Address from '../entities/Address';

class AddressesRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(userData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(userData);

    await this.ormRepository.save(address);

    return address;
  }
}

export default AddressesRepository;
