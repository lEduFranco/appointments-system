import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import CreateUserService from 'modules/users/services/CreateUserService';
import CreateUserProfileService from 'modules/users/services/CreateUserProfileService';
import CreateAddressService from 'modules/users/services/CreateAddressService';
import CreateProviderService from 'modules/users/services/CreateProviderService';
import ShowProvidersService from 'modules/users/services/ShowProvidersService';
import EditUserProfileService from 'modules/users/services/EditUserProfileService';
import EditAddressService from 'modules/users/services/EditAddressService';
import EditProviderService from 'modules/users/services/EditProviderService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const showProviders = container.resolve(ShowProvidersService);

    const providers = await showProviders.execute();

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
      birth_date,
      pix,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      localization,
      begin_date,
      final_date,
      demission_reason,
      uniform_size,
      voter_registration,
      voting_zone,
      voting_section,
      password_mei,
      status,
      uniform_amount,
      relatives_contacts,
      disc,
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
      birth_date,
      pix,
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
      localization,
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
      uniform_amount,
      relatives_contacts,
      disc,
      user_id: user.id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { providers, user_profile, address } = request.body;

    const editProvider = container.resolve(EditProviderService);
    const editUserProfile = container.resolve(EditUserProfileService);
    const editAddress = container.resolve(EditAddressService);

    await editUserProfile.execute(user_profile);

    await editAddress.execute(address);

    const providerResponse = await editProvider.execute(providers);

    return response.json(classToClass(providerResponse));
  }
}
