import React from 'react'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)] select-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-[var(--accent)] shrink-0"
      />
      <span>{children}</span>
    </div>
  )
}
