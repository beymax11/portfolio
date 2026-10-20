'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
  stop: () => void
  start: () => void
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
})

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const instance = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    })

    lenisRef.current = instance
    setLenis(instance)

    let animationFrameId: number

    function raf(time: number) {
      instance.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    // Smoothly intercept hash link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        if (href === '#' || href === '#top') {
          instance.scrollTo(0, { duration: 1.4 })
        } else {
          const el = document.querySelector(href)
          if (el) {
            instance.scrollTo(el as HTMLElement, { duration: 1.4, offset: -20 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('click', handleAnchorClick)
      instance.destroy()
    }
  }, [])

  const stop = () => {
    lenisRef.current?.stop()
  }

  const start = () => {
    lenisRef.current?.start()
  }

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    lenisRef.current?.scrollTo(target, options)
  }

  return (
    <LenisContext.Provider value={{ lenis, stop, start, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}
