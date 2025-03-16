'use client';

import { motion } from 'motion/react';
import { FiX } from 'react-icons/fi';
import { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthForm = ({ isOpen, onClose }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    onClose();
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

            <div className="mt-4">
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

              <div className="max-w-[400px] mx-auto">
                {isLogin ? (
                  <LoginForm onClose={handleClose} />
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
