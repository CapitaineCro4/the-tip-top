import { Gain, CreateGain, UpdateGain, WhereParams } from '../../models/Gain';

export interface GainRepositoryInterface {
  findAll(): Promise<Gain[]>;
  findOne(where: WhereParams): Promise<Gain | null>;
  create(gain: CreateGain): Promise<void>;
  update(id: number, gain: UpdateGain): Promise<void>;
  delete(id: number): Promise<void>;
}
