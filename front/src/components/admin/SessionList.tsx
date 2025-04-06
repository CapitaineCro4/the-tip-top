import { useEffect, useState } from 'react';
import { Session } from '@/domain/session/SessionType';
import { getSessions } from '@/network/api-routes/Session';
import { FaCalendarAlt, FaTicketAlt, FaClock } from 'react-icons/fa';
import { ticketService } from '@/services/ticketService';

export default function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketsStats, setTicketsStats] = useState<
    Map<number, { total: number; used: number }>
  >(new Map());

  useEffect(() => {
    loadSessionsAndTickets();
  }, []);

  const loadSessionsAndTickets = async () => {
    try {
      setIsLoading(true);
      const [sessionsData, allTickets] = await Promise.all([
        getSessions(),
        ticketService.getAllTickets(),
      ]);

      // Calculer les statistiques des tickets par session
      const stats = new Map<number, { total: number; used: number }>();
      allTickets.forEach((ticket) => {
        if (ticket.session?.id) {
          const sessionStats = stats.get(ticket.session.id) || {
            total: 0,
            used: 0,
          };
          sessionStats.total++;
          if (ticket.used) {
            sessionStats.used++;
          }
          stats.set(ticket.session.id, sessionStats);
        }
      });

      setTicketsStats(stats);
      setSessions(sessionsData);
    } catch (err) {
      setError('Erreur lors du chargement des sessions');
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSessionStatus = (session: Session) => {
    const now = new Date();
    const startDate = new Date(session.startDate);
    const endDate = new Date(session.endDate);
    const claimEndDate = new Date(session.claimEndDate);

    if (now < startDate) {
      return { label: 'À venir', color: 'text-blue-600 bg-blue-50' };
    } else if (now >= startDate && now <= endDate) {
      return { label: 'En cours', color: 'text-green-600 bg-green-50' };
    } else if (now > endDate && now <= claimEndDate) {
      return {
        label: 'Période de réclamation',
        color: 'text-orange-600 bg-orange-50',
      };
    } else {
      return { label: 'Terminée', color: 'text-gray-600 bg-gray-50' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Aucune session n&apos;a été créée
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.map((session) => {
        const status = getSessionStatus(session);
        const stats = ticketsStats.get(session.id) || { total: 0, used: 0 };
        return (
          <div
            key={session.id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {session.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaCalendarAlt className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Période du jeu</p>
                    <p className="text-sm">
                      {new Date(session.startDate).toLocaleDateString()} au{' '}
                      {new Date(session.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <FaClock className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Fin des réclamations</p>
                    <p className="text-sm">
                      {new Date(session.claimEndDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <FaTicketAlt className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Total tickets</p>
                    <p className="text-sm">{stats.total} tickets</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <FaTicketAlt className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">État des tickets</p>
                    <p className="text-sm">
                      <span className="text-red-600">{stats.used}</span>{' '}
                      utilisés,{' '}
                      <span className="text-green-600">
                        {stats.total - stats.used}
                      </span>{' '}
                      disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
