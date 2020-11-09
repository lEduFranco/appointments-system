import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInWeekFromProvidersDTO from '../dtos/IFindAllInWeekFromProvidersDTO';
import IFindAllInDayFromProvidersDTO from '../dtos/IFindAllInDayFromProvidersDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(
    date: Date,
    period: 'integral' | 'part_time_morning' | 'part_time_afternoon',
    provider_id: string,
  ): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;

  findAllInWeekFromProviders(
    data: IFindAllInWeekFromProvidersDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProviders(
    data: IFindAllInDayFromProvidersDTO,
  ): Promise<Appointment[]>;
}
