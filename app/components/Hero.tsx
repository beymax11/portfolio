'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [isResumeHovered, setIsResumeHovered] = useState(false)
  const resumeButtonRef = useRef<HTMLAnchorElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20 pb-32 overflow-hidden aurora-bg">
      {/* Abstract Shape (Desktop Only) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-32 w-1/3 h-full hidden lg:flex items-center justify-center z-0 pointer-events-none opacity-60">
        <div className="w-[550px] h-[550px] bg-gradient-to-tr from-primary to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[650px] h-[650px] border border-slate-200 dark:border-white/10 rounded-full animate-spin-slow"></div>
        <div
          className="absolute w-[500px] h-[500px] border border-dashed border-slate-300 dark:border-white/20 rounded-full animate-spin-slow"
          style={{ animationDirection: 'reverse' }}
        ></div>
      </div>

      {/* Image (Desktop Only) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-32 w-1/3 h-full hidden lg:flex items-center justify-center z-20">
        <div
          className="w-[400px] h-[400px] rounded-full overflow-hidden cursor-pointer relative"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isHovered ? '0 25px 50px -12px rgba(139, 92, 246, 0.5)' : 'none',
            transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out'
          }}
          onMouseEnter={() => {
            console.log('Mouse entered - isHovered:', isHovered)
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            console.log('Mouse left - isHovered:', isHovered)
            setIsHovered(false)
          }}
        >
          <Image
            src="/rim.jpg"
            alt="Rim Vernon Dimaandal"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-full"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease-out'
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left pt-16 lg:pt-24 relative">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-8 reveal shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Available for 2026
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8 text-slate-900 dark:text-white">
              <div className="overflow-hidden">
                <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  Rim{' '}
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600"
                    style={{ animationDelay: '0.2s' }}
                  >
                    Vernon
                  </span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="block animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  Dimaandal.
                </span>
              </div>
            </h1>

            <p
              className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0 reveal"
              style={{ transitionDelay: '0.4s' }}
            >
              Hi! I am Rim Vernon, a passionate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Front-end Developer
              </span>{' '}
              with a strong eye for detail and a love for crafting clean, modern, and user-friendly interfaces. I specialize in turning ideas and wireframes into interactive, responsive, and visually appealing websites.

            </p>

            <div
              className="flex flex-col items-center justify-center lg:items-start gap-6 mt-12"
            >
              <div
                className="relative inline-block"
                onMouseEnter={() => setIsResumeHovered(true)}
                onMouseLeave={() => setIsResumeHovered(false)}
              >
                {/* Invisible area above button to maintain hover */}
                {isResumeHovered && (
                  <div
                    className="absolute left-0 right-0 bottom-full mb-0 h-[540px] pointer-events-auto"
                    style={{ zIndex: 9998 }}
                  ></div>
                )}
                <a
                  ref={resumeButtonRef}
                  href="/resume.pdf"
                  download="resume.pdf"
                  className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 block z-10"
                >
                  <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors flex items-center gap-2">
                    Resume
                    <i className="fas fa-download"></i>
                  </span>
                  <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                </a>

                {/* Resume Preview on Hover - Directly Above Button */}
                {isResumeHovered && (
                  <div
                    ref={previewRef}
                    className="absolute left-0 bottom-full mb-4 w-[400px] h-[520px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ zIndex: 9999 }}
                    onMouseEnter={() => setIsResumeHovered(true)}
                    onMouseLeave={() => setIsResumeHovered(false)}
                  >
                    <div className="w-full h-full relative">
                      <object
                        data="/resume.pdf#view=FitH"
                        type="application/pdf"
                        className="w-full h-full"
                        aria-label="Resume Preview"
                      >
                        <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <p>Preview not available. Click to download.</p>
                        </div>
                      </object>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-slate-800 to-transparent h-12 pointer-events-none"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media Icons */}
              <ul className="social-icons flex items-center gap-4">
                <li data-tooltip="GitHub" style={{ '--bg': '#000000' } as React.CSSProperties}>
                  <Link
                    href="https://github.com/beymax11"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="social-link"
                  >
                    <i className="fab fa-github"></i>
                  </Link>
                </li>
                <li data-tooltip="Facebook" style={{ '--bg': '#1877f2' } as React.CSSProperties}>
                  <Link
                    href="https://facebook.com/rmvrnn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="social-link"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>
                <li data-tooltip="LinkedIn" style={{ '--bg': '#0077b5' } as React.CSSProperties}>
                  <Link
                    href="https://linkedin.com/in/rimvernon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="social-link"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </li>
                <li
                  data-tooltip="Instagram"
                  style={{
                    '--bg': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                  } as React.CSSProperties}
                >
                  <Link
                    href="https://instagram.com/rimvernonnn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-link"
                  >
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-sm tracking-widest uppercase animate-pulse hidden md:block">
        Scroll to explore
      </div>
    </section>
  )
}

