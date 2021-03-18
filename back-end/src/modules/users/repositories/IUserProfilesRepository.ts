import UserProfile from '../infra/typeorm/entities/UserProfile';
import ICreateUserProfileDTO from '../dtos/ICreateUserProfileDTO';
import IEditUserProfileDTO from '../dtos/IEditUserProfileDTO';

export default interface IUserProfilesRepository {
  create(data: ICreateUserProfileDTO): Promise<UserProfile>;
  updateUserProfile(
    data: IEditUserProfileDTO,
  ): Promise<UserProfile | undefined>;
}
