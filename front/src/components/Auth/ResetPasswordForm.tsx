'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LoadingScreen } from '../LoadingScreen';

interface ResetPasswordFormProps {
  onBackToLogin: () => void;
}

export const ResetPasswordForm = ({
  onBackToLogin,
}: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
      }

      toast.success('Mot de passe réinitialisé avec succès !');
      router.push('/login');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">
          Token de réinitialisation invalide ou expiré
        </p>
        <button
          onClick={onBackToLogin}
          className="text-white hover:text-gray-200"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold">Réinitialiser le mot de passe</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nouveau mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
              required
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white text-[#16803C] py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'RÉINITIALISATION...' : 'RÉINITIALISER'}
          </button>
        </form>
      </motion.div>
    </>
  );
};
