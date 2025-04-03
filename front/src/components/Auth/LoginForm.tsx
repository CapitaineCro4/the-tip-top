'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { motion } from 'motion/react';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LoadingScreen } from '../LoadingScreen';

interface LoginFormProps {
  onClose: () => void;
  onForgotPassword: () => void;
}

export const LoginForm = ({ onClose, onForgotPassword }: LoginFormProps) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler un délai de chargement de 4 secondes
      await new Promise((resolve) => setTimeout(resolve, 4000));

      await login(formData.email, formData.password);
      toast.success('Connexion réussie !');
      onClose();
      router.push('/dashboard');
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

  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  const facebookAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;

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
            onClick={onClose}
            className="p-2 hover:bg-green-600 rounded-full mr-4"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Connexion</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Mot de passe oublié ?
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white text-[#16803C] py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
        </form>

        <div className="flex justify-center my-10">
          <hr className="w-1/3 border-gray-300 mr-2" />
          <span className="text-gray-200 -mt-3">OU</span>
          <hr className="w-1/3 border-gray-300 ml-2" />
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <a
            href={facebookAuthUrl}
            className="bg-white h-12 rounded-md text-[#3b5998] px-6 py-3 flex items-center w-full text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
          >
            <span className="mr-2">
              <FaFacebook />
            </span>
            <span className="text-[#231F20]">FACEBOOK</span>
          </a>
          <a
            href={googleAuthUrl}
            className="bg-white h-12 rounded-md text-[#231F20] px-6 py-3 flex items-center w-full text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
          >
            <span className="mr-2">
              <FcGoogle />
            </span>
            GOOGLE
          </a>
        </div>
      </motion.div>
    </>
  );
};
