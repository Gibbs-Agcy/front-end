'use client'

import { useEffect, useRef, memo } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap-config'
import { Marquee } from '../magicui/marquee'
import { TweetCard } from '../magicui/tweet-card'
import { ScrollReveal } from '../animations/scroll-reveal'
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react'
// Removed unused import
import { useMediaQuery } from '@/app/hooks/use-media-query'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  verified?: boolean
  date?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Can Yılmaz',
    role: 'E-Ticaret Girişimci',
    company: 'ShopMaster',
    content:
      'Gibbs ile çalışmak harika bir deneyimdi! Web sitemizi baştan tasarladılar ve satışlarımız %300 arttı. Hem tasarım hem de teknik destek mükemmeldi.',
    rating: 5,
    verified: true,
    date: '2 hafta önce',
  },
  {
    id: '2',
    name: 'Elif Kaya',
    role: 'Cafe Sahibi',
    company: 'Aroma Coffee',
    content:
      'Sosyal medya yönetimi için Gibbs’i seçtik ve çok memnunuz. Takipçi sayımız 3 ayda 10 kata çıktı. İçerik kalitesi gerçekten profesyonel.',
    rating: 5,
    date: '1 ay önce',
  },
  {
    id: '3',
    name: 'Ahmet Demir',
    role: 'Startup Kurucu',
    company: 'TechVision',
    content:
      'Mobil uygulamamızı Gibbs geliştirdi. Kullanıcı deneyimi harika, performans mükemmel. Ekip çok responsive ve çözüm odaklı çalışıyor.',
    rating: 5,
    verified: true,
    date: '3 hafta önce',
  },
  {
    id: '4',
    name: 'Zehra Arslan',
    role: 'Marka Müdürü',
    company: 'Luxe Fashion',
    content:
      'Rebranding projemiz için Gibbs ile çalıştık. Yeni kimliğimiz çok modern ve markamızı tam yansıtıyor. Süreç boyunca harika iletişim kurduk.',
    rating: 5,
    date: '2 ay önce',
  },
  {
    id: '5',
    name: 'Burak Özkan',
    role: 'Yazılım Şirketi CEO',
    company: 'DevCore',
    content:
      'Backend altyapımızı Gibbs kurdu. Ölçeklenebilir, güvenli ve hızlı bir sistem. Teknik bilgileri çok yüksek, kesinlikle öneriyorum.',
    rating: 5,
    verified: true,
    date: '1 hafta önce',
  },
  {
    id: '6',
    name: 'Selin Aydın',
    role: 'Pazarlama Direktörü',
    company: 'Growth Marketing',
    content:
      'SEO çalışmaları için Gibbs’le anlaştık. 6 ayda Google’da ilk sayfaya çıktık. Organik trafiğimiz inanılmaz arttı. Teşekkürler!',
    rating: 5,
    date: '5 hafta önce',
  },
  {
    id: '7',
    name: 'Emre Şahin',
    role: 'Restaurant Sahibi',
    company: 'Lezzet Durağı',
    content:
      'Video prodüksiyon hizmeti aldık. Tanıtım filmimiz viral oldu! Yaratıcı ekip, profesyonel çekim ve kurgu. Herkese tavsiye ederim.',
    rating: 5,
    date: '3 ay önce',
  },
  {
    id: '8',
    name: 'Aylin Koç',
    role: 'Fashion Brand Owner',
    company: 'Chic Style',
    content:
      'E-ticaret sitemizi Gibbs kurdu. Kullanıcı dostu, hızlı ve güvenli. Entegrasyonlar sorunsuz çalışıyor. Satışlarımız katlandı.',
    rating: 5,
    verified: true,
    date: '4 hafta önce',
  },
  {
    id: '9',
    name: 'Murat Yıldız',
    role: 'Tech Startup Founder',
    company: 'InnovateTech',
    content:
      'UI/UX tasarım hizmeti mükemmeldi. Kullanıcılarımızdan çok olumlu geri dönüşler alıyoruz. Tasarım modern ve son derece fonksiyonel.',
    rating: 5,
    date: '6 hafta önce',
  },
  {
    id: '10',
    name: 'Deniz Çelik',
    role: 'Dijital Ajans CEO',
    company: 'Digital Wave',
    content:
      'Alt yüklenici olarak Gibbs ile çalışıyoruz. Kaliteli iş, zamanında teslimat ve profesyonel yaklaşım. Güvenilir bir partner.',
    rating: 5,
    verified: true,
    date: '2 ay önce',
  },
  {
    id: '11',
    name: 'Fatma Öztürk',
    role: 'NGO Yöneticisi',
    company: 'Yarınlar İçin',
    content:
      'Web sitemizi yenilediler. Sosyal sorumluluk projelerine destek oldukları için minnettarız. Harika bir ekip, harika bir kalp!',
    rating: 5,
    date: '7 hafta önce',
  },
  {
    id: '12',
    name: 'Oğuz Demirci',
    role: 'Content Creator',
    company: 'Personal Brand',
    content:
      'Kişisel web sitem ve portfolio için Gibbs’i seçtim. Sonuç beklentilerimin çok üstünde. Tasarım şık, hızlı ve etkileyici.',
    rating: 5,
    date: '3 hafta önce',
  },
]


/**
 * Testimonials section with Marquee carousel
 */
export function Testimonials({ testimonials: testimonialsProp }: { testimonials?: Testimonial[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (!titleRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const titleElements = titleRef.current.querySelectorAll('h2, p')
    gsap.from(titleElements, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  const data = testimonialsProp && testimonialsProp.length ? testimonialsProp : testimonials

  // Split testimonials into two rows from provided data
  const firstRow = data.slice(0, Math.ceil(data.length / 2))
  const secondRow = data.slice(Math.ceil(data.length / 2))

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
      role="region"
      aria-label="Customer testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 mb-16">
        {/* Section Header */}
        <div
          ref={titleRef}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Müşteri Yorumları</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="block">Müşterilerimiz</span>
            <span className="text-gradient">Neler Söylüyor?</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Yüzlerce mutlu müşterimizden bazılarının görüşleri. Her proje, bir
            başarı hikayesi.
          </p>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="relative space-y-8">
        {/* First Row - Left to Right */}
        <Marquee
          pauseOnHover
          speed={isMobile ? 'slow' : 'normal'}
          gradient
        >
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Second Row - Right to Left */}
        <Marquee
          pauseOnHover
          speed={isMobile ? 'slow' : 'normal'}
          gradient
          reverse
        >
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

      {/* Stats */}
      <ScrollReveal delay={0.3} className="mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '150+', label: 'Mutlu Müşteri' },
              { value: '4.9/5', label: 'Ortalama Puan' },
              { value: '%98', label: 'Memnuniyet Oranı' },
              { value: '300+', label: 'Tamamlanan Proje' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-3 p-6 glass rounded-xl hover:scale-105 transition-transform will-change-transform"
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
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal delay={0.5} className="mt-16 text-center">
        <div className="inline-flex flex-col items-center gap-4 glass px-8 py-6 rounded-2xl">
          <p className="text-lg">Siz de başarı hikayemizin bir parçası olun!</p>
          <button
            className="group px-6 py-3 bg-primary text-white rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform will-change-transform"
            aria-label="Projene başla"
          >
            Projene Başla
            <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  )
}

/**
 * Testimonial Card Component
 */
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div className="w-[320px] md:w-[360px] lg:w-[400px] mx-4 shrink-0">
      <TweetCard
        author={testimonial.name}
        handle={testimonial.company}
        content={testimonial.content}
        className="h-full"
      >
        {/* Custom content */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="shrink-0">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground truncate">
                {testimonial.name}
              </span>
              {testimonial.verified && (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 verified-badge" />
              )}
            </div>

            {/* Role & Company */}
            <div className="text-sm text-muted-foreground mb-3">
              {testimonial.role} • {testimonial.company}
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed text-foreground/90 mb-4">
              {testimonial.content}
            </p>

            {/* Rating & Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 star-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="sr-only">
                  {testimonial.rating} out of 5 stars
                </span>
              </div>
              {testimonial.date && (
                <span className="text-xs text-muted-foreground">
                  {testimonial.date}
                </span>
              )}
            </div>
          </div>
        </div>
      </TweetCard>
    </div>
  )
})

