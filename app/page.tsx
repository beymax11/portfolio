'use client'

import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Work from './components/Work'
import Contact from './components/Contact'
import WhatsAppButton from './components/MailButton'

export default function Home() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <main>
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-[-1] bg-grid pointer-events-none opacity-50"></div>

      <Navbar />
      <Hero />
      <TechStack />
      <Work />
      <Contact />
      <WhatsAppButton />
    </main>
  )
}

