'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { projects } from '../lib/data'
import Reveal, { StaggerContainer, StaggerItem } from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import MagneticButton from './ui/MagneticButton'

export default function Work() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="work" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 md:mb-28">
          <SectionHeading
            title={'Selected\nWork'}
            subtitle="Case studies merging logic with aesthetic — products built to matter."
          />
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" stagger={0.15}>
          {projects.map((project) => (
            <StaggerItem
              key={project.id}
              className={project.span === 'large' ? 'md:col-span-2' : ''}
            >
              <motion.article
                className="group relative"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl glass-card ${
                    project.span === 'large' ? 'aspect-[21/9] md:aspect-[2.4/1]' : 'aspect-[16/10]'
                  } ${project.isModal ? 'cursor-zoom-in' : ''}`}
                  onClick={() => project.isModal && setSelectedImage(project.image)}
                  data-cursor="pointer"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover"
                      sizes={project.span === 'large' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-10">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/10 text-foreground/90">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted/80">
                        0{project.id}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[11px] font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/[0.08] text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                    <div className="flex gap-3 pointer-events-auto">
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 py-2.5 rounded-full bg-foreground text-bg text-sm font-semibold hover:shadow-glow-sm transition-shadow duration-300"
                          data-cursor="pointer"
                        >
                          Live Preview
                        </Link>
                      )}
                      {project.isModal && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(project.image)
                          }}
                          className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-foreground hover:bg-white/20 transition-colors"
                          data-cursor="pointer"
                        >
                          View Full
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-start gap-4 px-1">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-muted text-sm md:text-base max-w-md leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                  {(project.link || project.isModal) && (
                    <Link
                      href={project.link || '#'}
                      target={project.link ? '_blank' : undefined}
                      rel={project.link ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (project.isModal) {
                          e.preventDefault()
                          setSelectedImage(project.image)
                        }
                      }}
                      className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:border-accent/40 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-500 group-hover:rotate-45"
                      data-cursor="pointer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
