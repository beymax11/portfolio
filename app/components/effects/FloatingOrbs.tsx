'use client'

import { motion } from 'framer-motion'

const orbs = [
  { className: 'top-[20%] left-[8%] w-64 h-64 bg-accent/20', delay: 0 },
  { className: 'top-[60%] right-[12%] w-48 h-48 bg-violet-400/15', delay: 1 },
  { className: 'bottom-[15%] left-[25%] w-32 h-32 bg-accent/10', delay: 2 },
]

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}
