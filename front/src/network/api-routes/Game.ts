import { apis } from '../axios';
import { Game, CreateGame } from '@/domain/game/GameType';
import { GameFactory } from '@/domain/game/Game';
import type { AxiosResponse } from 'axios';
import { Gain } from '@/domain/gain/GainType';

export function getGame(id: string): Promise<Game> {
  return apis.tiptop
    .get(`/games/${id}`)
    .then(
      (response: AxiosResponse): Promise<Game> =>
        Promise.resolve(GameFactory.createFromApi(response.data))
    );
}

export function getGames(): Promise<Game[]> {
  return apis.tiptop
    .get('/games')
    .then(
      (response: AxiosResponse): Promise<Game[]> =>
        Promise.resolve(
          response.data.map((game: Game) => GameFactory.createFromApi(game))
        )
    );
}

export function createGame(
  data: CreateGame
): Promise<{ message: string; gain: Gain }> {
  return apis.tiptop
    .post('/games', data)
    .then(
      (response: AxiosResponse): Promise<{ message: string; gain: Gain }> =>
        Promise.resolve(response.data)
    );
}
