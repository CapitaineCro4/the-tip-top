import { User } from '@/domain/user/UserType';
import { UserFactory } from '@/domain/user/User';
import type { AxiosResponse } from 'axios';
import { apis } from '../axios';

export function getUser(id: string): Promise<User> {
  return apis.tiptop
    .get(`/users/${id}`)
    .then(
      (response: AxiosResponse): Promise<User> =>
        Promise.resolve(UserFactory.createFromApi(response.data))
    );
}
