import { Game } from './GameType';
import { TicketFactory } from '../ticket/Ticket';
import { UserFactory } from '../user/User';
import { Ticket } from '../ticket/TicketType';
import { User } from '../user/UserType';

class _GameGet implements Game {
  readonly id: number;
  readonly description: string;
  readonly ticket: Ticket;
  readonly user: User;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(game: Game) {
    this.id = game.id;
    this.description = game.description;
    this.ticket = TicketFactory.createFromApi(game.ticket);
    this.user = UserFactory.createFromApi(game.user);
    this.createdAt = game.createdAt;
    this.updatedAt = game.updatedAt;
  }
}

export class GameFactory {
  static createFromApi(game: Game): _GameGet {
    return new _GameGet(game);
  }
}
