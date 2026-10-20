'use client'

import React, { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'

const PRINCIPLES = [
  {
    num: '01',
    title: "Move before it's obvious",
    description:
      'Innovation belongs to those who build ahead of trends. I adopt and master modern frameworks, design systems, and motion physics early.',
  },
  {
    num: '02',
    title: 'Code with architectural rigor',
    description:
      'Scalable systems demand clean state management, modular component hierarchies, and bulletproof type safety.',
  },
  {
    num: '03',
    title: 'Interaction is the product',
    description:
      'A digital experience isn\u2019t just how it looks; it\u2019s how it feels and moves. Fluid micro-animations and tactile feedback define premium software.',
  },
  {
    num: '04',
    title: 'Play the long game loudly',
    description:
      'Constant refinement and technical curiosity compound faster than talent alone. I build with dedication and curiosity every single day.',
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
      id="story"
      className="py-[var(--section)] px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Left Column (lg:col-span-6) */}
      <div
        className={`lg:col-span-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Eyebrow>The Story</Eyebrow>

        <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight max-w-[16ch] mt-6 text-[var(--foreground)]">
          Crafting modern digital experiences with conviction.
        </h2>

        <p className="text-lead text-[var(--muted)] max-w-[46ch] mt-8">
          From my first line of frontend code to architecting complex full-stack
          web applications, the through-line has always been obsessive attention to
          detail. I bridge engineering logic and visual aesthetics to build
          high-performance digital products that feel effortless and alive.
        </p>
      </div>

      {/* Right Column (lg:col-span-6 lg:pt-2) */}
      <div className="lg:col-span-6 lg:pt-2">
        <ol className="list-none p-0 m-0">
          {PRINCIPLES.map((principle, idx) => (
            <li
              key={principle.num}
              style={{
                transitionDelay: isVisible ? `${idx * 120 + 200}ms` : '0ms',
              }}
              className={`grid grid-cols-[auto_1fr] gap-6 py-8 border-t border-[var(--line)] ${
                idx === PRINCIPLES.length - 1 ? 'border-b' : ''
              } transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Left: Number */}
              <span className="font-sans text-h3 font-semibold tabular-nums text-[var(--accent)] select-none">
                {principle.num}
              </span>

              {/* Right: Title & Description */}
              <div>
                <h3 className="font-sans text-h3 font-semibold tracking-tight text-[var(--foreground)]">
                  {principle.title}
                </h3>
                <p className="text-body text-[var(--muted)] mt-3 max-w-[44ch]">
                  {principle.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
