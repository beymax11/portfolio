'use client'

import { useEffect, useRef, useState } from 'react'
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
  link?: string
  isModal?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ecommerce Platform',
    category: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI/UX.',
    image: 'izaj.png',
    alt: 'E-Commerce Dashboard',
    color: 'from-blue-600 to-cyan-500',
    link: 'https://izaj-ecommerce.vercel.app/',
  },
  {
    id: 2,
    title: 'Admin Panel',
    category: 'SaaS Dashboard',
    description: 'Intelligent asset management with real-time analytics.',
    image: 'desk.png',
    alt: 'AI Dashboard',
    offset: true,
    color: 'from-purple-600 to-pink-500',
    isModal: true,
  },
  {
    id: 3,
    title: 'AI Chatbox',
    category: 'AI Application',
    description: '  A full-stack AI application with modern UI/UX.',
    image: 'ai.png',
    alt: 'AI Chatbox',
    color: 'from-orange-500 to-rose-500',
    link: 'https://bugbounty-ai.netlify.app/',
  },
]

export default function Work() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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
              onClick={() => project.isModal && setSelectedImage(project.image)}
            >
              <div
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={`relative w-full aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] transition-all duration-500 shadow-2xl shadow-black/5 dark:shadow-black/20 group-hover:shadow-primary/10 group-hover:border-primary/20 ${project.isModal ? 'cursor-zoom-in' : ''}`}
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
                  {project.isModal ? (
                    <button
                      onClick={() => setSelectedImage(project.image)}
                      className="text-left w-full"
                    >
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
                        {project.title}
                      </h3>
                    </button>
                  ) : (
                    <Link
                      href={project.link || '#'}
                      target={project.link?.startsWith('http') ? '_blank' : undefined}
                      rel={project.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
                        {project.title}
                      </h3>
                    </Link>
                  )}
                  <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>

                {project.isModal ? (
                  <button
                    onClick={() => setSelectedImage(project.image)}
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
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={project.link || '#'}
                    target={project.link?.startsWith('http') ? '_blank' : undefined}
                    rel={project.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>
          <div className="relative max-w-7xl max-h-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md border border-white/10 hover:bg-black/80 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Project View"
              className="w-full h-auto object-contain max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}
