import { Game, CreateGame, WhereParams } from '../../models/Game';

export interface GameRepositoryInterface {
  findAll(where?: WhereParams): Promise<Game[]>;
  findOne(where: WhereParams): Promise<Game | null>;
  create(game: CreateGame): Promise<void>;
  delete(id: number): Promise<void>;
}
