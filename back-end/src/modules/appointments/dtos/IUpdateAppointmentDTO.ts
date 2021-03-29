export default interface IUpdateAppointmentDTO {
  id: string;
  observation: string;
  status: 'created' | 'confirmed' | 'suspended' | 'appeared' | 'not_appeared';
}
