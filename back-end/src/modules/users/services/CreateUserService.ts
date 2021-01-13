import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ role, email, password }: IRequest): Promise<User> {
    const checkUserExistis = await this.usersRepository.findByEmail(email);

    if (checkUserExistis) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      role,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
