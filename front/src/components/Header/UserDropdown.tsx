'use client';

import { motion } from 'motion/react';
import { FiLogOut, FiSettings } from 'react-icons/fi';
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
      className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="py-1">
        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
          {userName}
        </div>
        <div className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
          <Link href="/dashboard">Dashboard</Link>
        </div>

        {isAdmin && (
          <Link
            href="/admin"
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FiSettings className="w-4 h-4" />
            Administration
          </Link>
        )}

        {isEmploye && (
          <Link
            href="/employe"
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FiSettings className="w-4 h-4" />
            Employé
          </Link>
        )}

        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FiLogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </motion.div>
  );
};
