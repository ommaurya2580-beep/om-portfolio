import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import LenisProvider from '@/components/providers/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import PageLoader from '@/components/ui/PageLoader';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Om Maurya | Full Stack Developer & Cyber Security Intern',
    template: '%s | Om Maurya',
  },
  description:
    'Portfolio of Om Maurya – Full Stack Developer, Cyber Security Intern, and AI & Cloud Certified professional. Specializing in Next.js, React, and Secure Web Development.',
  keywords: [
    'Om Maurya',
    'Full Stack Developer',
    'Cyber Security',
    'AI',
    'Cloud',
    'Portfolio',
    'React',
    'Next.js',
    'Firebase',
    'Software Engineer',
  ],
  authors: [{ name: 'Om Maurya', url: 'https://github.com/ommaurya2580-beep' }],
  creator: 'Om Maurya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://om-portfolio.vercel.app',
    title: 'Om Maurya | Full Stack Developer',
    description: 'Premium portfolio of Om Maurya – Full Stack Developer & Cyber Security Intern',
    siteName: 'Om Maurya Portfolio',
    images: [
      {
        url: '/og-image.png', // Fallback or add checks
        width: 1200,
        height: 630,
        alt: 'Om Maurya Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Maurya | Full Stack Developer',
    description: 'Premium portfolio of Om Maurya – Full Stack Developer & Cyber Security Intern',
    creator: '@ommaurya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#020209] text-slate-200 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            <PageLoader />
            <CustomCursor />
            <ScrollProgress />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(6, 6, 20, 0.95)',
                  color: '#00f5ff',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                  backdropFilter: 'blur(20px)',
                  fontFamily: 'var(--font-outfit)',
                },
                success: {
                  iconTheme: { primary: '#00ff88', secondary: '#020209' },
                },
                error: {
                  iconTheme: { primary: '#ff0080', secondary: '#020209' },
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
