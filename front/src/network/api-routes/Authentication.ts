import { CreateUser, User } from '@/domain/user/UserType';
import { apis } from '../axios';
import type { AxiosResponse } from 'axios';
import { UserFactory } from '@/domain/user/User';
import { Game } from '@/domain/game/GameType';
import { GameFactory } from '@/domain/game/Game';

export function login(email: string, password: string): Promise<string> {
  return apis.tiptop
    .post('/auth/login', {
      email,
      password,
    })
    .then(async (response): Promise<string> => {
      return Promise.resolve(response.data.token);
    });
}

export function register(data: CreateUser): Promise<void> {
  return apis.tiptop.post('/auth/register', data);
}

export function getMe(): Promise<User> {
  return apis.tiptop
    .get('/auth/me')
    .then(
      (response: AxiosResponse): Promise<User> =>
        Promise.resolve(UserFactory.createFromApi(response.data))
    );
}

export function getMeGames(): Promise<Game[]> {
  return apis.tiptop
    .get('/auth/me/games')
    .then(
      (response: AxiosResponse): Promise<Game[]> =>
        Promise.resolve(
          response.data.map((game: Game) => GameFactory.createFromApi(game))
        )
    );
}
