import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IEditAddressDTO from '../dtos/IEditAddressDTO';

export default interface IUserProfilesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  updateAddress(data: IEditAddressDTO): Promise<Address | undefined>;
}
