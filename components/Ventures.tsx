'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import Eyebrow from './Eyebrow'
import DepthCarousel, { DepthCarouselItem } from './DepthCarousel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Venture {
  title: string
  category: string
  year: string
  outcome: string
  blurb: string
  image: string
  link?: string
}

const VENTURES: Venture[] = [
  {
    title: 'Izaj Lighting Centre',
    category: 'E-Commerce & Next.js',
    year: '2024',
    outcome: 'Live Production',
    blurb:
      'Full-stack commerce experience with refined UI, responsive layouts, and conversion-focused flows.',
    image: '/izaj-hero.png',
    link: 'https://izaj-ecommerce.vercel.app/',
  },
  {
    title: 'RAPHÈLO',
    category: 'Luxury Fragrance & E-Commerce',
    year: '2026',
    outcome: 'Live Production',
    blurb:
      'Contemporary fragrance house shaped by atmosphere and memory, featuring quiet luxury aesthetics, editorial storytelling, and refined commerce flows.',
    image: '/raphelo.png',
    link: 'https://raphelo.vercel.app/',
  },
  {
    title: 'Sunset Plants',
    category: 'Botanical Nursery & E-Commerce',
    year: '2024',
    outcome: 'Live Production',
    blurb:
      'Premium Australian botanical nursery and landscaping brand featuring curated Queensland flora, feature trees, and modern storefront architecture.',
    image: '/sunset-plants.png',
    link: 'https://sunsetplants.com.au/',
  },
  {
    title: 'Antonioni Grounds',
    category: 'Specialty Coffee & Hospitality',
    year: '2026',
    outcome: 'Live Production',
    blurb:
      'Artisanal coffee house and digital booking experience featuring handcrafted brews, mobile Brew Buggy catering, and digital loyalty rewards.',
    image: '/antonioni-grounds.png',
    link: 'https://agshop.lat',
  },
  {
    title: 'Lash & Slay',
    category: 'Couture Beauty & Booking Platform',
    year: '2026',
    outcome: 'Live Production',
    blurb:
      'Couture lash salon and luxury membership platform featuring bespoke service menus, online appointment reservations, and interactive digital loyalty rewards.',
    image: '/lashnslay.png',
    link: 'https://lashnslay.vercel.app/',
  },
]

const headerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
}

const dossierVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.22, ease: EASE },
  },
}

const dossierChildVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: EASE } },
}

export default function Ventures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const carouselItems = useMemo<DepthCarouselItem[]>(
    () =>
      VENTURES.map((venture) => ({
        image: venture.image,
        alt: `${venture.title} — ${venture.category}`,
      })),
    []
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const activeVenture = VENTURES[activeIndex] ?? VENTURES[0]

  return (
    <section
      id="ventures"
      className="py-12 sm:py-24 lg:py-[var(--section)] w-full overflow-hidden"
    >
      {/* Header */}
      <motion.div
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="px-[var(--gutter)] max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 pb-1 sm:pb-4"
      >
        <div>
          <motion.div variants={headerItemVariants}>
            <Eyebrow>Selected Work</Eyebrow>
          </motion.div>
          <motion.h2
            variants={headerItemVariants}
            className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-4 sm:mt-6 text-[var(--foreground)]"
          >
            Products built with conviction.
          </motion.h2>
        </div>

        <motion.div
          variants={headerItemVariants}
          className="flex flex-row items-center justify-between md:flex-col md:items-end gap-2 md:gap-1.5 pt-1 md:pt-0 select-none"
        >
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[var(--muted)] font-medium tabular-nums">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="inline-block text-[var(--accent)] font-semibold"
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>{' '}
            / {String(VENTURES.length).padStart(2, '0')} Featured
            <span className="hidden sm:inline"> Projects</span>
          </div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[var(--muted)]/70">
            <span className="sm:hidden">Swipe to explore</span>
            <span className="hidden sm:inline">
              Drag, swipe, or select a card to explore
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 3D DepthCarousel Stage */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        className="mt-4 sm:mt-10 w-full max-w-[1920px] mx-auto h-[256px] min-[400px]:h-[276px] sm:h-[460px] lg:h-[520px] relative"
      >
        <DepthCarousel
          items={carouselItems}
          cardWidth={isMobile ? 420 : 640}
          cardHeight={isMobile ? 262 : 400}
          radius={isMobile ? 10 : 14}
          tint="#08080a"
          depth={isMobile ? 160 : 220}
          spread={isMobile ? 95 : 200}
          tilt={isMobile ? 18 : 20}
          tiltDirection="right"
          perspective={1400}
          visibleCards={isMobile ? 3 : 4}
          falloff={isMobile ? 0.14 : 0.2}
          blur={isMobile ? 2.5 : 5}
          autoplay
          autoplayDelay={4500}
          loop
          centerStack
          captureWheel="horizontal"
          onChange={(index) => setActiveIndex(index)}
        />
      </motion.div>

      {/* Active Project Dossier */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        className="px-[var(--gutter)] max-w-[1920px] mx-auto mt-3 sm:mt-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVenture.title}
            variants={dossierVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-[940px] mx-auto border-t border-[var(--line)] pt-4 sm:pt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8"
          >
            <div className="min-w-0">
              {/* Top Meta Bar */}
              <motion.div
                variants={dossierChildVariants}
                className="flex items-center justify-between sm:justify-start gap-2 text-[11px] leading-none uppercase tracking-[0.18em] select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold tabular-nums text-[var(--accent)]">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[var(--line-strong)]">/</span>
                  <span className="text-[var(--muted)]">{activeVenture.year}</span>
                  <span className="hidden sm:inline text-[var(--line-strong)]">
                    &middot;
                  </span>
                  <span className="hidden sm:inline text-[var(--muted)]">
                    {activeVenture.category}
                  </span>
                </div>

                <span className="hidden sm:inline text-[var(--line-strong)]">
                  &middot;
                </span>

                <span className="inline-flex items-center gap-1.5 text-[var(--accent)] font-medium">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[var(--accent)] sm:hidden"
                  />
                  <span>{activeVenture.outcome}</span>
                </span>
              </motion.div>

              <motion.h3
                variants={dossierChildVariants}
                className="font-sans text-[20px] sm:text-h3 font-semibold text-[var(--foreground)] mt-3 sm:mt-2.5 tracking-tight leading-snug"
              >
                {activeVenture.title}
              </motion.h3>

              <motion.div
                variants={dossierChildVariants}
                className="sm:hidden text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]/85 mt-1 select-none"
              >
                {activeVenture.category}
              </motion.div>

              <motion.p
                variants={dossierChildVariants}
                className="text-[14px] sm:text-body leading-[1.6] text-[var(--muted)] mt-2.5 sm:mt-2 max-w-[56ch]"
              >
                {activeVenture.blurb}
              </motion.p>
            </div>

            {activeVenture.link ? (
              <motion.a
                variants={dossierChildVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={activeVenture.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 w-fit inline-flex items-center gap-2 text-[11px] leading-none uppercase tracking-[0.2em] font-medium text-[var(--foreground)] hover:text-[var(--accent)] border border-[var(--line-strong)] hover:border-[var(--accent)] px-4 py-3 rounded-full transition-colors duration-300 select-none sm:mt-1"
              >
                <span>Visit Live Site</span>
                <span
                  aria-hidden="true"
                  className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  &#x2197;
                </span>
              </motion.a>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

