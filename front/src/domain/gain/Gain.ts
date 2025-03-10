import { Gain } from './GainType';

class _GainGet implements Gain {
  readonly id: number;
  readonly name: string;
  readonly value: number;
  readonly probability: number;

  constructor(gain: Gain) {
    this.id = gain.id;
    this.name = gain.name;
    this.value = gain.value;
    this.probability = gain.probability;
  }
}

export class GainFactory {
  static createFromApi(gain: Gain): _GainGet {
    return new _GainGet(gain);
  }
}
