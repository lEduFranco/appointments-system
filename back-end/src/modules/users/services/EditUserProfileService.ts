import { injectable, inject } from 'tsyringe';
import IUserProfilesRepository from '../repositories/IUserProfilesRepository';

import UserProfile from '../infra/typeorm/entities/UserProfile';

interface IRequest {
  id: string;
  firstname: string;
  lastname: string;
  rg: string;
  cpf: string;
  cnpj: string;
  tel: string;
  cel: string;
  birth_date: Date;
  pix: string;
  observation: string;
}

@injectable()
class EditUserProfileService {
  constructor(
    @inject('UserProfilesRepository')
    private userProfilesRepository: IUserProfilesRepository,
  ) {}

  public async execute(data: IRequest): Promise<UserProfile | undefined> {
    const updatedUserProfiles = await this.userProfilesRepository.updateUserProfile(
      data,
    );

    return updatedUserProfiles;
  }
}

export default EditUserProfileService;
