'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from './ui/MagneticButton'
import SocialIcon from './ui/SocialIcon'
import Reveal from './ui/Reveal'
import { socialLinks } from '../lib/data'

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-16 md:pt-24 pb-32 md:pb-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-muted mb-8 font-medium">
            Let&apos;s collaborate
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,10vw,7rem)] font-bold tracking-tighter leading-[0.9] text-foreground mb-6">
            Let&apos;s make something
            <br />
            <span className="text-gradient-accent">legendary.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-muted text-lg max-w-md mx-auto mb-12 font-light">
            Ready to elevate your next project? Let&apos;s craft an experience worth remembering.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton href="mailto:dimaandalrim@gmail.com" variant="primary">
              Start a Project
            </MagneticButton>
            <MagneticButton href="mailto:dimaandalrimvernon@gmail.com" variant="secondary">
              dimaandalrim@gmail.com
            </MagneticButton>
          </div>
        </Reveal>

        <motion.div
          className="flex items-center justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((social) => (
            <SocialIcon key={social.href} {...social} />
          ))}
        </motion.div>

        <div className="mt-24 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <span>© 2026 Rim Vernon Dimaandal</span>
          <Link
            href="#home"
            className="hover:text-foreground transition-colors duration-300 link-underline"
            data-cursor="pointer"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
