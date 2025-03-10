'use client';

import { useContext, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { Logo } from './Logo';
import { SideMenu } from './SideMenu';
import { AuthForm } from '../Auth/AuthForm';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, hasAuthenticatedDashboard, isAuthenticated, logout } =
    useContext(AuthContext);
  const router = useRouter();

  const handleUserClick = (): void => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {!hasAuthenticatedDashboard() && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        )}

        <Logo />

        <div className="flex items-center gap-2">
          <button
            onClick={handleUserClick}
            className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2"
            aria-label="Compte"
          >
            {isAuthenticated() && (
              <span className="text-gray-500">{user?.fullName()}</span>
            )}

            <FiUser className="w-6 h-6" />
          </button>

          {isAuthenticated() && (
            <div className="flex items-center gap-4">
              <span className="text-gray-500">|</span>
              <button onClick={() => logout()}>
                <FiLogOut className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <SideMenu onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && (
          <AuthForm isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};
