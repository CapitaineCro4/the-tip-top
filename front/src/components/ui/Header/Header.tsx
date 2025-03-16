'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMenu, FiUser } from 'react-icons/fi';
import { Logo } from './Logo';
import { SideMenu } from './SideMenu';
import { AuthForm } from '../Auth/AuthForm';
import { UserDropdown } from './UserDropdown';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    logout,
    hasAuthenticatedDashboard,
    isUserAdmin,
  } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = (): void => {
    if (isAuthenticated()) {
      setIsDropdownOpen(!isDropdownOpen);
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserClick}
              className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2"
              aria-label="Compte"
            >
              <FiUser className="w-6 h-6" />
            </button>

            <AnimatePresence>
              {isDropdownOpen && isAuthenticated() && (
                <UserDropdown
                  userName={user?.fullName() || ''}
                  onLogout={logout}
                  isAdmin={isUserAdmin()}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && (
          <AuthForm isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};
