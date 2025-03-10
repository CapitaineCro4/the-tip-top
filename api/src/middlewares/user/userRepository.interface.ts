import { User, CreateUser, UpdateUser, WhereParams } from '../../models/User';

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  findOne(where: WhereParams): Promise<User | null>;
  create(User: CreateUser): Promise<void>;
  update(id: number, User: UpdateUser): Promise<void>;
  delete(id: number): Promise<void>;
}
