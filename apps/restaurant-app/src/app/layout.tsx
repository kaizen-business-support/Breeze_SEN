import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Restaurant Gastronomique | Breeze',
  description: 'Découvrez notre cuisine gastronomique avec des ingrédients frais et locaux. Réservez votre table et explorez notre menu interactif.',
  keywords: 'restaurant, gastronomie, menu, réservation, chef, Dakar, Sénégal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <div className="min-h-screen bg-warm">
          {children}
        </div>
      </body>
    </html>
  );
}