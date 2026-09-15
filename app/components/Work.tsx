'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useCallback } from 'react'
import { projects } from '../lib/data'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import MagneticButton from './ui/MagneticButton'

export default function Work() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const children = container.children

    if (children.length > 0) {
      let closestIndex = 0
      let minDistance = Infinity

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const containerCenter = scrollLeft + container.offsetWidth / 2
        const distance = Math.abs(childCenter - containerCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      }

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex)
      }
    }
  }, [activeIndex])

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const children = container.children

    if (children[index]) {
      const child = children[index] as HTMLElement
      const targetScroll = child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  const handlePrev = () => {
    const nextIdx = activeIndex > 0 ? activeIndex - 1 : projects.length - 1
    scrollToIndex(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = activeIndex < projects.length - 1 ? activeIndex + 1 : 0
    scrollToIndex(nextIdx)
  }

  return (
    <section id="work" className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-14">
          <SectionHeading
            title={'Selected\nWork'}
            subtitle="Case studies merging logic with aesthetic — products built to matter."
          />

          {/* Controls: Counter + Arrow Navigation */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-xs font-mono text-muted tracking-widest px-3.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              <span className="text-accent font-semibold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="opacity-30 mx-1.5">/</span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] hover:bg-accent/10 hover:border-accent/40 text-foreground hover:text-accent transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous project"
              data-cursor="pointer"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] hover:bg-accent/10 hover:border-accent/40 text-foreground hover:text-accent transition-all duration-300 flex items-center justify-center group"
              aria-label="Next project"
              data-cursor="pointer"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-6 px-6">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-4 scrollbar-none scroll-smooth items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="snap-center shrink-0 w-[88vw] sm:w-[82vw] md:w-[720px] lg:w-[980px] xl:w-[1100px] first:ml-0 last:mr-0"
              >
                <article className="group relative glass-card rounded-[28px] md:rounded-[36px] border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-glow flex flex-col justify-between h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Image Column */}
                    <div
                      className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/[0.05]"
                      onClick={() => project.isModal && setSelectedImage(project.image)}
                    >
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 700px"
                          priority={idx === 0}
                        />
                      </motion.div>

                      {/* Shimmer and Overlay effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-white/[0.04] to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                          <span className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent font-medium">
                            {project.category}
                          </span>
                          <span className="text-xs font-mono text-muted/60">
                            // 0{project.id}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="mt-3 md:mt-4 text-muted text-sm sm:text-base leading-relaxed font-light">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 md:mt-8">
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-muted group-hover:text-foreground group-hover:border-white/[0.12] transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-5 border-t border-white/[0.06]">
                          <div className="flex items-center gap-4">
                            {project.link && (
                              <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
                                data-cursor="pointer"
                              >
                                Live Preview
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                  />
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
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>

                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:border-accent/40 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-500 group-hover:rotate-45">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center items-center gap-2.5 mt-8 md:mt-10">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-8 bg-accent shadow-glow-sm'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                data-cursor="pointer"
              />
            ))}
          </div>
        )}

        <Reveal className="flex justify-center mt-16 md:mt-20">
          <MagneticButton href="https://github.com/beymax11" variant="secondary" external>
            View GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </MagneticButton>
        </Reveal>
      </div>

      {/* Modal Image Zoom */}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
