'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useContext, useState, useRef } from 'react';
import { register } from '@/network/api-routes/Authentication';
import { AuthContext } from '@/context/AuthContext';

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

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
      alert('Les mots de passe ne correspondent pas');
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
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
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
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nom *"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
            name="lastName"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Adresse email *"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
            name="email"
          />
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-white">Genre *</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="masculin"
              className="form-radio text-green-700 border-2 border-white focus:ring-0 focus:ring-offset-0"
              name="gender"
            />
            <span className="ml-2">Masculin</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="feminin"
              className="form-radio text-green-700 border-2 border-white focus:ring-0 focus:ring-offset-0"
              name="gender"
            />
            <span className="ml-2">Féminin</span>
          </label>
        </div>
        <div>
          <input
            type="date"
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
            placeholder="Année de naissance *"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-transparent focus:border-white bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
            name="birthDate"
          />
        </div>
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-green-700 px-6 py-3 border-2 border-transparent hover:bg-gray-200 transition-all duration-300"
        >
          CRÉER UN COMPTE
        </button>
      </form>
      <p className="text-xs text-left text-gray-200 mt-4">
        En cliquant sur « CRÉER UN COMPTE », vous reconnaissez être informé et
        vous acceptez que vos données soient traitées selon les conditions
        suivantes et conformément à notre{' '}
        <a href="#" className="underline">
          POLITIQUE DE CONFIDENTIALITÉ
        </a>
        .
      </p>
    </div>
  );
};
