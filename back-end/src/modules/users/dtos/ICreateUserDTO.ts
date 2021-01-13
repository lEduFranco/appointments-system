export default interface ICreateUserDTO {
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
  password: string;
}
