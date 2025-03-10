import { GainRepositoryInterface } from './gainRepository.interface';
import { Gain, CreateGain, UpdateGain, WhereParams } from '../../models/Gain';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type GainEntity = Prisma.GainGetPayload<undefined>;

export class GainRepository implements GainRepositoryInterface {
  async findAll(): Promise<Gain[]> {
    const gains = await prisma.gain.findMany();
    return gains.map(GainRepository.presenter);
  }

  async findOne(where: WhereParams): Promise<Gain | null> {
    const whereParams = {} as Prisma.GainWhereUniqueInput;

    if (where.id) whereParams.id = where.id;
    if (where.name) whereParams.name = where.name;
    if (where.value) whereParams.value = where.value;

    const gain = await prisma.gain.findFirst({
      where: {
        ...whereParams,
      },
    });
    return gain ? GainRepository.presenter(gain) : null;
  }

  async create(data: CreateGain): Promise<void> {
    await prisma.gain.create({
      data,
    });
  }

  async update(id: number, data: UpdateGain): Promise<void> {
    await prisma.gain.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.gain.delete({
      where: { id },
    });
  }

  static presenter(entity: GainEntity): Gain {
    const data = new Gain();
    data.id = entity.id;
    data.name = entity.name;
    data.value = entity.value;
    data.probability = entity.probability;

    return data;
  }
}
