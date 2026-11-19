'use client'

import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useLenis } from './SmoothScroll'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Process', href: '#process' },
  // { label: 'Voices', href: '#voices' },
  { label: 'Contact', href: '#contact' },
]

const drawerListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const drawerItemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

interface SiteNavProps {
  isReady?: boolean
}

export default function SiteNav({ isReady = false }: SiteNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [animated, setAnimated] = useState(false)
  const { stop, start } = useLenis()
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (isReady) {
      setAnimated(true)
    } else {
      const timer = setTimeout(() => setAnimated(true), 2800)
      return () => clearTimeout(timer)
    }
  }, [isReady])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll and listen for Escape when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      wasOpenRef.current = true
      document.body.style.overflow = 'hidden'
      stop()
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      if (wasOpenRef.current) {
        wasOpenRef.current = false
        start()
      }
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen, stop, start])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <motion.nav
        aria-label="Primary navigation"
        initial={{ opacity: 0, y: -16 }}
        animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        className={`pointer-events-auto flex items-center justify-between py-6 px-[var(--gutter)] transition-colors duration-300 ${
          isScrolled
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
          {NAV_LINKS.map((link, idx) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{
                duration: 0.55,
                delay: 0.18 + idx * 0.07,
                ease: EASE,
              }}
            >
              <a
                href={link.href}
                className="nav-link-underline text-xs uppercase font-medium tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            </motion.li>
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
            className={`w-4 h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ease-out origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[3.75px]' : ''
            }`}
          />
          <span
            className={`w-4 h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ease-out origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
            }`}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Panel (<md) */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden fixed inset-0 z-50 bg-[var(--background)] flex flex-col justify-between py-6 px-[var(--gutter)] pointer-events-auto"
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
            <motion.ul
              variants={drawerListVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 my-auto py-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={drawerItemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-h2 uppercase leading-none text-[var(--foreground)] hover:text-[var(--accent)] transition-colors block"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Drawer Footer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
              className="pt-6 border-t border-[var(--line)]"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Application Developer · Software Developer
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
