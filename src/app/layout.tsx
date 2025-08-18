import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Cory Janowski - Software Engineer',
  description: 'Software engineer with over 5 years experience in Engineering, Distributed Systems, Data Ingestion, and Cloud infrastructure.',
  keywords: ['Software Engineer', 'Python', 'Go', 'Cloud Infrastructure', 'GCP', 'AWS'],
  authors: [{ name: 'Cory Janowski' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Cory Janowski - Software Engineer',
    description: 'Software engineer with over 5 years experience in Engineering, Distributed Systems, Data Ingestion, and Cloud infrastructure.',
    url: 'https://coryjanowski.vercel.app',
    siteName: 'Cory Janowski',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cory Janowski - Software Engineer',
    description: 'Software engineer with over 5 years experience in Engineering, Distributed Systems, Data Ingestion, and Cloud infrastructure.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-apple-gray-50 text-apple-gray-700 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
