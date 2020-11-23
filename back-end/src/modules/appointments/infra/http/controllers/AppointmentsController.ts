import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      day,
      month,
      year,
      period,
      frequency,
      provider_id,
      user_id,
    } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      day,
      month,
      year,
      period,
      frequency,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
