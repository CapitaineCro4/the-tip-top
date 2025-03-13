'use client';

import Image from 'next/image';
import { heroContent } from '@/content/heroContent';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AuthForm } from './Auth/AuthForm';

const Hero: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const { title, subtitle, description, buttonText, contestDates, alt } =
    heroContent;
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <section className="bg-green-700 text-white py-10 px-4 md:py-20 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <div className="relative">
            <Image
              src={imageSrc}
              alt={alt}
              width={500}
              height={300}
              className="w-full h-auto object-cover border-8 border-white shadow-lg transform -rotate-3 hover:rotate-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 w-full text-center md:px-10 ">
          {/* Contest Dates Link */}
          <div className=" mb-4 md:mb-14">
            <a
              href="#"
              className="inline-block text-sm text-white border border-white rounded-full px-4 py-1 hover:bg-white hover:text-green-700 transition-colors"
            >
              {contestDates}
            </a>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-3xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-4">{subtitle}</p>

          {/* Description */}
          <p className="text-base md:text-lg mb-6">{description}</p>

          {/* Button */}

          <button
            id="participate-btn"
            onClick={() => setIsAuthOpen(true)}
            className="bg-white text-green-700 py-2 px-6 hover:scale-105 transition-all duration-300 hover:bg-gray-200"
          >
            {buttonText}
          </button>

          <AnimatePresence>
            {isAuthOpen && (
              <AuthForm
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
