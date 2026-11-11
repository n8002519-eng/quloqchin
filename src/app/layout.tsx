import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://quloqchin.uz'),
  title: 'Quloqchin.uz — Sifatli simsiz va professional quloqchinlar do\'koni',
  description: 'O\'zbekistondagi eng yaxshi simsiz, TWS, o\'yin va studiya quloqchinlari. Rasmiy kafolat, hamyonbop narxlar va tezkor yetkazib berish.',
  keywords: ['quloqchin', 'headphones', 'earphones', 'airpods', 'sony', 'marshall', 'tws', 'audio do\'koni', 'toshkent'],
  authors: [{ name: 'Quloqchin.uz' }],
  openGraph: {
    title: 'Quloqchin.uz — Premium Quloqchinlar Do\'koni',
    description: 'Eng so\'nggi modeldagi original quloqchinlar 1 yillik kafolat bilan.',
    url: 'https://quloqchin.uz',
    siteName: 'Quloqchin.uz',
    locale: 'uz_UZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col antialiased selection:bg-primary-500 selection:text-white transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div className="h-20 bg-slate-100 dark:bg-slate-900" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}

