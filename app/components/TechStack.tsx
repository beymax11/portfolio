'use client'

const techStack = [
  { 
    name: 'HTML', 
    color: 'from-orange-400 to-orange-600', 
    shadow: 'hover:shadow-orange-500/20',
    logo: <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg> 
  },
  { 
    name: 'CSS', 
    color: 'from-blue-400 to-blue-600', 
    shadow: 'hover:shadow-blue-500/20',
    logo: <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6"><path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg> 
  },
  { 
    name: 'JavaScript', 
    color: 'from-yellow-400 to-yellow-600', 
    shadow: 'hover:shadow-yellow-500/20',
    logo: <svg viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6"><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg> 
  },
  { 
    name: 'TypeScript', 
    color: 'from-blue-500 to-cyan-500', 
    shadow: 'hover:shadow-cyan-500/20',
    logo: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM13.25 10.74h2.959v1.201h-2.96v6.529h-1.65v-6.53H8.64v-1.2h4.61zm-4.664 2.324c.762.002 1.403.22 1.942.593v1.397c-.503-.434-1.076-.666-1.663-.666-.811 0-1.196.402-1.196.837 0 1.258 3.018 1.065 3.018 3.515 0 1.458-1.106 2.427-2.732 2.427-.853 0-1.666-.234-2.34-.69v-1.46c.613.568 1.373.837 2.122.837.94 0 1.353-.404 1.353-.87 0-1.393-3.051-1.111-3.051-3.566 0-1.42 1.108-2.35 2.547-2.35z"/></svg> 
  },
  { 
    name: 'React', 
    color: 'from-cyan-400 to-blue-500', 
    shadow: 'hover:shadow-cyan-500/20',
    logo: <svg viewBox="0 0 118 102.5" fill="none" className="w-6 h-6"><circle cx="59" cy="51.25" r="10.8" fill="currentColor"/><g stroke="currentColor" strokeWidth="4.4" fill="none"><ellipse rx="56" ry="21.5" cx="59" cy="51.25" /><ellipse rx="56" ry="21.5" cx="59" cy="51.25" transform="rotate(60 59 51.25)" /><ellipse rx="56" ry="21.5" cx="59" cy="51.25" transform="rotate(120 59 51.25)" /></g></svg> 
  },
  { 
    name: 'Next.js', 
    color: 'from-slate-600 to-slate-900 dark:from-slate-400 dark:to-white', 
    shadow: 'hover:shadow-slate-500/20',
    logo: <svg viewBox="0 0 180 180" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" clipRule="evenodd" d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90Zm34.321-72.378-45.744-60.992H64.95v76.84h11.417V62.46l40.364 53.82h-.002l14.07 18.761a58.423 58.423 0 0 0 11.236-12.871l-7.714-10.288ZM115.05 56.67h-11.417v55.514h11.417V56.67Z"/></svg> 
  },
  { 
    name: 'Tailwind CSS', 
    color: 'from-teal-400 to-cyan-500', 
    shadow: 'hover:shadow-teal-500/20',
    logo: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/></svg> 
  },
  { 
    name: 'Python', 
    color: 'from-blue-400 to-yellow-400', 
    shadow: 'hover:shadow-yellow-500/20',
    logo: <svg viewBox="0 0 118 118" fill="currentColor" className="w-6 h-6"><path d="M58.33 4.295c-26.658 0-25.542 11.554-25.542 11.554l.023 11.96H59.21v3.465H28.455S3.442 30.2 3.442 59.231c0 29.03 21.94 27.91 21.94 27.91h11.95v-16.79c0-12.91 10.74-23.86 23.65-23.86h24.83v-23.83s1.29-18.36-27.48-18.36zm-14.88 7.39a4.425 4.425 0 1 1-8.85 0 4.425 4.425 0 0 1 8.85 0zM89.702 30.73h-11.96v16.784c0 12.92-10.745 23.868-23.65 23.868H29.26V95.2s-1.282 18.381 27.482 18.381c26.657 0 25.541-11.563 25.541-11.563l-.023-11.956H58.64v-3.473h30.755s25.013 1.074 25.013-27.954c0-29.034-21.94-27.91-21.94-27.91zm-7.698 75.834a4.425 4.425 0 1 1 8.851 0 4.425 4.425 0 0 1-8.851 0z" /></svg> 
  },
]

export default function TechStack() {
  return (
    <section id="stack" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-700"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 reveal">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 dark:text-white">
            Tech<br />Stack<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-sm mt-6 md:mt-0 md:text-right">
            A curated list of technologies and tools I use to bring robust ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {techStack.map((tech, index) => (
            <div
              key={`tech-${index}`}
              className="group reveal"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`relative h-full p-5 md:p-8 rounded-3xl md:rounded-[2rem] bg-white/50 dark:bg-white/[0.02] backdrop-blur-lg border border-slate-200 dark:border-white/[0.08] transition-all duration-500 overflow-hidden ${tech.shadow} hover:-translate-y-1 md:hover:-translate-y-2 dark:hover:bg-white/[0.04] dark:hover:border-white/[0.12]`}>
                
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${tech.color}`}></div>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Large Background Text */}
                <div className="absolute -right-2 -bottom-4 text-5xl md:text-7xl font-display font-black text-slate-100 dark:text-white/[0.04] select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2">
                  {tech.name.substring(0, 2).toUpperCase()}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl mb-4 md:mb-6 p-0.5 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 group-hover:-rotate-[5deg] transition-transform duration-500`}>
                    <div className="w-full h-full bg-white dark:bg-[#0a0a0a] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                       <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500`}></div>
                       <div className="relative z-10 w-6 h-6 md:w-8 md:h-8 text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                         {tech.logo}
                       </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-2xl font-display font-bold text-slate-900 dark:text-white transition-all duration-300">
                    <span className={`bg-clip-text transition-colors duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r ${tech.color}`}>
                      {tech.name}
                    </span>
                  </h3>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

