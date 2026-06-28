'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import FloatingOrbs from './effects/FloatingOrbs'
import MagneticButton from './ui/MagneticButton'
import SocialIcon from './ui/SocialIcon'
import { socialLinks } from '../lib/data'

const easePremium = [0.16, 1, 0.3, 1] as const

const lineVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 2.1 + i * 0.12, duration: 0.9, ease: easePremium },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse hover 3D tilt & parallax effects
  const xVal = useMotionValue(0)
  const yVal = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const xSpring = useSpring(xVal, springConfig)
  const ySpring = useSpring(yVal, springConfig)

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15])

  const layer2X = useTransform(xSpring, [-0.5, 0.5], [-12, 12])
  const layer2Y = useTransform(ySpring, [-0.5, 0.5], [-12, 12])

  const layer3X = useTransform(xSpring, [-0.5, 0.5], [12, -12])
  const layer3Y = useTransform(ySpring, [-0.5, 0.5], [12, -12])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    xVal.set(mouseX / width)
    yVal.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    xVal.set(0)
    yVal.set(0)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24"
    >
      <FloatingOrbs />

      <motion.div className="container mx-auto px-6 max-w-7xl relative z-10" style={{ y, opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/80 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                Available for 2026
              </span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.p
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="text-sm md:text-base font-light text-muted tracking-wide uppercase mb-4"
              >
                Rim Vernon Dimaandal
              </motion.p>
            </div>

            <h1 className="font-display font-bold tracking-tighter leading-[0.92] mb-8">
              {['Crafting', 'Modern Digital', 'Experiences'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    custom={i + 1}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className={`block text-[clamp(2.5rem,8vw,5.5rem)] ${i === 1 ? 'text-gradient-accent' : 'text-foreground'
                      }`}
                  >
                    {line}
                    {i === 2 && '.'}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Front-end developer crafting{' '}
              <span className="text-foreground/90">clean, immersive interfaces</span> with precision
              and a passion for detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-12"
            >
              <MagneticButton href="#work" variant="primary">
                View Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <MagneticButton href="/Resume-Dimaandal.pdf" download="Resume-Dimaandal.pdf" variant="secondary">
                Download Resume
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-10"
            >
              {socialLinks.map((social) => (
                <SocialIcon key={social.href} {...social} />
              ))}
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative group cursor-none"
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Outer Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-accent/25 blur-3xl scale-110 animate-pulse-glow" />

              {/* Parallax Outer Tech Ring (Dashed, clockwise spin) */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-accent/20 pointer-events-none"
                style={{ x: layer2X, y: layer2Y }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />

              {/* Parallax Middle Tech Ring (Solid, counter-clockwise spin) */}
              <motion.div
                className="absolute -inset-5 rounded-full border border-white/[0.05] pointer-events-none"
                style={{ x: layer3X, y: layer3Y }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Parallax Outer HUD Brackets */}
              <motion.div
                className="absolute -inset-6 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{ x: layer3X, y: layer3Y }}
              >
                {/* Top-Left Bracket */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent/40 rounded-tl-lg group-hover:border-accent group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
                {/* Top-Right Bracket */}
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent/40 rounded-tr-lg group-hover:border-accent group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
                {/* Bottom-Left Bracket */}
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent/40 rounded-bl-lg group-hover:border-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                {/* Bottom-Right Bracket */}
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent/40 rounded-br-lg group-hover:border-accent group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </motion.div>

              {/* Tech Badges */}
              <motion.div
                className="absolute -top-2 -left-2 glass-card px-2.5 py-1 rounded-full border border-white/[0.08] shadow-lg flex items-center gap-1.5 z-20 pointer-events-none text-[9px] font-mono tracking-widest text-muted"
                style={{ x: layer3X, y: layer3Y }}
              >
                <span>v2026.06</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -right-2 glass-card px-3 py-1 rounded-full border border-white/[0.08] shadow-lg flex items-center gap-1.5 z-20 pointer-events-none text-[10px] font-mono tracking-widest text-accent"
                style={{ x: layer2X, y: layer2Y }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>DEV_MODE</span>
              </motion.div>

              {/* Main Image Frame (3D Tilting Card) */}
              <motion.div
                className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full p-[3px] bg-gradient-to-tr from-accent via-violet-500/50 to-emerald-400/30 shadow-premium overflow-hidden cursor-none"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative bg-black/40">
                  <Image
                    src="/river.JPG"
                    alt="Rim Vernon Dimaandal"
                    width={360}
                    height={360}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-white/[0.05] to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  
                  {/* Ambient gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
