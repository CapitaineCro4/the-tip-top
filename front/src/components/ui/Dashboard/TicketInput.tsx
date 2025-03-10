'use client';

import { useState, useContext } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { TicketGenerator } from './TicketGenerator';
import { createGame } from '@/network/api-routes/Game';
import { AuthContext } from '@/context/AuthContext';
import { Gain } from '@/domain/gain/GainType';
export const TicketInput = () => {
  const { user } = useContext(AuthContext);
  const [ticketCode, setTicketCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [gain, setGain] = useState<Gain | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createGame({
      ticketCode,
      userId: user?.id as number,
    })
      .then((data) => {
        setGain(data.gain);
        setTicketCode('');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div className="max-w-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">
        {dashboardContent.ticketSection.title}
      </h2>
      <p className="text-gray-600 mb-6">
        {dashboardContent.ticketSection.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
            placeholder={dashboardContent.ticketSection.placeholder}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-[#242E61] font-mono focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#242E61] text-white py-2 hover:bg-[#1a2347] transition-colors"
        >
          {dashboardContent.ticketSection.buttonText}
        </button>

        {status === 'error' && (
          <p className="text-red-500 text-sm">
            {dashboardContent.ticketSection.errorMessage}
          </p>
        )}
        {status === 'success' && (
          <p className="text-green-500 text-sm">
            {dashboardContent.ticketSection.successMessage}
          </p>
        )}
        {gain && (
          <p className="text-green-500 text-sm">{JSON.stringify(gain)}</p>
        )}
      </form>

      <TicketGenerator />
    </div>
  );
};
