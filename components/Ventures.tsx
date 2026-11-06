
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'
import DepthCarousel, { DepthCarouselItem } from './DepthCarousel'

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

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const activeVenture = VENTURES[activeIndex] ?? VENTURES[0]

  return (
    <section
      ref={sectionRef}
      id="ventures"
      className="py-12 sm:py-24 lg:py-[var(--section)] w-full overflow-hidden"
    >
      {/* Header */}
      <div
        className={`px-[var(--gutter)] max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 pb-1 sm:pb-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div>
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-4 sm:mt-6 text-[var(--foreground)]">
            Products built with conviction.
          </h2>
        </div>

        <div className="flex flex-row items-center justify-between md:flex-col md:items-end gap-2 md:gap-1.5 pt-1 md:pt-0 select-none">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[var(--muted)] font-medium tabular-nums">
            <span className="text-[var(--accent)] font-semibold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(VENTURES.length).padStart(2, '0')} Featured
            <span className="hidden sm:inline"> Projects</span>
          </div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[var(--muted)]/70">
            <span className="sm:hidden">Swipe to explore</span>
            <span className="hidden sm:inline">
              Drag, swipe, or select a card to explore
            </span>
          </div>
        </div>
      </div>

      {/* 3D DepthCarousel Stage */}
      <div
        style={{ transitionDelay: isVisible ? '140ms' : '0ms' }}
        className={`mt-4 sm:mt-10 w-full max-w-[1920px] mx-auto h-[256px] min-[400px]:h-[276px] sm:h-[460px] lg:h-[520px] relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
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
      </div>

      {/* Active Project Dossier */}
      <div
        style={{ transitionDelay: isVisible ? '260ms' : '0ms' }}
        className={`px-[var(--gutter)] max-w-[1920px] mx-auto mt-3 sm:mt-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div
          key={activeVenture.title}
          className="depth-carousel-dossier max-w-[940px] mx-auto border-t border-[var(--line)] pt-4 sm:pt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8"
        >
          <div className="min-w-0">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between sm:justify-start gap-2 text-[11px] leading-none uppercase tracking-[0.18em] select-none">
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
            </div>

            <h3 className="font-sans text-[20px] sm:text-h3 font-semibold text-[var(--foreground)] mt-3 sm:mt-2.5 tracking-tight leading-snug">
              {activeVenture.title}
            </h3>

            <div className="sm:hidden text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]/85 mt-1 select-none">
              {activeVenture.category}
            </div>

            <p className="text-[14px] sm:text-body leading-[1.6] text-[var(--muted)] mt-2.5 sm:mt-2 max-w-[56ch]">
              {activeVenture.blurb}
            </p>
          </div>

          {activeVenture.link ? (
            <a
              href={activeVenture.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-fit inline-flex items-center gap-2 text-[11px] leading-none uppercase tracking-[0.2em] font-medium text-[var(--foreground)] hover:text-[var(--accent)] border border-[var(--line-strong)] hover:border-[var(--accent)] px-4 py-3 rounded-full transition-all duration-300 select-none sm:mt-1"
            >
              <span>Visit Live Site</span>
              <span
                aria-hidden="true"
                className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                &#x2197;
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

