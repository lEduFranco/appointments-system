import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListReportsAppointmentService from '@modules/appointments/services/ListReportsAppointmentService';

export default class ReportsAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { frequency, startDate, endDate } = request.query;

    const listReportsAppointmentService = container.resolve(
      ListReportsAppointmentService,
    );

    const appointments = await listReportsAppointmentService.execute({
      frequency,
      startDate,
      endDate,
    });

    return response.json(classToClass(appointments));
  }
}
