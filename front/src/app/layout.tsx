import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header/Header';
import { Footer } from '@/components/ui/Footer/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent/CookieConsent';
import { AuthProvider } from '@/context/AuthContext';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title:
    'Thé Tip Top - Thés Bio & Infusions Artisanales pour un Moment de Détente',
  description:
    'Découvrez Thé Tip Top, expert en thés bios et infusions artisanales. Participez à notre grand jeu-concours et tentez de gagner des cadeaux exclusifs. Achetez et savourez un moment de bien-être !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
