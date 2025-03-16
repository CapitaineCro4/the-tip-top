'use client';

import { useEffect, useState } from 'react';
import { FaUser, FaMars, FaVenus } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { ticketService, Ticket } from '@/services/ticketService';

interface SessionStats {
  name: string;
  totalTickets: number;
  availableTickets: number;
  usedTickets: number;
}

interface GenderStats {
  male: number;
  female: number;
  total: number;
}

interface AdminStatsProps {
  usersCount: number;
}

export default function AdminStats({ usersCount }: AdminStatsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats[]>([]);
  const [genderStats, setGenderStats] = useState<GenderStats>({
    male: 0,
    female: 0,
    total: 0,
  });

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      const stats = calculateSessionStats();
      setSessionStats(stats);
      const gStats = calculateGenderStats();
      setGenderStats(gStats);
    }
  }, [tickets]);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await ticketService.getAllTickets();
      setTickets(data);
    } catch (err) {
      setError('Erreur lors du chargement des tickets');
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateGenderStats = (): GenderStats => {
    const stats = {
      male: 0,
      female: 0,
      total: 0,
    };

    console.log('Tickets pour calcul genre:', tickets);

    tickets.forEach((ticket) => {
      console.log('Vérification ticket:', {
        id: ticket.id,
        used: ticket.used,
        user: ticket.user,
        gender: ticket.user?.gender,
      });

      if (ticket.used && ticket.user?.gender) {
        stats.total++;
        if (ticket.user.gender === 'MALE') {
          console.log('Homme trouvé:', ticket.user);
          stats.male++;
        } else if (ticket.user.gender === 'FEMALE') {
          console.log('Femme trouvée:', ticket.user);
          stats.female++;
        }
      }
    });

    console.log('Statistiques calculées:', stats);
    return stats;
  };

  const calculateSessionStats = (): SessionStats[] => {
    const sessionMap = new Map<string, SessionStats>();

    tickets.forEach((ticket) => {
      const sessionName = ticket.session?.name || 'Sans session';

      if (!sessionMap.has(sessionName)) {
        sessionMap.set(sessionName, {
          name: sessionName,
          totalTickets: 0,
          availableTickets: 0,
          usedTickets: 0,
        });
      }

      const stats = sessionMap.get(sessionName)!;
      stats.totalTickets++;
      if (ticket.used) {
        stats.usedTickets++;
      } else {
        stats.availableTickets++;
      }
    });

    return Array.from(sessionMap.values());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#242E61] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUser className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Utilisateurs totaux
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {usersCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TiTicket className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tickets totaux
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {tickets.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaMars className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Hommes
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {genderStats.male}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {genderStats.total > 0
                        ? `(${Math.round((genderStats.male / genderStats.total) * 100)}%)`
                        : '(0%)'}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaVenus className="h-6 w-6 text-pink-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Femmes
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {genderStats.female}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {genderStats.total > 0
                        ? `(${Math.round((genderStats.female / genderStats.total) * 100)}%)`
                        : '(0%)'}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sessionStats && sessionStats.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Statistiques par Session
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {sessionStats.map((session) => (
                <div
                  key={session.name}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    {session.name}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {session.totalTickets}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Disponibles</p>
                      <p className="text-xl font-semibold text-green-600">
                        {session.availableTickets}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Utilisés</p>
                      <p className="text-xl font-semibold text-red-600">
                        {session.usedTickets}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 text-center">Aucune session disponible</p>
        </div>
      )}
    </div>
  );
}
