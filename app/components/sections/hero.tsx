'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { SplitText } from '../animations/split-text'
import { MaskedText } from '../animations/masked-text'
import { ScrollReveal } from '../animations/scroll-reveal'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Particles } from '../shared/particles'

/**
 * Hero section component - WOW factor with amazing animations
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      return
    }

    // Logo animasyonu
    if (logoRef.current) {
      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.2,
      })
    }

    // CTA butonları animasyonu
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('button, a')
      gsap.from(buttons, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 2,
      })
    }

    // Background gradient animasyonu
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })
    }

    // Floating animasyonu
    gsap.to('.floating', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3,
    })
  }, [])

  // Magnetic button efekti
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particles Effect */}
      <Particles />

      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 230, 109, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div ref={logoRef} className="floating">
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-semibold text-sm tracking-wider">
                GIBBS AGENCY
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter">
              <SplitText
                className="text-gradient inline-block"
                delay={0.5}
                stagger={0.05}
              >
                GIBBS
              </SplitText>
            </h1>

            {/* Subheading */}
            <div className="text-2xl md:text-4xl font-medium text-muted-foreground">
              <MaskedText delay={1.5}>Tasarımın Gücü, Kodun Zarafeti</MaskedText>
            </div>
          </div>

          {/* Description */}
          <ScrollReveal delay={2} className="floating">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Yaratıcı tasarım ve yenilikçi teknoloji ile markanızı dijital
              dünyada zirveye taşıyoruz. Her piksel, her satır kod -
              mükemmellik için.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-4 pt-8"
          >
            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:glow will-change-transform"
            >
              <span className="relative z-10 flex items-center gap-2">
                Projene Başla
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer" />
            </button>

            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="px-8 py-4 glass rounded-full font-semibold text-lg transition-all hover:scale-105 hover:border-primary/50 will-change-transform"
            >
              Portfolyoyu İncele
            </button>
          </div>

          {/* Stats */}
          <ScrollReveal delay={2.5}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
              {[
                { value: '150+', label: 'Mutlu Müşteri' },
                { value: '300+', label: 'Tamamlanan Proje' },
                { value: '5+', label: 'Yıllık Deneyim' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="floating space-y-2"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient">
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            })
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm font-medium">Keşfet</span>
          <ChevronDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </section>
  )
}

