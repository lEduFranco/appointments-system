import { injectable, inject } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';

import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  id: string;
  uf: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  number: string;
  address: string;
  complement: string;
  reference_points: string;
  nearest_subway_station: string;
  localization: string;
}

@injectable()
class EditAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(data: IRequest): Promise<Address | undefined> {
    const updatedAddresses = await this.addressesRepository.updateAddress(data);

    return updatedAddresses;
  }
}

export default EditAddressService;
