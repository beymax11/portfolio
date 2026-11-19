'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import Eyebrow from './Eyebrow'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CAPABILITIES = [
  {
    num: '01',
    title: 'Frontend & Interactive UI',
    description:
      'Responsive interfaces, scalable component systems, and fluid micro-interactions crafted with modern React architectures that feel fast, intuitive, and alive.',
    stack: 'Next.js · React · TypeScript · Tailwind CSS',
  },
  {
    num: '02',
    title: 'Full-Stack & E-Commerce',
    description:
      'Custom storefronts, booking platforms, and resilient backend APIs engineered for seamless checkouts, clean data modeling, and conversion-focused flows.',
    stack: 'Golang · Node.js · PostgreSQL · Supabase · Shopify',
  },
  {
    num: '03',
    title: 'Mobile & Cross-Platform Apps',
    description:
      'Native-feeling mobile and multi-platform applications built from a unified codebase, delivering smooth motion and reliable everyday performance.',
    stack: 'Flutter · Cross-Platform UI · Realtime APIs',
  },
  {
    num: '04',
    title: 'Performance & Technical Polish',
    description:
      'Core Web Vitals tuning, technical SEO, semantic accessibility, and production deployments optimized for sub-second loads and top Lighthouse scores.',
    stack: 'Web Vitals · Technical SEO · A11y · Vercel',
  },
]

const leftContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const leftItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
}

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

export default function Story() {
  return (
    <section
      id="capabilities"
      className="py-14 sm:py-24 lg:py-[var(--section)] px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Left Column (lg:col-span-6) */}
      <motion.div
        variants={leftContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="lg:col-span-6"
      >
        <motion.div variants={leftItemVariants}>
          <Eyebrow>What I Do</Eyebrow>
        </motion.div>

        <motion.h2
          variants={leftItemVariants}
          className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight max-w-[16ch] mt-4 sm:mt-6 text-[var(--foreground)]"
        >
          Full-stack craft from concept to launch.
        </motion.h2>

        <motion.p
          variants={leftItemVariants}
          className="text-lead text-[var(--muted)] max-w-[46ch] mt-5 sm:mt-8"
        >
          I partner with brands, startups, and teams to take digital products
          from system architecture to live production—combining tactile frontend
          interfaces, scalable backends, and conversion-focused execution.
        </motion.p>
      </motion.div>

      {/* Right Column (lg:col-span-6 lg:pt-2) */}
      <div className="lg:col-span-6 lg:pt-2">
        <motion.ol
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="list-none p-0 m-0"
        >
          {CAPABILITIES.map((item, idx) => (
            <motion.li
              key={item.num}
              variants={listItemVariants}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`group grid grid-cols-[auto_1fr] gap-4 sm:gap-6 py-6 sm:py-8 border-t border-[var(--line)] ${
                idx === CAPABILITIES.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Left: Number */}
              <span className="font-sans text-h3 font-semibold tabular-nums text-[var(--accent)] select-none">
                {item.num}
              </span>

              {/* Right: Title, Description & Stack */}
              <div>
                <h3 className="font-sans text-h3 font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--muted)] mt-3 max-w-[46ch]">
                  {item.description}
                </p>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-4 select-none">
                  {item.stack}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
