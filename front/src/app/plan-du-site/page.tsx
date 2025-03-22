'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/brand/logo_BW.svg';

interface SitemapSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

const sitemapData: SitemapSection[] = [
  {
    title: 'Navigation Principale',
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Comment jouer', href: '/comment-jouer' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Jeu Concours',
    links: [
      { name: 'Lots à remporter', href: '/#products' },
      { name: 'Comment participer', href: '/#how-to-participate' },
    ],
  },
  {
    title: 'Informations Légales',
    links: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      {
        name: "Conditions générales d'utilisation",
        href: '/conditions-utilisation',
      },
      {
        name: 'Politique de confidentialité',
        href: '/politique-confidentialite',
      },
    ],
  }
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#16803C] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-12">
              <Image
                src={logo}
                alt="Thé Tip Top"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Plan du site</h1>
          <p className="text-lg md:text-xl text-white/90">
            Retrouvez facilement toutes les pages de notre site
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sitemapData.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#16803C] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
