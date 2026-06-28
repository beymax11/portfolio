'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { projects } from '../lib/data'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import MagneticButton from './ui/MagneticButton'

const categories = ['All', 'E-Commerce', 'SaaS Dashboard', 'AI Application'] as const

export default function Work() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset index and scroll position when filter tab changes
  useEffect(() => {
    setActiveIndex(0)
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0
    }
  }, [activeCategory])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const children = container.children
    if (children.length > 0) {
      const cardWidth = children[0].clientWidth
      const itemWidth = cardWidth + 20 // cardWidth + gap (gap-5 is 20px)
      const newIndex = Math.round(scrollLeft / itemWidth)
      if (newIndex >= 0 && newIndex < filteredProjects.length && newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const children = container.children
    if (children.length > 0) {
      const cardWidth = children[0].clientWidth
      const itemWidth = cardWidth + 20 // cardWidth + gap
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="work" className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
          <SectionHeading
            title={'Selected\nWork'}
            subtitle="Case studies merging logic with aesthetic — products built to matter."
          />
        </div>

        {/* Filter Navigation */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-start gap-2.5 mb-12 md:mb-16 pb-2 border-b border-white/[0.04]">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-accent/10 border-accent/30 text-foreground shadow-glow-sm'
                    : 'bg-white/[0.01] border-white/[0.05] text-muted hover:border-white/10 hover:text-foreground'
                }`}
                data-cursor="pointer"
              >
                {category}
                {activeCategory === category && (
                  <motion.span
                    layoutId="activeFilterGlow"
                    className="absolute inset-0 rounded-full bg-accent/5 -z-10 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Works Grid (Desktop) */}
        <motion.div 
          layout 
          className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isLarge = project.span === 'large'
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={isLarge ? 'md:col-span-2' : ''}
                >
                  {isLarge ? (
                    /* Large Card Layout (Split grid on desktop) */
                    <article className="group relative glass-card rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 lg:p-8 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-glow flex flex-col justify-between">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                        {/* Left Column: Image */}
                        <div 
                          className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[1.5/1] xl:aspect-[1.7/1] w-full rounded-2xl overflow-hidden cursor-pointer"
                          onClick={() => project.isModal && setSelectedImage(project.image)}
                        >
                          <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Image
                              src={project.image}
                              alt={project.alt}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          </motion.div>
                          
                          {/* Shimmer and Overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />
                          <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-white/[0.05] to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        </div>

                        {/* Right Column: Text and links */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[300px]">
                          <div>
                            <div className="flex justify-between items-center mb-6">
                              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent">
                                {project.category}
                              </span>
                              <span className="text-[11px] font-mono text-muted/50">
                                // 0{project.id}
                              </span>
                            </div>

                            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                              {project.title}
                            </h3>

                            <p className="mt-4 text-muted text-sm md:text-base leading-relaxed font-light">
                              {project.description}
                            </p>
                          </div>

                          <div className="mt-8">
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-muted group-hover:text-foreground group-hover:border-white/[0.1] transition-all duration-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-white/[0.05]">
                              <div className="flex gap-4">
                                {project.link && (
                                  <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
                                    data-cursor="pointer"
                                  >
                                    Live Preview
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                  </Link>
                                )}
                                {project.isModal && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedImage(project.image)}
                                    className="text-xs font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
                                    data-cursor="pointer"
                                  >
                                    Zoom Image
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                                    </svg>
                                  </button>
                                )}
                              </div>

                              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:border-accent/40 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-500 group-hover:rotate-45">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ) : (
                    /* Default Card Layout (Vertical stack) */
                    <article className="group relative glass-card rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 lg:p-8 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-glow flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent">
                            {project.category}
                          </span>
                          <span className="text-[11px] font-mono text-muted/50">
                            // 0{project.id}
                          </span>
                        </div>

                        <div 
                          className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 cursor-pointer"
                          onClick={() => project.isModal && setSelectedImage(project.image)}
                        >
                          <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Image
                              src={project.image}
                              alt={project.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </motion.div>
                          
                          {/* Shimmer and Overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />
                          <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-white/[0.05] to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        </div>

                        <h3 className="font-display text-2xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-muted text-sm leading-relaxed font-light mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-muted group-hover:text-foreground group-hover:border-white/[0.1] transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/[0.05]">
                          <div className="flex gap-4">
                            {project.link && (
                              <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
                                data-cursor="pointer"
                              >
                                Live Preview
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </Link>
                            )}
                            {project.isModal && (
                              <button
                                type="button"
                                onClick={() => setSelectedImage(project.image)}
                                className="text-xs font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
                                data-cursor="pointer"
                              >
                                Zoom Image
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                                </svg>
                              </button>
                            )}
                          </div>

                          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:border-accent/40 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-500 group-hover:rotate-45">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Works Carousel (Mobile Only) */}
        <div className="block md:hidden">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 scrollbar-none px-4 -mx-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="snap-center shrink-0 first:ml-2 last:mr-2"
              >
                <article className="group relative glass-card rounded-[30px] border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] flex flex-col justify-between h-[420px] w-[82vw] sm:w-[320px] shrink-0 snap-center">
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted/50">
                        // 0{project.id}
                      </span>
                    </div>

                    {/* Image container */}
                    <div 
                      className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 cursor-pointer"
                      onClick={() => project.isModal && setSelectedImage(project.image)}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, 300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent opacity-60" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-muted text-xs leading-relaxed font-light line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/[0.05]">
                      <div className="flex gap-3">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-semibold tracking-wider uppercase text-foreground hover:text-accent flex items-center gap-1"
                            data-cursor="pointer"
                          >
                            Preview
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </Link>
                        )}
                        {project.isModal && (
                          <button
                            type="button"
                            onClick={() => setSelectedImage(project.image)}
                            className="text-[10px] font-semibold tracking-wider uppercase text-foreground hover:text-accent flex items-center gap-1"
                            data-cursor="pointer"
                          >
                            Zoom
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:border-accent/40 group-hover:text-accent transition-all duration-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {filteredProjects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'w-5 bg-accent' 
                      : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <Reveal className="flex justify-center mt-20">
          <MagneticButton href="https://github.com/beymax11" variant="secondary" external>
            View GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </MagneticButton>
        </Reveal>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-2xl" />
            <motion.div
              className="relative max-w-6xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-premium"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground hover:bg-white/20 transition-colors"
                onClick={() => setSelectedImage(null)}
                data-cursor="pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
              <img src={selectedImage} alt="Project preview" className="w-full h-auto max-h-[85vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
