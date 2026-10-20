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
    title: 'RAPHÈLO',
    category: 'Luxury Fragrance & E-Commerce',
    description:
      'Contemporary fragrance house shaped by atmosphere and memory, featuring quiet luxury aesthetics, editorial storytelling, and refined commerce flows.',
    image: '/raphelo.png',
    alt: 'RAPHÈLO Fragrance House',
    tags: ['Next.js', 'React', 'Tailwind', 'E-Commerce'],
    color: 'from-amber-600/30 to-stone-500/20',
    link: 'https://raphelo.vercel.app/',
    span: 'default',
  },
  {
    id: 3,
    title: 'Sunset Plants',
    category: 'Botanical E-Commerce',
    description:
      'Premium Australian botanical nursery and landscaping brand featuring curated Queensland flora, feature trees, and modern storefront architecture.',
    image: '/sunset-plants.png',
    alt: 'Sunset Plants Botanical Nursery',
    tags: ['Shopify', 'Liquid', 'E-Commerce'],
    color: 'from-emerald-600/30 to-amber-500/20',
    link: 'https://sunsetplants.com.au/',
    span: 'default',
  },
  {
    id: 4,
    title: 'Antonioni Grounds',
    category: 'Specialty Coffee & Hospitality',
    description:
      'Artisanal coffee house and digital booking experience featuring handcrafted brews, mobile Brew Buggy catering, and digital loyalty rewards.',
    image: '/antonioni-grounds.png',
    alt: 'Antonioni Grounds Artisanal Coffee',
    tags: ['Next.js', 'React', 'Tailwind', 'E-Commerce'],
    color: 'from-emerald-700/30 to-amber-600/20',
    link: 'https://agshop.lat',
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
