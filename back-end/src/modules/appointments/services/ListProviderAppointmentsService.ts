import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository, {
  IAppointmentsProvider,
} from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    year,
    month,
    day,
  }: IRequest): Promise<IAppointmentsProvider[]> {
    const appointments = await this.appointmentsRepository.findAllAppointmentsFromProvidersByDate(
      {
        year,
        month,
        day,
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
