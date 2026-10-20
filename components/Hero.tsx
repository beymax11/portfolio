'use client'

import React, { useEffect, useState } from 'react'
import LiquidImage from './LiquidImage'

const ROLES = ['Software', 'Developer', 'Application', 'Developer']
const LINE_1 = 'Rim Vernon'.split('')
const LINE_2 = 'Dimaandal'.split('')

interface HeroProps {
  isReady?: boolean
}

export default function Hero({ isReady = false }: HeroProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isReady) {
      setAnimated(true)
    } else {
      const timer = setTimeout(() => setAnimated(true), 2800)
      return () => clearTimeout(timer)
    }
  }, [isReady])

  return (
    <section
      id="top"
      className="relative flex flex-col justify-between min-h-svh w-full overflow-hidden bg-[#08080a]"
    >
      {/* Top Row (z-30) */}
      <div className="z-30 pt-28 sm:pt-32 px-[var(--gutter)] flex flex-col sm:flex-row items-start justify-between gap-8 w-full">
        {/* Left: Role Words */}
        <h2>
          {ROLES.map((role, idx) => (
            <span key={role} className="block overflow-hidden">
              <span
                style={{
                  transform: animated ? 'translateY(0)' : 'translateY(115%)',
                  transitionDelay: `${idx * 100 + 150}ms`,
                }}
                className="block font-display uppercase text-h3 sm:text-h2 leading-[1.05] tracking-tight text-[var(--foreground)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {role}
              </span>
            </span>
          ))}
        </h2>

        {/* Right: Intro Bio */}
        <div className="overflow-hidden">
          <p
            style={{
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '400ms',
            }}
            className="max-w-[26rem] text-body text-[var(--muted)] sm:text-right transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            &ldquo;Front-end developer crafting clean, immersive interfaces with precision and a passion for detail. Turning complex systems into fluid, living products.&rdquo;
          </p>
        </div>
      </div>

      {/* Giant Surname (z-10 behind portrait) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 translate-y-[4%] z-10 flex flex-col items-center font-display uppercase leading-[0.8] tracking-tight text-[var(--accent)] text-[7rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] select-none pointer-events-none"
      >
        {/* Line 1: RIM */}
        <div className="flex -translate-y-3 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-9">
          {LINE_1.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                style={{
                  transform: animated ? 'translateY(0)' : 'translateY(115%)',
                  transitionDelay: `${i * 52 + 100}ms`,
                }}
                className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Line 2: DIMAANDAL */}
        <div className="flex -mt-[0.06em]">
          {LINE_2.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                style={{
                  transform: animated ? 'translateY(0)' : 'translateY(115%)',
                  transitionDelay: `${240 + i * 40 + 100}ms`,
                }}
                className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Transparent Portrait Cutout Layer (z-20 pointer-events-none) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[82vh] sm:h-[88vh] w-[90vw] sm:w-[58vw] lg:w-[44vw] max-w-[760px] z-20 pointer-events-none flex items-end justify-center">
        <div
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(36px)',
            transitionDelay: '250ms',
          }}
          className="w-full h-full relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-end justify-center"
        >
          <LiquidImage
            src="/rivermaya-sunglasses-cutout.png"
            alt="Rim Vernon Dimaandal"
            isBare={true}
            priority={true}
            className="w-full h-full object-contain object-bottom pointer-events-auto filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* Gradient Base (z-20) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[26vh] z-20 bg-gradient-to-b from-transparent to-[#08080a] pointer-events-none"
      />

      {/* Scroll Cue (z-30) */}
      <div className="relative z-30 mb-8 ml-[var(--gutter)] flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[var(--muted)] select-none">
        <span
          aria-hidden="true"
          className="w-[1px] h-10 bg-[var(--accent)] animate-pulse"
        />
        <span>Scroll to enter</span>
      </div>
    </section>
  )
}
