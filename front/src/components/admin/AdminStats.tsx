'use client';

import { useEffect, useState, useCallback } from 'react';
import { FaUser, FaMars, FaVenus, FaGift } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { ticketService, Ticket } from '@/services/ticketService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

interface AgeStats {
  range: string;
  count: number;
  percentage: number;
}

interface AdminStatsProps {
  usersCount: number;
  users: Array<{
    gender: string;
    isEmploye: boolean;
    birthDate: string;
  }>;
}

export default function AdminStats({ usersCount, users }: AdminStatsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats[]>([]);
  const [genderStats, setGenderStats] = useState<GenderStats>({
    male: 0,
    female: 0,
    total: 0,
  });
  const [ageStats, setAgeStats] = useState<AgeStats[]>([]);
  const [deliveredStats, setDeliveredStats] = useState({
    total: 0,
    percentage: 0,
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const calculateAgeStats = useCallback((): AgeStats[] => {
    const now = new Date();
    const ranges = [
      { min: 0, max: 17, label: '0-17 ans' },
      { min: 18, max: 24, label: '18-24 ans' },
      { min: 25, max: 34, label: '25-34 ans' },
      { min: 35, max: 44, label: '35-44 ans' },
      { min: 45, max: 54, label: '45-54 ans' },
      { min: 55, max: 64, label: '55-64 ans' },
      { min: 65, max: Infinity, label: '65+ ans' },
    ];

    const stats = ranges.map((range) => {
      const count = users.filter((user) => {
        const birthDate = new Date(user.birthDate);
        const age = now.getFullYear() - birthDate.getFullYear();
        return age >= range.min && age <= range.max;
      }).length;

      return {
        range: range.label,
        count,
        percentage: users.length > 0 ? (count / users.length) * 100 : 0,
      };
    });

    return stats;
  }, [users]);

  const calculateGenderStats = useCallback((): GenderStats => {
    const stats = {
      male: 0,
      female: 0,
      total: users.length,
    };

    users.forEach((user) => {
      if (user.gender === 'MALE') {
        stats.male++;
      } else if (user.gender === 'FEMALE') {
        stats.female++;
      }
    });

    return stats;
  }, [users]);

  const calculateSessionStats = useCallback((): SessionStats[] => {
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
  }, [tickets]);

  const calculateDeliveredStats = useCallback(() => {
    const deliveredTickets = tickets.filter(
      (ticket) => ticket.isDelivered
    ).length;
    const totalUsedTickets = tickets.filter((ticket) => ticket.used).length;

    return {
      total: deliveredTickets,
      percentage:
        totalUsedTickets > 0 ? (deliveredTickets / totalUsedTickets) * 100 : 0,
    };
  }, [tickets]);

  useEffect(() => {
    if (tickets.length > 0) {
      const stats = calculateSessionStats();
      setSessionStats(stats);
      const gStats = calculateGenderStats();
      setGenderStats(gStats);
      const aStats = calculateAgeStats();
      setAgeStats(aStats);
      const dStats = calculateDeliveredStats();
      setDeliveredStats(dStats);
    }
  }, [
    tickets,
    calculateSessionStats,
    calculateGenderStats,
    calculateAgeStats,
    calculateDeliveredStats,
  ]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#242E61] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 ">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white overflow-hidden shadow ">
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
        <div className="bg-white overflow-hidden shadow ">
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
        <div className="bg-white overflow-hidden shadow ">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaGift className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Lots remis
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {deliveredStats.total}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {deliveredStats.percentage.toFixed(1)}%
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow ">
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
        <div className="bg-white overflow-hidden shadow ">
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

      <div className="bg-white shadow  overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Distribution par âge
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value} personne(s)`,
                    'Nombre',
                  ]}
                  labelFormatter={(label) => `Tranche d'âge: ${label}`}
                />
                <Bar dataKey="count" fill="#242E61" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {ageStats.map((stat) => (
              <div key={stat.range} className="bg-gray-50 p-3 ">
                <p className="text-sm font-medium text-gray-900">
                  {stat.range}
                </p>
                <p className="text-lg font-semibold text-[#242E61]">
                  {stat.count}
                </p>
                <p className="text-sm text-gray-500">
                  {stat.percentage.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sessionStats && sessionStats.length > 0 ? (
        <div className="bg-white shadow  overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Statistiques par Session
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {sessionStats.map((session) => (
                <div
                  key={session.name}
                  className="border  p-4 bg-gray-50"
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
        <div className="bg-white shadow  p-6">
          <p className="text-gray-500 text-center">Aucune session disponible</p>
        </div>
      )}
    </div>
  );
}
