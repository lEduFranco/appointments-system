export default interface IEditClientDTO {
  id: string;
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: 'active' | 'inative' | 'suspended';
  user_id: string;
  user: {
    user_profile: {
      firstname: string;
      lastname: string;
      rg: string;
      cpf: string;
      cnpj: string;
      tel: string;
      cel: string;
      birth_date: Date;
    };
  };
}
