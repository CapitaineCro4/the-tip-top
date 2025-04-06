'use client';

import { useState, useEffect, useCallback } from 'react';
import { ticketService, Ticket } from '@/services/ticketService';
import { FaEye, FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  FaTicketAlt,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const ITEMS_PER_PAGE = 20;

export function TicketList() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
      return;
    }

    loadTickets();
  }, [isAuthenticated, user, router]);

  async function loadTickets() {
    try {
      const allTickets = await ticketService.getAllTickets();
      setTickets(allTickets);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des tickets:', error);
      setIsLoading(false);
    }
  }

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const applyFilters = useCallback(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.user?.firstName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        ticket.user?.lastName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        ticket.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'used' && ticket.used) ||
        (statusFilter === 'unused' && !ticket.used);

      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, statusFilter]);

  const filteredTickets = applyFilters();
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Gestion des Tickets
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Liste de tous les tickets générés
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaFilter className="mr-2" />
              Filtres
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-lg"
                  >
                    <option value="all">Tous</option>
                    <option value="used">Utilisés</option>
                    <option value="unused">Non utilisés</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tableau des tickets */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Utilisateur
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date de création
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="bg-purple-50 rounded-full p-2">
                            <FaTicketAlt className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {ticket.user?.firstName} {ticket.user?.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {ticket.used ? (
                          <FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <FaTimesCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span
                          className={`text-sm ${
                            ticket.used ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {ticket.used ? 'Utilisé' : 'Non utilisé'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewTicket(ticket)}
                        className="text-primary hover:text-primary/80"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de{' '}
                    <span className="font-medium">{startIndex + 1}</span> à{' '}
                    <span className="font-medium">
                      {Math.min(
                        startIndex + ITEMS_PER_PAGE,
                        filteredTickets.length
                      )}
                    </span>{' '}
                    sur{' '}
                    <span className="font-medium">
                      {filteredTickets.length}
                    </span>{' '}
                    résultats
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Précédent</span>
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 bg-primary border-primary text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Suivant</span>
                      &gt;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
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
}
