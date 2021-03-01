import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  frequency: 'detached' | 'fixed';
  startDate: string;
  endDate: string;
}

@injectable()
class ListReportsAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    frequency,
    startDate,
    endDate,
  }: IRequest): Promise<Appointment[]> {
    const startDateParsed = parseISO(startDate);
    const endDateParsed = parseISO(endDate);

    const reports = await this.appointmentsRepository.findAllAppointmentsByFrequencyAndDate(
      frequency,
      startDateParsed,
      endDateParsed,
    );

    return reports;
  }
}

export default ListReportsAppointmentsService;
