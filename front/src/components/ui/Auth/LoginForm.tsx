'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    login(data.email as string, data.password as string)
      .then(() => {
        onClose();
        router.push('/dashboard');
      })
      .catch((error) => {
        const message = error.response?.data?.message ?? error.message;
        if (message.toLowerCase().indexOf('invalid') !== -1) {
          setError('Email ou mot de passe incorrect');
        } else {
          setError(message);
        }
      });
  };

  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <p className="text-center text-sm mb-4">
        Veuillez vous connecter pour accéder à votre espace.
      </p>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Adresse email *"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
            name="email"
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe *"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
            name="password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button
          id="subscribe-btn"
          type="submit"
          className="w-full bg-white text-green-700 px-6 py-3 border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
        >
          SE CONNECTER
        </button>
        <p className="text-sm text-center text-gray-200">
          Mot de passe oublié ?
        </p>
      </form>
      <div className="flex justify-center mt-4">
        <hr className="w-1/3 border-gray-300 mr-2" />
        <span className="text-gray-200 -mt-3">OU</span>
        <hr className="w-1/3 border-gray-300 ml-2" />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-white text-[#3b5998] px-6 py-3 flex items-center w-[200px] text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300">
          <span className="mr-2">
            <FaFacebook />
          </span>
          <span className="text-[#231F20]">FACEBOOK</span>
        </button>
        <a
          href={googleAuthUrl}
          className="bg-white text-[#231F20] px-6 py-3 flex items-center w-[200px] text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
        >
          <span className="mr-2">
            <FcGoogle />
          </span>
          GOOGLE
        </a>
      </div>
    </div>
  );
};
