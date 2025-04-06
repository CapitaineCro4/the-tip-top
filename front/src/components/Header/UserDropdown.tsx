'use client';

import { motion } from 'framer-motion';
import { FiLogOut, FiSettings, FiUser, FiGrid } from 'react-icons/fi';
import Link from 'next/link';

interface UserDropdownProps {
  userName: string;
  onLogout: () => void;
  isAdmin?: boolean;
  isEmploye?: boolean;
}

export const UserDropdown = ({
  userName,
  onLogout,
  isAdmin,
  isEmploye,
}: UserDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-3 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
    >
      <div className="divide-y divide-gray-100">
        {/* En-tête avec le nom d'utilisateur */}
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUser className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{userName}</div>
              <div className="text-sm text-gray-500">Connecté</div>
            </div>
          </div>
        </div>

        {/* Menu principal */}
        <div className="py-2">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            <FiGrid className="w-4 h-4 mr-3 text-gray-400" />
            <span>Espace Client</span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <FiSettings className="w-4 h-4 mr-3 text-gray-400" />
              <span>Administration</span>
            </Link>
          )}

          {(isAdmin || isEmploye) && (
            <Link
              href="/employe"
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <FiUser className="w-4 h-4 mr-3 text-gray-400" />
              <span>Employé</span>
            </Link>
          )}
        </div>

        {/* Bouton de déconnexion */}
        <div className="py-2">
          <button
            onClick={onLogout}
            className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
          >
            <FiLogOut className="w-4 h-4 mr-3" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
