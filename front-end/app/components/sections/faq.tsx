'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from '@/lib/gsap-config'
import { ScrollReveal } from '../animations/scroll-reveal'
import {
  Plus,
  Minus,
  Search,
  HelpCircle,
  DollarSign,
  Clock,
  Code,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { cn, debounce } from '@/lib/utils'

interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'pricing' | 'process' | 'technical'
}

const faqs: FAQ[] = [
  // GENERAL
  {
    id: 'g1',
    question: 'Gibbs ne tür hizmetler sunuyor?',
    answer:
      'Web tasarım ve geliştirme, mobil uygulama, branding, SEO ve dijital pazarlama, video prodüksiyon gibi dijital çözümlerin tümünü sunuyoruz. Her projede tasarım ve teknoloji birleşimi ile markanızı güçlendiriyoruz.',
    category: 'general',
  },
  {
    id: 'g2',
    question: 'Hangi sektörlerde çalışıyorsunuz?',
    answer:
      'E-ticaret, teknoloji startupları, finans, sağlık, eğitim, turizm ve daha birçok sektörde projeler gerçekleştiriyoruz. Her sektörün kendine özgü ihtiyaçlarını anlayıp özel çözümler üretiyoruz.',
    category: 'general',
  },
  {
    id: 'g3',
    question: "Sadece Türkiye'de mi hizmet veriyorsunuz?",
    answer:
      "Hayır, global olarak çalışıyoruz. Türkiye, Avrupa ve Amerika'dan müşterilerimiz var. Remote çalışma altyapımız sayesinde dünyanın her yerinden projeler alıyoruz.",
    category: 'general',
  },
  {
    id: 'g4',
    question: 'Küçük işletmeler için de çalışır mısınız?',
    answer:
      "Kesinlikle! Startup'lardan kurumsal firmalara kadar her ölçekte projeye açığız. Bütçenize uygun esnek çözümler sunuyoruz.",
    category: 'general',
  },
  {
    id: 'g5',
    question: 'Referanslarınızı görebilir miyiz?',
    answer:
      'Evet, portfolio bölümümüzde tamamladığımız projeleri ve müşteri yorumlarını inceleyebilirsiniz. Talep üzerine detaylı case study\'ler de paylaşıyoruz.',
    category: 'general',
  },
  {
    id: 'g6',
    question: 'NDA (Gizlilik Sözleşmesi) imzalar mısınız?',
    answer:
      'Evet, tüm projelerimizde profesyonel NDA sözleşmesi imzalıyoruz. Müşteri gizliliği bizim için önceliktir.',
    category: 'general',
  },
  // PRICING
  {
    id: 'p1',
    question: 'Proje fiyatları nasıl belirleniyor?',
    answer:
      'Projenin kapsamı, karmaşıklığı, süre ve gereksinimlere göre özel fiyat teklifi hazırlıyoruz. İlk görüşmede detaylı analiz yapıp şeffaf teklif sunuyoruz.',
    category: 'pricing',
  },
  {
    id: 'p2',
    question: 'Ödeme planları var mı?',
    answer:
      'Evet, projelerimizde esnek ödeme planları sunuyoruz. Genellikle %40 başlangıç, %30 ara ödeme, %30 teslimat şeklinde çalışıyoruz. Özel durumlar için görüşebiliriz.',
    category: 'pricing',
  },
  {
    id: 'p3',
    question: 'Saatlik ücret mi, yoksa proje bazlı mı çalışıyorsunuz?',
    answer:
      'Her iki seçenek de mevcut. Küçük değişiklikler ve danışmanlık için saatlik, büyük projeler için sabit fiyat tercih ediyoruz.',
    category: 'pricing',
  },
  {
    id: 'p4',
    question: 'Ücretsiz danışmanlık veriyor musunuz?',
    answer:
      'Evet, ilk görüşme ve proje analizi tamamen ücretsizdir. Projenizi değerlendirip en doğru çözümü öneriyoruz.',
    category: 'pricing',
  },
  {
    id: 'p5',
    question: 'Bakım ve destek maliyeti var mı?',
    answer:
      'Proje teslimatından sonra 3 ay ücretsiz bakım ve destek veriyoruz. Sonrasında aylık bakım paketlerimiz mevcut (opsiyonel).',
    category: 'pricing',
  },
  // PROCESS
  {
    id: 'pr1',
    question: 'Bir proje ne kadar sürer?',
    answer:
      'Projenin kapsamına göre değişir. Basit web sitesi 2-4 hafta, karmaşık web uygulaması 2-4 ay, mobil app 3-6 ay sürebilir. İlk görüşmede net timeline veriyoruz.',
    category: 'process',
  },
  {
    id: 'pr2',
    question: 'İş akışınız nasıl işliyor?',
    answer:
      '1) Keşif & Analiz, 2) Tasarım & Onay, 3) Geliştirme & Test, 4) Teslimat & Eğitim, 5) Destek & Bakım aşamalarından oluşuyor. Her aşamada düzenli raporlama yapıyoruz.',
    category: 'process',
  },
  {
    id: 'pr3',
    question: 'Revizyon hakkı var mı?',
    answer:
      'Evet, her aşamada belirli sayıda revizyon hakkı veriyoruz. Tasarım aşamasında genellikle 2-3 round revizyon dahildir.',
    category: 'process',
  },
  {
    id: 'pr4',
    question: 'Proje ilerlemesini nasıl takip ederiz?',
    answer:
      "Haftalık sprint meeting'ler, online proje yönetim araçları (Jira/Asana) ve düzenli progress report'lar ile şeffaf takip sağlıyoruz.",
    category: 'process',
  },
  {
    id: 'pr5',
    question: 'Acil projeler için çalışır mısınız?',
    answer:
      'Evet, express servisimiz var. Acil projelerde ekstra ücret karşılığı önceliklendirme yapabiliyoruz.',
    category: 'process',
  },
  // TECHNICAL
  {
    id: 't1',
    question: 'Hangi teknolojileri kullanıyorsunuz?',
    answer:
      'React, Next.js, Node.js, Python, PostgreSQL, MongoDB gibi modern ve güçlü teknolojiler kullanıyoruz. Tech stack bölümümüzde detaylı listeyi görebilirsiniz.',
    category: 'technical',
  },
  {
    id: 't2',
    question: 'Responsive tasarım yapıyor musunuz?',
    answer:
      'Elbette! Tüm projelerimiz mobile-first yaklaşımla, her cihazda mükemmel görünecek şekilde geliştirilir.',
    category: 'technical',
  },
  {
    id: 't3',
    question: 'SEO optimizasyonu dahil mi?',
    answer:
      'Evet, tüm web projelerimizde temel SEO optimizasyonu standarttır. İleri seviye SEO için ayrı paketlerimiz var.',
    category: 'technical',
  },
  {
    id: 't4',
    question: 'Hosting ve domain hizmeti veriyor musunuz?',
    answer:
      'Evet, tercih ederseniz hosting kurulumu ve yönetimini yapıyoruz. Ya da mevcut hosting\'inizde çalışabiliriz.',
    category: 'technical',
  },
]

const categories = [
  {
    id: 'all',
    label: 'Tümü',
    icon: HelpCircle,
    count: faqs.length,
  },
  {
    id: 'general',
    label: 'Genel',
    icon: MessageCircle,
    count: faqs.filter((f) => f.category === 'general').length,
  },
  {
    id: 'pricing',
    label: 'Fiyatlandırma',
    icon: DollarSign,
    count: faqs.filter((f) => f.category === 'pricing').length,
  },
  {
    id: 'process',
    label: 'Süreç & Zaman',
    icon: Clock,
    count: faqs.filter((f) => f.category === 'process').length,
  },
  {
    id: 'technical',
    label: 'Teknik',
    icon: Code,
    count: faqs.filter((f) => f.category === 'technical').length,
  },
]

/**
 * FAQ section with accordion, categories and search
 */
export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  // Memoized filtered FAQs for performance
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'all' || faq.category === activeCategory
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value)
      }, 300),
    []
  )

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value)
    debouncedSearch(value)
  }

  return (
    <section
      id="faq"
      className="py-24 md:py-32 relative overflow-hidden bg-muted/30"
      role="region"
      aria-label="Frequently asked questions"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Sık Sorulan Sorular</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="block">Merak Ettikleriniz</span>
            <span className="text-gradient">Burada Yanıtlı</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
            Bulamadıysanız bize ulaşın!
          </p>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.2} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Soru ara..."
              value={searchInput}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors focus:outline-none"
              role="searchbox"
              aria-label="Search frequently asked questions"
            />
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.3} className="mb-12">
          <div
            role="tablist"
            aria-label="FAQ categories"
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  aria-controls="faq-content"
                  className={cn(
                    'group flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all',
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-lg scale-105 category-active'
                      : 'glass hover:bg-primary/10'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      activeCategory === category.id
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

        {/* FAQ Accordion */}
        <ScrollReveal delay={0.4} className="max-w-4xl mx-auto">
          <div id="faq-content" role="tabpanel">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openItem === faq.id}
                    onToggle={() => toggleItem(faq.id)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-2xl">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Aradığınız soruyu bulamadık.{' '}
                  <a
                    href="#contact"
                    className="text-primary hover:underline"
                    aria-label="İletişim sayfasına git"
                  >
                    Bize sorun!
                  </a>
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.6} className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 glass px-8 py-6 rounded-2xl max-w-2xl">
            <Sparkles className="h-8 w-8 text-primary" />
            <p className="text-lg">Hala sorunuz mu var? Doğrudan bizimle konuşun!</p>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:scale-105 transition-transform will-change-transform"
              aria-label="İletişim sayfasına git"
            >
              İletişime Geç
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/**
 * FAQ Item Component with GSAP animations
 */
function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      contentRef.current.style.height = isOpen ? 'auto' : '0'
      contentRef.current.style.opacity = isOpen ? '1' : '0'
      return
    }

    if (isOpen) {
      // Temporarily set to auto to measure natural height
      contentRef.current.style.height = 'auto'
      const height = contentRef.current.scrollHeight
      contentRef.current.style.height = '0'
      
      // Use requestAnimationFrame to ensure the height reset is applied
      requestAnimationFrame(() => {
        if (!contentRef.current) return
        gsap.to(contentRef.current, {
          height: height,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            if (contentRef.current) {
              contentRef.current.style.height = 'auto'
            }
          },
        })
      })
    } else {
      const height = contentRef.current.scrollHeight
      contentRef.current.style.height = `${height}px`
      requestAnimationFrame(() => {
        if (!contentRef.current) return
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (!iconRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      iconRef.current.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
      return
    }

    gsap.to(iconRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [isOpen])

  return (
    <div
      className={cn(
        'faq-item-enter glass rounded-xl overflow-hidden transition-all',
        isOpen && 'ring-2 ring-primary/50'
      )}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 flex items-start gap-4 text-left hover:bg-primary/5 transition-colors group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold group-hover:text-primary transition-colors">
            {faq.question}
          </h3>
        </div>
        <div
          ref={iconRef}
          className="shrink-0 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
        >
          {isOpen ? (
            <Minus className="h-5 w-5 text-primary" />
          ) : (
            <Plus className="h-5 w-5 text-primary" />
          )}
        </div>
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        id={`faq-answer-${faq.id}`}
        role="region"
        aria-labelledby={`faq-question-${faq.id}`}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

