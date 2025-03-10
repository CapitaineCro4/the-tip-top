import { UserRepository } from '../middlewares/user/user.repository';
import { User, CreateUser, UpdateUser, WhereParams } from '../models/User';
import { HttpError } from '../utils/HttpError';
export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw HttpError.notFound('User not found', ['id']);
    }
    return user;
  }

  async findOneBy(params: WhereParams): Promise<User> {
    const user = await this.userRepository.findOne(params);
    if (!user) {
      throw HttpError.notFound('User not found', Object.keys(params));
    }
    return user;
  }

  async create(data: CreateUser): Promise<void> {
    const checkUser = await this.userRepository.findOne({ email: data.email });
    if (checkUser) {
      throw HttpError.conflict('User already exists', ['email']);
    }
    await this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUser): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.update(user.id, data);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
