import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  message: string;
}

@injectable()
class DeleteAllFutureAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    await this.appointmentsRepository.deleteAllFutureAppointments({
      appointmentId: appointment.id,
      initialAppointmentId: appointment.initial_appointment_id,
      date: appointment.date,
    });

    return {
      message: 'Your appointment have been successfully deleted.',
    };
  }
}

export default DeleteAllFutureAppointmentsService;
