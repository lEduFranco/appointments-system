import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListReportsAppointmentClientService from '@modules/appointments/services/ListReportsAppointmentClientService';

export default class ReportsAppointmentsClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { frequency, startDate, endDate } = request.query;

    const listReportsAppointmentClientService = container.resolve(
      ListReportsAppointmentClientService,
    );

    const appointments = await listReportsAppointmentClientService.execute({
      frequency,
      startDate,
      endDate,
    });

    return response.json(classToClass(appointments));
  }
}
