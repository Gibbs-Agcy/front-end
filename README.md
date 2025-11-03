# 🚀 Dijital Ajans Web Sitesi

Modern, tek sayfalık (one-page) dijital ajans web sitesi. Next.js 14 (App Router), HeroUI ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

- 🎨 **Modern Tasarım**: HeroUI component kütüphanesi ile şık ve profesyonel görünüm
- 🌓 **Dark Mode**: Tam dark mode desteği
- 📱 **Responsive**: Tüm ekran boyutlarına uyumlu (mobile-first yaklaşım)
- ⚡ **Performans**: Next.js 14 ile optimize edilmiş performans
- 🎭 **Animasyonlar**: Framer Motion ile akıcı ve modern animasyonlar
- ♿ **Erişilebilirlik**: ARIA labels ve keyboard navigation desteği
- 🔍 **SEO**: Optimize edilmiş meta tags ve semantic HTML

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **UI Library**: HeroUI (NextUI)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Language**: TypeScript

## 📦 Kurulum

### Gereksinimler
- Node.js 18.17 veya üzeri
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Development sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📂 Proje Yapısı

```
ajans-sitesi/
├── app/
│   ├── layout.tsx          # Root layout (providers)
│   ├── page.tsx            # Ana sayfa (tüm sections)
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar (sticky, responsive)
│   ├── Hero.tsx            # Hero section
│   ├── Services.tsx        # Hizmetler section
│   ├── Portfolio.tsx       # Projeler section (filtrelenebilir)
│   ├── About.tsx           # Hakkımızda section
│   ├── Testimonials.tsx    # Müşteri yorumları (carousel)
│   ├── Contact.tsx         # İletişim formu
│   └── Footer.tsx          # Footer
├── lib/
│   └── providers.tsx       # NextUI & Theme providers
├── public/                 # Static files
├── tailwind.config.ts      # Tailwind yapılandırması
├── tsconfig.json          # TypeScript yapılandırması
├── next.config.mjs        # Next.js yapılandırması
└── package.json
```

## 🎯 Sections

### 1. **Navbar**
- Sticky pozisyon
- Smooth scroll navigation
- Mobile hamburger menu
- Dark mode toggle

### 2. **Hero Section**
- Full viewport height
- Animated gradient background
- CTA buttons
- İstatistikler

### 3. **Services**
- 6 farklı hizmet kartı
- Grid layout (responsive)
- Hover animasyonları
- İkonlar ile görselleştirme

### 4. **Portfolio**
- Filtrelenebilir proje listesi (Web, Mobile, Design)
- Proje kartları
- Teknoloji badges
- Hover efektleri

### 5. **About**
- İstatistikler
- Ekip üyeleri
- Yetenek grafikleri
- Misyon bildirisi

### 6. **Testimonials**
- Auto-play carousel
- Müşteri yorumları
- 5 yıldızlı değerlendirme
- Marka logoları

### 7. **Contact**
- İletişim formu (validation)
- İletişim bilgileri
- Sosyal medya linkleri
- Çalışma saatleri

### 8. **Footer**
- Hızlı linkler
- Hizmetler listesi
- Newsletter signup
- Sosyal medya
- Scroll to top button

## 🎨 Renk Paleti

```javascript
primary: #0070f3    // Mavi
secondary: #7928ca  // Mor
success: #17c964    // Yeşil
warning: #f5a524    // Turuncu
danger: #f31260     // Kırmızı
```

## 🚀 Production Build

```bash
# Build oluşturma
npm run build

# Production sunucusu
npm start
```

## 📝 Özelleştirme

### Renkleri Değiştirme
`tailwind.config.ts` dosyasındaki `nextui` plugin konfigürasyonunu düzenleyin.

### İçerik Güncelleme
Her section için ilgili component dosyasını (`components/` klasörü) düzenleyin.

### Font Değiştirme
`app/layout.tsx` dosyasında Next.js font import'unu değiştirin.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performans Optimizasyonları

- Next.js Image component ile optimize edilmiş görseller
- Lazy loading
- Code splitting
- Font optimization
- CSS purging

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için:
- Email: info@dijitalajans.com
- Website: [dijitalajans.com](#)

---

**Made with ❤️ using Next.js & HeroUI**

