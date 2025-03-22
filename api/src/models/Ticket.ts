import { Gain } from './Gain';
import { Session } from './Session';
import { User } from './User';

export class Ticket {
  id!: number;
  code!: string;
  used!: boolean;
  totalQuantityGain!: number;
  gain!: Gain;
  session!: Session;
  user?: User;
  isDelivered!: boolean;
  deliveredAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateTicket = {
  totalQuantityGain: number;
  gainId: number;
  sessionId: number;
};

export type UpdateTicket = {
  used?: boolean;
  totalQuantityGain?: number;
  userId?: number;
  isDelivered?: boolean;
  deliveredAt?: Date;
};

export type WhereParams = {
  id?: number;
  code?: string;
  used?: boolean;
  totalQuantityGain?: number;
  gainId?: number;
  sessionId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
