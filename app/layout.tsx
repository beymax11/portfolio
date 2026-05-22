import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rim Dimaandal | Creative Developer',
  description: 'Crafting modern digital experiences — premium front-end development & design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&f[]=clash-display@700,600,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-bg text-foreground antialiased`}
        style={{ ['--font-display' as string]: "'Satoshi', system-ui, sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
