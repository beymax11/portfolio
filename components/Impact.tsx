'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import Eyebrow from './Eyebrow'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope',
    description:
      'Aligning on business goals, user flows, technical architecture, and clear milestones before writing the first line of code.',
  },
  {
    step: '02',
    title: 'Interface & Motion',
    description:
      'Translating brand direction into responsive layouts, reusable UI components, and purposeful micro-interactions.',
  },
  {
    step: '03',
    title: 'Systems & Integration',
    description:
      'Engineering type-safe frontend views, clean API layers, and structured databases built for real-world scale.',
  },
  {
    step: '04',
    title: 'QA & Launch',
    description:
      'Cross-device testing, speed and SEO optimization, and seamless production deployment with zero guesswork.',
  },
]

const headerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
}

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
}

const stepCardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

export default function Impact() {
  return (
    <section
      id="process"
      className="py-12 sm:py-24 lg:py-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-2 sm:pb-4"
      >
        <div>
          <motion.div variants={headerItemVariants}>
            <Eyebrow>How I Work</Eyebrow>
          </motion.div>
          <motion.h2
            variants={headerItemVariants}
            className="font-display uppercase text-h2 sm:text-h1 leading-[0.95] tracking-tight mt-4 sm:mt-6 text-[var(--foreground)]"
          >
            A disciplined path to production.
          </motion.h2>
        </div>
        <motion.div
          variants={headerItemVariants}
          className="text-xs uppercase tracking-[0.22em] text-[var(--muted)] font-medium select-none"
        >
          04 / Workflow Phases
        </motion.div>
      </motion.div>

      {/* Process Grid */}
      <motion.ol
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="list-none p-0 m-0 mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]"
      >
        {PROCESS_STEPS.map((item, idx) => {
          let spacingClasses = ''
          if (idx === 0) {
            spacingClasses = 'sm:pr-8'
          } else if (idx === 1) {
            spacingClasses = 'sm:border-l sm:pl-8 lg:pr-8'
          } else if (idx === 2) {
            spacingClasses = 'sm:pr-8 lg:border-l lg:pl-8'
          } else if (idx === 3) {
            spacingClasses = 'sm:border-l sm:pl-8'
          }

          return (
            <motion.li
              key={item.step}
              variants={stepCardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`group py-7 sm:py-12 border-b border-[var(--line)] ${spacingClasses}`}
            >
              <span className="block font-display text-display leading-none tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] select-none">
                {item.step}
              </span>
              <h3 className="font-sans text-h3 font-semibold tracking-tight text-[var(--foreground)] mt-4 sm:mt-6">
                {item.title}
              </h3>
              <p className="text-body text-[var(--muted)] mt-3">
                {item.description}
              </p>
            </motion.li>
          )
        })}
      </motion.ol>
    </section>
  )
}
