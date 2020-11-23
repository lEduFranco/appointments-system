import { isBefore, format, addYears, eachDayOfInterval } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency: 'first_contact' | 'weekly' | 'biweekly' | 'monthly';
  user_id: string;
  day: number;
  month: number;
  year: number;
}

interface IResponse {
  message: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    period,
    frequency,
    day,
    month,
    year,
    user_id,
  }: IRequest): Promise<IResponse> {
    const date = new Date(year, month, day);

    if (isBefore(date, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    let dates = [];

    if (frequency === 'first_contact' || frequency === 'monthly') {
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

    const datesToCreate = dates.map(dateToCreate => ({
      date: dateToCreate,
      provider_id,
      period,
      frequency,
      user_id,
    }));

    await this.appointmentsRepository.createMany(datesToCreate);

    return {
      message: 'Your appointment has been booked',
    };
  }
}

export default CreateAppointmentService;
