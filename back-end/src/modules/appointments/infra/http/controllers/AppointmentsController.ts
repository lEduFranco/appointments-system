import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import ShowEditAppointmentsService from '@modules/appointments/services/ShowEditAppointmentsService';

export default class AppointmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.body;

    const editAppointment = container.resolve(ShowEditAppointmentsService);

    const appointment = await editAppointment.execute({
      appointment_id,
    });

    return response.json(appointment);
  }

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
