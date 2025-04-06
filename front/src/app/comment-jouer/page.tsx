'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
interface HowToPlaySection {
  title: string;
  content: string[];
}

const howToPlayData: HowToPlaySection[] = [
  {
    title: '1. Effectuez un achat',
    content: [
      "Rendez-vous dans l'une de nos boutiques Thé Tip Top",
      "Effectuez un achat d'un montant minimum de 49€",
      'Conservez précieusement votre ticket de caisse, il contient votre code unique de participation',
    ],
  },
  {
    title: '2. Participez au tirage au sort',
    content: [
      'Créez votre compte sur notre site web',
      'Saisissez votre code unique de participation',
      'Votre participation est automatiquement enregistrée pour le tirage au sort',
    ],
  },
  {
    title: '3. Les lots à gagner',
    content: [
      "1 an de thé d'une valeur de 360€",
      'Des boîtes de thé signature',
      'Des boîtes de thé détox',
      "Des coffrets découverte d'une valeur de 39€",
      "Des coffrets découverte d'une valeur de 69€",
    ],
  },
  {
    title: '4. Conditions de participation',
    content: [
      'Le jeu est ouvert à toute personne majeure résidant en France métropolitaine',
      'Un seul ticket de participation par achat',
      "Le code unique ne peut être utilisé qu'une seule fois",
      "La participation est valable jusqu'au 30 Avril 2025",
    ],
  },
];

const Section = ({ title, content }: HowToPlaySection) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-[#16803C]" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-[#16803C]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 bg-gray-50">
              <ul className="list-disc pl-4 space-y-2 text-gray-600">
                {content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#16803C] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Comment participer au jeu concours
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Découvrez comment participer et gagner de superbes lots
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {howToPlayData.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            N&apos;attendez plus pour tenter votre chance et participer à notre
            grand jeu concours !
          </p>
          <Link
            href="/#products"
            className="w-full bg-[#242E61] text-white  px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center rounded-md"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    </div>
  );
}
