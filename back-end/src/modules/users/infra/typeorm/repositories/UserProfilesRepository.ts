import { getRepository, Repository } from 'typeorm';

import IUserProfilesRepository from '@modules/users/repositories/IUserProfilesRepository';
import ICreateUserProfileDTO from '@modules/users/dtos/ICreateUserProfileDTO';
import IEditUserProfileDTO from '@modules/users/dtos/IEditUserProfileDTO';

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

  public async updateUserProfile({
    id,
    firstname,
    lastname,
    rg,
    cpf,
    cnpj,
    tel,
    cel,
    birth_date,
  }: IEditUserProfileDTO): Promise<UserProfile | undefined> {
    const userProfile = await this.ormRepository.findOne(id);

    if (!userProfile) {
      throw new Error('Client not found');
    }

    return this.ormRepository.save({
      ...userProfile,
      firstname,
      lastname,
      rg,
      cpf,
      cnpj,
      tel,
      cel,
      birth_date,
    });
  }
}

export default UserProfilesRepository;
