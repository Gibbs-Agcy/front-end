'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  X, 
  ArrowRight, 
  Hash, 
  Users, 
  Code,
  DollarSign,
  Clock,
  MessageCircle,
  Palette,
  TrendingUp,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { searchContent, highlightMatch, SearchItem } from '@/lib/search-engine'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (href: string) => void
}

const allContent: SearchItem[] = [
  {
    id: 'service-web',
    title: 'Web Tasarım & Geliştirme',
    description: 'Modern teknolojilerle hızlı, güvenli ve ölçeklenebilir web uygulamaları',
    category: 'Hizmetler',
    href: '#services',
    icon: Code,
    keywords: ['web', 'tasarım', 'geliştirme', 'website', 'react', 'nextjs', 'frontend', 'backend', 'fullstack'],
    content: 'Web tasarım ve geliştirme hizmetimiz ile modern, responsive ve SEO uyumlu websiteleri oluşturuyoruz. React, Next.js, TypeScript gibi güncel teknolojileri kullanarak hızlı ve güvenli web uygulamaları geliştiriyoruz.'
  },
  {
    id: 'service-mobile',
    title: 'Mobil Uygulama Geliştirme',
    description: 'iOS ve Android için native performanslı mobil uygulamalar',
    category: 'Hizmetler',
    href: '#services',
    icon: Code,
    keywords: ['mobil', 'app', 'uygulama', 'ios', 'android', 'react native', 'flutter'],
    content: 'Mobil uygulama geliştirme hizmetimizle iOS ve Android platformları için cross-platform uygulamalar geliştiriyoruz. React Native ve Flutter teknolojilerini kullanarak native performans sağlıyoruz.'
  },
  {
    id: 'service-branding',
    title: 'Branding & Kimlik Tasarımı',
    description: 'Markanızın dijital ve fiziksel dünyada güçlü bir kimlik oluşturması',
    category: 'Hizmetler',
    href: '#services',
    icon: Palette,
    keywords: ['branding', 'marka', 'kimlik', 'logo', 'tasarım', 'grafik', 'görsel', 'kurumsal kimlik'],
    content: 'Branding ve kurumsal kimlik tasarımı ile markanızın benzersiz bir kimlik kazanmasını sağlıyoruz. Logo tasarımı, kartvizit, antetli kağıt ve tüm kurumsal materyalleri oluşturuyoruz.'
  },
  {
    id: 'service-seo',
    title: 'SEO & Dijital Pazarlama',
    description: 'Arama motorlarında üst sıralarda yer alın',
    category: 'Hizmetler',
    href: '#services',
    icon: TrendingUp,
    keywords: ['seo', 'pazarlama', 'dijital', 'marketing', 'google', 'reklam', 'ads', 'sosyal medya'],
    content: 'SEO ve dijital pazarlama hizmetlerimizle Google ve diğer arama motorlarında üst sıralarda yer almanızı sağlıyoruz. Google Ads, sosyal medya reklamları ve içerik pazarlaması yapıyoruz.'
  },
  {
    id: 'service-video',
    title: 'Video Prodüksiyon',
    description: 'Profesyonel video çekimi, kurgu ve motion graphics',
    category: 'Hizmetler',
    href: '#services',
    icon: Code,
    keywords: ['video', 'prodüksiyon', 'çekim', 'kurgu', 'editing', 'motion graphics', 'animasyon'],
    content: 'Video prodüksiyon hizmetimizle kurumsal tanıtım filmleri, ürün tanıtım videoları ve motion graphics çalışmaları yapıyoruz. Profesyonel ekipmanlar ve yaratıcı ekibimizle projelerinizi hayata geçiriyoruz.'
  },
  {
    id: 'service-ecommerce',
    title: 'E-Ticaret Çözümleri',
    description: 'Satışlarınızı artıracak e-ticaret platformları',
    category: 'Hizmetler',
    href: '#services',
    icon: DollarSign,
    keywords: ['eticaret', 'e-ticaret', 'online satış', 'mağaza', 'shopify', 'woocommerce', 'alışveriş'],
    content: 'E-ticaret çözümlerimizle online satış platformları kuruyoruz. Shopify, WooCommerce entegrasyonları, ödeme sistemleri ve kargo entegrasyonları ile tam çözüm sunuyoruz.'
  },
  {
    id: 'team-goktug',
    title: 'Göktuğ - Back-end Developer',
    description: 'Node.js ve Python uzmanı. Ölçeklenebilir API ve veritabanı mimarisi.',
    category: 'Ekip',
    href: '#team',
    icon: Users,
    keywords: ['göktuğ', 'backend', 'developer', 'node', 'nodejs', 'python', 'api', 'database', 'postgresql'],
    content: 'Göktuğ, backend geliştirme konusunda 5+ yıl deneyime sahip. Node.js, Python, PostgreSQL, Redis ve Docker teknolojilerinde uzman. Mikroservis mimarisi ve cloud teknolojilerinde derin bilgi sahibi.'
  },
  {
    id: 'team-ibrahim',
    title: 'İbrahim Ethem Kalemci - Front-End Developer',
    description: 'React ve Next.js ile modern web uygulamaları geliştiriyor.',
    category: 'Ekip',
    href: '#team',
    icon: Users,
    keywords: ['ibrahim', 'ethem', 'kalemci', 'frontend', 'developer', 'react', 'nextjs', 'typescript', 'tailwind', 'gsap'],
    content: 'İbrahim Ethem, frontend development alanında uzman. React, Next.js, TypeScript ve modern CSS framework\'leri ile kullanıcı dostu arayüzler geliştiriyor. Animasyon ve interaktif deneyimler konusunda tutkulu.'
  },
  {
    id: 'tech-frontend',
    title: 'Frontend Teknolojileri',
    description: 'React, Next.js, TypeScript ve modern araçlar',
    category: 'Teknoloji',
    href: '#tech-stack',
    icon: Hash,
    keywords: ['react', 'nextjs', 'typescript', 'javascript', 'tailwind', 'css', 'html', 'frontend'],
    content: 'Frontend teknolojilerimiz arasında React, Next.js, TypeScript, Tailwind CSS, GSAP ve Three.js bulunuyor. Modern ve performanslı web uygulamaları geliştiriyoruz.'
  },
  {
    id: 'tech-backend',
    title: 'Backend Teknolojileri',
    description: 'Node.js, Python, PostgreSQL ve cloud çözümleri',
    category: 'Teknoloji',
    href: '#tech-stack',
    icon: Hash,
    keywords: ['nodejs', 'python', 'backend', 'api', 'database', 'postgresql', 'mongodb', 'redis'],
    content: 'Backend teknolojilerimizde Node.js, Python, Express, Django, PostgreSQL, MongoDB ve Redis kullanıyoruz. RESTful API ve GraphQL ile güçlü backend sistemleri kuruyoruz.'
  },
  {
    id: 'faq-pricing',
    title: 'Proje fiyatları nasıl belirleniyor?',
    description: 'Fiyatlandırma süreci ve ödeme yöntemleri hakkında bilgi',
    category: 'SSS',
    href: '#faq',
    icon: DollarSign,
    keywords: ['fiyat', 'ücret', 'maliyet', 'bütçe', 'para', 'ödeme', 'tutar', 'pricing'],
    content: 'Proje fiyatları, projenin kapsamı, karmaşıklığı, süre ve gereksinimlerine göre belirleniyor. İlk görüşmede detaylı analiz yapıp şeffaf teklif sunuyoruz. Esnek ödeme planları mevcuttur.'
  },
  {
    id: 'faq-payment',
    title: 'Ödeme yöntemleri ve planları',
    description: 'Esnek ödeme seçenekleri ve taksitlendirme',
    category: 'SSS',
    href: '#faq',
    icon: DollarSign,
    keywords: ['ödeme', 'para', 'taksit', 'payment', 'kredi kartı', 'banka', 'havale'],
    content: 'Ödeme planlarımızda esneklik sunuyoruz. Genellikle %40 başlangıç, %30 ara ödeme, %30 teslimat şeklinde çalışıyoruz. Kredi kartı, banka havalesi ve taksit seçenekleri mevcuttur.'
  },
  {
    id: 'faq-budget',
    title: 'Bütçem sınırlı, ne yapabiliriz?',
    description: 'Farklı bütçelere uygun çözümler',
    category: 'SSS',
    href: '#faq',
    icon: DollarSign,
    keywords: ['bütçe', 'para', 'ucuz', 'ekonomik', 'fiyat', 'ödeme'],
    content: 'Startup\'lardan kurumsal firmalara kadar her ölçekte projeye açığız. Bütçenize uygun esnek çözümler sunuyoruz. MVP (Minimum Viable Product) ile başlayıp aşamalı geliştirme yapabiliriz.'
  },
  {
    id: 'faq-duration',
    title: 'Bir proje ne kadar sürer?',
    description: 'Proje süreleri ve teslim tarihleri',
    category: 'SSS',
    href: '#faq',
    icon: Clock,
    keywords: ['süre', 'zaman', 'ne kadar', 'deadline', 'teslim', 'tarih'],
    content: 'Projenin kapsamına göre değişir. Basit web sitesi 2-4 hafta, karmaşık web uygulaması 2-4 ay, mobil app 3-6 ay sürebilir. İlk görüşmede net timeline veriyoruz.'
  },
  {
    id: 'faq-process',
    title: 'İş akışı nasıl işliyor?',
    description: 'Proje geliştirme süreci adım adım',
    category: 'SSS',
    href: '#faq',
    icon: Clock,
    keywords: ['süreç', 'akış', 'process', 'workflow', 'adımlar', 'nasıl'],
    content: 'İş akışımız 5 aşamadan oluşuyor: 1) Keşif & Analiz, 2) Tasarım & Onay, 3) Geliştirme & Test, 4) Teslimat & Eğitim, 5) Destek & Bakım. Her aşamada düzenli raporlama yapıyoruz.'
  },
  {
    id: 'contact-email',
    title: 'Email ile İletişim',
    description: 'hello@gibbs.agency adresinden bize ulaşın',
    category: 'İletişim',
    href: '#contact',
    icon: Mail,
    keywords: ['email', 'mail', 'eposta', 'iletişim', 'mesaj', 'yaz'],
    content: 'Email adresimiz: hello@gibbs.agency - 24 saat içinde geri dönüş yapıyoruz. Proje detayları, teklif talebi veya genel sorularınız için bize yazabilirsiniz.'
  },
  {
    id: 'contact-phone',
    title: 'Telefon ile İletişim',
    description: '+90 (555) 123 45 67 numarasından arayabilirsiniz',
    category: 'İletişim',
    href: '#contact',
    icon: Mail,
    keywords: ['telefon', 'ara', 'phone', 'iletişim', 'çağrı'],
    content: 'Telefon numaramız: +90 (555) 123 45 67 - Hafta içi 09:00-18:00 saatleri arası ulaşabilirsiniz. Acil durumlar için email\'i tercih edebilirsiniz.'
  },
  {
    id: 'contact-form',
    title: 'İletişim Formu',
    description: 'Online formumuzdan hızlıca mesaj gönderin',
    category: 'İletişim',
    href: '#contact',
    icon: MessageCircle,
    keywords: ['form', 'mesaj', 'iletişim', 'yaz', 'gönder'],
    content: 'İletişim formumuzu doldurarak bize ulaşabilirsiniz. Adınız, email, telefon ve mesajınızı paylaşın. 24 saat içinde size dönüş yapacağız.'
  },
]

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Body scroll'u engelle
      document.body.style.overflow = 'hidden'
      // Input'a focus
      inputRef.current?.focus()
    } else {
      // Body scroll'u aç
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Modal içinde scroll olayını durdur
  useEffect(() => {
    if (!modalRef.current || !isOpen) return

    const modal = modalRef.current

    const preventParentScroll = (e: WheelEvent) => {
      e.stopPropagation()
    }

    modal.addEventListener('wheel', preventParentScroll, { passive: true })

    return () => {
      modal.removeEventListener('wheel', preventParentScroll)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults(allContent.slice(0, 8))
      return
    }
    const searchResults = searchContent(allContent, query)
    setResults(searchResults)
    setSelectedIndex(0)
  }, [query])

  const handleSelect = (href: string) => {
    onNavigate(href)
    onClose()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex].href)
          }
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  if (!isOpen) return null

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, SearchItem[]>)

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-border shrink-0">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Arama yapın... (örn: para, ödeme, süre, tasarım)"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <kbd className="h-6 px-2 flex items-center gap-1 rounded border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
        </div>
        <div 
          ref={resultsRef}
          className="search-results-scroll overflow-y-auto flex-1 p-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--primary) / 0.3) transparent',
          }}
        >
          {results.length > 0 ? (
            <div className="space-y-4">
              {!query && (
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  Popüler Aramalar
                </div>
              )}
              {query ? (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 py-1 text-xs font-medium text-muted-foreground flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span>{category}</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    {items.map((item) => {
                      const globalIndex = results.indexOf(item)
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className={cn(
                            'w-full flex items-start gap-3 p-3 rounded-xl transition-all group text-left',
                            globalIndex === selectedIndex
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted border border-transparent'
                          )}
                        >
                          <div className={cn(
                            "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                            globalIndex === selectedIndex
                              ? 'bg-primary/20'
                              : 'bg-primary/10 group-hover:bg-primary/20'
                          )}>
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div 
                              className="text-sm font-medium mb-1 line-clamp-1"
                              dangerouslySetInnerHTML={{ 
                                __html: highlightMatch(item.title, query) 
                              }}
                            />
                            <div 
                              className="text-xs text-muted-foreground line-clamp-2"
                              dangerouslySetInnerHTML={{ 
                                __html: highlightMatch(item.description, query) 
                              }}
                            />
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className={cn(
                            "h-4 w-4 text-muted-foreground shrink-0 transition-all",
                            globalIndex === selectedIndex
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          )} />
                        </button>
                      )
                    })}
                  </div>
                ))
              ) : (
                results.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      className={cn(
                        'w-full flex items-start gap-3 p-3 rounded-xl transition-all group text-left',
                        index === selectedIndex
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted border border-transparent'
                      )}
                    >
                      <div className={cn(
                        "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        index === selectedIndex
                          ? 'bg-primary/20'
                          : 'bg-primary/10 group-hover:bg-primary/20'
                      )}>
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium mb-1 line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={cn(
                        "h-4 w-4 text-muted-foreground shrink-0 transition-all",
                        index === selectedIndex
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                      )} />
                    </button>
                  )
                })
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-sm font-medium mb-1">Sonuç bulunamadı</p>
              <p className="text-xs text-muted-foreground max-w-sm">
                "<span className="font-medium text-foreground">{query}</span>" için herhangi bir sonuç bulunamadı.
                Farklı kelimeler deneyebilirsiniz.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
                <span className="text-xs text-muted-foreground">Önerilenler:</span>
                {['tasarım', 'fiyat', 'ekip', 'iletişim'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-t border-border text-xs text-muted-foreground shrink-0 bg-muted/30">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <kbd className="h-5 px-1.5 rounded border border-border bg-background/50">↑</kbd>
              <kbd className="h-5 px-1.5 rounded border border-border bg-background/50">↓</kbd>
              <span className="hidden sm:inline">Gezin</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="h-5 px-1.5 rounded border border-border bg-background/50">↵</kbd>
              <span className="hidden sm:inline">Seç</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="h-5 px-1.5 rounded border border-border bg-background/50">ESC</kbd>
              <span className="hidden sm:inline">Kapat</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {results.length > 0 && (
              <span className="text-[10px] px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                {results.length} sonuç
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

