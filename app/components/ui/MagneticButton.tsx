'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { type ReactNode, useRef } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  download?: string
  external?: boolean
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  download,
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const variants = {
    primary:
      'relative px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-foreground text-bg overflow-hidden group',
    secondary:
      'relative px-8 py-4 rounded-full font-semibold text-sm tracking-wide border border-white/10 text-foreground bg-white/[0.03] backdrop-blur-sm hover:border-accent/30 hover:bg-white/[0.06] transition-colors duration-500',
    ghost:
      'relative px-6 py-3 rounded-full font-medium text-sm text-muted hover:text-foreground transition-colors duration-300',
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block ${variants[variant]} ${className}`}
      data-cursor="pointer"
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 ${
          variant === 'primary' ? 'group-hover:text-white transition-colors duration-500' : ''
        }`}
      >
        {children}
      </span>
    </motion.div>
  )

  if (href) {
    return (
      <Link
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className="border-0 bg-transparent p-0">
      {content}
    </button>
  )
}
