import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header/Header';
import { Footer } from '@/components/ui/Footer/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent/CookieConsent';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jeu-concours Nice : Gagnez des Prix à Notre Nouvelle Boutique',
  description:
    "Participez à notre jeu-concours du 1er au 30 avril 2025 pour l'ouverture de notre 10ème boutique à Nice. Achetez pour 49€ et tentez de gagner un prix de 360€ !",
  openGraph: {
    title: 'Jeu-concours Nice : Gagnez des Prix à Notre Nouvelle Boutique',
    description:
      "Participez à notre jeu-concours du 1er au 30 avril 2025 pour l'ouverture de notre 10ème boutique à Nice. Achetez pour 49€ et tentez de gagner un prix de 360€ !",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeu-concours Nice : Gagnez des Prix à Notre Nouvelle Boutique',
    description:
      "Participez à notre jeu-concours du 1er au 30 avril 2025 pour l'ouverture de notre 10ème boutique à Nice. Achetez pour 49€ et tentez de gagner un prix de 360€ !",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Snippet GTM pour <head> */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P4HS95K8');
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} flex flex-col min-h-screen`}>
        {/* Snippet GTM (noscript) pour <body> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4HS95K8"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
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
