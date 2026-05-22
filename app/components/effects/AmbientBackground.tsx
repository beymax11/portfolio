'use client'

import { motion } from 'framer-motion'

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)',
        }}
      />
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/5 blur-[140px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
