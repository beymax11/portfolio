'use client'

import { useEffect } from 'react'

/**
 * Rem-based adaptive grid scaling above 1920px
 * FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666
 */
export function useAdaptiveScaling() {
  useEffect(() => {
    const FONT_BASE = 16
    const BASE_W = 1920
    const COEF = 0.6666

    const handleResize = () => {
      const width = window.innerWidth
      if (width > BASE_W) {
        const scaledSize = FONT_BASE + (width - BASE_W) * (FONT_BASE / BASE_W) * COEF
        document.documentElement.style.fontSize = `${scaledSize}px`
      } else {
        document.documentElement.style.fontSize = ''
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
