import { Gain } from '../models/Gain';
import { Number } from './Number';

export class GameManager {
  static getRandomGain(gains: Gain[]): Gain {
    const totalProbability = gains.reduce(
      (sum, gain) => sum + gain.probability,
      0
    );
    const random = Number.random(0, totalProbability);

    let cumulativeProbability = 0;
    for (const gain of gains) {
      cumulativeProbability += gain.probability;
      if (random <= cumulativeProbability) return gain;
    }

    return gains[gains.length - 1];
  }

  static generateAlphaNumericCode(length: number): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();
  }
}
