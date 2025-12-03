'use client'

const techStack = ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Figma', 'Framer', 'WebGL']

export default function TechStack() {
  return (
    <section id="stack" className="py-12 mt-8 border-y border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-sm relative z-20">
      <div className="marquee-mask overflow-hidden whitespace-nowrap py-4">
        <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
          {techStack.map((tech, index) => (
            <span
              key={`tech-${index}`}
              className="mx-12 text-5xl font-display font-bold text-slate-300 dark:text-slate-800 select-none hover:text-primary transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {techStack.map((tech, index) => (
            <span
              key={`tech-duplicate-${index}`}
              className="mx-12 text-5xl font-display font-bold text-slate-300 dark:text-slate-800 select-none hover:text-primary transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

