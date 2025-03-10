import { SessionRepositoryInterface } from './sessionRepository.interface';
import {
  Session,
  CreateSession,
  WhereParams,
  UpdateSession,
} from '../../models/Session';
import { PrismaClient, Prisma } from '@prisma/client';
import { TicketRepository } from '../ticket/ticket.repository';
const prisma = new PrismaClient();

type SessionEntity = Prisma.SessionGetPayload<{
  include: {
    tickets: {
      include: {
        gain: true;
      };
    };
  };
}>;

type SessionEntityWithoutTickets = Prisma.SessionGetPayload<{
  include: {
    tickets: false;
  };
}>;

export class SessionRepository implements SessionRepositoryInterface {
  async findAll(): Promise<Session[]> {
    const sessions = await prisma.session.findMany({
      include: {
        tickets: {
          include: {
            gain: true,
          },
        },
      },
    });
    return sessions.map(SessionRepository.presenter);
  }

  async findOne(where: WhereParams): Promise<Session | null> {
    const whereParams = {} as Prisma.SessionWhereUniqueInput;

    if (where.id) whereParams.id = where.id;
    if (where.name) whereParams.name = where.name;
    if (where.startDate) whereParams.startDate = new Date(where.startDate);
    if (where.endDate) whereParams.endDate = new Date(where.endDate);
    if (where.claimEndDate)
      whereParams.claimEndDate = new Date(where.claimEndDate);
    if (where.createdAt) whereParams.createdAt = new Date(where.createdAt);
    if (where.updatedAt) whereParams.updatedAt = new Date(where.updatedAt);

    const Session = await prisma.session.findFirst({
      where: {
        ...whereParams,
      },
      include: {
        tickets: {
          include: {
            gain: true,
          },
        },
      },
    });
    return Session ? SessionRepository.presenter(Session) : null;
  }

  async create(data: CreateSession): Promise<number> {
    const date = new Date(data.startDate);
    const dateEnd = new Date(data.endDate);
    const dateClaim = new Date(data.claimEndDate);
    const session = await prisma.session.create({
      data: {
        ...data,
        startDate: date,
        endDate: dateEnd,
        claimEndDate: dateClaim,
      },
    });
    return session.id;
  }

  async update(id: number, data: UpdateSession): Promise<void> {
    await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  static presenter(entity: SessionEntity): Session {
    const data = new Session();
    data.id = entity.id;
    data.name = entity.name;
    data.startDate = entity.startDate;
    data.endDate = entity.endDate;
    data.claimEndDate = entity.claimEndDate;
    data.tickets = entity.tickets.map(TicketRepository.presenterWithoutSession);
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;
    return data;
  }

  static presenterWithoutTickets(entity: SessionEntityWithoutTickets): Session {
    const data = new Session();
    data.id = entity.id;
    data.name = entity.name;
    data.startDate = entity.startDate;
    data.endDate = entity.endDate;
    data.claimEndDate = entity.claimEndDate;
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;
    return data;
  }
}
