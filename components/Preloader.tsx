'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useLenis } from './SmoothScroll'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [labelsFading, setLabelsFading] = useState(false)
  const [wipingUp, setWipingUp] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const { stop, start, scrollTo } = useLenis()
  const onCompleteRef = useRef(onComplete)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (hasCompletedRef.current) return

    // 1. Stop scroll and lock at top
    window.scrollTo(0, 0)
    scrollTo(0, { immediate: true, force: true })
    stop()

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const duration = prefersReduced ? 400 : 2000
    const startTimestamp = performance.now()

    let animationFrameId: number
    let wipeTimeout: ReturnType<typeof setTimeout> | null = null
    let completeTimeout: ReturnType<typeof setTimeout> | null = null

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
        hasCompletedRef.current = true
        setCount(100)

        // 3. Fade labels out over ~300ms
        setLabelsFading(true)

        // 4. Wait 200ms delay, then wipe container upwards over 650ms
        wipeTimeout = setTimeout(() => {
          setWipingUp(true)
          // Unfreeze Lenis as the curtain begins lifting so scrolling is immediately responsive
          start()
          onCompleteRef.current?.()

          completeTimeout = setTimeout(() => {
            setIsVisible(false)
          }, 650)
        }, 500) // 300ms fade + 200ms pause
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (wipeTimeout) clearTimeout(wipeTimeout)
      if (completeTimeout) clearTimeout(completeTimeout)
    }
  }, [stop, start, scrollTo])

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
