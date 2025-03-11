'use client';

import { motion } from 'motion/react';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';

interface SideMenuProps {
  onClose: () => void;
}

export const SideMenu = ({ onClose }: SideMenuProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 left-0 h-full w-80 bg-[#16803C] text-white shadow-lg z-50"
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-600 rounded-full"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block text-sm md:text-xl p-2 hover:bg-[#16803C] hover:text-white/80 transition-all duration-300"
                onClick={onClose}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/#products"
                className="block text-sm md:text-xl p-2 hover:bg-[#16803C] hover:text-white/80 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const element = document.getElementById('products');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Lots à remporter
              </Link>
            </li>
            <li>
              <Link
                href="/#how-to-participate"
                className="block text-sm md:text-xl p-2 hover:bg-[#16803C] hover:text-white/80 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const element = document.getElementById('how-to-participate');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comment participer
              </Link>
            </li>

            <li>
              <Link
                href="/faq"
                className="block text-sm md:text-xl p-2 hover:bg-[#16803C] hover:text-white/80 transition-all duration-300"
                onClick={onClose}
              >
                FAQ
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="block text-sm md:text-xl p-2 hover:bg-[#16803C] hover:text-white/80 transition-all duration-300"
                onClick={onClose}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </motion.div>
    </>
  );
};
