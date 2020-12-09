import { inject, injectable } from 'tsyringe';

import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import UserProfile from '../infra/typeorm/entities/UserProfile';

interface IRequest {
  rg: string;
  cpf: string;
  cnpj: string;
  tel: string;
  cel: string;
  user_id: string;
}

@injectable()
class CreateUserProfileService {
  constructor(
    @inject('UserProfilesRepository')
    private userProfilesRepository: IUserProfilesRepository,
  ) {}

  public async execute({
    rg,
    cpf,
    cnpj,
    tel,
    cel,
    user_id,
  }: IRequest): Promise<UserProfile> {
    const userProfile = await this.userProfilesRepository.create({
      rg,
      cpf,
      cnpj,
      tel,
      cel,
      user_id,
    });

    return userProfile;
  }
}

export default CreateUserProfileService;
