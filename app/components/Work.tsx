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
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'IZAJ Store',
    category: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI/UX.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'E-Commerce Dashboard',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'MIRA AI',
    category: 'SaaS Dashboard',
    description: 'Intelligent asset management with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bbdaac4a284a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'AI Dashboard',
    offset: true,
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 3,
    title: 'Digital Portfolio',
    category: 'Visual Identity',
    description: 'High-end personal showcase for creative professionals.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Portfolio Design',
    color: 'from-orange-500 to-rose-500',
  },
  {
    id: 4,
    title: 'FitTrack Pro',
    category: 'Mobile Application',
    description: 'Next-gen health monitoring app with social features.',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bdd0639?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Health App',
    offset: true,
    color: 'from-emerald-500 to-teal-500',
  },
]

export default function Work() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8

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
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, card as HTMLDivElement))
          card.removeEventListener('mouseleave', () => handleMouseLeave(card as HTMLDivElement))
        }
      })
    }
  }, [])

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Decorative background blooms */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 reveal">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-8xl font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
              Selected<br />Experience<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg md:text-xl max-w-sm mt-8 md:mt-0 md:text-right font-medium">
            Merging logic with aesthetic to build products that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group reveal ${project.offset ? 'md:mt-32' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="relative w-full aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] transition-all duration-500 shadow-2xl shadow-black/5 dark:shadow-black/20 group-hover:shadow-primary/10 group-hover:border-primary/20"
              >
                {/* Image Parallax Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>

                {/* Floating Category Tag */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    {project.category}
                  </span>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </div>

              {/* Project Details */}
              <div className="mt-8 flex justify-between items-start px-2">
                <div className="flex-1 pr-8">
                   <div className="flex items-center gap-3 mb-3">
                     <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}></div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Project {project.id < 10 ? `0${project.id}` : project.id}</span>
                   </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>

                <Link
                  href="#"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-45"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-7 md:h-7"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-32 reveal">
          <Link
            href="#"
            className="group relative px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <span className="relative z-10">Archive & More Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  )
}

