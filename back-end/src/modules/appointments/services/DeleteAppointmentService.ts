import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
  allAppointments: boolean;
}

interface IResponse {
  message: string;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    id,
    allAppointments,
    allAppointmentFuture,
  }: IRequest): Promise<IResponse> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    if (allAppointments) {
      await this.appointmentsRepository.deleteAllAppointments(
        appointment.id,
        appointment.initial_appointment_id,
      );

      return {
        message: 'Your appointments have been successfully deleted.',
      };
    }

    if (allAppointmentFuture) {
      await this.appointmentsRepository.deleteAllFutureAppointments({
        appointmentId: appointment.id,
        initialAppointmentId: appointment.initial_appointment_id,
        date: appointment.date,
      });

      return {
        message: 'Your appointments have been successfully deleted.',
      };
    }

    await this.appointmentsRepository.deleteById(appointment.id);

    return {
      message: 'Your appointment have been successfully deleted.',
    };
  }
}

export default DeleteAppointmentService;
