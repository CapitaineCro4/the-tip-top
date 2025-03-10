'use client';

import Link from 'next/link';
import { footerContent } from '@/content/footerContent';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#242E61] mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-white text-sm">{footerContent.copyright}</div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {footerContent.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 transition-colors text-sm whitespace-nowrap"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
