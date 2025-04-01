'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Validation basique
    if (!data.email) {
      setErrors((prev) => ({ ...prev, email: "L'email est requis" }));
      setIsLoading(false);
      return;
    }
    if (!data.password) {
      setErrors((prev) => ({
        ...prev,
        password: 'Le mot de passe est requis',
      }));
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      login(data.email as string, data.password as string)
        .then(() => {
          onClose();
          router.push('/dashboard');
        })
        .catch((error) => {
          const message = error.response?.data?.message ?? error.message;

          // Si le message contient "Invalid email or password"
          if (message.toLowerCase().includes('invalid email or password')) {
            setErrors((prev) => ({
              ...prev,
              password: 'Mot de passe incorrect',
            }));
            return;
          }

          // Gestion spécifique des erreurs
          if (message.toLowerCase().includes('user not found')) {
            setErrors((prev) => ({ ...prev, email: "Cet email n'existe pas" }));
          } else if (message.toLowerCase().includes('incorrect password')) {
            setErrors((prev) => ({
              ...prev,
              password: 'Mot de passe incorrect',
            }));
          } else {
            // Message d'erreur générique
            setErrors((prev) => ({
              ...prev,
              password: 'Une erreur est survenue lors de la connexion',
            }));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 4000);
  };

  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  const facebookAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4 mt-6">
        Connexion à votre compte
      </h2>
      <p className="text-center text-sm mb-4 mt-6">
        Veuillez vous connecter pour accéder à votre espace.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <input
            type="email"
            placeholder="Adresse email *"
            className={`w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all ${
              errors.email ? 'border-red-500' : ''
            }`}
            name="email"
            required
          />
          {errors.email && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">
              {errors.email}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe *"
              className={`w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all ${
                errors.password ? 'border-red-500' : ''
              }`}
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
          {errors.password && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">
              {errors.password}
            </div>
          )}
        </div>
        <button
          id="subscribe-btn"
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-green-700 px-6 py-3 border-2 border-transparent hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#242E61] border-t-transparent"></div>
            </>
          ) : (
            'SE CONNECTER'
          )}
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
        <a
          href={facebookAuthUrl}
          className="bg-white text-[#3b5998] px-6 py-3 flex items-center w-full text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
        >
          <span className="mr-2">
            <FaFacebook />
          </span>
          <span className="text-[#231F20]">FACEBOOK</span>
        </a>
        <a
          href={googleAuthUrl}
          className="bg-white text-[#231F20] px-6 py-3 flex items-center w-full text-center justify-center border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
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
