import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserContext } from '@/context/UserContext';


export function ProfileImage() {
  const { user } = useContext(UserContext);

  return (
    <Avatar className="hover:cursor-pointer">
      <AvatarImage src={user?.image} alt="Avatar" />
      <AvatarFallback>{user?.name.slice(0, 2).toLocaleUpperCase() || 'US'}</AvatarFallback>
    </Avatar>
  );
}
