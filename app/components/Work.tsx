'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  alt: string
  offset?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'IZAJ',
    category: 'E-Commerce Website',
    description: 'UI/UX Design • Development',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Abstract UI',
  },
  {
    id: 2,
    title: 'IZAJ',
    category: 'Desktop Application',
    description: 'Dashboard • React App',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Tech UI',
    offset: true,
  },
  {
    id: 3,
    title: 'Rim Vernon Dimaandal',
    category: 'Portfolio Website',
    description: 'UI/UX Design • Development',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Architecture',
  },
  {
    id: 4,
    title: 'FitTrack Pro',
    category: 'Mobile App',
    description: 'Mobile Design • Flutter',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Mobile App',
    offset: true,
  },
]

export default function Work() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -5
      const rotateY = ((x - centerX) / centerX) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = (card: HTMLDivElement) => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, card))
        card.addEventListener('mouseleave', () => handleMouseLeave(card))
      }
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, card))
          card.removeEventListener('mouseleave', () => handleMouseLeave(card))
        }
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const parallaxImages = document.querySelectorAll<HTMLElement>('.parallax-img')
      parallaxImages.forEach((img) => {
        const speed = 0.05
        const rect = img.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible) {
          const yPos = (window.innerHeight - rect.top) * speed
          img.style.transform = `translateY(${yPos}px) scale(1.1)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="work" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 dark:text-white">
            Selected<br />Work<span className="text-primary">.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-sm mt-6 md:mt-0 text-right">
            A combination of business strategy, aesthetic design, and clean code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-32">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group reveal cursor-pointer ${project.offset ? 'md:mt-32' : ''}`}
            >
              <div
                ref={(el) => {
                  if (el) cardsRef.current[project.id - 1] = el
                }}
                className="project-card relative w-full aspect-[4/3] bg-slate-100 dark:bg-surface rounded-2xl overflow-hidden mb-8 transition-all duration-500 border border-transparent dark:border-white/10 hover:border-primary/50 shadow-2xl shadow-black/5 dark:shadow-black/50"
              >
                <div className="tilt-inner absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 parallax-img"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
                <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-black/80 backdrop-blur px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.category}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-lg">{project.description}</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                  <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-32 reveal">
          <Link
            href="#"
            className="inline-block px-8 py-4 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

