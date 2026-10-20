'use client'

import React from 'react'

const MARQUEE_ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Golang',
  'PostgreSQL',
  'Supabase',
  'Tailwind CSS',
  'JavaScript',
  'Flutter',
  'Python',
  'Node.js',
  'HTML5 & CSS3',
]

export default function Marquee() {
  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {MARQUEE_ITEMS.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className="font-display text-h2 uppercase tracking-tight text-[var(--foreground)]">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-[var(--accent)] mx-8 inline-block align-middle shrink-0"
          />
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div
      aria-label="Tech Stack Ticker"
      className="relative w-full border-y border-[var(--line)] py-8 overflow-hidden select-none bg-[#08080a]"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {renderItemSet('set-1')}
        {renderItemSet('set-2')}
      </div>
    </div>
  )
}
