import Image from 'next/image';
import Link from 'next/link';
import teaLogo from '../assets/icons/tea.webp';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#16803C] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={teaLogo}
            alt="Thé Tip Top Logo"
            width={120}
            height={120}
            className="animate-bounce "
          />
        </div>

        {/* Message d'erreur */}
        <div className="space-y-4 text-white mt-2 md:mt-2">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">
            Oups ! Cette page s&apos;est évaporée comme du thé...
          </h2>
          <p className="text-lg text-white/80">
            Il semble que vous ayez perdu votre chemin. Pourquoi ne pas
            retourner à l&apos;accueil et déguster une tasse de thé ?
          </p>
        </div>

        {/* Bouton de retour */}
        <div>
          <Link
            href="/"
            className="inline-block bg-white text-[#16803C] px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
