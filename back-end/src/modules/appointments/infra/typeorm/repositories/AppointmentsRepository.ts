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

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne(id);

    return appointment;
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
      relations: [
        'provider',
        'provider.user',
        'provider.user.user_profile',
        'client',
        'client.user',
        'client.user.user_profile',
      ],
    });

    const groupAppointments = groupBy(appointments, 'provider.id');
    const mapAppointments = map(
      groupAppointments,
      (appointmentsProvider, index) => {
        return {
          provider: {
            id: index,
            name: `${appointmentsProvider[0].provider.user.user_profile.firstname} ${appointmentsProvider[0].provider.user.user_profile.lastname}`,
          },
          appointments: keyBy(appointmentsProvider, 'period'),
        };
      },
    );

    return mapAppointments;
  }

  public async create({
    provider_id,
    period,
    frequency,
    client_id,
    observation,
    uf,
    city,
    zip_code,
    neighborhood,
    number,
    address,
    complement,
    date,
    initial_appointment_id,
    status,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const data = {
      provider_id,
      period,
      frequency,
      client_id,
      observation,
      date,
      uf,
      city,
      zip_code,
      neighborhood,
      number,
      address,
      complement,
      status,
    };

    if (initial_appointment_id) {
      data.initial_appointment_id = initial_appointment_id;
    }

    const appointment = this.ormRepository.create(data);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async createMany(
    data: Array<ICreateAppointmentDTO>,
  ): Promise<boolean> {
    const firstAppointment = data.shift();

    let appointment = {
      id: '',
    };

    if (firstAppointment) {
      appointment = await this.create(firstAppointment);
    }

    const appointmentsMap = data.map(appointmentMap => {
      return {
        initial_appointment_id: appointment.id,
        ...appointmentMap,
      };
    });

    const appointments = this.ormRepository.create(appointmentsMap);
    await this.ormRepository.save(appointments);

    return true;
  }

  public async delete(params: string | object): Promise<void> {
    return this.ormRepository.delete(params);
  }
}

export default AppointmentsRepository;
