'use client';

import Link from 'next/link';
import Image from 'next/image';
import { footerContent } from '@/content/footerContent';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/brand/logo_BW.svg';

export const Footer = () => {
  return (
    <footer className="bg-[#242E61] mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-32 h-12 mb-4 md:mb-0">
            <Image
              src={logo}
              alt="Thé Tip Top"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <div className="flex gap-4">
            <a
              href={footerContent.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={footerContent.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-8">
          <p className="text-gray-300 text-sm">{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
