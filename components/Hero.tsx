'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LiquidImage from './LiquidImage'

const ROLES = ['Software', 'Developer', 'Application', 'Developer']
const LINE_1 = 'Rim Vernon'.split('')
const LINE_2 = 'Dimaandal'.split('')
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

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
      <div className="z-30 pt-24 sm:pt-32 px-[var(--gutter)] flex flex-col sm:flex-row items-start justify-between gap-5 sm:gap-8 w-full">
        {/* Left: Role Words */}
        <h2>
          {ROLES.map((role, idx) => (
            <span key={`${role}-${idx}`} className="block overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={animated ? { y: '0%' } : { y: '115%' }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.1 + 0.15,
                  ease: EASE,
                }}
                className="block font-display uppercase text-h3 sm:text-h2 leading-[1.05] tracking-tight text-[var(--foreground)]"
              >
                {role}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Right: Intro Bio */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: 0.75,
              delay: 0.4,
              ease: EASE,
            }}
            className="max-w-[26rem] text-body text-[var(--muted)] sm:text-right"
          >
            &ldquo;Full-stack developer crafting clean, immersive interfaces and scalable architectures with precision. Turning complex systems into fluid, living products.&rdquo;
          </motion.p>
        </div>
      </div>

      {/* Giant Surname (z-10 behind portrait) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[18vh] sm:bottom-0 translate-y-0 sm:translate-y-[4%] z-10 flex flex-col items-center font-display uppercase leading-[0.8] tracking-tight text-[var(--accent)] text-[7rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] select-none pointer-events-none"
      >
        {/* Line 1: RIM VERNON */}
        <div className="flex -translate-y-3 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-9">
          {LINE_1.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={animated ? { y: '0%' } : { y: '115%' }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.052 + 0.1,
                  ease: EASE,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Line 2: DIMAANDAL */}
        <div className="flex -mt-[0.06em]">
          {LINE_2.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={animated ? { y: '0%' } : { y: '115%' }}
                transition={{
                  duration: 0.75,
                  delay: 0.34 + i * 0.04,
                  ease: EASE,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>
      </div>

      {/* Transparent Portrait Cutout Layer (z-20 pointer-events-none) */}
      <div className="absolute bottom-[9vh] sm:bottom-0 left-1/2 -translate-x-1/2 h-[64vh] sm:h-[88vh] w-[94vw] sm:w-[58vw] lg:w-[44vw] max-w-[760px] z-20 pointer-events-none flex items-end justify-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{
            duration: 1.0,
            delay: 0.25,
            ease: EASE,
          }}
          className="w-full h-full relative flex items-end justify-center"
        >
          <LiquidImage
            src="/rivermaya-sunglasses-cutout.png"
            alt="Rim Vernon Dimaandal"
            isBare={true}
            priority={true}
            className="w-full h-full object-contain object-bottom pointer-events-auto filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </div>

      {/* Gradient Base (z-20) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[31vh] sm:h-[26vh] z-20 bg-[linear-gradient(to_bottom,transparent_0%,#08080a_66%,#08080a_100%)] sm:bg-gradient-to-b sm:from-transparent sm:to-[#08080a] pointer-events-none"
      />

      {/* Scroll Cue (z-30) */}
      <motion.a
        href="#capabilities"
        initial={{ opacity: 0, y: 16 }}
        animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: 0.7,
          delay: 0.65,
          ease: EASE,
        }}
        className="relative z-30 mb-6 sm:mb-8 ml-[var(--gutter)] w-fit flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors select-none"
      >
        <span
          aria-hidden="true"
          className="w-[1px] h-10 bg-[var(--accent)] animate-pulse"
        />
        <span>Scroll to enter</span>
      </motion.a>
    </section>
  )
}
