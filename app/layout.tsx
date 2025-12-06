import type { Metadata, Viewport } from 'next'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Hardik Shreyas | Software Developer & AI Engineer',
  description: 'Portfolio of Hardik Shreyas - Software Developer & AI Engineer. Explore my projects, experience, and skills.',
  keywords: ['Hardik Shreyas', 'Software Developer', 'AI Engineer', 'Portfolio', 'Web Development', 'Machine Learning'],
  authors: [{ name: 'Hardik Shreyas' }],
  creator: 'Hardik Shreyas',
  openGraph: {
    title: 'Hardik Shreyas | Software Developer & AI Engineer',
    description: 'Portfolio of Hardik Shreyas - Software Developer & AI Engineer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hardik Shreyas | Software Developer & AI Engineer',
    description: 'Portfolio of Hardik Shreyas - Software Developer & AI Engineer',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
