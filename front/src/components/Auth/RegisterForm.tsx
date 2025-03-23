'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useContext, useState, useRef } from 'react';
import { register } from '@/network/api-routes/Authentication';
import { AuthContext } from '@/context/AuthContext';
import { validatePassword } from '@/utils/validation';
import Link from 'next/link';

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [matchError, setMatchError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Réinitialiser les erreurs
    setPasswordErrors([]);
    setMatchError('');
    setGenderError('');

    // Validation du genre
    if (!data.gender) {
      setGenderError('Veuillez sélectionner votre genre');
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
      register({
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        email: data.email as string,
        password: data.password as string,
        gender: data.gender as string,
        birthDate: data.birthDate as string,
      })
        .then(() => {
          resetForm();
          login(data.email as string, data.password as string).then(() => {
            onClose();
          });
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    } else {
      setMatchError('Les mots de passe ne correspondent pas');
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
  };

  return (
    <div className="max-h-[calc(100vh-120px)] overflow-y-auto px-4">
      <div className="py-6">
        <h2 className="text-center text-2xl font-bold mb-4">Créer un compte</h2>
        <p className="text-center text-sm mb-4">
          Veuillez vous inscrire pour accéder à votre espace.
        </p>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          onReset={resetForm}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Prénom *"
              className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="firstName"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nom *"
              className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="lastName"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Adresse email *"
              className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="email"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center border border-transparent w-full bg-white/60 px-6 py-3">
              <span className="mr-2 text-black">Homme</span>
              <input
                type="radio"
                value="MALE"
                className="form-radio text-green-700 border-2 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name="gender"
                required
              />
            </label>
            <label className="inline-flex items-center border border-transparent w-full bg-white/60 px-6 py-3">
              <span className="mr-2 text-black">Femme</span>
              <input
                type="radio"
                value="FEMALE"
                className="form-radio text-green-700 border-2 border-gray-300 focus:ring-0 focus:ring-offset-0"
                name="gender"
                required
              />
            </label>
          </div>
          {genderError && (
            <div className="text-white text-xs bg-[#242E61] px-6 py-3">
              <p>{genderError}</p>
            </div>
          )}
          <div>
            <input
              type="date"
              min="1900-01-01"
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 12))
                  .toISOString()
                  .split('T')[0]
              }
              placeholder="Date de naissance *"
              className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
              name="birthDate"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe *"
                className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {passwordErrors.length > 0 && (
              <div className="text-white text-xs bg-[#c72828] px-6 py-3 ">
                {passwordErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmation mot de passe *"
                className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
                name="confirmPassword"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
            {matchError && (
              <div className="text-white text-xs bg-[#242E61] px-6 py-3 ">
                <p>{matchError}</p>
              </div>
            )}

            <div className="text-white text-xs bg-[#242E61] px-6 py-3 ">
              <p>
                Le mot de passe doit contenir au moins 8 caractères et contenir
                des chiffres, des lettres majuscules et minuscules et des
                caractères spéciaux.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-green-700 px-6 py-3 border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
          >
            CRÉER UN COMPTE
          </button>
        </form>
        <p className="text-xs text-left text-gray-200 mt-4 mb-6">
          En cliquant sur « CRÉER UN COMPTE », vous reconnaissez être informé et
          vous acceptez que vos données soient traitées selon les conditions
          suivantes et conformément à notre{' '}
          <Link href="/politique-confidentialite" className="underline">
            POLITIQUE DE CONFIDENTIALITÉ
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
