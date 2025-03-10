import { Ticket } from './TicketType';
import { Gain } from '../gain/GainType';
import { GainFactory } from '../gain/Gain';
import { SessionFactory } from '../session/Session';
import { Session } from '../session/SessionType';

class _TicketGet implements Ticket {
  readonly id: number;
  readonly code: string;
  readonly used: boolean;
  readonly totalQuantityGain: number;
  readonly gain: Gain;
  readonly session?: Session;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.code = ticket.code;
    this.used = ticket.used;
    this.totalQuantityGain = ticket.totalQuantityGain;
    this.gain = GainFactory.createFromApi(ticket.gain);
    this.session = ticket.session
      ? SessionFactory.createFromApi(ticket.session)
      : undefined;
    this.createdAt = ticket.createdAt;
    this.updatedAt = ticket.updatedAt;
  }
}

export class TicketFactory {
  static createFromApi(ticket: Ticket): _TicketGet {
    return new _TicketGet(ticket);
  }
}
