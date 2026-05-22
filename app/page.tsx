'use client'

import AmbientBackground from './components/effects/AmbientBackground'
import CustomCursor from './components/effects/CustomCursor'
import MouseGlow from './components/effects/MouseGlow'
import NoiseOverlay from './components/effects/NoiseOverlay'
import PageLoader from './components/effects/PageLoader'
import ScrollProgress from './components/effects/ScrollProgress'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MailButton from './components/MailButton'
import Navbar from './components/Navbar'
import TechStack from './components/TechStack'
import Work from './components/Work'

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <MouseGlow />
      <AmbientBackground />
      <NoiseOverlay />

      <main className="relative">
        <Navbar />
        <Hero />
        <Work />
        <TechStack />
        <Footer />
        <MailButton />
      </main>
    </>
  )
}
