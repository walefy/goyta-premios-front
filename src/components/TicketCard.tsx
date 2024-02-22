import { ITicket } from '@/types/ITicket';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

type TicketCardProps = {
  ticket: ITicket;
};

export function TicketCard({ ticket }: TicketCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="lg:w-2/12">
      <CardHeader>
        <CardTitle>{ticket.name}</CardTitle>
        <CardDescription>{ticket.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Vai vir algo</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/home/sweepstake/${ticket.id}`)}
        >
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}
