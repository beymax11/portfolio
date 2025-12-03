'use client'

import Link from 'next/link'

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-whatsapp rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform duration-300 whatsapp-glow group"
    >
      <i className="fab fa-whatsapp text-4xl group-hover:rotate-12 transition-transform duration-300"></i>
    </Link>
  )
}

