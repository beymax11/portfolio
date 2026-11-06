'use client'

import React, { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope',
    description:
      'Aligning on business goals, user flows, technical architecture, and clear milestones before writing the first line of code.',
  },
  {
    step: '02',
    title: 'Interface & Motion',
    description:
      'Translating brand direction into responsive layouts, reusable UI components, and purposeful micro-interactions.',
  },
  {
    step: '03',
    title: 'Systems & Integration',
    description:
      'Engineering type-safe frontend views, clean API layers, and structured databases built for real-world scale.',
  },
  {
    step: '04',
    title: 'QA & Launch',
    description:
      'Cross-device testing, speed and SEO optimization, and seamless production deployment with zero guesswork.',
  },
]

export default function Impact() {
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
      id="process"
      className="py-12 sm:py-24 lg:py-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-2 sm:pb-4">
        <div>
          <Eyebrow>How I Work</Eyebrow>
          <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-4 sm:mt-6 text-[var(--foreground)]">
            A disciplined path to production.
          </h2>
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-[var(--muted)] font-medium select-none">
          04 / Workflow Phases
        </div>
      </div>

      {/* Process Grid */}
      <ol className="list-none p-0 m-0 mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]">
        {PROCESS_STEPS.map((item, idx) => {
          let spacingClasses = ''
          if (idx === 0) {
            spacingClasses = 'sm:pr-8'
          } else if (idx === 1) {
            spacingClasses = 'sm:border-l sm:pl-8 lg:pr-8'
          } else if (idx === 2) {
            spacingClasses = 'sm:pr-8 lg:border-l lg:pl-8'
          } else if (idx === 3) {
            spacingClasses = 'sm:border-l sm:pl-8'
          }

          return (
            <li
              key={item.step}
              style={{
                transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
              }}
              className={`group py-7 sm:py-12 border-b border-[var(--line)] ${spacingClasses} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block font-display text-display leading-none tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] select-none">
                {item.step}
              </span>
              <h3 className="font-sans text-h3 font-semibold tracking-tight text-[var(--foreground)] mt-4 sm:mt-6">
                {item.title}
              </h3>
              <p className="text-body text-[var(--muted)] mt-3">
                {item.description}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
