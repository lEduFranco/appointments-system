import { getRepository, Repository } from 'typeorm';

import IUserProfilesRepository from '@modules/users/repositories/IUserProfilesRepository';
import ICreateUserProfileDTO from '@modules/users/dtos/ICreateUserProfileDTO';

import UserProfile from '../entities/UserProfile';

class UserProfilesRepository implements IUserProfilesRepository {
  private ormRepository: Repository<UserProfile>;

  constructor() {
    this.ormRepository = getRepository(UserProfile);
  }

  public async create(userData: ICreateUserProfileDTO): Promise<UserProfile> {
    const userProfile = this.ormRepository.create(userData);

    await this.ormRepository.save(userProfile);

    return userProfile;
  }

  public async save(userProfile: UserProfile): Promise<UserProfile> {
    return this.ormRepository.save(userProfile);
  }
}

export default UserProfilesRepository;
