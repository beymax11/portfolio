'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <h2 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter reveal">
          Let&apos;s make something<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Legendary.
          </span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16 reveal">
          <Link
            href="mailto:hello@alex.dev"
            className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-2xl shadow-primary/20"
          >
           Start a New Project
          </Link>
          <Link
            href="#"
            className="px-12 py-6 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-xl"
          >
            hello@rim.dev
          </Link>
        </div>

        <div className="mt-32 flex justify-center items-center border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-500">
          <div>© 2025 Rim Vernon D. All rights reserved.</div>
        </div>
      </div>
    </section>
  )
}

