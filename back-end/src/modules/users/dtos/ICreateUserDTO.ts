export default interface ICreateUserDTO {
  name: string;
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
  password: string;
}
