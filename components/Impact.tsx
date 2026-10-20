'use client'

import React, { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'

const METRICS = [
  { figure: '4+', label: 'Years building modern web applications' },
  { figure: '15+', label: 'Production projects & platforms delivered' },
  { figure: '99%', label: 'Lighthouse performance & accessibility' },
  { figure: '100%', label: 'Commitment to craft & code quality' },
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
      id="impact"
      className="py-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Header */}
      <div>
        <Eyebrow>By The Numbers</Eyebrow>
        <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-6 text-[var(--foreground)]">
          Engineering in metrics.
        </h2>
      </div>

      {/* Metrics dl */}
      <dl className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]">
        {METRICS.map((metric, idx) => {
          let borderClasses = ''
          if (idx === 1 || idx === 3) {
            borderClasses = 'sm:border-l sm:pl-8 lg:border-l lg:pl-8'
          } else if (idx === 2) {
            borderClasses = 'lg:border-l lg:pl-8'
          }

          return (
            <div
              key={metric.label}
              style={{
                transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
              }}
              className={`py-12 border-b border-[var(--line)] ${borderClasses} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <dd className="font-display text-display leading-none tracking-tight text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent)] cursor-default">
                {metric.figure}
              </dd>
              <dt className="text-body uppercase tracking-[0.14em] text-[var(--muted)] max-w-[20ch] mt-4">
                {metric.label}
              </dt>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
