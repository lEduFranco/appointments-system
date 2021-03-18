export default interface IEditClientDTO {
  id: string;
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inactive' | 'suspended';
}
