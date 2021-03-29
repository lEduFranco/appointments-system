import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  id: string;
  observation: string;
  status: 'created' | 'confirmed' | 'suspended' | 'appeared' | 'not_appeared';
}

@injectable()
class EditAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Appointment | undefined> {
    const updateAppointment = await this.appointmentsRepository.updateAppointment(
      data,
    );

    return updateAppointment;
  }
}

export default EditAppointmentService;
