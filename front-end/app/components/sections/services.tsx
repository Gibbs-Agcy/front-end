'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import { useInView } from 'react-intersection-observer';
import {
  PaintBrushIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  ChartBarIcon,
  VideoCameraIcon,
  ShoppingCartIcon,
  ShareIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'ui-ux',
    title: 'UI/UX Tasarım',
    description: 'Kullanıcı deneyimini merkeze alan, modern ve etkileyici arayüz tasarımları.',
    icon: PaintBrushIcon,
    features: [
      'Kullanıcı araştırması ve persona oluşturma',
      'Wireframe ve prototipleme',
      'Responsive tasarım',
      'Kullanılabilirlik testleri',
    ],
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'web-dev',
    title: 'Web Geliştirme',
    description: 'Modern teknolojilerle hızlı, güvenli ve ölçeklenebilir web uygulamaları.',
    icon: CodeBracketIcon,
    features: [
      'Next.js, React, TypeScript',
      'SEO optimizasyonu',
      'Performance tuning',
      'API entegrasyonları',
    ],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'mobile',
    title: 'Mobil Uygulama',
    description: 'iOS ve Android için native performanslı mobil uygulamalar.',
    icon: DevicePhoneMobileIcon,
    features: [
      'React Native geliştirme',
      'Cross-platform çözümler',
      'App Store optimizasyonu',
      'Push notification entegrasyonu',
    ],
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 'branding',
    title: 'Branding & Kimlik',
    description: 'Markanızın dijital ve fiziksel dünyada güçlü bir kimlik oluşturması.',
    icon: SparklesIcon,
    features: [
      'Logo ve kurumsal kimlik',
      'Marka stratejisi',
      'Basılı materyal tasarımı',
      'Marka kılavuzu oluşturma',
    ],
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'seo',
    title: 'SEO & Dijital Pazarlama',
    description: 'Arama motorlarında üst sıralarda yer alın, hedef kitlenize ulaşın.',
    icon: ChartBarIcon,
    features: [
      'Teknik SEO analizi',
      'İçerik stratejisi',
      'Google Ads yönetimi',
      'Sosyal medya reklamları',
    ],
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    id: 'video',
    title: 'Video Prodüksiyon',
    description: 'Profesyonel video çekimi, kurgu ve motion graphics çalışmaları.',
    icon: VideoCameraIcon,
    features: [
      'Kurumsal tanıtım filmleri',
      'Ürün tanıtım videoları',
      'Motion graphics',
      '2D/3D animasyonlar',
    ],
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'ecommerce',
    title: 'E-Ticaret Çözümleri',
    description: 'Satışlarınızı artıracak, kullanıcı dostu e-ticaret platformları.',
    icon: ShoppingCartIcon,
    features: [
      'Shopify, WooCommerce entegrasyonu',
      'Ödeme sistemleri',
      'Stok yönetimi',
      'Kargo entegrasyonları',
    ],
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 'social',
    title: 'Sosyal Medya Yönetimi',
    description: 'Sosyal medyada markanızın sesini güçlendirin, etkileşim yaratın.',
    icon: ShareIcon,
    features: [
      'İçerik planlaması',
      'Community management',
      'Influencer işbirlikleri',
      'Analiz ve raporlama',
    ],
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Refs'leri birleştir
  const setRefs = (element: HTMLDivElement) => {
    sectionRef.current = element;
    inViewRef(element);
  };

  useEffect(() => {
    if (!sectionRef.current || !inView) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // GSAP Timeline ile sıralı animasyon
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.6,
      },
    });

    // Kartları sırayla animasyon yap
    tl.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
      }
    );
  }, [inView]);

  return (
    <section
      ref={setRefs}
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <SparklesIcon className="h-4 w-4" />
            Hizmetlerimiz
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="block mb-2">Markanızı Bir Sonraki</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Seviyeye Taşıyoruz
            </span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Tasarımdan geliştirmeye, pazarlamadan analitiğe kadar dijital
            dünyanın tüm ihtiyaçlarınız için yanınızdayız.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border border-border/50 px-8 py-6 rounded-2xl">
            <p className="text-lg font-medium">
              Özel bir proje mi düşünüyorsunuz?
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
              className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            >
              Hadi Konuşalım
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Modern Service Card Component
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      className="service-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative h-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-border hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
        {/* Gradient Glow on Hover */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10',
            service.gradient
          )}
        />

        {/* Icon */}
        <div className="mb-6">
          <div
            className={cn(
              'inline-flex p-3 rounded-xl transition-all duration-300 group-hover:scale-110',
              service.iconBg
            )}
          >
            <Icon className={cn('h-7 w-7', service.iconColor)} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
              style={{
                opacity: isHovered ? 1 : 0.7,
                transform: isHovered ? 'translateX(0)' : 'translateX(-5px)',
                transition: `all 0.3s ease ${i * 0.05}s`,
              }}
            >
              <div
                className={cn(
                  'mt-1 h-1.5 w-1.5 rounded-full shrink-0 bg-gradient-to-r',
                  service.gradient
                )}
              />
              <span className="flex-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="group/btn flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
          Detayları Gör
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </button>

        {/* Bottom Gradient Bar */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity',
            service.gradient
          )}
        />
      </div>
    </div>
  );
}
