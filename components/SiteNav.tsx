'use client'

import React, { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Process', href: '#process' },
  // { label: 'Voices', href: '#voices' },
  { label: 'Contact', href: '#contact' },
]

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll and listen for Escape when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className={`pointer-events-auto flex items-center justify-between py-6 px-[var(--gutter)] transition-all duration-300 ${isScrolled
          ? 'bg-[#08080a]/80 backdrop-blur-md border-b border-[var(--line)]'
          : 'bg-transparent'
          }`}
      >
        {/* Logo (Left) */}
        <a
          href="#top"
          className="flex items-center gap-3.5 group"
          aria-label="Rim Dimaandal Home"
        >
          <div className="size-10 rounded-full border border-[var(--line-strong)] grid place-items-center font-semibold text-sm text-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
            RD
          </div>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
            Rim Vernon Dimaandal
          </span>
        </a>

        {/* Desktop Links (>=md) */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link-underline text-xs uppercase font-medium tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (<md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden size-10 rounded-full border border-[var(--line-strong)] flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-colors hover:border-[var(--accent)]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-4 h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ease-out origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[3.75px]' : ''
              }`}
          />
          <span
            className={`w-4 h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ease-out origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Panel (<md) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden fixed inset-0 z-50 bg-[var(--background)] flex flex-col justify-between py-6 px-[var(--gutter)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none -translate-y-4'
          }`}
      >
        {/* Drawer Top Bar with Brand & Close Button */}
        <div className="flex items-center justify-between">
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3.5 group"
            aria-label="Rim Dimaandal Home"
          >
            <div className="size-10 rounded-full border border-[var(--line-strong)] grid place-items-center font-semibold text-sm text-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
              RD
            </div>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
              Rim Vernon Dimaandal
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="group h-10 px-4 rounded-full border border-[var(--line-strong)] hover:border-[var(--accent)] inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors focus:outline-none"
          >
            <span>Close</span>
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              aria-hidden="true"
              className="text-[var(--accent)] transition-transform duration-300 group-hover:rotate-90"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <ul className="flex flex-col gap-6 my-auto py-8">
          {NAV_LINKS.map((link, idx) => (
            <li
              key={link.href}
              style={{
                transitionDelay: mobileMenuOpen ? `${idx * 60 + 80}ms` : '0ms',
              }}
              className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
                }`}
            >
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-h2 uppercase leading-none text-[var(--foreground)] hover:text-[var(--accent)] transition-colors block"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-[var(--line)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Application Developer · Software Developer
          </p>
        </div>
      </div>
    </header>
  )
}
