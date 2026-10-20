'use client'

import React, { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'
import LiquidImage from './LiquidImage'

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
    blurb: 'Full-stack commerce experience with refined UI, responsive layouts, and conversion-focused flows.',
    image: '/izaj.png',
    link: 'https://izaj-ecommerce.vercel.app/',
  },
  {
    title: 'RAPHÈLO',
    category: 'Luxury Fragrance & E-Commerce',
    year: '2026',
    outcome: 'Live Production',
    blurb: 'Contemporary fragrance house shaped by atmosphere and memory, featuring quiet luxury aesthetics, editorial storytelling, and refined commerce flows.',
    image: '/raphelo.png',
    link: 'https://raphelo.vercel.app/',
  },
  {
    title: 'Sunset Plants',
    category: 'Botanical Nursery & E-Commerce',
    year: '2024',
    outcome: 'Live Production',
    blurb: 'Premium Australian botanical nursery and landscaping brand featuring curated Queensland flora, feature trees, and modern storefront architecture.',
    image: '/sunset-plants.png',
    link: 'https://sunsetplants.com.au/',
  },
  {
    title: 'Antonioni Grounds',
    category: 'Specialty Coffee & Hospitality',
    year: '2026',
    outcome: 'Live Production',
    blurb: 'Artisanal coffee house and digital booking experience featuring handcrafted brews, mobile Brew Buggy catering, and digital loyalty rewards.',
    image: '/antonioni-grounds.png',
    link: 'https://agshop.lat',
  },
]

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      id="ventures"
      className="py-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
        <div>
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-6 text-[var(--foreground)]">
            Products built with conviction.
          </h2>
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-[var(--muted)] font-medium select-none">
          04 / Featured Projects
        </div>
      </div>

      {/* Ventures Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-[var(--gutter)] gap-y-16">
        {VENTURES.map((venture, idx) => {
          const isOdd = idx % 2 === 1
          const CardContent = (
            <>
              {/* LiquidImage */}
              <div className="aspect-[16/11] w-full rounded-sm overflow-hidden bg-[var(--surface)]">
                <LiquidImage
                  src={venture.image}
                  alt={venture.title}
                  aspectRatio="16/11"
                  isBare={false}
                  className="w-full h-full"
                />
              </div>

              {/* Metadata Row */}
              <div className="mt-6 pt-5 border-t border-[var(--line)] flex justify-between gap-6 items-start">
                <div>
                  <h3 className="text-h3 font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-2">
                    <span>{venture.title}</span>
                    {venture.link && (
                      <span className="text-xs text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        &#x2197;
                      </span>
                    )}
                  </h3>
                  <p className="text-body text-[var(--muted)] mt-2 max-w-[42ch]">
                    {venture.blurb}
                  </p>
                </div>
                <div className="shrink-0 text-right select-none">
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {venture.year}
                  </div>
                  <div className="text-xs uppercase font-medium tracking-[0.18em] text-[var(--accent)] mt-2">
                    {venture.outcome}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="text-xs uppercase tracking-[0.22em] text-[var(--muted)] mt-3">
                {venture.category}
              </div>
            </>
          )

          return (
            <article
              key={venture.title}
              style={{
                transitionDelay: isVisible ? `${idx * 150}ms` : '0ms',
              }}
              className={`group ${isOdd ? 'md:mt-24' : ''
                } transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                }`}
            >
              {venture.link ? (
                <a
                  href={venture.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer focus:outline-none"
                >
                  {CardContent}
                </a>
              ) : (
                <div className="cursor-default">{CardContent}</div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
