import {
  setHours,
  isAfter,
  isBefore,
  format,
  addYears,
  isToday,
  eachDayOfInterval,
  startOfDay,
} from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientRepository from '@modules/users/repositories/IClientRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency:
    | 'first_contact'
    | 'weekly'
    | 'biweekly'
    | 'detached'
    | 'fixed_variable';
  day: number;
  month: number;
  year: number;
  client_id: string;
  initial_appointment_id?: string;
  observation: string;
  uf: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  number: string;
  address: string;
  complement: string;
  reference_points: string;
  nearest_subway_station: string;
  status: 'created' | 'confirmed' | 'suspended' | 'appeared' | 'not_appeared';
}

interface IResponse {
  message: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute({
    day,
    month,
    year,
    provider_id,
    period,
    frequency,
    client_id,
    observation,
    status,
  }: IRequest): Promise<IResponse> {
    const parsedMonth = month - 1;
    const date = new Date(year, parsedMonth, day);
    const dateNow = new Date();
    const timeLimitPartTimeMorning = setHours(startOfDay(dateNow), 10);
    const timeLimitPartTimeIntegral = setHours(startOfDay(dateNow), 10);
    const timeLimitPartTimeAfternoon = setHours(startOfDay(dateNow), 15);

    const isLongerThanMorningTimeLimit =
      period === 'part_time_morning' &&
      isToday(date) &&
      isAfter(dateNow, timeLimitPartTimeMorning);

    const isLongerThanIntegralTimeLimit =
      period === 'integral' &&
      isToday(date) &&
      isAfter(dateNow, timeLimitPartTimeIntegral);

    const isLongerThanAfternoonTimeLimit =
      period === 'part_time_afternoon' &&
      isToday(date) &&
      isAfter(dateNow, timeLimitPartTimeAfternoon);

    if (
      isBefore(startOfDay(date), startOfDay(dateNow)) ||
      isLongerThanMorningTimeLimit ||
      isLongerThanIntegralTimeLimit ||
      isLongerThanAfternoonTimeLimit
    ) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    let dates = [];

    if (
      frequency === 'first_contact' ||
      frequency === 'detached' ||
      frequency === 'fixed_variable'
    ) {
      dates.push(date);
    }

    if (frequency === 'weekly') {
      dates = eachDayOfInterval(
        {
          start: date,
          end: addYears(date, 1),
        },
        {
          step: 7,
        },
      );
    }

    if (frequency === 'biweekly') {
      dates = eachDayOfInterval(
        {
          start: date,
          end: addYears(date, 1),
        },
        {
          step: 14,
        },
      );
    }

    const datesFormatted = dates.map(dateToFormat =>
      format(dateToFormat, 'yyyy-MM-dd'),
    );

    const findAppointmentInSamePeriod = await this.appointmentsRepository.findByDate(
      date,
      provider_id,
      period,
      datesFormatted,
    );

    if (findAppointmentInSamePeriod) {
      throw new AppError('This appointment is already booked');
    }

    const client = await this.clientsRepository.findClient(client_id);

    const datesToCreate = dates.map(dateToCreate => ({
      date: dateToCreate,
      provider_id,
      period,
      frequency,
      client_id,
      observation,
      uf: client.user.addresses[0].uf,
      city: client.user.addresses[0].city,
      zip_code: client.user.addresses[0].zip_code,
      neighborhood: client.user.addresses[0].neighborhood,
      number: client.user.addresses[0].number,
      address: client.user.addresses[0].address,
      complement: client.user.addresses[0].complement,
      reference_points: client.user.addresses[0].reference_points,
      nearest_subway_station: client.user.addresses[0].nearest_subway_station,
      status,
    }));

    await this.appointmentsRepository.createMany(datesToCreate);

    return {
      message: 'Your appointment has been booked',
    };
  }
}

export default CreateAppointmentService;
