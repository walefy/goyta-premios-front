export interface IQuota {
  drawnNumber: string;
  status: 'available' | 'sold' | 'pending';
  buyer: string | null;
}
