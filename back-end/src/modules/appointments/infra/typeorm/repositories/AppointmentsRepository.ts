import { getRepository, Repository, Raw, In, Equal } from 'typeorm';

import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';

import IAppointmentsRepository, {
  IAppointmentsProvider,
} from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvidersDTO from '@modules/appointments/dtos/IFindAllInDayFromProvidersDTO';
import IFindAllAppointmentsFromProvidersByDateDTO from '@modules/appointments/dtos/IFindAllAppointmentsFromProvidersByDateDTO';

import Appointment from '../entities/Appointment';

interface IObject {
  period?: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  provider_id: string;
  date: Date;
}

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    provider_id: string,
    period: 'integral' | 'part_time_morning' | 'part_time_afternoon',
    dates: Array<string>,
  ): Promise<Appointment | undefined> {
    let whereAppointment = [
      {
        provider_id,
        date: In(dates),
      },
    ];

    if (period === 'part_time_morning' || period === 'part_time_afternoon') {
      whereAppointment = [
        {
          provider_id,
          period: Equal(period),
          date: In(dates),
        },
        {
          provider_id,
          period: Equal('integral'),
          date: In(dates),
        },
      ];
    }

    const findAppointment = await this.ormRepository.findOne({
      where: whereAppointment,
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProviders({
    day,
    month,
    year,
  }: IFindAllInDayFromProvidersDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllAppointmentsFromProvidersByDate({
    day,
    month,
    year,
  }: IFindAllAppointmentsFromProvidersByDateDTO): Promise<
    IAppointmentsProvider[]
  > {
    const parsedMonth = month - 1;

    const appointments = await this.ormRepository.find({
      where: {
        date: new Date(year, parsedMonth, day),
      },
      relations: ['provider', 'user'],
    });

    const groupAppointments = groupBy(appointments, 'provider.name');
    const mapAppointments = map(
      groupAppointments,
      (appointmentsProvider, index) => ({
        provider: index,
        appointments: keyBy(appointmentsProvider, 'period'),
      }),
    );

    return mapAppointments;
  }

  public async create({
    provider_id,
    period,
    frequency,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      period,
      frequency,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async createMany(
    data: Array<ICreateAppointmentDTO>,
  ): Promise<boolean> {
    data.forEach(async ({ provider_id, period, frequency, user_id, date }) => {
      await this.create({
        provider_id,
        period,
        frequency,
        user_id,
        date,
      });
    });

    return true;
  }
}

export default AppointmentsRepository;
