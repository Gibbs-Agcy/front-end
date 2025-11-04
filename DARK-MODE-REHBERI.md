# 🌓 Dark Mode Rehberi

## ✅ Yapılan Güncellemeler

### 1. **Renk Paleti**
Modern ve göz dostu bir renk paleti oluşturuldu:

#### Light Mode
- **Background**: `#FFFFFF` (Beyaz)
- **Foreground**: `#0f172a` (Koyu Slate)
- **Primary**: `#006FEE` (Parlak Mavi)
- **Secondary**: `#7828c8` (Mor)
- **Card Background**: `#f8fafc` (Açık Gri)

#### Dark Mode
- **Background**: `#0f172a` (Koyu Slate)
- **Foreground**: `#f1f5f9` (Açık Gri)
- **Primary**: `#3b82f6` (Yumuşak Mavi)
- **Secondary**: `#a855f7` (Açık Mor)
- **Card Background**: `#1e293b` (Orta Slate)

### 2. **Component Güncellemeleri**

#### ✅ Navbar
- Dark mode toggle butonu güncellendi
- Light mode: Mavi Ay ikonu 🌙
- Dark mode: Turuncu Güneş ikonu ☀️
- Smooth geçişler eklendi

#### ✅ Hero Section
- Animated gradient background dark mode için optimize edildi
- İstatistik sayıları gradient renkte
- Daha yumuşak animasyonlar

#### ✅ Services Section
- Card'lar dark mode için güncellendi
- Metin kontrastları iyileştirildi

#### ✅ Portfolio Section
- Filtreleme butonları dark mode uyumlu
- Proje kartları dark background'da okunabilir

#### ✅ About Section
- İstatistik kartları gradient renklerle
- Progress bar'lar primary renkte
- Ekip kartları dark mode uyumlu

#### ✅ Testimonials
- Carousel kartları dark mode'da kontrast
- Yıldız ikonları parlak warning rengi

#### ✅ Contact Section
- Form dark mode'da rahat kullanılabilir
- Input alanları border'lı ve okunabilir
- Gradient kartlar dark mode'da daha belirgin

#### ✅ Footer
- Koyu slate background
- Linkler hover'da primary renge döner
- Border'lar dark mode'da uyumlu

### 3. **Teknik Özellikler**

```css
/* CSS Variables - Auto switching */
:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
}
```

```typescript
// Theme Provider Ayarları
<NextThemesProvider 
  attribute="class"          // class-based dark mode
  defaultTheme="light"       // Başlangıç teması
  enableSystem={false}       // Sistem temasını devre dışı bırak
  storageKey="ajans-theme"   // LocalStorage'da sakla
>
```

### 4. **Tailwind Dark Mode Classes**

Tüm componentlerde kullanılan pattern:

```tsx
<div className="bg-white dark:bg-slate-800">
  <p className="text-slate-900 dark:text-slate-100">
    Metin içeriği
  </p>
</div>
```

### 5. **Smooth Transitions**

Body elementine transition eklendi:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## 🎨 Renk Kullanımı

### Metin Kontrastları
- **Light Mode**: `text-foreground/60` (hafif soluk)
- **Dark Mode**: `text-foreground/70` (biraz daha parlak)

### Background'lar
- **Sections**: Alternatif olarak `bg-background` ve `bg-slate-50/dark:bg-slate-900/50`
- **Cards**: `bg-content1` veya `bg-white dark:bg-slate-800`
- **Gradients**: `from-primary/10 dark:from-primary/20` (dark mode'da daha belirgin)

## 🚀 Kullanım

1. **Tema Değiştirme**: Navbar'daki sağ üst köşedeki güneş/ay ikonuna tıklayın

2. **Tema Otomatik Kaydediliyor**: LocalStorage'da `ajans-theme` anahtarıyla saklanıyor

3. **Sayfa Yenilendiğinde**: Son seçilen tema korunuyor

## 🎯 Test Checklist

### Light Mode ✅
- [ ] Tüm metinler okunabilir
- [ ] Kartlar beyaz/açık gri background
- [ ] Primary renk parlak mavi
- [ ] Hover efektleri çalışıyor

### Dark Mode ✅
- [ ] Tüm metinler kontrast
- [ ] Kartlar koyu slate background
- [ ] Primary renk yumuşak mavi
- [ ] Gradient'ler belirgin
- [ ] Scroll indicator görünür
- [ ] Form input'ları border'lı

### Animasyonlar ✅
- [ ] Hero section gradient animasyonu
- [ ] Scroll animations smooth
- [ ] Theme geçişi 0.3s smooth

## 💡 Özelleştirme

### Renkleri Değiştirmek

`tailwind.config.ts` dosyasını düzenleyin:

```typescript
themes: {
  dark: {
    colors: {
      primary: {
        DEFAULT: "#3b82f6", // İstediğiniz renk
      }
    }
  }
}
```

### Yeni Renk Eklemek

```typescript
// tailwind.config.ts
extend: {
  colors: {
    'custom-dark': '#1a1a2e',
  }
}
```

Sonra kullanın:

```tsx
<div className="bg-white dark:bg-custom-dark">
```

## 📊 Performans

- ✅ CSS Variables kullanımı (hızlı geçiş)
- ✅ Class-based switching (JavaScript minimal)
- ✅ LocalStorage (tercih saklanıyor)
- ✅ No Flash (Hydration sırasında tema korunur)

## 🐛 Sorun Giderme

### Dark Mode Çalışmıyorsa

1. Tarayıcı console'u açın
2. Theme switch butonuna tıklayın
3. Console'da "Theme switched to: dark/light" mesajını görmelisiniz
4. `localStorage.getItem('ajans-theme')` yazıp kontrol edin

### Renkler Doğru Değilse

1. Sayfayı hard refresh yapın (Ctrl+Shift+R)
2. Browser cache'i temizleyin
3. `npm run dev` sunucusunu yeniden başlatın

---

**🎉 Artık tam fonksiyonel, güzel dark mode'unuz var!**

Navbar'daki güneş/ay butonuna tıklayıp test edebilirsiniz.

