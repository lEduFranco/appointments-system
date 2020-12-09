import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllAppointmentsFromProvidersByDateDTO from '../dtos/IFindAllAppointmentsFromProvidersByDateDTO';
import IFindAllInDayFromProvidersDTO from '../dtos/IFindAllInDayFromProvidersDTO';

export interface IAppointmentsProvider {
  provider: string;
  appointments: IAppointments;
}

interface IAppointments {
  integral?: Appointment;
  part_time_morning?: Appointment;
  part_time_afternoon?: Appointment;
}

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  createMany(data: Array<ICreateAppointmentDTO>): Promise<boolean>;

  findByDate(
    date: Date,
    provider_id: string,
    period: 'integral' | 'part_time_morning' | 'part_time_afternoon',
    dates: Array<string>,
  ): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;

  findAllAppointmentsFromProvidersByDate(
    data: IFindAllAppointmentsFromProvidersByDateDTO,
  ): Promise<IAppointmentsProvider[]>;

  findAllInDayFromProviders(
    data: IFindAllInDayFromProvidersDTO,
  ): Promise<Appointment[]>;
}
