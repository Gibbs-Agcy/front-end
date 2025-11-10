'use client'

import { useState, useRef, FormEvent } from 'react'
import { gsap } from '@/lib/gsap-config'
import { ScrollReveal } from '../animations/scroll-reveal'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Loader2,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  budget: string
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  budget: '',
  consent: false,
}

const subjectOptions = [
  { value: '', label: 'Konu seçin...' },
  { value: 'web-design', label: 'Web Tasarım & Geliştirme' },
  { value: 'mobile-app', label: 'Mobil Uygulama' },
  { value: 'branding', label: 'Branding & Kimlik' },
  { value: 'seo', label: 'SEO & Dijital Pazarlama' },
  { value: 'video', label: 'Video Prodüksiyon' },
  { value: 'other', label: 'Diğer' },
]

const budgetOptions = [
  { value: '', label: 'Bütçe aralığı seçin...' },
  { value: 'under-10k', label: '10.000 TL altı' },
  { value: '10k-25k', label: '10.000 - 25.000 TL' },
  { value: '25k-50k', label: '25.000 - 50.000 TL' },
  { value: '50k-100k', label: '50.000 - 100.000 TL' },
  { value: 'over-100k', label: '100.000 TL üzeri' },
  { value: 'quote', label: 'Teklif almak istiyorum' },
]

/**
 * Contact section with form and contact information
 */
export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSubmitting || isSuccess) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

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

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'İsim zorunludur'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi girin'
    }
    if (!formData.subject) {
      newErrors.subject = 'Konu seçin'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj zorunludur'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalı'
    }
    if (!formData.consent) {
      newErrors.consent = 'KVKK onayı gereklidir'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Phone mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 10) value = value.slice(0, 10)

    let formatted = ''
    if (value.length > 0) formatted += '(' + value.substring(0, 3)
    if (value.length >= 4) formatted += ') ' + value.substring(3, 6)
    if (value.length >= 7) formatted += ' ' + value.substring(6, 8)
    if (value.length >= 9) formatted += ' ' + value.substring(8, 10)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  // Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      // Shake animation on error
      if (formRef.current) {
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches

        if (!prefersReducedMotion) {
          formRef.current.classList.add('form-error')
          gsap.to(formRef.current, {
            x: -10,
            duration: 0.05,
            repeat: 4,
            yoyo: true,
            onComplete: () => {
              formRef.current?.classList.remove('form-error')
            },
          })
        }
      }
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Success!
      setIsSuccess(true)
      // Konfeti effect
      triggerConfetti()
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData(initialFormData)
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confetti effect
  const triggerConfetti = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94']
    const confettiCount = 50
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'fixed'
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = '50%'
      confetti.style.top = '50%'
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'
      confetti.style.pointerEvents = 'none'
      confetti.style.zIndex = '9999'
      document.body.appendChild(confetti)
      gsap.to(confetti, {
        x: (Math.random() - 0.5) * 1000,
        y: Math.random() * 1000 - 500,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => confetti.remove(),
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@gibbs.agency',
      href: 'mailto:hello@gibbs.agency',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+90 (555) 123 45 67',
      href: 'tel:+905551234567',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'Kadıköy, İstanbul, Türkiye',
      href: 'https://maps.google.com/?q=Kadıköy,Istanbul',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      value: 'Pzt-Cum 09:00-18:00',
      href: null,
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/gibbs-agency',
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/gibbs-agency',
      color: 'hover:text-[#0A66C2]',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/gibbsagency',
      color: 'hover:text-[#1DA1F2]',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/gibbsagency',
      color: 'hover:text-[#E4405F]',
    },
  ]

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      role="region"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-background to-muted/50" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">İletişim</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="block">Projenizi Konuşalım</span>
            <span className="text-gradient">Hemen İletişime Geçin</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Fikirlerinizi gerçeğe dönüştürmek için buradayız. Ücretsiz
            danışmanlık için bize ulaşın.
          </p>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <ScrollReveal delay={0.2} className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="glass p-6 rounded-xl hover:scale-105 transition-transform group cursor-pointer will-change-transform"
                    onClick={() => item.href && window.open(item.href, '_blank')}
                    role={item.href ? 'button' : undefined}
                    tabIndex={item.href ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (item.href && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        window.open(item.href, '_blank')
                      }
                    }}
                    aria-label={item.href ? `${item.label}: ${item.value}` : item.value}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-lg bg-gradient-to-br shrink-0',
                          item.color
                        )}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">
                          {item.label}
                        </div>
                        <div className="font-semibold group-hover:text-primary transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Sosyal Medya
              </h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'p-3 glass rounded-lg transition-all hover:scale-110',
                        social.color
                      )}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-4">💡 Hızlı Bilgi</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  Ücretsiz ilk danışmanlık
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  24 saat içinde geri dönüş
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  Esnek ödeme planları
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  NDA imzalama seçeneği
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Right - Contact Form */}
          <ScrollReveal delay={0.4}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass p-4 md:p-8 rounded-2xl space-y-6"
              aria-labelledby="contact-form-title"
              aria-describedby="contact-form-description"
            >
              {/* Error announcements for screen readers */}
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="sr-only"
                >
                  {Object.values(errors).join('. ')}
                </div>
              )}

              {/* Success State */}
              {isSuccess && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3 success-state">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-green-500 mb-1">
                      Mesajınız Gönderildi! 🎉
                    </div>
                    <div className="text-sm text-green-500/80">
                      En kısa sürede size geri dönüş yapacağız.
                    </div>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  İsim Soyisim{' '}
                  <span aria-label="required field" className="text-red-500">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none',
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  )}
                  placeholder="Adınız Soyadınız"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <div
                    id="name-error"
                    className="flex items-center gap-2 mt-2 text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email{' '}
                  <span aria-label="required field" className="text-red-500">
                    *
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none',
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  )}
                  placeholder="ornek@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <div
                    id="email-error"
                    className="flex items-center gap-2 mt-2 text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors focus:outline-none"
                  placeholder="(555) 123 45 67"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Konu{' '}
                  <span aria-label="required field" className="text-red-500">
                    *
                  </span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none form-select',
                    errors.subject
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  )}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <div
                    id="subject-error"
                    className="flex items-center gap-2 mt-2 text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  Bütçe Aralığı
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors focus:outline-none form-select"
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mesaj{' '}
                  <span aria-label="required field" className="text-red-500">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-background border transition-colors resize-none focus:outline-none',
                    errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  )}
                  placeholder="Projeniz hakkında detaylı bilgi verin..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <div
                    id="message-error"
                    className="flex items-center gap-2 mt-2 text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.message}
                  </div>
                )}
              </div>

              {/* KVKK Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-2 form-checkbox"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <a
                      href="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      KVKK Aydınlatma Metni
                    </a>
                    'ni okudum, kişisel verilerimin işlenmesini kabul ediyorum.{' '}
                    <span aria-label="required field" className="text-red-500">
                      *
                    </span>
                  </span>
                </label>
                {errors.consent && (
                  <div
                    id="consent-error"
                    className="flex items-center gap-2 mt-2 text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.consent}
                  </div>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div
                  className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-500">{errors.submit}</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting || isSuccess}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  'w-full px-6 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all will-change-transform',
                  isSuccess
                    ? 'bg-green-500 text-white'
                    : isSubmitting
                    ? 'bg-primary/50 text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:scale-105 hover:shadow-xl'
                )}
                aria-busy={isSubmitting}
                aria-disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Gönderildi!
                  </>
                ) : (
                  <>
                    Mesaj Gönder
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

