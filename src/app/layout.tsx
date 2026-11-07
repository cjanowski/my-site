import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { profile } from '@/content/profile'
import './globals.css'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const title = `${profile.name} · ${profile.title}`
const description = profile.about[0]

export const metadata: Metadata = {
  metadataBase: new URL('https://coryjanowski.vercel.app'),
  title,
  description,
  keywords: ['Software Engineer', 'AI Engineer', 'Backend', 'Distributed Systems', 'LLM agents', 'Python', 'Go', 'TypeScript', 'AWS'],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: { title, description, url: '/', siteName: profile.name, locale: 'en_US', type: 'profile', images: ['/portrait.jpeg'] },
  twitter: { card: 'summary', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0e' },
  ],
}

// Runs before paint: stored choice, else the OS preference. Prevents a light flash in dark mode.
const themeScript = `(()=>{try{const s=localStorage.getItem('theme');const d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
