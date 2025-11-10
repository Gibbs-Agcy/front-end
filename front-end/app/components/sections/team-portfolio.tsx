'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { gsap } from '@/lib/gsap-config'
import { Lens } from '../magicui/lens'
import { ScrollReveal } from '../animations/scroll-reveal'
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  skills: string[]
  image: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
    email?: string
  }
  color: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'goktug',
    name: 'Göktuğ',
    position: 'Back-end Developer',
    bio: 'Node.js ve Python uzmanı. Ölçeklenebilir API\'lar ve veritabanı mimarisi konusunda 5+ yıl deneyim. Mikroservis mimarisi ve cloud teknolojilerinde derin bilgi sahibi.',
    skills: [
      'Node.js',
      'Python',
      'PostgreSQL',
      'Redis',
      'Docker',
      'AWS',
      'Microservices',
    ],
    image: '/team/goktug.jpg',
    socials: {
      github: 'https://github.com/goktug',
      linkedin: 'https://linkedin.com/in/goktug',
      twitter: 'https://twitter.com/goktug',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ibrahim',
    name: 'İbrahim Ethem Kalemci',
    position: 'Front-End Developer',
    bio: 'React ve Next.js ile modern web uygulamaları geliştiriyor. UI/UX detaylarına önem veren, performans odaklı bir developer. Animasyon ve interaktif deneyimler konusunda tutkulu.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Three.js',
    ],
    image: '/team/ibrahim.jpg',
    socials: {
      github: 'https://github.com/ibrahimethem',
      linkedin: 'https://linkedin.com/in/ibrahimethem',
      website: 'https://ibrahimethem.dev',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'ayse',
    name: 'Ayşe Yılmaz',
    position: 'UI/UX Designer',
    bio: 'Kullanıcı odaklı tasarımlar üreten, 4 yıllık deneyime sahip tasarımcı. Design thinking metodolojisi ile problem çözüyor. Her projede kullanıcı araştırması yaparak veri odaklı tasarımlar üretiyor.',
    skills: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'Prototyping',
      'User Research',
      'Design Systems',
    ],
    image: '/team/ayse.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/ayseyilmaz',
      website: 'https://ayseyilmaz.design',
    },
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'mehmet',
    name: 'Mehmet Kaya',
    position: 'Project Manager',
    bio: 'Agile metodolojiler ile proje yönetimi konusunda uzman. 50+ başarılı proje teslim etti. Ekip koordinasyonu ve müşteri iletişiminde mükemmel. Scrum Master sertifikasına sahip.',
    skills: [
      'Scrum',
      'Agile',
      'Jira',
      'Asana',
      'Team Leadership',
      'Stakeholder Management',
    ],
    image: '/team/mehmet.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/mehmetkaya',
      email: 'mehmet@gibbs.agency',
    },
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'zeynep',
    name: 'Zeynep Demir',
    position: 'Digital Marketing Specialist',
    bio: 'SEO, SEM ve sosyal medya stratejileri uzmanı. Veri analitiği ile kampanya performansını optimize ediyor. Google Ads ve Facebook Blueprint sertifikalı. ROI odaklı çalışıyor.',
    skills: [
      'Google Ads',
      'Facebook Ads',
      'SEO',
      'Analytics',
      'Content Strategy',
      'Email Marketing',
    ],
    image: '/team/zeynep.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/zeynepdemir',
      twitter: 'https://twitter.com/zeynepdemir',
    },
    color: 'from-green-500 to-teal-500',
  },
]

/**
 * Team Portfolio section with Embla Carousel
 */
export function TeamPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
  )

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
      if (e.key === 'Home') scrollTo(0)
      if (e.key === 'End') scrollTo(teamMembers.length - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext, scrollTo])

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-24 md:py-32 relative overflow-hidden bg-muted/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Ekibimiz</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="block">Tutkulu İnsanlardan</span>
            <span className="text-gradient">Oluşan Ekip</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Herbiri alanında uzman, yaratıcı ve çözüm odaklı profesyoneller.
            Projenizin başarısı için birlikte çalışıyoruz.
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0"
                >
                  <TeamMemberCard
                    member={member}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass p-3 rounded-full hover:bg-primary/10 transition-all hover:scale-110 group will-change-transform"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-6 w-6 group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass p-3 rounded-full hover:bg-primary/10 transition-all hover:scale-110 group will-change-transform"
            aria-label="Next team member"
          >
            <ChevronRight className="h-6 w-6 group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>

        {/* Screen Reader Text */}
        <span className="sr-only">
          Team member {currentIndex + 1} of {teamMembers.length}
        </span>

        {/* Team Stats */}
        <ScrollReveal delay={0.3} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '5+', label: 'Ekip Üyesi' },
              { value: '15+', label: 'Yıllık Toplam Deneyim' },
              { value: '200+', label: 'Tamamlanan Proje' },
              { value: '98%', label: 'Müşteri Memnuniyeti' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center space-y-2 p-6 glass rounded-xl hover:scale-105 transition-transform will-change-transform"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/**
 * Team Member Card Component with Lens effect
 */
const TeamMemberCard = memo(function TeamMemberCard({
  member,
  isActive,
}: {
  member: TeamMember
  isActive: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !isActive) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      cardRef.current.style.opacity = '1'
      cardRef.current.style.transform = 'none'
      return
    }

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.95,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }
    )
  }, [isActive])

  // Smooth button hover effect
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      className="relative bg-background/95 border border-border/60 rounded-3xl p-8 md:p-12 mx-auto max-w-4xl team-card-enter shadow-2xl overflow-hidden group/card"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-[0.02] group-hover/card:opacity-[0.04] transition-opacity duration-500 pointer-events-none',
          member.color
        )}
      />

      {/* Modern border glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none',
          'bg-gradient-to-r from-transparent via-border/20 to-transparent blur-xl'
        )}
      />

      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Image */}
        <div className="relative group/image">
          <Lens className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-border/20 group-hover/image:ring-primary/20 transition-all duration-300">
            {/* Modern Gradient Background */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br',
                member.color
              )}
            />

            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] opacity-50" />

            {/* Initial Letter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl md:text-9xl font-black opacity-20 text-white mix-blend-overlay group-hover/image:opacity-30 transition-opacity duration-300">
                {member.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Modern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Position Badge - Modern Design */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-background/95 border border-border/50 px-4 py-2 rounded-xl shadow-lg group-hover/image:shadow-xl transition-all duration-300">
                <span
                  className={cn(
                    'text-xs font-bold uppercase tracking-wider bg-gradient-to-r bg-clip-text text-transparent',
                    member.color
                  )}
                >
                  {member.position}
                </span>
              </div>
            </div>
          </Lens>

          {/* Decorative Glow */}
          <div
            className={cn(
              'absolute -z-10 -inset-4 blur-3xl opacity-20 group-hover/image:opacity-30 rounded-full bg-gradient-to-br transition-opacity duration-500',
              member.color
            )}
          />
        </div>

        {/* Right Side - Info */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2 pb-3 border-b border-border/40">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {member.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', member.color)} />
              <p
                className={cn(
                  'text-sm md:text-base font-semibold bg-gradient-to-r bg-clip-text text-transparent',
                  member.color
                )}
              >
                {member.position}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {member.bio}
          </p>

          {/* Skills Section */}
          <div className="pt-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn('h-px flex-1 bg-gradient-to-r opacity-30', member.color)} />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80">
                UZMANLIK ALANLARI
              </h4>
              <div className={cn('h-px flex-1 bg-gradient-to-l opacity-30', member.color)} />
            </div>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 skill-tag',
                    'bg-gradient-to-br from-muted/60 to-muted/40 border-border/60',
                    'hover:border-border/80',
                    'hover:scale-105 hover:shadow-md hover:-translate-y-0.5'
                  )}
                  style={{
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-border/40">
            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {Object.entries(member.socials).map(([type, url]) => (
                <SocialIcon
                  key={type}
                  type={type}
                  url={url}
                  memberName={member.name}
                />
              ))}
            </div>

            {/* Modern CTA Button */}
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(
                'relative px-6 py-3 rounded-xl text-sm font-bold text-white overflow-hidden',
                'hover:shadow-xl transition-all duration-300 will-change-transform shrink-0',
                'flex items-center gap-2 group/btn',
                'bg-gradient-to-r',
                member.color
              )}
              aria-label={`View ${member.name}'s profile`}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              
              <span className="relative z-10">Profili Görüntüle</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

/**
 * Social Icon Component
 */
function SocialIcon({
  type,
  url,
  memberName,
}: {
  type: string
  url: string
  memberName: string
}) {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
    email: Mail,
  }

  const Icon = icons[type as keyof typeof icons]

  if (!Icon) return null

  const href = type === 'email' ? `mailto:${url}` : url

  return (
    <a
      href={href}
      target={type === 'email' ? undefined : '_blank'}
      rel={type === 'email' ? undefined : 'noopener noreferrer'}
      className="relative p-2.5 bg-gradient-to-br from-muted/60 to-muted/40 border border-border/60 rounded-xl hover:border-border/80 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 group social-icon will-change-transform shadow-sm hover:shadow-md"
      aria-label={`${memberName}'s ${type}`}
    >
      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
    </a>
  )
}

