'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function MouseGlow() {
  const [visible, setVisible] = useState(false)
  const spring = { stiffness: 150, damping: 20 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.body.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.body.removeEventListener('mouseleave', handleLeave)
    }
  }, [x, y, visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] mix-blend-screen"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        opacity: visible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  )
}
