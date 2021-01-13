import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import CreateUserService from 'modules/users/services/CreateUserService';
import CreateUserProfileService from 'modules/users/services/CreateUserProfileService';
import CreateAddressService from 'modules/users/services/CreateAddressService';
import CreateProviderService from 'modules/users/services/CreateProviderService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { period, frequency, day, month, year } = request.query;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      period,
      frequency,
      day: Number(day),
      month: Number(month),
      year: Number(year),
      user_id,
    });

    return response.json(classToClass(providers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      role,
      email,
      password,
      firstname,
      lastname,
      rg,
      cpf,
      cnpj,
      tel,
      cel,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      begin_date,
      final_date,
      demission_reason,
      uniform_size,
      voter_registration,
      voting_zone,
      voting_section,
      password_mei,
      status,
    } = request.body;

    const createUser = container.resolve(CreateUserService);
    const createUserProfile = container.resolve(CreateUserProfileService);
    const createAddress = container.resolve(CreateAddressService);
    const createProvider = container.resolve(CreateProviderService);

    const user = await createUser.execute({
      role,
      email,
      password,
    });

    await createUserProfile.execute({
      firstname,
      lastname,
      rg,
      cpf,
      cnpj,
      tel,
      cel,
      user_id: user.id,
    });

    await createAddress.execute({
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      user_id: user.id,
    });

    await createProvider.execute({
      begin_date,
      final_date,
      demission_reason,
      uniform_size,
      voter_registration,
      voting_zone,
      voting_section,
      password_mei,
      status,
      user_id: user.id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
