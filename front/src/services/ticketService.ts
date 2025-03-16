import { apis } from '@/network/axios';

export interface Ticket {
  id: number;
  code: string;
  used: boolean;
  totalQuantityGain: number;
  gainId: number;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;
  gain?: {
    id: number;
    name: string;
    value: number;
  };
  session?: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  };
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const ticketService = {
  getAllTickets: async (): Promise<Ticket[]> => {
    try {
      console.log('Récupération de tous les tickets...'); // Debug
      const response = await apis.tiptop.get('/tickets/all');
      console.log('Tickets reçus:', response.data); // Debug
      return response.data.map((ticket: any) => ({
        ...ticket,
        createdAt: new Date(ticket.createdAt),
        updatedAt: new Date(ticket.updatedAt),
        session: ticket.session
          ? {
              ...ticket.session,
              startDate: new Date(ticket.session.startDate),
              endDate: new Date(ticket.session.endDate),
            }
          : undefined,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      throw error;
    }
  },

  getTicketById: async (id: number): Promise<Ticket> => {
    const response = await apis.tiptop.get(`/tickets/${id}`);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
      session: response.data.session
        ? {
            ...response.data.session,
            startDate: new Date(response.data.session.startDate),
            endDate: new Date(response.data.session.endDate),
          }
        : undefined,
    };
  },

  updateTicket: async (id: number, data: Partial<Ticket>): Promise<void> => {
    await apis.tiptop.put(`/tickets/${id}`, data);
  },

  deleteTicket: async (id: number): Promise<void> => {
    await apis.tiptop.delete(`/tickets/${id}`);
  },
};
