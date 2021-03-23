import { getRepository, Repository } from 'typeorm';

import IAddressRepository from '@modules/users/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO';
import IEditAddressDTO from '@modules/users/dtos/IEditAddressDTO';

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

  public async updateAddress({
    id,
    uf,
    city,
    zip_code,
    neighborhood,
    number,
    address,
    complement,
    reference_points,
    nearest_subway_station,
    localization,
  }: IEditAddressDTO): Promise<Address | undefined> {
    const addresses = await this.ormRepository.findOne(id);

    if (!addresses) {
      throw new Error('Client not found');
    }

    return this.ormRepository.save({
      ...addresses,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      localization,
    });
  }
}

export default AddressesRepository;
