import UserProfile from '../infra/typeorm/entities/UserProfile';
import ICreateUserProfileDTO from '../dtos/ICreateUserProfileDTO';

export default interface IUserProfilesRepository {
  create(data: ICreateUserProfileDTO): Promise<UserProfile>;
  save(userProfile: UserProfile): Promise<UserProfile>;
}
