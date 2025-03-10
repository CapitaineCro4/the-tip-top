import {
  Ticket,
  CreateTicket,
  WhereParams,
  UpdateTicket,
} from '../../models/Ticket';

export interface TicketRepositoryInterface {
  findAll(): Promise<Ticket[]>;
  findOne(where: WhereParams): Promise<Ticket | null>;
  create(Ticket: CreateTicket): Promise<void>;
  createMany(tickets: CreateTicket[]): Promise<void>;
  update(id: number, Ticket: UpdateTicket): Promise<void>;
  delete(id: number): Promise<void>;
}
