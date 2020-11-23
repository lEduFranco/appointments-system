export default interface IFindAllProvidersDTO {
  except_user_id?: string;
  period: 'integral' | 'part_time_morning' | 'part_time_afternoon';
  dates: Array<string>;
}
