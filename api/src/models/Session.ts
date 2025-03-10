import { Ticket } from "./Ticket";

export class Session {
  id!: number;
  name!: string;
  startDate!: Date;
  endDate!: Date;
  claimEndDate!: Date;
  tickets!: Ticket[];
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateSession = {
  name: string;
  startDate: Date;
  endDate: Date;
  claimEndDate: Date;
}

export type WhereParams = {
  id?: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  claimEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UpdateSession = Partial<CreateSession>