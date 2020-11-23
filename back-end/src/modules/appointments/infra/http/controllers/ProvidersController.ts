import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

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
}
