import { Ticket } from './Ticket';
import { User } from './User';

export class Game {
  id!: number;
  description?: string | null;
  ticket!: Ticket;
  user!: User;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateGame = {
  description?: string;
  ticketId: number;
  userId: number;
};

export type WhereParams = {
  id?: number;
  description?: string;
  ticketId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
