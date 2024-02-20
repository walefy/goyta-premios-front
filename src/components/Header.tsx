import { ProfileImage } from './ProfileImage';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  // TODO: se a pessoa for administradora, mostrar um botão para ir para a página de administração

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-sm">
      <h1 className="text-2xl font-bold">
        Goyta
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">Prêmios</span>
      </h1>
      <div className="w-2/12">
        <Input type="search" placeholder="Buscar sorteios" />
      </div>
      <div className="flex items-center gap-3">
        <Button className="px-3 py-0 text-sm font-semibold">
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
