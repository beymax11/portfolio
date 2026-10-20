'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Eyebrow from './Eyebrow'

interface Voice {
  index: string
  name: string
  role: string
  quote: string
  image: string
}

const VOICES: Voice[] = [
  {
    index: '01',
    name: 'Mark Anthony Tan',
    role: 'Senior Product Designer',
    quote:
      'Rim has an incredible eye for frontend fidelity. He turns complex design systems into pixel-perfect, buttery smooth reality without breaking a sweat.',
    image: '/bey.jpg',
  },
  {
    index: '02',
    name: 'Joshua Reyes',
    role: 'Full Stack Tech Lead',
    quote:
      'Working with Rim on enterprise applications was a game changer. His speed, clean code habits, and problem-solving skills under tight deadlines are outstanding.',
    image: '/rim.jpg',
  },
  {
    index: '03',
    name: 'Angela Cruz',
    role: 'Product Manager, FinTech Solutions',
    quote:
      'A developer who genuinely cares about user experience, fluid motion, and performance. Reliable, communicative, and exceptionally dedicated to the product.',
    image: '/river.JPG',
  },
]

export default function Voices() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [quoteRevealed, setQuoteRevealed] = useState(false)

  const activeVoice = VOICES[activeIndex]

  useEffect(() => {
    setQuoteRevealed(false)
    const timer = setTimeout(() => setQuoteRevealed(true), 50)
    return () => clearTimeout(timer)
  }, [activeIndex])

  const words = activeVoice.quote.split(' ')

  return (
    <section
      id="voices"
      className="py-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Header */}
      <div>
        <Eyebrow>Collaborations</Eyebrow>
        <h2 className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-6 text-[var(--foreground)]">
          What they say.
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-[var(--gutter)] items-start">
        {/* Selector List (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col border-t border-[var(--line)]">
          {VOICES.map((voice, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={voice.index}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left py-8 border-b border-[var(--line)] transition-all flex items-center justify-between group focus:outline-none ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Index Number */}
                  <span
                    className={`font-sans text-h3 font-semibold tabular-nums select-none transition-colors duration-300 ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]'
                    }`}
                  >
                    {voice.index}
                  </span>

                  {/* Name & Role */}
                  <div>
                    <h3
                      className={`text-h3 font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]'
                      }`}
                    >
                      {voice.name}
                    </h3>
                    <p className="text-body text-[var(--muted)] mt-1.5 text-sm">
                      {voice.role}
                    </p>
                  </div>
                </div>

                {/* Trailing expanding 2.5rem accent rule */}
                <div
                  className={`w-10 h-[1.5px] bg-[var(--accent)] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  } origin-right shrink-0 ml-4`}
                />
              </button>
            )
          })}
        </div>

        {/* Active Testimonial Panel (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row gap-8 lg:gap-12 items-start bg-[var(--surface)] p-8 sm:p-12 rounded-sm border border-[var(--line)]">
          {/* Author Portrait */}
          <div className="relative aspect-[4/5] w-full sm:w-60 shrink-0 rounded-sm overflow-hidden bg-[var(--surface-2)]">
            <Image
              key={activeVoice.image}
              src={activeVoice.image}
              alt={activeVoice.name}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-cover object-center grayscale contrast-125 transition-all duration-700 ease-out"
            />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Quote Block with word-by-word reveal */}
          <div className="flex flex-col justify-between flex-1">
            <blockquote className="text-lead sm:text-[1.35rem] leading-[1.5] text-[var(--foreground)] font-normal">
              &ldquo;
              {words.map((word, wIdx) => (
                <span
                  key={`${activeIndex}-${wIdx}`}
                  className="inline-block overflow-hidden mr-[0.25em]"
                >
                  <span
                    style={{
                      transform: quoteRevealed ? 'translateY(0)' : 'translateY(115%)',
                      transitionDelay: `${wIdx * 28}ms`,
                    }}
                    className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {word}
                  </span>
                </span>
              ))}
              &rdquo;
            </blockquote>

            <div className="mt-8 pt-6 border-t border-[var(--line)]">
              <cite className="not-italic block font-semibold text-[var(--foreground)] text-base">
                {activeVoice.name}
              </cite>
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-1 block">
                {activeVoice.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
