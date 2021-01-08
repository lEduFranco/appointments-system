import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
  allAppointments: boolean;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id, allAppointments }: IRequest): Promise<void> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (allAppointments) {
      await this.appointmentsRepository.delete({
        initial_appointment_id: appointment?.initial_appointment_id,
      });

      return {
        message: 'Your appointments have been successfully deleted.',
      };
    }

    return this.appointmentsRepository.delete(appointment?.id);

    return {
      message: 'Your appointment have been successfully deleted.',
    };
  }
}

export default DeleteAppointmentService;
