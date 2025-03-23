'use client';

import { useState, useEffect, useCallback } from 'react';
import { ticketService, Ticket } from '@/services/ticketService';
import { FaCheck, FaTimes, FaEye, FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    session: 'all',
    searchCode: '',
    deliveryStatus: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadTickets();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...tickets];

    // Filtre par code
    if (filters.searchCode.trim() !== '') {
      filtered = filtered.filter((ticket) =>
        ticket.code.toLowerCase().includes(filters.searchCode.toLowerCase())
      );
    }

    // Filtre par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter((ticket) =>
        filters.status === 'available' ? !ticket.used : ticket.used
      );
    }

    // Filtre par session
    if (filters.session !== 'all') {
      filtered = filtered.filter(
        (ticket) => ticket.session?.name === filters.session
      );
    }

    // Filtre par statut de remise
    if (filters.deliveryStatus !== 'all') {
      filtered = filtered.filter((ticket) =>
        filters.deliveryStatus === 'delivered'
          ? ticket.isDelivered
          : !ticket.isDelivered
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await ticketService.getAllTickets();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      setError('Erreur lors du chargement des tickets');
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleDeliveryStatus = async (
    ticketId: number,
    isDelivered: boolean
  ) => {
    try {
      await ticketService.updateDeliveryStatus(ticketId, isDelivered);
      const updatedTickets = await ticketService.getAllTickets();
      setTickets(updatedTickets);
      setSelectedTicket(null);
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour du statut de remise:',
        error
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#242E61] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
    );
  }

  const uniqueSessions = Array.from(
    new Set(tickets.map((ticket) => ticket.session?.name).filter(Boolean))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#242E61]">Liste des Tickets</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <input
            type="text"
            placeholder="Rechercher par code..."
            className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all max-w-md"
            value={filters.searchCode}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchCode: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-full max-w-md">
            <FaFilter className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              className="w-full px-6 py-3 pl-10 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all appearance-none"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="all">Tous les statuts</option>
              <option value="available">Disponibles</option>
              <option value="used">Utilisés</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-full max-w-md">
            <FaFilter className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              className="w-full px-6 py-3 pl-10 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all appearance-none"
              value={filters.session}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, session: e.target.value }))
              }
            >
              <option value="all">Toutes les sessions</option>
              {uniqueSessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-full max-w-md">
            <FaFilter className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              className="w-full px-6 py-3 pl-10 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all appearance-none"
              value={filters.deliveryStatus}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  deliveryStatus: e.target.value,
                }))
              }
            >
              <option value="all">Tous les statuts de remise</option>
              <option value="delivered">Gains remis</option>
              <option value="not_delivered">Gains non remis</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#242E61] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Session
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Gain
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Remise
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Créé le
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {ticket.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ticket.session?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ticket.gain?.name || 'Non attribué'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {!ticket.used ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheck className="mr-1" /> Disponible
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <FaTimes className="mr-1" /> Plus disponible
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {ticket.used &&
                        (ticket.isDelivered ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <FaCheck className="mr-1" /> Remis
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <FaTimes className="mr-1" /> Non remis
                          </span>
                        ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex space-x-3">
                        <button
                          className="text-[#242E61] hover:text-[#242E61]"
                          title="Voir les détails"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Afficher</span>
          <select
            className="px-2 py-1 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">par page</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1  ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#242E61] text-white hover:bg-[#242E61]/90'
            }`}
          >
            Précédent
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} sur{' '}
            {Math.ceil(filteredTickets.length / itemsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredTickets.length / itemsPerPage)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(filteredTickets.length / itemsPerPage)
            }
            className={`px-3 py-1  ${
              currentPage === Math.ceil(filteredTickets.length / itemsPerPage)
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#242E61] text-white hover:bg-[#242E61]/90'
            }`}
          >
            Suivant
          </button>
        </div>
      </div>

      {showModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Détails du Ticket
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Code</h3>
                <p className="text-gray-600">{selectedTicket.code}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Gain</h3>
                <p className="text-gray-600">
                  {selectedTicket.gain?.name || 'Non attribué'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Session</h3>
                <p className="text-gray-600">
                  {selectedTicket.session?.name || 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Statut</h3>
                <p className="text-gray-600">
                  {!selectedTicket.used ? 'Disponible' : 'Plus disponible'}
                </p>
              </div>

              {selectedTicket.used && selectedTicket.user && (
                <div>
                  <h3 className="font-semibold text-gray-700">Utilisé par</h3>
                  <p className="text-gray-600">
                    {selectedTicket.user.firstName}{' '}
                    {selectedTicket.user.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedTicket.user.email}
                  </p>
                </div>
              )}

              {selectedTicket.used && (
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Statut de remise
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {selectedTicket.isDelivered
                        ? 'Gain remis au client'
                        : 'Gain non remis'}
                    </p>
                    {!selectedTicket.isDelivered && (
                      <button
                        onClick={() =>
                          handleDeliveryStatus(
                            selectedTicket.id,
                            !selectedTicket.isDelivered
                          )
                        }
                        className={`px-4 py-2 rounded ${
                          selectedTicket.isDelivered
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {selectedTicket.isDelivered
                          ? 'Marquer comme non remis'
                          : 'Marquer comme remis'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedTicket?.isDelivered && selectedTicket.deliveredAt && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Gain remis le{' '}
                    {new Date(selectedTicket.deliveredAt).toLocaleString(
                      'fr-FR'
                    )}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-700">Créé le</h3>
                <p className="text-gray-600">
                  {formatDate(selectedTicket.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
