import { IUser } from './IUser';

export type UserContextType = {
  user: IUser | null;
  fetchUser: (token: string) => Promise<void>;
  setUser: (user: IUser | null) => void;
};
