import { GameRepository } from '../middlewares/game/game.repository';
import { Game, CreateGame, WhereParams } from '../models/Game';
import { HttpError } from '../utils/HttpError';
export class GameService {
  private readonly gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  async findAll(where?: WhereParams): Promise<Game[]> {
    return this.gameRepository.findAll(where);
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ id });
    if (!game) {
      throw HttpError.notFound('Game not found', ['id']);
    }
    return game;
  }

  async create(data: CreateGame): Promise<void> {
    await this.gameRepository.create(data);
  }

  async delete(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gameRepository.delete(game.id);
  }
}
