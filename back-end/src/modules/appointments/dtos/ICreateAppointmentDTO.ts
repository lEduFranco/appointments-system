export default interface ICreateAppointmentDTO {
  provider_id: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency: 'first_contact' | 'weekly' | 'biweekly' | 'monthly';
  user_id: string;
  date: Date;
  initial_appointment_id?: string;
}
