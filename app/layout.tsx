import type { Metadata } from 'next'
import { Anton, Onest } from 'next/font/google'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rimdimaandal.vercel.app'),
  title: 'Rim Vernon Dimaandal — Creative Developer & Frontend Engineer',
  description:
    'Portfolio of Rim Vernon Dimaandal. Crafting modern digital experiences, immersive interfaces, and scalable frontend architectures.',
  keywords: [
    'Rim Vernon Dimaandal',
    'Rim Dimaandal',
    'Creative Developer',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
    'Philippines Developer',
  ],
  authors: [{ name: 'Rim Vernon Dimaandal' }],
  openGraph: {
    title: 'Rim Vernon Dimaandal — Creative Developer & Frontend Engineer',
    description:
      'Crafting modern digital experiences, immersive interfaces, and scalable frontend architectures.',
    type: 'website',
    images: [
      {
        url: '/rivermaya.PNG',
        width: 1200,
        height: 630,
        alt: 'Rim Vernon Dimaandal',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${onest.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-[var(--accent)] selection:text-[var(--background)]">
        {children}
      </body>
    </html>
  )
}
