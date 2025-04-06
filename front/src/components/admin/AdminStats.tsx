'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  FaUser,
  FaMars,
  FaVenus,
  FaGift,
  FaTicketAlt,
  FaChartBar,
} from 'react-icons/fa';
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
  PieChart,
  Pie,
  Cell,
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
  '18-25': number;
  '26-35': number;
  '36-45': number;
  '46+': number;
}

interface DeliveredStats {
  total: number;
  percentage: number;
}

interface AdminStatsProps {
  usersCount: number;
  users: {
    gender: string;
    birthDate: string;
    isEmploye: boolean;
  }[];
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
  const [ageStats, setAgeStats] = useState<AgeStats>({
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46+': 0,
  });
  const [deliveredStats, setDeliveredStats] = useState<DeliveredStats>({
    total: 0,
    percentage: 0,
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const calculateGenderStats = useCallback((): GenderStats => {
    const stats = {
      male: 0,
      female: 0,
      total: users.length,
    };

    users.forEach((user) => {
      if (user.gender === 'MALE') stats.male++;
      else if (user.gender === 'FEMALE') stats.female++;
    });

    return stats;
  }, [users]);

  const calculateAgeStats = useCallback((): AgeStats => {
    const stats = {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46+': 0,
    };

    users.forEach((user) => {
      const age =
        new Date().getFullYear() - new Date(user.birthDate).getFullYear();
      if (age <= 25) stats['18-25']++;
      else if (age <= 35) stats['26-35']++;
      else if (age <= 45) stats['36-45']++;
      else stats['46+']++;
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
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  const totalTickets = sessionStats.reduce(
    (acc, curr) => acc + curr.totalTickets,
    0
  );
  const usedTickets = sessionStats.reduce(
    (acc, curr) => acc + curr.usedTickets,
    0
  );

  const COLORS = {
    blue: '#2563eb',
    green: '#16a34a',
    red: '#dc2626',
    purple: '#9333ea',
    pink: '#db2777',
  };

  const prepareGenderData = () => [
    { name: 'Hommes', value: genderStats.male, color: COLORS.blue },
    { name: 'Femmes', value: genderStats.female, color: COLORS.pink },
  ];

  const prepareAgeData = () =>
    Object.entries(ageStats).map(([range, value]) => ({
      name: range,
      value,
      color: COLORS.green,
    }));

  const prepareSessionData = () =>
    sessionStats.map((session) => ({
      name: session.name,
      Utilisés: session.usedTickets,
      Disponibles: session.availableTickets,
    }));

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-full">
              <FaUser className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Utilisateurs
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {usersCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center space-x-3">
            <div className="bg-green-50 p-3 rounded-full">
              <TiTicket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalTickets}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center space-x-3">
            <div className="bg-red-50 p-3 rounded-full">
              <FaTicketAlt className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tickets Utilisés
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {usedTickets}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50 p-3 rounded-full">
              <FaGift className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Lots Remis</p>
              <p className="text-2xl font-semibold text-gray-900">
                {deliveredStats.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques par session avec graphique */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Statistiques par Session
            </h3>
            <div className="bg-blue-50 p-2 rounded-full">
              <FaChartBar className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareSessionData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Utilisés" fill={COLORS.red} stackId="a" />
                  <Bar dataKey="Disponibles" fill={COLORS.green} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {sessionStats.map((session) => (
                <div key={session.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {session.name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {(
                        (session.usedTickets / session.totalTickets) *
                        100
                      ).toFixed(1)}
                      % utilisés
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {session.totalTickets}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Utilisés</p>
                      <p className="text-lg font-semibold text-red-600">
                        {session.usedTickets}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Disponibles</p>
                      <p className="text-lg font-semibold text-green-600">
                        {session.availableTickets}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques démographiques avec graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Répartition par Genre
              </h3>
              <div className="flex space-x-2">
                <div className="bg-blue-50 p-2 rounded-full">
                  <FaMars className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-pink-50 p-2 rounded-full">
                  <FaVenus className="w-5 h-5 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareGenderData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {prepareGenderData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Hommes</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {genderStats.male}
                </p>
                <p className="text-sm text-gray-500">
                  {((genderStats.male / genderStats.total) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Femmes</p>
                <p className="text-2xl font-semibold text-pink-600">
                  {genderStats.female}
                </p>
                <p className="text-sm text-gray-500">
                  {((genderStats.female / genderStats.total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Répartition par Âge
              </h3>
              <div className="bg-green-50 p-2 rounded-full">
                <FaChartBar className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareAgeData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLORS.green}>
                    {prepareAgeData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(ageStats).map(([range, count]) => (
                <div key={range} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{range} ans</p>
                  <p className="text-2xl font-semibold text-green-600">
                    {count}
                  </p>
                  <p className="text-sm text-gray-500">
                    {((count / users.length) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
