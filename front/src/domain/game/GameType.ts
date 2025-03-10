import { Ticket } from '../ticket/TicketType';
import { User } from '../user/UserType';

export type Game = {
  id: number;
  description: string;
  ticket: Ticket;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type CreateGame = {
  ticketCode: string;
  userId: number;
};
