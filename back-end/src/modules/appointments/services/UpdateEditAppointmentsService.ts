// import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// import Appointment from '../infra/typeorm/entities/Appointment';

// interface IRequest {
//   appointment_id: string;
//   date: Date;
//   user_id: string;
//   frequency: string;
//   period: string;
// }

// @injectable()
// class UpdateEditAppointmentsService {
//   constructor(
//     @inject('AppointmentsRepository')
//     private appointmentsRepository: IAppointmentsRepository,
//   ) {}

//   public async execute({
//     appointment_id,
//     user_id,
//     date,
//     frequency,
//     period,
//   }: IRequest): Promise<Appointment> {
//     const appointment = await this.appointmentsRepository.findById(
//       appointment_id,
//     );

//     if (!appointment) {
//       throw new AppError('appointment not found.');
//     }

// const ClientName = await this.appointmentsRepository.findByClient(user_id);

// if (ClientName && ClientName.id !== user_id) {
//   throw new AppError('Name alredy in use.');
// }

// appointment.user.name = user_id;

// const AppoinmtnetFrequency = await this.appointmentsRepository.findByClient(
//   frequency,
// );

// if (AppoinmtnetFrequency && AppoinmtnetFrequency.id !== frequency) {
//   throw new AppError('Name alredy in use.');
// }

// // appointment.frequency = frequency;

// return this.appointmentsRepository.save(appointment);
//   }
// }

// export default UpdateEditAppointmentsService;
