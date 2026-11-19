'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import Eyebrow from './Eyebrow'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/beymax11' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rimvernon' },
  { label: 'Instagram', href: 'https://instagram.com/rimvernonnn' },
  { label: 'Facebook', href: 'https://facebook.com/rmvrnn' },
]

const ctaContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
}

const bottomBarVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const bottomColVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

const socialListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const socialItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="pt-12 sm:pt-24 lg:pt-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto overflow-hidden bg-[#08080a]"
    >
      {/* Top CTA Area */}
      <motion.div
        variants={ctaContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={ctaItemVariants}>
          <Eyebrow>Let&apos;s Build</Eyebrow>
        </motion.div>

        <motion.h2
          variants={ctaItemVariants}
          className="font-display uppercase text-h1 sm:text-display leading-[0.95] tracking-tight max-w-[18ch] mt-4 sm:mt-6 text-[var(--foreground)]"
        >
          Let&apos;s make something legendary.
        </motion.h2>

        <motion.p
          variants={ctaItemVariants}
          className="text-lead text-[var(--muted)] max-w-[44ch] mt-5 sm:mt-8"
        >
          Ready to elevate your next product? Let&apos;s craft an experience worth remembering. I read and respond to every message.
        </motion.p>

        {/* Interactive Email Link & Resume */}
        <motion.div
          variants={ctaItemVariants}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
        >
          <motion.a
            href="mailto:dimaandalrimvernon@gmail.com"
            whileHover={{ x: 14 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group inline-flex items-baseline gap-4 font-sans text-h3 sm:text-h1 font-semibold tracking-tight transition-colors duration-300 hover:text-[var(--accent)] text-[var(--foreground)] select-none"
          >
            <span>dimaandalrimvernon@gmail.com</span>
            <span
              aria-hidden="true"
              className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 font-sans"
            >
              &#x2197;
            </span>
          </motion.a>

          <motion.a
            href="/Resume-Dimaandal.pdf"
            download="Resume-Dimaandal.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--line-strong)] hover:border-[var(--accent)] px-5 py-3 rounded-full transition-colors duration-300"
          >
            <span>Download Resume</span>
            <span aria-hidden="true" className="text-[var(--accent)]">&darr;</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        variants={bottomBarVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 sm:mt-24 lg:mt-[var(--section)] border-t border-[var(--line)] py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start"
      >
        {/* Left: Signature & Subtitle */}
        <motion.div variants={bottomColVariants} className="lg:col-span-6">
          <div className="font-display text-h2 uppercase leading-none text-[var(--foreground)] tracking-tight">
            Rim Vernon Dimaandal
          </div>
          <div className="text-body text-[var(--muted)] mt-2 text-sm">
            Software Developer · Web Developer
          </div>
        </motion.div>

        {/* Middle: Social Links with expanding accent dashes */}
        <motion.div variants={bottomColVariants} className="lg:col-span-3">
          <motion.ul
            variants={socialListVariants}
            className="flex flex-col gap-3.5"
          >
            {SOCIALS.map((social) => (
              <motion.li key={social.label} variants={socialItemVariants}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors w-fit"
                >
                  <span
                    aria-hidden="true"
                    className="w-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 group-hover:w-4 origin-left"
                  />
                  <span>{social.label}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: Copyright */}
        <motion.div
          variants={bottomColVariants}
          className="lg:col-span-3 lg:text-right text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
        >
          &copy; 2026 Rim Vernon Dimaandal. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  )
}
