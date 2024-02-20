export interface IUser {
  id: string,
  name: string;
  email: string;
  phone: string;
  image?: string;
  role: 'user' | 'admin';
}
