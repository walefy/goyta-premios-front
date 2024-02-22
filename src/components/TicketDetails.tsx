import { GoytaBackend } from '@/entities/GoytaBackend';
import { ITicket } from '@/types/ITicket';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { IQuota } from '@/types/IQuota';

const quotaStatusMap = {
  available: 'Disponível',
  pending: 'Reservada',
  sold: 'Vendida',
};

const backend = new GoytaBackend();

export function TicketDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');

  const filteredQuotas = ticket?.quotas.filter((quota) => quota.drawnNumber.includes(search));

  useEffect(() => {
    async function fetchTicket() {
      const token = sessionStorage.getItem('token');

      if (!token || !id) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Token ou id inválidos',
          duration: 5000,
        });
        setTimeout(() => navigate('/home'), 5000);
        return;
      }

      const { success, data } = await backend.getTicketById(token, id);

      if (success) {
        setTicket(data);
        setToken(token);
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: data,
        duration: 5000,
      });
    }

    fetchTicket();
  }, [id, navigate, toast]);

  const refreshTicket = async (): Promise<ITicket | null> => {
    const { success, data } = await backend.getTicketById(token, id as string);

    if (success) {
      setTicket(data);
      return data;
    }

    return null;
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(event.target.value))) return;
    setSearch(event.target.value);
  };

  const quotaIsAvailable = (quotaNumber: string, quotas: IQuota[]) => {
    console.log(quotas.find((quota) => quota.drawnNumber === quotaNumber));
    return quotas.find((quota) => quota.drawnNumber === quotaNumber)?.status === 'available';
  };

  const handleBuyQuota = async (quotaNumber: string) => {
    const updatedTicket = await refreshTicket();

    if (!updatedTicket) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao atualizar a cota',
        duration: 5000,
      });
      return;
    }

    const { quotas } = updatedTicket;

    if (!quotaIsAvailable(quotaNumber, quotas)) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Cota já comprada ou indisponível',
        duration: 5000,
      });
      return;
    }
    const { success, data } = await backend.buyQuota(token, id as string, quotaNumber);

    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: data,
        duration: 5000,
      });
      return;
    }

    window.open(data.externalUrl, '_blank');
    refreshTicket();
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <Card className="mx-6">
        <CardHeader>
          <CardTitle>{ticket?.name}</CardTitle>
          <CardDescription>{ticket?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-extrabold">Valor:</span>
            {' '}
            R${ticket?.price}
          </p>
          <p>
            <span className="font-extrabold">Quantidade:</span>
            {' '}
            {ticket?.quantity}
          </p>
          <p>
            <span className="font-extrabold">Status</span>
            {' '}
            {ticket?.status === 'running' ? 'Em andamento' : 'Encerrado'}
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center w-full">
        {/* search */}
        <div className="flex w-1/2 lg:w-4/12 border-[0.5px] border-slate-400 rounded-md p-2">
          <input
            className="w-full h-full bg-transparent focus:outline-none"
            type="text"
            placeholder="Buscar número"
            onChange={handleChangeSearch}
            value={search}
          />
          <MagnifyingGlass size={24} className="text-slate-400" />
        </div>
      </div>

      <div className="h-full w-full lg:px-6 overflow-y-auto overflow-x-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Comprar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotas?.map((quota) => (
              <TableRow key={quota.drawnNumber}>
                <TableCell>{quota.drawnNumber}</TableCell>
                <TableCell>{quotaStatusMap[quota.status]}</TableCell>
                <TableCell className="text-right">
                  <button
                    disabled={quota.status === 'pending' || quota.status === 'sold'}
                    className="bg-green-500 text-white px-3 py-1 rounded-md disabled:opacity-50"
                    onClick={() => handleBuyQuota(quota.drawnNumber)}
                  >
                    Comprar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
