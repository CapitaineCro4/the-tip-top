import { TicketRepository } from '../middlewares/ticket/ticket.repository';
import {
  Ticket,
  CreateTicket,
  UpdateTicket,
  WhereParams,
} from '../models/Ticket';
import { HttpError } from '../utils/HttpError';
export class TicketService {
  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.findAll();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ id });
    if (!ticket) {
      throw HttpError.notFound('Ticket not found', ['id']);
    }
    return ticket;
  }

  async findOneBy(where: WhereParams): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(where);
    if (!ticket) {
      throw HttpError.notFound('Ticket not found', Object.keys(where));
    }
    return ticket;
  }

  async create(data: CreateTicket): Promise<void> {
    await this.ticketRepository.create(data);
  }

  async createMany(data: CreateTicket[]): Promise<void> {
    await this.ticketRepository.createMany(data);
  }

  async update(id: number, data: UpdateTicket): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.update(ticket.id, data);
  }

  async delete(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.delete(ticket.id);
  }
}
