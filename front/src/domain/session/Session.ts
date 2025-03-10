import { Session } from './SessionType';
import { Ticket } from '../ticket/TicketType';
import { TicketFactory } from '../ticket/Ticket';
class _SessionGet implements Session {
  readonly id: number;
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly claimEndDate: string;
  readonly tickets?: Ticket[];
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(session: Session) {
    this.id = session.id;
    this.name = session.name;
    this.startDate = session.startDate;
    this.endDate = session.endDate;
    this.claimEndDate = session.claimEndDate;
    this.tickets = session.tickets?.map((ticket) =>
      TicketFactory.createFromApi(ticket)
    );
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}

export class SessionFactory {
  static createFromApi(session: Session): _SessionGet {
    return new _SessionGet(session);
  }
}
