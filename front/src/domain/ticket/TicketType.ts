import { Gain } from '../gain/GainType';
import { Session } from '../session/SessionType';

export type Ticket = {
  id: number;
  code: string;
  used: boolean;
  totalQuantityGain: number;
  gain: Gain;
  session?: Session;
  createdAt: string;
  updatedAt: string;
};
