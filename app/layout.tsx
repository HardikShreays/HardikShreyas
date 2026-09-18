import type { Metadata, Viewport } from 'next'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'
import { siteUrl, email, githubUrl, linkedinUrl } from '@/data/social'

const title = 'Hardik Shreyas | Software Developer & AI Engineer'
const description =
  'Portfolio of Hardik Shreyas — Software Developer & AI Engineer building full-stack products with Next.js, TypeScript, Node.js and LangChain. Projects, experience and contact.'

export const metadata: Metadata = {
  // Without metadataBase, Next drops relative OG/Twitter image URLs and crawlers
  // get a card with no image.
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ['Hardik Shreyas', 'Software Developer', 'AI Engineer', 'Portfolio', 'Next.js', 'LangChain', 'Full Stack Developer'],
  authors: [{ name: 'Hardik Shreyas', url: siteUrl }],
  creator: 'Hardik Shreyas',
  publisher: 'Hardik Shreyas',
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Hardik Shreyas',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

// schema.org Person — what lets Google, LinkedIn and CMS embeds tie the page to
// the real accounts instead of guessing.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hardik Shreyas',
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  email: `mailto:${email}`,
  jobTitle: 'Software Developer & AI Engineer',
  sameAs: [githubUrl, linkedinUrl],
  knowsAbout: ['Next.js', 'TypeScript', 'React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Celery', 'LangChain', 'LangGraph', 'Machine Learning', 'Swift', 'Kotlin', 'C++'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Newton School of Technology, Rishihood University',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
