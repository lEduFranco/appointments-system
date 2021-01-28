import { format, addYears, eachDayOfInterval } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';

import Provider from '@modules/users/infra/typeorm/entities/Provider';

interface IRequest {
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency: 'first_contact' | 'weekly' | 'biweekly' | 'monthly';
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,
  ) {}

  public async execute({
    period,
    frequency,
    day,
    month,
    year,
  }: IRequest): Promise<Provider[]> {
    const parsedMonth = month - 1;
    const date = new Date(year, parsedMonth, day);

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

    const providers = await this.providersRepository.findAllProviders({
      period,
      dates: datesFormatted,
    });

    return providers;
  }
}

export default ListProvidersService;
