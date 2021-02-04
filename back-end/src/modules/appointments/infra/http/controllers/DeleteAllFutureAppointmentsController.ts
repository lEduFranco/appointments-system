import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteAllFutureAppointmentsService from '@modules/appointments/services/DeleteAllFutureAppointmentsService';

export default class DeleteaAllFutureAppointmentsController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteAllFutureAppointmentsService = container.resolve(
      DeleteAllFutureAppointmentsService,
    );

    const allFutureAppointments = await deleteAllFutureAppointmentsService.execute(
      {
        id,
      },
    );

    return response.json(allFutureAppointments);
  }
}
