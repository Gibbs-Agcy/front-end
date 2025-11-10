'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { IconCloud } from '../magicui/icon-cloud'
import { Terminal } from '../magicui/terminal'
import { ScrollReveal } from '../animations/scroll-reveal'
import {
  Code2,
  Palette,
  Cloud,
  Database,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Technology icons (using SimpleIcons CDN - more reliable)
const techIcons = {
  design: [
    'https://cdn.simpleicons.org/figma/F24E1E',
    'https://cdn.simpleicons.org/adobephotoshop/31A8FF',
    'https://cdn.simpleicons.org/adobeillustrator/FF9A00',
    'https://cdn.simpleicons.org/adobeaftereffects/9999FF',
    'https://cdn.simpleicons.org/sketch/F7B500',
    'https://cdn.simpleicons.org/canva/00C4CC',
    'https://cdn.simpleicons.org/blender/F5792A',
  ],
  frontend: [
    'https://cdn.simpleicons.org/react/61DAFB',
    'https://cdn.simpleicons.org/nextdotjs/000000',
    'https://cdn.simpleicons.org/typescript/3178C6',
    'https://cdn.simpleicons.org/javascript/F7DF1E',
    'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    'https://cdn.simpleicons.org/html5/E34F26',
    'https://cdn.simpleicons.org/css3/1572B6',
  ],
  backend: [
    'https://cdn.simpleicons.org/nodedotjs/339933',
    'https://cdn.simpleicons.org/python/3776AB',
    'https://cdn.simpleicons.org/express/000000',
    'https://cdn.simpleicons.org/postgresql/4169E1',
    'https://cdn.simpleicons.org/mongodb/47A248',
    'https://cdn.simpleicons.org/redis/DC382D',
    'https://cdn.simpleicons.org/graphql/E10098',
  ],
  devops: [
    'https://cdn.simpleicons.org/amazonwebservices/FF9900',
    'https://cdn.simpleicons.org/googlecloud/4285F4',
    'https://cdn.simpleicons.org/docker/2496ED',
    'https://cdn.simpleicons.org/kubernetes/326CE5',
    'https://cdn.simpleicons.org/git/F05032',
    'https://cdn.simpleicons.org/github/181717',
  ],
}

// Combine all icons
const allIcons = [
  ...techIcons.design,
  ...techIcons.frontend,
  ...techIcons.backend,
  ...techIcons.devops,
]

// Terminal commands simulation
const terminalCommands = [
  '$ gibbs init --project="awesome-website"',
  '> Initializing Gibbs creative workspace...',
  '> Loading design systems... ✓',
  '> Setting up development environment... ✓',
  '',
  '$ gibbs design --style="modern minimalist"',
  '> Generating UI mockups...',
  '> ✨ Created 12 design variations',
  '> 🎨 Applied brand guidelines',
  '> 📱 Optimized for responsive design',
  '',
  '$ gibbs develop --framework="next.js"',
  '> Installing dependencies...',
  '> ⚛️  Setting up React components',
  '> 🎭 Configuring animations',
  '> ⚡ Optimizing performance',
  '> 🚀 Build completed in 2.3s',
  '',
  '$ gibbs deploy --platform="vercel"',
  '> Deploying to production...',
  '> ✓ DNS configured',
  '> ✓ SSL certificate active',
  '> ✓ CDN optimized',
  '> 🎉 Live at https://awesome-website.com',
  '',
  '$ gibbs analytics',
  '> 📊 Page views: 10,234',
  '> 👥 Active users: 523',
  '> ⚡ Performance score: 98/100',
  '> 🎯 SEO score: 95/100',
  '',
  '$ ▊',
]

/**
 * Tech Stack section with IconCloud and Terminal
 */
export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentCategory, setCurrentCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Tümü', icon: Zap, count: allIcons.length },
    {
      id: 'design',
      label: 'Tasarım',
      icon: Palette,
      count: techIcons.design.length,
    },
    {
      id: 'frontend',
      label: 'Frontend',
      icon: Code2,
      count: techIcons.frontend.length,
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: Database,
      count: techIcons.backend.length,
    },
    {
      id: 'devops',
      label: 'DevOps',
      icon: Cloud,
      count: techIcons.devops.length,
    },
  ]

  const getFilteredIcons = () => {
    if (currentCategory === 'all') return allIcons
    return techIcons[currentCategory as keyof typeof techIcons] || allIcons
  }

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,107,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(78,205,196,0.05)_50%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Teknoloji Yığınımız</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
            <span className="block">En İyi Araçlarla</span>
            <span className="text-gradient">Mükemmel Sonuçlar</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Sektörün en güncel ve güçlü teknolojilerini kullanarak projelerinizi
            hayata geçiriyoruz.
          </p>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setCurrentCategory(category.id)}
                  className={cn(
                    'group flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all',
                    currentCategory === category.id
                      ? 'bg-primary text-white shadow-lg scale-105 category-btn-active'
                      : 'glass hover:bg-primary/10'
                  )}
                  aria-label={`Filter by ${category.label}`}
                  aria-pressed={currentCategory === category.id}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      currentCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-primary/10'
                    )}
                  >
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Screen reader announcement */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {getFilteredIcons().length}{' '}
          {currentCategory === 'all' ? 'technologies' : currentCategory}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Icon Cloud */}
          <ScrollReveal delay={0.3}>
            <IconCloud
              icons={getFilteredIcons()}
              className="min-h-[400px] lg:min-h-[600px]"
            />
          </ScrollReveal>

          {/* Right - Terminal & Info */}
          <ScrollReveal delay={0.5} className="space-y-8">
            {/* Terminal */}
            <div className="relative">
              <Terminal
                lines={terminalCommands}
                className="max-h-[300px] md:max-h-[400px] lg:max-h-[500px] overflow-auto"
              />

              {/* Terminal Info Badge */}
              <div className="absolute -top-3 -right-3 glass px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Demo
              </div>
            </div>

            {/* Technology Categories */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: 'Modern Framework',
                  description: 'Next.js 16, React 19',
                  icon: Code2,
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  title: 'Cloud Native',
                  description: 'AWS, Vercel, Firebase',
                  icon: Cloud,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  title: 'Database Power',
                  description: 'PostgreSQL, MongoDB',
                  icon: Database,
                  color: 'from-green-500 to-teal-500',
                },
                {
                  title: 'Performance',
                  description: '98/100 Lighthouse',
                  icon: TrendingUp,
                  color: 'from-orange-500 to-red-500',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="glass p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer group will-change-transform"
                  >
                    <div
                      className={cn(
                        'inline-flex p-2 rounded-lg bg-gradient-to-br mb-3',
                        item.color
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Teknoloji İstatistikleri
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Aktif Teknoloji', value: allIcons.length },
                  { label: 'Yıllık Deneyim', value: '15+' },
                  { label: 'Sertifika', value: '20+' },
                  { label: 'Güncellik', value: '%100' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="font-semibold text-gradient">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.7} className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 glass px-8 py-6 rounded-2xl max-w-2xl">
            <p className="text-lg">
              En son teknolojilerle projenizi geliştirmek ister misiniz?
            </p>
            <button
              className="group px-6 py-3 bg-primary text-white rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform will-change-transform"
              aria-label="Teknoloji danışmanlığı al"
            >
              Teknoloji Danışmanlığı Al
              <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

