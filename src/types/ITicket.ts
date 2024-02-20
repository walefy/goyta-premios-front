import { IPrize } from './IPrize';
import { IQuota } from './IQuota';

export interface ITicket {
  id: string;
  startDate: Date;
  endDate: Date | null;
  status: "running" | "closed";
  name: string;
  description: string;
  price: number;
  quantity: number;
  limitByUser: number;
  prizes: IPrize[];
  quotas: IQuota[];
}
