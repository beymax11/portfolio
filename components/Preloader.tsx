'use client'

import React, { useEffect, useState } from 'react'
import { useLenis } from './SmoothScroll'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [labelsFading, setLabelsFading] = useState(false)
  const [wipingUp, setWipingUp] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const { stop, start } = useLenis()

  useEffect(() => {
    // 1. Stop scroll and lock at top
    stop()
    window.scrollTo(0, 0)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReduced ? 400 : 2000
    const startTimestamp = performance.now()

    let animationFrameId: number

    const step = (now: number) => {
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)

      // Slight easeOutQuad for snappy finish
      const eased = 1 - (1 - progress) * (1 - progress)
      const currentVal = Math.floor(eased * 100)
      setCount(currentVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(100)

        // 3. Fade labels out over ~300ms
        setLabelsFading(true)

        // 4. Wait 200ms delay, then wipe container upwards over 650ms
        const wipeTimeout = setTimeout(() => {
          setWipingUp(true)

          const completeTimeout = setTimeout(() => {
            // 5. Unfreeze Lenis, trigger hero entrance, remove preloader
            start()
            onComplete?.()
            setIsVisible(false)
          }, 650)

          return () => clearTimeout(completeTimeout)
        }, 500) // 300ms fade + 200ms pause

        return () => clearTimeout(wipeTimeout)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [stop, start, onComplete])

  if (!isVisible) return null

  return (
    <aside
      aria-label="Site preloader"
      className={`fixed inset-0 z-[100] bg-[var(--background)] flex flex-col justify-end p-[var(--gutter)] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        wipingUp ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      <div
        className={`w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 transition-opacity duration-300 ease-out ${
          labelsFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Left: Monogram / Name */}
        <div className="font-display text-h3 uppercase leading-none tracking-tight text-[var(--foreground)]">
          Rim Vernon Dimaandal
        </div>

        {/* Right: Tabular Counter */}
        <div className="font-display text-display leading-none text-[var(--foreground)] tabular-nums flex items-baseline">
          <span>{String(count).padStart(2, '0')}</span>
          <span className="text-[var(--accent)] ml-1">%</span>
        </div>
      </div>
    </aside>
  )
}
