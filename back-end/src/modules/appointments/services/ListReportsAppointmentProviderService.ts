import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import groupBy from 'lodash/groupBy';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import { map } from 'lodash';

interface IRequest {
  startDate: string;
  endDate: string;
}

interface IAppointmentsProvider {
  provider: {
    id: string;
    name: string;
  };

  appointmentsProvider: IAppointmentsClient[];
}

interface IAppointmentsClient {
  client: {
    id: string;
    name: string;
    cpf: string;
  };

  appointments: Appointment[];
}

@injectable()
class ListReportsAppointmentsProviderService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    startDate,
    endDate,
  }: IRequest): Promise<IAppointmentsProvider[]> {
    const startDateParsed = parseISO(startDate);
    const endDateParsed = parseISO(endDate);

    const appointments = await this.appointmentsRepository.findAllAppointmentsByDate(
      startDateParsed,
      endDateParsed,
    );

    const groupAppointments = groupBy(appointments, 'provider.id');
    const mapAppointments = map(
      groupAppointments,
      (appointmentsProvider, index) => {
        const groupedAppointmentsProvider = groupBy(
          appointmentsProvider,
          'client_id',
        );

        return {
          provider: {
            id: index,
            name: `${appointmentsProvider[0].provider.user.user_profile.firstname} ${appointmentsProvider[0].provider.user.user_profile.lastname}`,
            cpf: appointmentsProvider[0].provider.user.user_profile.cpf,
          },
          appointmentsProvider: map(
            groupedAppointmentsProvider,
            (appointmentsClient, indexProvider) => {
              return {
                client: {
                  id: indexProvider,
                  name: `${appointmentsClient[0].client.user.user_profile.firstname} ${appointmentsClient[0].client.user.user_profile.lastname}`,
                  cpf: appointmentsClient[0].client.user.user_profile.cpf,
                },
                appointments: appointmentsClient,
              };
            },
          ),
        };
      },
    );

    return mapAppointments;
  }
}

export default ListReportsAppointmentsProviderService;
