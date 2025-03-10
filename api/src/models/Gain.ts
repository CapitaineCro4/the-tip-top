export class Gain {
  id!: number;
  name!: string;
  value!: number;
  probability!: number;
}

export type CreateGain = {
  name: string;
  value: number;
  probability: number;
};

export type UpdateGain = Partial<CreateGain>;

export type WhereParams = {
  id?: number;
  name?: string;
  value?: number;
  probability?: number;
};
