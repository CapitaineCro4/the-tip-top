'use client';

import { TicketList } from '@/components/Tickets/TicketList';

export default function TicketsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#242E61]">Liste des Tickets</h1>
        <p className="text-gray-600 mt-2">
          Gérez tous les tickets générés pour le jeu concours.
        </p>
      </div>

      <TicketList />
    </div>
  );
}
