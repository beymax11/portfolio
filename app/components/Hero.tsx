'use client'

import Link from 'next/link'

export default function Hero() {

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20 pb-32 overflow-hidden aurora-bg">
      {/* Abstract Shape (Desktop Only) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-32 w-1/3 h-full hidden lg:flex items-center justify-center z-0 pointer-events-none opacity-60">
        <div className="w-96 h-96 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] border border-slate-200 dark:border-white/10 rounded-full animate-spin-slow"></div>
        <div
          className="absolute w-[300px] h-[300px] border border-dashed border-slate-300 dark:border-white/20 rounded-full animate-spin-slow"
          style={{ animationDirection: 'reverse' }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-8 reveal shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Available for 2025
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter mb-8 text-slate-900 dark:text-white">
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
              className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0 reveal"
              style={{ transitionDelay: '0.4s' }}
            >
              Hi! I am Rim Vernon, a passionate Front-End Web Developer  with a strong eye for detail and a love for crafting clean, modern, and user-friendly interfaces. I specialize in turning ideas and wireframes into interactive, responsive, and visually appealing websites.
             
            </p>

            <div
              className="flex flex-col items-center justify-center lg:items-start gap-6 mt-12"
            >
              <Link
                href="#work"
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20"
              >
                <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors flex items-center gap-2">
                  Resume
                  <i className="fas fa-download"></i>
                </span>
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
              </Link>
              
              {/* Social Media Icons */}
              <ul className="social-icons flex items-center gap-4">
                <li data-tooltip="GitHub" style={{ '--bg': '#000000' } as React.CSSProperties}>
                  <Link
                    href="https://github.com"
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
                    href="https://facebook.com"
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
                    href="https://linkedin.com"
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
                    href="https://instagram.com"
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

