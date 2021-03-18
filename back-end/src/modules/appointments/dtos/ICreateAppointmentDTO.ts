export default interface ICreateAppointmentDTO {
  provider_id: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  frequency: 'first_contact' | 'weekly' | 'biweekly' | 'detached';
  client_id: string;
  date: Date;
  initial_appointment_id?: string;
  observation: string;
  uf: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  number: string;
  address: string;
  complement: string;
  reference_points: string;
  nearest_subway_station: string;
  status: 'created' | 'confirmed' | 'suspended' | 'appeared' | 'not_appeared';
}
