export default interface IFindAllAppointmentsByFrequencyAndDateDTO {
  frequency: 'detached' | 'fixed';
  startDate: Date;
  endDate: Date;
}
