'use client';

import { useContext, useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SessionContext } from '@/context/SessionContext';
export const TicketGenerator = () => {
  const { generateTicket: generateTicketContext, session } =
    useContext(SessionContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generateTicket = async () => {
    setIsGenerating(true);

    generateTicketContext()
      .then(async (ticket) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGeneratedTicket(ticket);
        setIsGenerating(false);
      })
      .catch(() => {
        setGeneratedTicket(null);
      });
  };

  const copyToClipboard = async () => {
    if (generatedTicket) {
      await navigator.clipboard.writeText(generatedTicket);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-lg font-medium mb-4">Démo - Générer un ticket</h3>
      <button
        onClick={generateTicket}
        disabled={isGenerating}
        className="w-full bg-green-600 text-white py-2 hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            Génération en cours...
          </>
        ) : (
          'Générer un ticket'
        )}
      </button>

      {generatedTicket && (
        <div className="mt-4 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Numéro de ticket :</p>
              <p className="text-lg font-mono font-medium">
                {generatedTicket.split('').join(' ')}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Copier le numéro"
            >
              {isCopied ? (
                <FiCheck className="w-5 h-5 text-green-600" />
              ) : (
                <FiCopy className="w-5 h-5" />
              )}
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-600 bg-gray-100 p-2">
              Session : <strong>{session?.name}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
