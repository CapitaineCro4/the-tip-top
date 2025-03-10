import { GainRepository } from '../middlewares/gain/gain.repository';
import { Gain, CreateGain, UpdateGain } from '../models/Gain';
import { HttpError } from '../utils/HttpError';

export class GainService {
  private readonly gainRepository: GainRepository;

  constructor(gainRepository: GainRepository) {
    this.gainRepository = gainRepository;
  }

  async findAll(): Promise<Gain[]> {
    return this.gainRepository.findAll();
  }

  async findOne(id: number): Promise<Gain> {
    const gain = await this.gainRepository.findOne({ id });
    if (!gain) {
      throw HttpError.notFound('Gain not found', ['id']);
    }
    return gain;
  }

  async create(data: CreateGain): Promise<void> {
    const checkGain = await this.gainRepository.findOne({ name: data.name });
    if (checkGain) {
      throw HttpError.conflict('Gain already exists', ['name']);
    }
    await this.gainRepository.create(data);
  }

  async update(id: number, data: UpdateGain): Promise<void> {
    const gain = await this.findOne(id);
    await this.gainRepository.update(gain.id, data);
  }

  async delete(id: number): Promise<void> {
    const gain = await this.findOne(id);
    await this.gainRepository.delete(gain.id);
  }
}
