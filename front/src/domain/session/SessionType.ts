import { Ticket } from '../ticket/TicketType';

export type Session = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  claimEndDate: string;
  tickets?: Ticket[];
  createdAt: string;
  updatedAt: string;
};

export type CreateSession = {
  name: string;
  startDate: string;
  endDate: string;
  claimEndDate: string;
  ticketsQuantity?: number;
};
