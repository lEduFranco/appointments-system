import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteAllAppointmentsService from '@modules/appointments/services/DeleteAllAppointmentsService';

export default class DeleteAllAppointmentsController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteAllAppointmentsService = container.resolve(
      DeleteAllAppointmentsService,
    );

    const allAppointment = await deleteAllAppointmentsService.execute({
      id,
    });

    return response.json(allAppointment);
  }
}
