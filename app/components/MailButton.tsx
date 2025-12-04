'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="fixed bottom-0 right-0 z-50 p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Mail Icon Button */}
        <Link
          href="mailto:dimaandalrimvernon@gmail.com"
          className="w-14 h-14 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shadow-2xl hover:scale-110 transition-transform duration-300 group relative z-10"
        >
          <i className="fas fa-envelope text-3xl group-hover:rotate-12 transition-transform duration-300"></i>
        </Link>

        {/* Telegram Icon on Hover */}
        {isHovered && (
          <Link
            href="https://t.me/Beymaxxx11"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 z-20 group/telegram hover:scale-125 hover:shadow-[0_0_20px_rgba(0,136,204,0.6)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              animation: 'slideUpFade 0.4s ease-out 0.1s forwards',
              opacity: 0,
              transform: 'translateX(-50%) translateY(20px) scale(0.8)',
            }}
          >
            <i className="fab fa-telegram text-3xl group-hover/telegram:rotate-12 transition-transform duration-300"></i>
          </Link>
        )}
      </div>
    </div>
  )
}

