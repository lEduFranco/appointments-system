export default interface IEditProviderDTO {
  id: string;
  begin_date: string;
  final_date: string;
  demission_reason: string;
  uniform_size: string;
  voter_registration: string;
  voting_zone: string;
  voting_section: string;
  password_mei: string;
  status: 'active' | 'inactive' | 'suspended';
}
