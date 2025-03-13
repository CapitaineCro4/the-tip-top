import { CreateSession, Session } from '@/domain/session/SessionType';
import { apis } from '../axios';
import type { AxiosResponse } from 'axios';
import { SessionFactory } from '@/domain/session/Session';

export function getSession(id: string): Promise<Session> {
  return apis.tiptop
    .get(`/sessions/${id}`)
    .then(
      (response: AxiosResponse): Promise<Session> =>
        Promise.resolve(SessionFactory.createFromApi(response.data))
    );
}

export function getSessions(): Promise<Session[]> {
  return apis.tiptop
    .get('/sessions')
    .then(
      (response: AxiosResponse): Promise<Session[]> =>
        Promise.resolve(
          response.data.map((session: Session) =>
            SessionFactory.createFromApi(session)
          )
        )
    );
}

export function createSession(data: CreateSession): Promise<string> {
  return apis.tiptop
    .post('/sessions', data)
    .then((response: AxiosResponse): Promise<string> =>
      Promise.resolve(response.data)
    );
}
