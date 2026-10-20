'use client'

import React, { useState } from 'react'
import SmoothScrollProvider from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import SiteNav from '@/components/SiteNav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Story from '@/components/Story'
import Ventures from '@/components/Ventures'
import Impact from '@/components/Impact'
import Voices from '@/components/Voices'
import ContactFooter from '@/components/ContactFooter'
import { useAdaptiveScaling } from '@/hooks/useAdaptiveScaling'

function HomeContent() {
  const [heroReady, setHeroReady] = useState(false)
  useAdaptiveScaling()

  return (
    <>
      <Preloader onComplete={() => setHeroReady(true)} />
      <SiteNav />
      <main className="relative flex flex-col w-full bg-[#08080a]">
        <Hero isReady={heroReady} />
        <Marquee />
        <Story />
        <Ventures />
        <Impact />
        <Voices />
        <ContactFooter />
      </main>
    </>
  )
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  )
}
