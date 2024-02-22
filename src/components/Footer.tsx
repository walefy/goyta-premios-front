import { House, ListNumbers } from '@phosphor-icons/react';
import { ProfileImage } from './ProfileImage';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 border-t-[0.3px] bg-white border-t-slate-900 left-0 w-full h-11 flex items-center py-3 px-5 md-0 justify-between">
      <button
        className="flex items-center gap-1 text-sm font-semibold"
        onClick={() => navigate('/home')}
      >
        <House size={32} />
      </button>
      <button className="flex items-center gap-1 text-sm font-semibold"><ListNumbers size={32} /></button>
      <button className="flex items-center gap-1 text-sm font-semibold"><ProfileImage /></button>
    </footer>
  );
}
