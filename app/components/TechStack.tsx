'use client'

import { motion } from 'framer-motion'
import { techStack } from '../lib/data'
import SectionHeading from './ui/SectionHeading'
import { StaggerContainer, StaggerItem } from './ui/Reveal'

export default function TechStack() {
  return (
    <section id="stack" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16 md:mb-24">
          <SectionHeading
            title={'Tech\nStack'}
            subtitle="Technologies and tools I use to bring robust ideas to life."
          />
        </div>

        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          stagger={0.06}
        >
          {techStack.map((tech, index) => (
            <StaggerItem
              key={tech.name}
              className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <motion.div
                className={`glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 h-full flex flex-col justify-end relative overflow-hidden group ${
                  index === 0 ? 'min-h-[200px] md:min-h-[280px]' : 'min-h-[120px] md:min-h-[140px]'
                }`}
                whileHover={{ y: -4, borderColor: 'rgba(124, 58, 237, 0.25)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <span className="absolute top-4 right-4 text-4xl md:text-6xl font-display font-black text-white/[0.03] select-none">
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
                <h3
                  className={`relative z-10 font-display font-bold text-foreground group-hover:text-gradient-accent transition-all duration-500 ${
                    index === 0 ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'
                  }`}
                >
                  {tech.name}
                </h3>
                {index === 0 && (
                  <p className="relative z-10 mt-2 text-muted text-sm font-light max-w-xs">
                    Building with modern, battle-tested tools.
                  </p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
