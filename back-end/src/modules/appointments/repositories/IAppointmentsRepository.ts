import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import IFindAllAppointmentsFromProvidersByDateDTO from '../dtos/IFindAllAppointmentsFromProvidersByDateDTO';

export interface IAppointmentsProvider {
  provider: {
    id: string;
    name: string;
  };

  appointments: IAppointments;
}

interface IAppointments {
  integral?: Appointment;
  part_time_morning?: Appointment;
  part_time_afternoon?: Appointment;
}

export default interface IAppointmentsRepository {
  findById(id: string): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  createMany(data: Array<ICreateAppointmentDTO>): Promise<boolean>;

  findByDate(
    date: Date,
    provider_id: string,
    period: 'integral' | 'part_time_morning' | 'part_time_afternoon',
    dates: Array<string>,
  ): Promise<Appointment | undefined>;

  findAllAppointmentsFromProvidersByDate(
    data: IFindAllAppointmentsFromProvidersByDateDTO,
  ): Promise<IAppointmentsProvider[]>;

  delete(params: string | object): Promise<void>;
}
