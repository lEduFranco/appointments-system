import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      day,
      month,
      year,
      provider_id,
      period,
      frequency,
      client_id,
      observation,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      status,
    } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    console.log(uf);

    const appointment = await createAppointment.execute({
      day,
      month,
      year,
      client_id,
      provider_id,
      period,
      frequency,
      observation,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      reference_points,
      nearest_subway_station,
      status,
    });

    return response.json(appointment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, allAppointments } = request.body;

    const deleteAppointment = container.resolve(DeleteAppointmentService);

    const appointment = await deleteAppointment.execute({
      id,
      allAppointments,
    });

    return response.json(appointment);
  }
}
