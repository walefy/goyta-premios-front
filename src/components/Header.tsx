import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ProfileImage } from './ProfileImage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export function Header() {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-sm">
      <NavLink to="/home" className="text-2xl font-bold">
        Goyta
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">Prêmios</span>
      </NavLink>

      {pathname.replace(/\//g, '') === 'home' && (
        <div className="w-2/12">
          <Input type="search" placeholder="Buscar sorteios" />
        </div>
      )}

      <div className="flex items-center gap-3">
        {user?.role === 'admin' && (
          <Button className="px-3 py-0 text-sm font-semibold">
            Administração
          </Button>
        )}
        <Button
          className="px-3 py-0 text-sm font-semibold"
          onClick={() => navigate('/home')}
        >
          Sorteios
        </Button>
        <Button className="px-3 py-0 text-sm font-semibold">
          Meus bilhetes
        </Button>
        <ProfileImage />
      </div>
    </header>
  );
}
