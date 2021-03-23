import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListReportsAppointmentProviderService from '@modules/appointments/services/ListReportsAppointmentProviderService';

export default class ReportsAppointmentsProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query;

    const listReportsAppointmentProviderService = container.resolve(
      ListReportsAppointmentProviderService,
    );

    const appointments = await listReportsAppointmentProviderService.execute({
      startDate,
      endDate,
    });

    return response.json(classToClass(appointments));
  }
}
