import { apis } from '@/network/axios';

interface RawTicket {
  id: number;
  code: string;
  used: boolean;
  totalQuantityGain: number;
  gainId: number;
  sessionId: number;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  isDelivered?: boolean;
  userGender?: 'MALE' | 'FEMALE';
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  user?: Ticket['user'];
  userInfo?: Ticket['user'];
  utilisateur?: Ticket['user'];
  gain?: Ticket['gain'];
  session?: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export interface Ticket {
  id: number;
  code: string;
  used: boolean;
  totalQuantityGain: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  gainId: number;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
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
    gender: 'MALE' | 'FEMALE';
  };
}

export const ticketService = {
  getAllTickets: async (): Promise<Ticket[]> => {
    try {
      const response = await apis.tiptop.get('/tickets/all');

      // Vérifions la structure d'un ticket utilisé
      const usedTickets = response.data.filter((t: RawTicket) => t.used);
      console.log('Tickets utilisés:', usedTickets);

      const mappedTickets = response.data.map((ticket: RawTicket) => {
        // Log détaillé de chaque ticket
        if (ticket.used) {
          console.log("Structure détaillée d'un ticket utilisé:", {
            ticket,
            userId: ticket.userId,
            isDelivered: ticket.isDelivered,
            user: ticket.user,
            userInfo: ticket.userInfo,
            utilisateur: ticket.utilisateur,
          });
        }

        return {
          ...ticket,
          createdAt: new Date(ticket.createdAt),
          updatedAt: new Date(ticket.updatedAt),
          isDelivered: ticket.isDelivered || false,
          session: ticket.session
            ? {
                ...ticket.session,
                startDate: new Date(ticket.session.startDate),
                endDate: new Date(ticket.session.endDate),
              }
            : undefined,
          // Essayons différentes possibilités pour les données utilisateur
          user:
            ticket.user ||
            ticket.userInfo ||
            ticket.utilisateur ||
            (ticket.userId
              ? {
                  id: ticket.userId,
                  gender: ticket.userGender || null,
                  email: ticket.userEmail || '',
                  firstName: ticket.userFirstName || '',
                  lastName: ticket.userLastName || '',
                }
              : undefined),
        };
      });

      console.log('Premier ticket mappé:', mappedTickets[0]);
      console.log(
        'Exemple de ticket utilisé mappé:',
        mappedTickets.find((t: Ticket) => t.used)
      );

      return mappedTickets;
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

  updateDeliveryStatus: async (
    ticketId: number,
    isDelivered: boolean
  ): Promise<Ticket> => {
    const response = await apis.tiptop.put(`/tickets/${ticketId}`, {
      isDelivered,
      deliveredAt: isDelivered ? new Date() : undefined,
    });
    return response.data;
  },
};
