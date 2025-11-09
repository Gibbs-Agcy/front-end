'use client'

import { useState, FormEvent, useEffect } from 'react'
import { ScrollReveal } from '../animations/scroll-reveal'
import { ThemeToggler } from '../magicui/theme-toggler'
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Send,
  Heart,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { cn, throttle } from '@/lib/utils'
import Link from 'next/link'

const services = [
  { name: 'Web Tasarım & Geliştirme', href: '/services/web-development' },
  { name: 'Mobil Uygulama', href: '/services/mobile-app' },
  { name: 'Branding & Kimlik', href: '/services/branding' },
  { name: 'SEO & Dijital Pazarlama', href: '/services/seo' },
  { name: 'Video Prodüksiyon', href: '/services/video' },
  { name: 'E-Ticaret Çözümleri', href: '/services/ecommerce' },
]

const company = [
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Ekibimiz', href: '#team' },
  { name: 'Portfolyo', href: '#portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kariyer', href: '/careers' },
  { name: 'İletişim', href: '#contact' },
]

const legal = [
  { name: 'Gizlilik Politikası', href: '/privacy' },
  { name: 'Kullanım Koşulları', href: '/terms' },
  { name: 'Çerez Politikası', href: '/cookies' },
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/gibbs-agency',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/gibbs-agency',
    color: 'hover:text-[#0A66C2]',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/gibbsagency',
    color: 'hover:text-[#1DA1F2]',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/gibbsagency',
    color: 'hover:text-[#E4405F]',
  },
]

/**
 * Footer component with newsletter, links and social media
 */
export function Footer() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email) {
      setError('Email gerekli')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Geçerli bir email girin')
      return
    }
    if (!consent) {
      setError('KVKK onayı gerekli')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setEmail('')
      setConsent(false)

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err) {
      setError('Bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer
      className="relative bg-muted/50 border-t border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <ScrollReveal className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">GIBBS</div>
                  <div className="text-xs text-muted-foreground">Agency</div>
                </div>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground italic">
              "Tasarımın Gücü, Kodun Zarafeti"
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dijital dünyada iz bırakan projeler üretiyoruz. Tasarım ve
              teknoloji ile markanızı geleceğe taşıyoruz.
            </p>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'social-icon p-2 glass rounded-lg transition-all hover:scale-110',
                        social.color
                      )}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </nav>
          </ScrollReveal>

          {/* Column 2 - Services */}
          <ScrollReveal delay={0.1} className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Hizmetler
            </h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="footer-link text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollReveal>

          {/* Column 3 - Company */}
          <ScrollReveal delay={0.2} className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Şirket
            </h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="footer-link text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollReveal>

          {/* Column 4 - Newsletter */}
          <ScrollReveal delay={0.3} className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Newsletter
            </h3>

            <p className="text-sm text-muted-foreground">
              Yeni projeler, blog yazıları ve özel fırsatlardan haberdar olun.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-4"
              aria-label="Newsletter subscription"
            >
              {isSuccess ? (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-green-500">
                    Başarıyla abone oldunuz! 🎉
                  </span>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email adresiniz"
                      className={cn(
                        'newsletter-input w-full px-4 py-3 pr-12 rounded-lg bg-background border transition-colors focus:outline-none',
                        error
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      )}
                      disabled={isSubmitting}
                      aria-invalid={!!error}
                      aria-describedby={error ? 'newsletter-error' : undefined}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Subscribe to newsletter"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  {error && (
                    <p
                      id="newsletter-error"
                      className="text-xs text-red-500"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-2 form-checkbox"
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        KVKK
                      </Link>
                      'yı kabul ediyorum.
                    </span>
                  </label>
                </>
              )}
            </form>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Gibbs Agency. Tüm hakları saklıdır.
            <span className="inline-flex items-center gap-1 ml-2">
              Made with{' '}
              <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />{' '}
              in Istanbul
            </span>
          </div>

          {/* Legal Links */}
          <nav aria-label="Legal links">
            <div className="flex items-center gap-6">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  {item.name}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Theme Toggler */}
          <ThemeToggler />
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </footer>
  )
}

/**
 * Back to Top Component
 */
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsVisible(window.pageYOffset > 500)
    }, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 glass rounded-full hover:bg-primary/10 transition-all hover:scale-110 group back-to-top"
      aria-label="Scroll back to top"
    >
      <svg
        className="h-6 w-6 group-hover:text-primary transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}

