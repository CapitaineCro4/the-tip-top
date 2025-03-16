'use client';

import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { newsletterContent } from '@/content/newsletterContent';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#2A5C4C] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <FiMail className="text-white w-8 h-8 mr-3" />
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {newsletterContent.title}
          </h2>
        </div>

        <p className="text-gray-200 mb-8">{newsletterContent.subtitle}</p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterContent.placeholder}
                className="w-full px-6 py-3 border-2 border-transparent focus:border-white bg-white/10 text-white placeholder-gray-300 outline-none transition-all"
                required
              />
              {status === 'error' && (
                <p className="absolute text-red-400 text-sm mt-1">
                  {newsletterContent.errorMessage}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 font-medium transition-all
                ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
                }`}
            >
              {isSubmitting
                ? newsletterContent.buttonLoadingText
                : newsletterContent.buttonText}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-300 mt-6">
          {newsletterContent.legalText}{' '}
          <Link
            href="/politique-confidentialite"
            className="text-white underline hover:text-gray-200"
          >
            {newsletterContent.privacyLinkText}
          </Link>
        </p>

        {status === 'success' && (
          <div className="mt-6 text-green-400">
            {newsletterContent.successMessage}
          </div>
        )}
      </div>
    </section>
  );
};
