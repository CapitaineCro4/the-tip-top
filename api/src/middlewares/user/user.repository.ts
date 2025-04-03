import { UserRepositoryInterface } from './userRepository.interface';
import { User, CreateUser, UpdateUser, WhereParams } from '../../models/User';
import { PrismaClient, Prisma } from '@prisma/client';
import { Password } from '../../utils/Password';
const prisma = new PrismaClient();

type UserEntity = Prisma.UserGetPayload<undefined>;

export class UserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(UserRepository.presenter);
  }

  async findOne(where: WhereParams): Promise<User | null> {
    const whereParams = {} as Prisma.UserWhereUniqueInput;

    if (where.id) whereParams.id = where.id;
    if (where.firstName) whereParams.firstName = where.firstName;
    if (where.lastName) whereParams.lastName = where.lastName;
    if (where.email) whereParams.email = where.email;
    if (where.googleId) whereParams.googleId = where.googleId;
    if (where.facebookId) whereParams.facebookId = where.facebookId;
    if (where.isAdmin) whereParams.isAdmin = where.isAdmin;
    if (where.isEmploye) whereParams.isEmploye = where.isEmploye;

    const user = await prisma.user.findFirst({
      where: {
        ...whereParams,
      },
    });

    if (!user) return null;

    if (where.password && user.password) {
      const isPasswordValid = await Password.compare(
        where.password,
        user.password
      );
      if (!isPasswordValid) return null;
    }

    return UserRepository.presenter(user);
  }

  async create(data: CreateUser): Promise<void> {
    const birthDate = new Date(data.birthDate);
    const userData = {
      ...data,
      birthDate,
    };

    if (data.password) {
      userData.password = await Password.crypt(data.password);
    }

    await prisma.user.create({
      data: userData,
    });
  }

  async update(id: number, data: UpdateUser): Promise<void> {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await Password.crypt(data.password);
    }
    if (data.birthDate) {
      updateData.birthDate = new Date(data.birthDate);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  static presenter(entity: UserEntity): User {
    const data = new User();
    data.id = entity.id;
    data.firstName = entity.firstName;
    data.lastName = entity.lastName;
    data.email = entity.email;
    data.gender = entity.gender;
    data.birthDate = entity.birthDate;
    data.isAdmin = entity.isAdmin;
    data.isEmploye = entity.isEmploye;
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;
    data.picture = entity.picture || undefined;
    data.googleId = entity.googleId || undefined;
    data.facebookId = entity.facebookId || undefined;
    return data;
  }
}
