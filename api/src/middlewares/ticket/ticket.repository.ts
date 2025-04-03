import { GameManager } from './../../utils/GameManager';
import { TicketRepositoryInterface } from './ticketRepository.interface';
import {
  Ticket,
  CreateTicket,
  WhereParams,
  UpdateTicket,
} from '../../models/Ticket';
import { PrismaClient, Prisma } from '@prisma/client';
import { GainRepository } from '../gain/gain.repository';
import { SessionRepository } from '../session/session.repository';
const prisma = new PrismaClient();

type TicketEntity = Prisma.TicketGetPayload<{
  include: {
    gain: true;
    session: true;
    user: true;
  };
}>;

type TicketEntityWithoutSession = Prisma.TicketGetPayload<{
  include: {
    gain: true;
  };
}>;

export class TicketRepository implements TicketRepositoryInterface {
  async findAll(): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      include: {
        gain: true,
        session: true,
        user: true,
      },
    });
    return tickets.map(TicketRepository.presenter);
  }

  async findOne(where: WhereParams): Promise<Ticket | null> {
    const whereParams = {} as Prisma.TicketWhereUniqueInput;

    if (where.id) whereParams.id = where.id;
    if (where.code) whereParams.code = where.code;
    if (where.used) whereParams.used = where.used;
    if (where.totalQuantityGain)
      whereParams.totalQuantityGain = where.totalQuantityGain;
    if (where.gainId) whereParams.gainId = where.gainId;
    if (where.sessionId) whereParams.sessionId = where.sessionId;
    if (where.createdAt) whereParams.createdAt = new Date(where.createdAt);
    if (where.updatedAt) whereParams.updatedAt = new Date(where.updatedAt);

    const Ticket = await prisma.ticket.findFirst({
      where: {
        ...whereParams,
      },
      include: {
        gain: true,
        session: true,
        user: true,
      },
    });
    return Ticket ? TicketRepository.presenter(Ticket) : null;
  }

  async create(data: CreateTicket): Promise<void> {
    const { gainId, sessionId, ...ticketData } = data;
    await prisma.ticket.create({
      data: {
        ...ticketData,
        code: GameManager.generateAlphaNumericCode(10),
        used: false,
        gain: {
          connect: {
            id: gainId,
          },
        },
        session: {
          connect: {
            id: sessionId,
          },
        },
      },
    });
  }

  async createMany(data: CreateTicket[]): Promise<void> {
    await prisma.ticket.createMany({
      data: data.map((ticket) => ({
        ...ticket,
        code: GameManager.generateAlphaNumericCode(10),
        used: false,
      })),
    });
  }

  async update(id: number, data: UpdateTicket): Promise<void> {
    await prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.ticket.delete({
      where: { id },
    });
  }

  static presenter(entity: TicketEntity): Ticket {
    const data = new Ticket();
    data.id = entity.id;
    data.code = entity.code;
    data.used = entity.used;
    data.totalQuantityGain = entity.totalQuantityGain;
    data.isDelivered = entity.isDelivered;
    data.deliveredAt = entity.deliveredAt || undefined;
    data.gain = GainRepository.presenter(entity.gain);
    data.session = SessionRepository.presenterWithoutTickets(entity.session);
    data.user = entity.user
      ? {
          ...entity.user,
          picture: entity.user.picture || undefined,
          googleId: entity.user.googleId || undefined,
          facebookId: entity.user.facebookId || undefined,
        }
      : undefined;
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;
    return data;
  }

  static presenterWithoutSession(entity: TicketEntityWithoutSession): Ticket {
    const data = new Ticket();
    data.id = entity.id;
    data.code = entity.code;
    data.used = entity.used;
    data.totalQuantityGain = entity.totalQuantityGain;
    data.isDelivered = entity.isDelivered;
    data.deliveredAt = entity.deliveredAt || undefined;
    data.gain = GainRepository.presenter(entity.gain);
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;
    return data;
  }
}
