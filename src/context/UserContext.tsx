import { GoytaBackend } from '@/entities/GoytaBackend';
import { IUser } from '@/types/IUser';
import { UserContextType } from '@/types/UserContextType';
import { createContext, useEffect, useState } from 'react';

const backend = new GoytaBackend();

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<IUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) fetchUser(token);
  }, []);

  const fetchUser = async (token: string) => {
    const { success, data } = await backend.findUser(token);

    if (!success) {
      return;
    }

    setUserState(data);
  };

  const setUser = (user: IUser | null) => setUserState(user);

  return (
    <UserContext.Provider value={{ fetchUser, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
