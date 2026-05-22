export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
] as const

export const socialLinks = [
  { href: 'https://github.com/beymax11', label: 'GitHub', icon: 'github' },
  { href: 'https://linkedin.com/in/rimvernon', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://instagram.com/rimvernonnn', label: 'Instagram', icon: 'instagram' },
  { href: 'https://facebook.com/rmvrnn', label: 'Facebook', icon: 'facebook' },
] as const

export interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  alt: string
  tags: string[]
  color: string
  link?: string
  github?: string
  isModal?: boolean
  featured?: boolean
  span?: 'default' | 'large'
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Ecommerce Platform',
    category: 'E-Commerce',
    description:
      'Full-stack commerce experience with refined UI, responsive layouts, and conversion-focused flows.',
    image: '/izaj.png',
    alt: 'E-Commerce Dashboard',
    tags: ['Next.js', 'React', 'Tailwind'],
    color: 'from-violet-600/30 to-blue-500/20',
    link: 'https://izaj-ecommerce.vercel.app/',
    featured: true,
    span: 'large',
  },
  {
    id: 2,
    title: 'Admin Panel',
    category: 'SaaS Dashboard',
    description:
      'Intelligent asset management dashboard with real-time analytics and premium data visualization.',
    image: '/desk.png',
    alt: 'AI Dashboard',
    tags: ['React', 'TypeScript', 'Charts'],
    color: 'from-purple-600/30 to-pink-500/20',
    isModal: true,
    span: 'default',
  },
  {
    id: 3,
    title: 'AI Chatbox',
    category: 'AI Application',
    description:
      'Conversational AI interface with fluid interactions and a polished, product-grade experience.',
    image: '/ai.png',
    alt: 'AI Chatbox',
    tags: ['AI', 'React', 'API'],
    color: 'from-orange-500/20 to-rose-500/20',
    link: 'https://bugbounty-ai.netlify.app/',
    span: 'default',
  },
]

export const techStack = [
  { name: 'HTML', color: 'from-orange-400/80 to-orange-600/60' },
  { name: 'CSS', color: 'from-blue-400/80 to-blue-600/60' },
  { name: 'JavaScript', color: 'from-yellow-400/80 to-amber-500/60' },
  { name: 'TypeScript', color: 'from-blue-500/80 to-cyan-500/60' },
  { name: 'React', color: 'from-cyan-400/80 to-blue-500/60' },
  { name: 'Next.js', color: 'from-slate-300/80 to-white/40' },
  { name: 'Flutter', color: 'from-sky-400/80 to-blue-600/60' },
  { name: 'Tailwind', color: 'from-teal-400/80 to-cyan-500/60' },
  { name: 'Python', color: 'from-blue-400/80 to-yellow-400/60' },
] as const
