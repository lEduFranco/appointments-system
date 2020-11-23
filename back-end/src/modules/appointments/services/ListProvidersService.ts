import { format, addYears, eachDayOfInterval } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency: 'first_contact' | 'weekly' | 'biweekly' | 'monthly';
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    period,
    frequency,
    day,
    month,
    year,
    user_id,
  }: IRequest): Promise<User[]> {
    const date = new Date(year, month, day);

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

    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
      period,
      dates: datesFormatted,
    });

    return users;
  }
}

export default ListProvidersService;
