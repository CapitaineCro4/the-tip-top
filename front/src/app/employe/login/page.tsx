'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function EmployeLoginPage () {
  const [showPassword, setShowPassword] = useState(false);
  const { employeLogin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    employeLogin(data.email as string, data.password as string)
      .then(() => {
        router.push('/employe');
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Connexion Employé
        </h2>
        <p className="text-center text-sm mb-4 text-gray-600">
          Veuillez vous connecter pour accéder à l&apos;espace employé.
        </p>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Adresse email *"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              name="email"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe *"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            SE CONNECTER
          </button>
        </form>
      </div>
    </div>
  );
}
