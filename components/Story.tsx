'use client'

import React, { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'

const CAPABILITIES = [
  {
    num: '01',
    title: 'Frontend & Interactive UI',
    description:
      'Responsive interfaces, scalable component systems, and fluid micro-interactions crafted with modern React architectures that feel fast, intuitive, and alive.',
    stack: 'Next.js · React · TypeScript · Tailwind CSS',
  },
  {
    num: '02',
    title: 'Full-Stack & E-Commerce',
    description:
      'Custom storefronts, booking platforms, and resilient backend APIs engineered for seamless checkouts, clean data modeling, and conversion-focused flows.',
    stack: 'Golang · Node.js · PostgreSQL · Supabase · Shopify',
  },
  {
    num: '03',
    title: 'Mobile & Cross-Platform Apps',
    description:
      'Native-feeling mobile and multi-platform applications built from a unified codebase, delivering smooth motion and reliable everyday performance.',
    stack: 'Flutter · Cross-Platform UI · Realtime APIs',
  },
  {
    num: '04',
    title: 'Performance & Technical Polish',
    description:
      'Core Web Vitals tuning, technical SEO, semantic accessibility, and production deployments optimized for sub-second loads and top Lighthouse scores.',
    stack: 'Web Vitals · Technical SEO · A11y · Vercel',
  },
]

export default function Story() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-14 sm:py-24 lg:py-[var(--section)] px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Left Column (lg:col-span-6) */}
      <div
        className={`lg:col-span-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Eyebrow>What I Do</Eyebrow>

        <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight max-w-[16ch] mt-4 sm:mt-6 text-[var(--foreground)]">
          Full-stack craft from concept to launch.
        </h2>

        <p className="text-lead text-[var(--muted)] max-w-[46ch] mt-5 sm:mt-8">
          I partner with brands, startups, and teams to take digital products
          from system architecture to live production—combining tactile frontend
          interfaces, scalable backends, and conversion-focused execution.
        </p>
      </div>

      {/* Right Column (lg:col-span-6 lg:pt-2) */}
      <div className="lg:col-span-6 lg:pt-2">
        <ol className="list-none p-0 m-0">
          {CAPABILITIES.map((item, idx) => (
            <li
              key={item.num}
              style={{
                transitionDelay: isVisible ? `${idx * 120 + 200}ms` : '0ms',
              }}
              className={`group grid grid-cols-[auto_1fr] gap-4 sm:gap-6 py-6 sm:py-8 border-t border-[var(--line)] ${
                idx === CAPABILITIES.length - 1 ? 'border-b' : ''
              } transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Left: Number */}
              <span className="font-sans text-h3 font-semibold tabular-nums text-[var(--accent)] select-none">
                {item.num}
              </span>

              {/* Right: Title, Description & Stack */}
              <div>
                <h3 className="font-sans text-h3 font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--muted)] mt-3 max-w-[46ch]">
                  {item.description}
                </p>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-4 select-none">
                  {item.stack}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
