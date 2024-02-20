import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { TicketCard } from '@/components/TicketCard';
import { useToast } from '@/components/ui/use-toast';
import { GoytaBackend } from '@/entities/GoytaBackend';
import { ITicket } from '@/types/ITicket';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backend = new GoytaBackend();

export function Home() {
  const [sweepstakes, setSweepstakes] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSweepstakes() {
      const token = sessionStorage.getItem('token');
      const { success, data } = await backend.getAllSweepstakes(token || '');

      if (success) {
        setSweepstakes(data);
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: data,
        duration: 5000,
      });
      setTimeout(() => navigate('/'), 5000);
    }

    fetchSweepstakes();
  }, []);

  if (!sweepstakes.length) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg'>Não há sorteios disponíveis</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-5 pt-5 pb-14 lg:pb-0 lg:pt-0">
      {window.innerWidth >= 768 && <Header />}
      <div className='flex flex-col justify-center px-2 gap-2 lg:flex-row lg:flex-wrap'>
        {sweepstakes.map((sweepstake: ITicket) => (
          <TicketCard key={sweepstake.id} ticket={sweepstake} />
        ))}
      </div>
      {window.innerWidth < 768 && <Footer />}
    </div>
  );
}
