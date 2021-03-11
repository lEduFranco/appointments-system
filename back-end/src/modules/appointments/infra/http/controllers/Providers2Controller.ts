import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SearchProvidersService from '@modules/appointments/services/SearchProvidersService';

export default class Providers2Controller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { nameFilter } = request.query;

    const listProviders = container.resolve(SearchProvidersService);

    const clients = await listProviders.execute(nameFilter);

    return response.json(classToClass(clients));
  }
}
