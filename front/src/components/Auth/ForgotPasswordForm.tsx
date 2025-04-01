'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { LoadingScreen } from '../LoadingScreen';

interface ForgotPasswordFormProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordForm = ({
  onClose,
  onBackToLogin,
}: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
      }

      toast.success('Instructions envoyées par email !');
      onClose();
      onBackToLogin();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={onBackToLogin}
            className="p-2 hover:bg-green-600 rounded-full mr-4"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Mot de passe oublié</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white text-[#16803C] py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'ENVOI...' : 'ENVOYER LES INSTRUCTIONS'}
          </button>
        </form>
      </motion.div>
    </>
  );
};
