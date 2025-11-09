'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchModal } from './search-modal'

const navLinks = [
  { name: 'Hizmetler', href: '#services' },
  { name: 'Ekip', href: '#team' },
  { name: 'Yorumlar', href: '#testimonials' },
  { name: 'Teknoloji', href: '#tech-stack' },
  { name: 'İletişim', href: '#contact' },
  { name: 'SSS', href: '#faq' },
]

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastScrollY = useRef(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY < 10) {
        setIsVisible(true)
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down
          setIsVisible(false)
        } else {
          // Scrolling up
          setIsVisible(true)
        }
      }

      lastScrollY.current = currentScrollY

      // Detect active section
      const sections = navLinks.map((link) => document.querySelector(link.href))
      sections.forEach((section, index) => {
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(navLinks[index].href)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (!element) return

    const offset = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })

    setIsMobileMenuOpen(false)
  }

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          'hidden lg:block'
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 pt-8">
          <nav
            className={cn(
              'mx-auto max-w-6xl transition-all duration-300',
              isScrolled
                ? 'bg-background/80 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5'
                : 'bg-background/60 backdrop-blur-xl border border-border/30',
              'rounded-full px-10 py-4'
            )}
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-4">
              {/* Logo */}
              <button
                onClick={() => {
                  const prefersReducedMotion = window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                  ).matches
                  window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  })
                }}
                className="flex items-center gap-3.5 group pr-8 border-r border-border/50"
                aria-label="Go to homepage"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-full" />
                  <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="hidden xl:block">
                  <div className="text-lg font-bold leading-none">GIBBS</div>
                  <div className="text-xs text-muted-foreground leading-none mt-1">
                    Agency
                  </div>
                </div>
              </button>

              {/* Nav Links */}
              <div className="flex items-center gap-2 px-4 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-200',
                      activeSection === link.href
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                  >
                    {/* Active background */}
                    {activeSection === link.href && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 animate-in fade-in zoom-in-95 duration-200" />
                    )}

                    {/* Hover background */}
                    <span className="absolute inset-0 bg-muted rounded-full opacity-0 hover:opacity-100 transition-opacity -z-20" />

                    <span className="relative">{link.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative px-5 py-3 rounded-full bg-muted/50 hover:bg-muted transition-all group border border-border/50"
                aria-label="Open search"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm text-muted-foreground hidden xl:inline">
                    Ara...
                  </span>
                  <kbd className="hidden xl:inline-flex h-6 px-2 items-center gap-1 rounded border border-border/50 bg-background/50 text-[11px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="ml-4 pl-8 border-l border-border/50 group"
                aria-label="Get in touch"
              >
                <span className="relative inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
                  <span className="relative z-10">Başlayalım</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 pt-4 pb-4">
          <nav
            className={cn(
              'transition-all duration-300',
              isScrolled
                ? 'bg-background/90 backdrop-blur-2xl border border-border shadow-xl'
                : 'bg-background/70 backdrop-blur-xl border border-border/50',
              'rounded-2xl px-4 py-3'
            )}
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => {
                  const prefersReducedMotion = window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                  ).matches
                  window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  })
                }}
                className="flex items-center gap-2.5 group"
                aria-label="Go to homepage"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-lg opacity-50 rounded-full" />
                  <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold leading-none">GIBBS</div>
                  <div className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    Agency
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-2">
                {/* Mobile Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span
                      className={cn(
                        'w-full h-0.5 bg-foreground rounded-full transition-all',
                        isMobileMenuOpen && 'rotate-45 translate-y-1.5'
                      )}
                    />
                    <span
                      className={cn(
                        'w-full h-0.5 bg-foreground rounded-full transition-all',
                        isMobileMenuOpen && 'opacity-0'
                      )}
                    />
                    <span
                      className={cn(
                        'w-full h-0.5 bg-foreground rounded-full transition-all',
                        isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
                      )}
                    />
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            'absolute top-full left-0 right-0 px-4 transition-all duration-300',
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          )}
        >
          <div className="bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-4 mt-2">
            <nav aria-label="Mobile navigation">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      activeSection === link.href
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'hover:bg-muted'
                    )}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold"
                  aria-label="Get in touch"
                >
                  Başlayalım
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  )
}

