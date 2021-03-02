import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import groupBy from 'lodash/groupBy';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { map } from 'lodash';

interface IRequest {
  frequency: 'detached' | 'fixed';
  startDate: string;
  endDate: string;
}

export interface IAppointmentsClient {
  client: {
    id: string;
    name: string;
  };

  appointments: Appointment[];
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
  }: IRequest): Promise<IAppointmentsClient[]> {
    const startDateParsed = parseISO(startDate);
    const endDateParsed = parseISO(endDate);

    const appointments = await this.appointmentsRepository.findAllAppointmentsByFrequencyAndDate(
      frequency,
      startDateParsed,
      endDateParsed,
    );

    const groupAppointments = groupBy(appointments, 'client.id');
    const mapAppointments = map(
      groupAppointments,
      (appointmentsProvider, index) => {
        return {
          client: {
            id: index,
            name: `${appointmentsProvider[0].client.user.user_profile.firstname} ${appointmentsProvider[0].client.user.user_profile.lastname}`,
          },
          appointments: appointmentsProvider,
        };
      },
    );

    return mapAppointments;
  }
}

export default ListReportsAppointmentsService;
