import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a1a',
}

export const metadata: Metadata = {
  title: 'Nadir Eldjouzi — Ingénieur Systèmes Informatiques',
  description:
    'Portfolio de Nadir Eldjouzi, ingénieur en systèmes informatiques (Master UMMTO). Développement full-stack, réseaux & sécurité, bases de données et intelligence artificielle.',
  applicationName: 'Nadir Eldjouzi — Portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Nadir Eldjouzi — Ingénieur Systèmes Informatiques',
    description:
      'Portfolio de Nadir Eldjouzi : développement full-stack, réseaux & sécurité, bases de données et intelligence artificielle.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nadir Eldjouzi — Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Nadir Eldjouzi — Ingénieur Systèmes Informatiques',
    description:
      'Portfolio de Nadir Eldjouzi : développement full-stack, réseaux & sécurité, bases de données et intelligence artificielle.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`font-sans antialiased bg-background text-foreground overflow-x-hidden ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
