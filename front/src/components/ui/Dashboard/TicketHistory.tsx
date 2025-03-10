'use client';

import { useState, useContext, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { dashboardContent } from '@/content/dashboardContent';
import { AuthContext } from '@/context/AuthContext';

type Ticket = {
  id: string;
  date: string;
  number: string;
  status: 'pending' | 'won';
  gain: string;
};

export const TicketHistory = () => {
  const { userGames, loadUserGames } = useContext(AuthContext);

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    loadUserGames();
  }, [loadUserGames]);

  useEffect(() => {
    setTickets(
      userGames.map((game) => ({
        id: game.id.toString(),
        date: game.createdAt,
        number: game.ticket.code,
        gain: game.ticket.gain.name,
        status: game.ticket ? 'won' : 'pending',
      }))
    );
  }, [userGames, userGames.length]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {dashboardContent.ticketHistory.title}
      </h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          {dashboardContent.ticketHistory.emptyMessage}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {dashboardContent.ticketHistory.table.headers.date}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {dashboardContent.ticketHistory.table.headers.ticketNumber}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {dashboardContent.ticketHistory.table.headers.gain}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {dashboardContent.ticketHistory.table.headers.status}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {dashboardContent.ticketHistory.table.headers.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.gain}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          ticket.status === 'won'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {ticket.status === 'won' ? 'Gagné' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#242E61] hover:text-[#1a2347] transition-colors">
                      <FiDownload className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
