'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const spring = { stiffness: 500, damping: 28, mass: 0.5 }
  const dotX = useSpring(0, spring)
  const dotY = useSpring(0, spring)
  const ringX = useSpring(0, { stiffness: 150, damping: 20 })
  const ringY = useSpring(0, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [data-cursor="pointer"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setHovering(true)
      }
    }

    const handleOut = () => setHovering(false)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [dotX, dotY, ringX, ringY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="custom-cursor cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent z-[10000] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="custom-cursor cursor-ring fixed top-0 left-0 rounded-full border border-accent/40 z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          backgroundColor: hovering ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </>
  )
}
