import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInWeekFromProvidersDTO from '../dtos/IFindAllInWeekFromProvidersDTO';
import IFindAllInDayFromProvidersDTO from '../dtos/IFindAllInDayFromProvidersDTO';

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

  findAllInWeekFromProviders(
    data: IFindAllInWeekFromProvidersDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProviders(
    data: IFindAllInDayFromProvidersDTO,
  ): Promise<Appointment[]>;
}
