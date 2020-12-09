import { inject, injectable } from 'tsyringe';

import IAddressRepository from '../repositories/IAddressRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  city: string;
  zip_code: string;
  neighborhood: string;
  number: string;
  address: string;
  user_id: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute({
    city,
    zip_code,
    neighborhood,
    number,
    address,
    user_id,
  }: IRequest): Promise<Address> {
    const createAddress = await this.addressesRepository.create({
      city,
      zip_code,
      neighborhood,
      number,
      address,
      user_id,
    });

    return createAddress;
  }
}

export default CreateAddressService;
