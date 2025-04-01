import {
  Session,
  CreateSession,
  WhereParams,
  UpdateSession,
} from '../../models/Session';

export interface SessionRepositoryInterface {
  findAll(): Promise<Session[]>;
  findOne(where: WhereParams): Promise<Session | null>;
  create(Session: CreateSession): Promise<number>;
  update(id: number, Session: UpdateSession): Promise<void>;
  delete(id: number): Promise<void>;
}
