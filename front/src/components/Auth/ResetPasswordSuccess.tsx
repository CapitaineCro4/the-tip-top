import { motion } from 'motion/react';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

export const ResetPasswordSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Mot de passe réinitialisé avec succès !
        </h1>
        <p className="text-gray-600 mb-8">
          Votre mot de passe a été mis à jour avec succès. Vous pouvez
          maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#16803C] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Se connecter
        </Link>
      </motion.div>
    </div>
  );
};
