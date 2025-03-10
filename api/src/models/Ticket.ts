import { Gain } from "./Gain";
import { Session } from "./Session";

export class Ticket {
  id!: number;
  code!: string;
  used!: boolean;
  totalQuantityGain!: number;
  gain!: Gain;
  session!: Session;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateTicket = {
  totalQuantityGain: number;
  gainId: number;
  sessionId: number;
}

export type UpdateTicket = {
  used?: boolean;
  totalQuantityGain?: number;
}

export type WhereParams = {
  id?: number;
  code?: string;
  used?: boolean;
  totalQuantityGain?: number;
  gainId?: number;
  sessionId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}