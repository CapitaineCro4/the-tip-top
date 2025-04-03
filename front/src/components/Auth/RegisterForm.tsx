'use client';

import { useContext, useState, useRef } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { validatePassword } from '@/utils/validation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LoadingScreen } from '../LoadingScreen';

interface RegisterFormProps {
  onClose: () => void;
}

export const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [matchError, setMatchError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Réinitialiser les erreurs
    setPasswordErrors([]);
    setMatchError('');
    setGenderError('');
    setFormErrors({});

    // Validation des champs obligatoires
    const errors: { [key: string]: string } = {};
    if (!data.firstName) errors.firstName = 'error';
    if (!data.lastName) errors.lastName = 'error';
    if (!data.email) errors.email = 'error';
    if (!data.birthDate) errors.birthDate = 'error';
    if (!data.gender) {
      setGenderError('error');
      return;
    }
    if (!data.password) errors.password = 'error';
    if (!data.confirmPassword) errors.confirmPassword = 'error';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(data.password as string);
    if (!passwordValidation.isValid) {
      setPasswordErrors(passwordValidation.errors);
      return;
    }

    if (
      checkPassword(data.password as string, data.confirmPassword as string)
    ) {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement de 4 secondes
        await new Promise((resolve) => setTimeout(resolve, 4000));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: data.firstName as string,
              lastName: data.lastName as string,
              email: data.email as string,
              password: data.password as string,
              gender: data.gender as string,
              birthDate: data.birthDate as string,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }

        toast.success(
          'Inscription réussie ! Vous pouvez maintenant vous connecter.'
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Se connecter automatiquement
        await login(data.email as string, data.password as string);

        // Fermer le formulaire
        onClose();

        // Rediriger vers le tableau de bord
        router.push('/dashboard');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Une erreur est survenue'
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setMatchError('error');
    }
  };

  const checkPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordErrors([]);
    setMatchError('');
    setGenderError('');
    setFormErrors({});
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
        <div className="flex items-center mb-6 md:mt-12">
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-600 rounded-full mr-4"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Inscription</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          ref={formRef}
          onReset={resetForm}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Prénom"
                className={`w-full h-12 px-4 py-2 rounded-md bg-white/10 border ${
                  formErrors.firstName ? 'border-red-500' : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
              />
            </div>

            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Nom"
                className={`w-full h-12 px-4 py-2 rounded-md bg-white/10 border ${
                  formErrors.lastName ? 'border-red-500' : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`w-full h-12 px-4 py-2 rounded-md bg-white/10 border ${
                formErrors.email ? 'border-red-500' : 'border-white/20'
              } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                id="gender"
                name="gender"
                className={`w-full h-12 px-4 py-2 pr-8 rounded-md bg-white/10 border ${
                  genderError ? 'border-red-500' : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300 appearance-none`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em',
                }}
              >
                <option value="">Sélectionner le genre</option>
                <option value="MALE">Masculin</option>
                <option value="FEMALE">Féminin</option>
                <option value="OTHER">Autre</option>
              </select>
            </div>

            <div>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className={`w-full h-12 px-4 py-2 pr-8 rounded-md bg-white/10 border ${
                  formErrors.birthDate ? 'border-red-500' : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
                style={{
                  colorScheme: 'dark',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath d='M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.8rem center',
                  backgroundSize: '1.1em',
                }}
              />
              <style jsx>{`
                input[type='date']::-webkit-calendar-picker-indicator {
                  display: none;
                }
              `}</style>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe *"
                className={`w-full h-12 px-4 py-2 rounded-md bg-white/10 border ${
                  formErrors.password || passwordErrors.length > 0
                    ? 'border-red-500'
                    : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmation mot de passe *"
                className={`w-full h-12 px-4 py-2 rounded-md bg-white/10 border ${
                  formErrors.confirmPassword || matchError
                    ? 'border-red-500'
                    : 'border-white/20'
                } focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300`}
                name="confirmPassword"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>

            <div className="text-white text-xs bg-green-500 rounded-md px-4 py-2">
              <p>
                Le mot de passe doit contenir au moins 8 caractères et contenir
                des chiffres, des lettres majuscules et minuscules et des
                caractères spéciaux.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white text-[#16803C] py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'INSCRIPTION...' : "S'INSCRIRE"}
          </button>
        </form>
        <p className="text-xs text-left text-gray-200 mt-4 mb-6">
          En cliquant sur &quot;S&apos;inscrire&quot;, vous reconnaissez être
          informé et vous acceptez que vos données soient traitées selon les
          conditions suivantes et conformément à notre{' '}
          <Link href="/politique-confidentialite" className="underline">
            POLITIQUE DE CONFIDENTIALITÉ
          </Link>
          .
        </p>
      </motion.div>
    </>
  );
};
