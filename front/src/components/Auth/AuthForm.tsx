'use client';

import { motion } from 'motion/react';
import { FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthForm = ({ isOpen, onClose }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get('reset');

  useEffect(() => {
    if (isOpen) {
      // Désactiver le scroll quand la modal est ouverte
      document.body.style.overflow = 'hidden';
    } else {
      // Réactiver le scroll quand la modal est fermée
      document.body.style.overflow = 'auto';
    }
    // Nettoyer l'effet quand le composant est démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (resetSuccess === 'success') {
      onClose();
      router.push('/reset-password-success');
    }
  }, [resetSuccess, onClose, router]);

  const handleClose = () => {
    onClose();
    setShowForgotPassword(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={handleClose}
          />

          {/* Form Slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 h-full w-full md:w-[680px] bg-[#16803C] text-white shadow-lg z-50 p-4"
          >
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-green-600 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-2 md:mt-0">
              {!showForgotPassword && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 ${
                      isLogin
                        ? 'border-b-2 border-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 ${
                      !isLogin
                        ? 'border-b-2 border-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Inscription
                  </button>
                </div>
              )}

              <div className="max-w-[500px] mx-auto">
                {showForgotPassword ? (
                  <ForgotPasswordForm
                    onClose={handleClose}
                    onBackToLogin={handleBackToLogin}
                  />
                ) : isLogin ? (
                  <LoginForm
                    onClose={handleClose}
                    onForgotPassword={() => setShowForgotPassword(true)}
                  />
                ) : (
                  <RegisterForm onClose={handleClose} />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
