'use client';

import { useState, useContext, useEffect } from 'react';
import { FiDownload, FiList } from 'react-icons/fi';
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
    loadUserGames()
      .then(() => {
        setTickets(
          userGames.map((game) => ({
            id: game.id.toString(),
            date: game.createdAt,
            number: game.ticket.code,
            gain: game.ticket.gain.name,
            status: game.ticket ? 'won' : 'pending',
          }))
        );
      })
      .catch((error) => {
        console.error('Error loading user games:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGames]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FiList className="mr-3 h-6 w-6 text-blue-600" />
          {dashboardContent.ticketHistory.title}
        </h2>
      </div>

      <div className="p-6">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <FiList className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              {dashboardContent.ticketHistory.emptyMessage}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {Object.values(
                    dashboardContent.ticketHistory.table.headers
                  ).map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 first:rounded-tl-lg last:rounded-tr-lg"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ticket.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.gain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'won'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {ticket.status === 'won' ? 'Gagné' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="inline-flex items-center justify-center p-2 rounded-lg text-[#242E61] hover:bg-[#242E61]/10 transition-colors duration-200">
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
    </div>
  );
};
