'use client';

import { useState, useContext } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { TicketGenerator } from './TicketGenerator';
import { createGame } from '@/network/api-routes/Game';
import { AuthContext } from '@/context/AuthContext';
import { Gain } from '@/domain/gain/GainType';
import Confetti from 'react-confetti';

export const TicketInput = () => {
  const { user } = useContext(AuthContext);
  const [ticketCode, setTicketCode] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'success' | 'error' | 'alreadyUsed'
  >('idle');
  const [gain, setGain] = useState<Gain | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    try {
      const data = await createGame({
        ticketCode,
        userId: user?.id as number,
      });
      setGain(data.gain);
      setTicketCode('');
      setStatus('success');
      if (data.gain) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch {
      setShowConfetti(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 shadow-sm relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}

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
            className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all font-mono"
            required
            maxLength={10}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#242E61] text-white px-6 py-3 hover:bg-[#1a2347] transition-colors relative overflow-hidden"
        >
          <span className="relative z-10">
            {dashboardContent.ticketSection.buttonText}
          </span>
          <span className="absolute inset-0 bg-[#1a2347] opacity-0 hover:opacity-20 transition-opacity"></span>
        </button>

        {status === 'error' && (
          <p className="text-red-500 text-sm">
            {dashboardContent.ticketSection.errorMessage}
          </p>
        )}
        {status === 'alreadyUsed' && (
          <p className="text-red-500 text-sm">Ticket déjà utilisé</p>
        )}
        {status === 'success' && gain && (
          <p className="text-green-500 text-sm">
            Vous avez gagné {gain.name} !
          </p>
        )}
        {status === 'success' && !gain && (
          <p className="text-gray-500 text-sm">
            Désolé, pas de gain cette fois.
          </p>
        )}
      </form>

      <TicketGenerator />
    </div>
  );
};
