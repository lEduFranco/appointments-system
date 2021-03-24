import { inject, injectable } from 'tsyringe';

import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import UserProfile from '../infra/typeorm/entities/UserProfile';

interface IRequest {
  firstname: string;
  lastname: string;
  rg: string;
  cpf: string;
  cnpj: string;
  tel: string;
  cel: string;
  birth_date: Date;
  pix: string;
  user_id: string;
}

@injectable()
class CreateUserProfileService {
  constructor(
    @inject('UserProfilesRepository')
    private userProfilesRepository: IUserProfilesRepository,
  ) {}

  public async execute({
    firstname,
    lastname,
    rg,
    cpf,
    cnpj,
    tel,
    cel,
    birth_date,
    pix,
    user_id,
  }: IRequest): Promise<UserProfile> {
    const userProfile = await this.userProfilesRepository.create({
      firstname,
      lastname,
      rg,
      cpf,
      cnpj,
      tel,
      cel,
      birth_date,
      pix,
      user_id,
    });

    return userProfile;
  }
}

export default CreateUserProfileService;
