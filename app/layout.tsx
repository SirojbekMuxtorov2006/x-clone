import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08090d',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Sirojbek Muxtorov | Full-Stack Software Engineer & AI/ML Engineer',
  description:
    'Sirojbek Muxtorov — Full-Stack Software Engineer va AI/ML & Automation Engineer. Zamonaviy veb ilovalar, kengayuvchan backend tizimlar va aqlli AI yechimlari. Samarqand, O‘zbekiston.',
  keywords: [
    'Sirojbek Muxtorov',
    'Full-Stack Developer',
    'AI Engineer',
    'Machine Learning',
    'Next.js',
    'React',
    'TypeScript',
    'Python',
    'FastAPI',
    'LangChain',
    'Docker',
    'Samarkand',
    'Uzbekistan',
    'Software Engineer'
  ],
  authors: [{ name: 'Sirojbek Muxtorov', url: 'https://github.com/sirojbekmuxtorov2006' }],
  creator: 'Sirojbek Muxtorov',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://github.com/sirojbekmuxtorov2006',
    title: 'Sirojbek Muxtorov | Full-Stack & AI Engineer Portfolio',
    description:
      'Biznes uchun zamonaviy veb ilovalar, AI yechimlar va avtomatlashtirish tizimlarini yarataman. Samarqand, O‘zbekiston.',
    siteName: 'Sirojbek Muxtorov Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sirojbek Muxtorov | Full-Stack & AI Engineer',
    description:
      'Biznes uchun zamonaviy veb ilovalar, AI yechimlar va avtomatlashtirish tizimlarini yarataman.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#08090d] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <LanguageProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
