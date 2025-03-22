'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { adminLogin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    adminLogin(data.email as string, data.password as string)
      .then(() => {
        router.push('/admin');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Connexion
        </h2>
        <p className="text-center text-sm mb-4 text-gray-600">
          Veuillez vous connecter pour accéder à l&apos;espace administrateur.
        </p>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Adresse email *"
              className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="email"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe *"
              className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#242E61] text-white  px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center"
          >
            SE CONNECTER
          </button>
        </form>
      </div>
    </div>
  );
}
