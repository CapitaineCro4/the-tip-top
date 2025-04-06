'use client';

import { useState, useContext } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { createGame } from '@/network/api-routes/Game';
import { AuthContext } from '@/context/AuthContext';
import { Gain } from '@/domain/gain/GainType';
import Confetti from 'react-confetti';
import { FiTag } from 'react-icons/fi';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FiTag className="mr-3 h-6 w-6 text-blue-600" />
          {dashboardContent.ticketSection.title}
        </h2>
        <p className="mt-2 text-gray-600">
          {dashboardContent.ticketSection.subtitle}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="ticketCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Code du ticket
            </label>
            <input
              id="ticketCode"
              type="text"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
              placeholder={dashboardContent.ticketSection.placeholder}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              maxLength={10}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-[#242E61] hover:bg-[#1a2347] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242E61] transition-all duration-200"
            >
              <span className="relative z-10">
                {dashboardContent.ticketSection.buttonText}
              </span>
            </button>
          </div>

          {status === 'error' && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-600">
                {dashboardContent.ticketSection.errorMessage}
              </p>
            </div>
          )}
          {status === 'alreadyUsed' && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-600">Ticket déjà utilisé</p>
            </div>
          )}
          {status === 'success' && gain && (
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm text-green-600">
                Vous avez gagné {gain.name} !
              </p>
            </div>
          )}
          {status === 'success' && !gain && (
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                Désolé, pas de gain cette fois.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
