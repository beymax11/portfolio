'use client'

const techStack = ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Python', 'React', 'Typescript']

export default function TechStack() {
  return (
    <section id="stack" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 dark:text-white">
            Tech<br />Stack<span className="text-primary">.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-sm mt-6 md:mt-0 text-right">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {techStack.map((tech, index) => (
            <div
              key={`tech-${index}`}
              className="group reveal cursor-default"
            >
              <div className="relative p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors text-center">
                  {tech}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

