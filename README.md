# Portfolio - Next.js TypeScript

A modern portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 🌙 Dark mode support
- ✨ Smooth animations and transitions
- 📱 Mobile-friendly navigation
- 🎯 Scroll reveal animations
- 🎭 3D card tilt effects
- 📸 Parallax image effects

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/
│   ├── components/      # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TechStack.tsx
│   │   ├── Work.tsx
│   │   ├── Contact.tsx
│   │   └── WhatsAppButton.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useTheme.ts
│   │   └── useScrollReveal.ts
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icons
- **Google Fonts** - Plus Jakarta Sans & Space Grotesk

## Customization

### Colors

Edit the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: '#3b82f6',
  dark: '#050505',
  // ... other colors
}
```

### Content

Update project information in:
- `app/components/Work.tsx` - Project portfolio items
- `app/components/Contact.tsx` - Contact information
- `app/components/Hero.tsx` - Hero section content

## Build for Production

```bash
npm run build
npm start
```

## License

© 2025 Alex P. All rights reserved.

