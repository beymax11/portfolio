'use client'

import React from 'react'
import Eyebrow from './Eyebrow'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/beymax11' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rimvernon' },
  { label: 'Instagram', href: 'https://instagram.com/rimvernonnn' },
  { label: 'Facebook', href: 'https://facebook.com/rmvrnn' },
]

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="pt-[var(--section)] px-[var(--gutter)] max-w-[1920px] mx-auto overflow-hidden bg-[#08080a]"
    >
      {/* Top CTA Area */}
      <div>
        <Eyebrow>Let&apos;s Build</Eyebrow>

        <h2 className="font-display uppercase text-h1 sm:text-display leading-[0.95] tracking-tight max-w-[18ch] mt-6 text-[var(--foreground)]">
          Let&apos;s make something legendary.
        </h2>

        <p className="text-lead text-[var(--muted)] max-w-[44ch] mt-8">
          Ready to elevate your next product? Let&apos;s craft an experience worth remembering. I read and respond to every message.
        </p>

        {/* Interactive Email Link & Resume */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="mailto:dimaandalrimvernon@gmail.com"
            className="group inline-flex items-baseline gap-4 font-sans text-h3 sm:text-h1 font-semibold tracking-tight transition-all duration-300 hover:translate-x-3.5 hover:text-[var(--accent)] text-[var(--foreground)] select-none"
          >
            <span>dimaandalrimvernon@gmail.com</span>
            <span
              aria-hidden="true"
              className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 font-sans"
            >
              &#x2197;
            </span>
          </a>

          <a
            href="/Resume-Dimaandal.pdf"
            download="Resume-Dimaandal.pdf"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--line-strong)] hover:border-[var(--accent)] px-5 py-3 rounded-full transition-all duration-300"
          >
            <span>Download Resume</span>
            <span aria-hidden="true" className="text-[var(--accent)]">&darr;</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-[var(--section)] border-t border-[var(--line)] py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Signature & Subtitle */}
        <div className="lg:col-span-6">
          <div className="font-display text-h2 uppercase leading-none text-[var(--foreground)] tracking-tight">
            Rim Vernon Dimaandal
          </div>
          <div className="text-body text-[var(--muted)] mt-2 text-sm">
            Software Developer · Web Developer
          </div>
        </div>

        {/* Middle: Social Links with expanding accent dashes */}
        <div className="lg:col-span-3">
          <ul className="flex flex-col gap-3.5">
            {SOCIALS.map((social) => (
              <li key={social.label}>
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
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Copyright */}
        <div className="lg:col-span-3 lg:text-right text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          &copy; 2026 Rim Vernon Dimaandal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
