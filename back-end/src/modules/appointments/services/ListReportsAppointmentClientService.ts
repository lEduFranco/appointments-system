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

interface IAppointmentsClient {
  client: {
    id: string;
    name: string;
    cpf: string;
  };

  appointmentsProvider: IAppointmentsProvider[];
}

interface IAppointmentsProvider {
  provider: {
    id: string;
    name: string;
  };

  appointments: Appointment[];
}

@injectable()
class ListReportsAppointmentsClientService {
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
      (appointmentsClient, index) => {
        const groupedAppointmentsProvider = groupBy(
          appointmentsClient,
          'provider_id',
        );

        return {
          client: {
            id: index,
            name: `${appointmentsClient[0].client.user.user_profile.firstname} ${appointmentsClient[0].client.user.user_profile.lastname}`,
            cpf: appointmentsClient[0].client.user.user_profile.cpf,
          },
          appointmentsProvider: map(
            groupedAppointmentsProvider,
            (appointmentsProvider, indexProvider) => {
              return {
                provider: {
                  id: indexProvider,
                  name: `${appointmentsProvider[0].provider.user.user_profile.firstname} ${appointmentsProvider[0].provider.user.user_profile.lastname}`,
                },
                appointments: appointmentsProvider,
              };
            },
          ),
        };
      },
    );

    return mapAppointments;
  }
}

export default ListReportsAppointmentsClientService;
