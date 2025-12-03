'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import Link from 'next/link'

export default function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="glass-nav rounded-full px-8 py-4 flex items-center gap-10 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300">
          <Link href="#" className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            rimvernon<span className="text-primary">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#home" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#work" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
              Work
            </Link>
            <Link href="#stack" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
              Stack
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
              </button>
            )}
            <Link
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xs tracking-wide hover:scale-105 transition-transform"
            >
              HIRE ME
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden text-slate-900 dark:text-white"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex items-center justify-center transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-display font-bold">
          <Link href="#home" onClick={closeMenu} className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#work" onClick={closeMenu} className="hover:text-primary transition-colors">
            Work
          </Link>
          <Link href="#stack" onClick={closeMenu} className="hover:text-primary transition-colors">
            Tech Stack
          </Link>
          <Link href="#contact" onClick={closeMenu} className="hover:text-primary transition-colors">
            Contact
          </Link>
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 text-slate-500 hover:text-black dark:hover:text-white"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    </>
  )
}

