'use client'

import Reveal from './Reveal'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'default' | 'large'
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  size = 'default',
}: SectionHeadingProps) {
  const titleSize = size === 'large' ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-6xl lg:text-7xl'

  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <div className={`max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
        <h2
          className={`font-display font-bold tracking-tighter text-foreground leading-[0.95] ${titleSize}`}
        >
          {title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line.includes('.') ? (
                <>
                  {line.replace('.', '')}
                  <span className="text-gradient-accent">.</span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>
        {subtitle && (
          <p className="mt-6 text-muted text-base md:text-lg max-w-md leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
