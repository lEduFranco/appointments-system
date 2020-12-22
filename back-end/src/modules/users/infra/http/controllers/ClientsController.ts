import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListClientsService from 'modules/users/services/ListClientsService';
import CreateUserService from 'modules/users/services/CreateUserService';
import CreateUserProfileService from 'modules/users/services/CreateUserProfileService';
import CreateAddressService from 'modules/users/services/CreateAddressService';
import CreateClientService from 'modules/users/services/CreateClientService';

export default class ClientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientsService);

    const user = await listClients.execute();

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      role,
      email,
      password,
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
      cf_df,
      profession,
      condominium_name,
      reference_points,
      nearest_subway_station,
      company_responsible,
    } = request.body;

    const createUser = container.resolve(CreateUserService);
    const createUserProfile = container.resolve(CreateUserProfileService);
    const createAddress = container.resolve(CreateAddressService);
    const createClient = container.resolve(CreateClientService);

    const user = await createUser.execute({
      name,
      role,
      email,
      password,
    });

    await createUserProfile.execute({
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
      user_id: user.id,
    });

    await createClient.execute({
      cf_df,
      profession,
      condominium_name,
      reference_points,
      nearest_subway_station,
      company_responsible,
      user_id: user.id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
