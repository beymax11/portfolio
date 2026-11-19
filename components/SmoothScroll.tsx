'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
  stop: () => void
  start: () => void
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
}

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

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
  const isStoppedRef = useRef(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const instance = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: easeOutExpo,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoResize: true,
    })

    lenisRef.current = instance

    // Apply any pending stop() call that happened before Lenis mounted
    if (isStoppedRef.current) {
      instance.stop()
    }

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
        // Ensure scroll is unlocked if clicking from an overlay/menu
        isStoppedRef.current = false
        document.body.style.overflow = ''
        instance.start()

        if (href === '#' || href === '#top') {
          instance.scrollTo(0, {
            duration: prefersReducedMotion ? 0 : 1.2,
            easing: easeOutExpo,
            force: true,
          })
        } else {
          const el = document.querySelector(href)
          if (el) {
            instance.scrollTo(el as HTMLElement, {
              duration: prefersReducedMotion ? 0 : 1.2,
              easing: easeOutExpo,
              offset: -72,
              force: true,
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('click', handleAnchorClick)
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    isStoppedRef.current = true
    lenisRef.current?.stop()
  }, [])

  const start = useCallback(() => {
    isStoppedRef.current = false
    lenisRef.current?.start()
  }, [])

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: any) => {
      lenisRef.current?.scrollTo(target, options)
    },
    []
  )

  const contextValue = useMemo(
    () => ({ lenis, stop, start, scrollTo }),
    [lenis, stop, start, scrollTo]
  )

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}
