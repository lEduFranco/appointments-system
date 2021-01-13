export default interface ICreateClientDTO {
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inactive' | 'suspended';
  user_id: string;
}
