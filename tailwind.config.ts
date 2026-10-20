import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
      },
      fontSize: {
        display: ['clamp(5.5rem, 11vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.75rem, 5.5vw, 5.25rem)', { lineHeight: '0.94', letterSpacing: '-0.025em' }],
        h2: ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.25rem, 1.8vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.125rem, 1.4vw, 1.375rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        body: ['clamp(0.9375rem, 1.05vw, 1.0625rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.22em' }],
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        preloader: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
export default config
