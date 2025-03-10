import { SessionRepository } from '../middlewares/session/session.repository';
import { Session, CreateSession, UpdateSession } from '../models/Session';
import { HttpError } from '../utils/HttpError';

export class SessionService {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async findAll(): Promise<Session[]> {
    return this.sessionRepository.findAll();
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({ id });
    if (!session) {
      throw HttpError.notFound('Session not found', ['id']);
    }
    return session;
  }

  async create(data: CreateSession): Promise<number> {
    const checkSession = await this.sessionRepository.findOne({
      name: data.name,
    });
    if (checkSession) {
      throw HttpError.conflict('Session already exists', ['name']);
    }
    return await this.sessionRepository.create(data);
  }

  async update(id: number, data: UpdateSession): Promise<void> {
    const session = await this.findOne(id);
    await this.sessionRepository.update(session.id, data);
  }

  async delete(id: number): Promise<void> {
    const session = await this.findOne(id);
    await this.sessionRepository.delete(session.id);
  }
}
