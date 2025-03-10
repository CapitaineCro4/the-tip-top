import { GameRepositoryInterface } from './gameRepository.interface';
import { Game, CreateGame, WhereParams } from '../../models/Game';
import { PrismaClient, Prisma } from '@prisma/client';
import { UserRepository } from '../user/user.repository';
import { TicketRepository } from '../ticket/ticket.repository';

const prisma = new PrismaClient();

type GameEntity = Prisma.GameGetPayload<{
  include: {
    ticket: {
      include: {
        gain: true;
        session: true;
      };
    };
    user: true;
  };
}>;

export class GameRepository implements GameRepositoryInterface {
  async findAll(where?: WhereParams): Promise<Game[]> {
    const games = await prisma.game.findMany({
      where: {
        ...where,
      },
      include: {
        ticket: {
          include: {
            gain: true,
            session: true,
          },
        },
        user: true,
      },
    });
    return games.map(GameRepository.presenter);
  }

  async findOne(where: WhereParams): Promise<Game | null> {
    const whereParams = {} as Prisma.GameWhereUniqueInput;

    if (where.id) whereParams.id = where.id;
    if (where.ticketId) whereParams.ticketId = where.ticketId;
    if (where.userId) whereParams.userId = where.userId;
    if (where.createdAt) whereParams.createdAt = new Date(where.createdAt);
    if (where.updatedAt) whereParams.updatedAt = new Date(where.updatedAt);

    const game = await prisma.game.findFirst({
      where: {
        ...whereParams,
      },
      include: {
        ticket: {
          include: {
            gain: true,
            session: true,
          },
        },
        user: true,
      },
    });
    return game ? GameRepository.presenter(game) : null;
  }

  async create(data: CreateGame): Promise<void> {
    const { ticketId, userId, ...gameData } = data;
    await prisma.game.create({
      data: {
        ...gameData,
        ticket: {
          connect: {
            id: ticketId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.game.delete({
      where: { id },
    });
  }

  static presenter(entity: GameEntity): Game {
    const data = new Game();
    data.id = entity.id;
    data.description = entity.description;
    data.ticket = TicketRepository.presenterWithoutSession(entity.ticket);
    data.user = UserRepository.presenter(entity.user);
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;

    return data;
  }
}
