export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  category: string;
  technologies: string[];
  features: string[];
  price?: string;
  badge?: string;
  badgeType?: 'pro' | 'free';
  specifications?: {
    label: string;
    value: string;
  }[];
  relatedProjects?: number[];
}

export const projectDetails: ProjectDetail[] = [
  {
    id: 1,
    title: "E-Ticaret Platformu",
    description: "Modern ve kullanıcı dostu bir e-ticaret web sitesi",
    fullDescription: "Bu proje, modern e-ticaret ihtiyaçlarını karşılamak üzere geliştirilmiş, tam özellikli bir web platformudur. Kullanıcı dostu arayüzü, güvenli ödeme sistemi ve yönetim paneli ile işletmelerin online satış yapmasını kolaylaştırır.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop"
    ],
    category: "web",
    technologies: ["Next.js", "Stripe", "Tailwind", "TypeScript", "Prisma"],
    features: [
      "Responsive tasarım",
      "Güvenli ödeme sistemi",
      "Kullanıcı yönetimi",
      "Ürün yönetim paneli",
      "Sipariş takip sistemi",
      "SEO optimizasyonu"
    ],
    price: "From $ 29.99",
    badge: "Pro",
    badgeType: "pro",
    specifications: [
      { label: "Platform", value: "Web" },
      { label: "Framework", value: "Next.js 14" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Payment", value: "Stripe" }
    ],
    relatedProjects: [2, 3, 5]
  },
  {
    id: 2,
    title: "Finans Mobil Uygulaması",
    description: "iOS ve Android için finans takip uygulaması",
    fullDescription: "Kişisel finans yönetimi için geliştirilmiş kapsamlı bir mobil uygulama. Gelir-gider takibi, bütçe planlama, yatırım analizi ve finansal raporlama özellikleri sunar.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop"
    ],
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    features: [
      "iOS ve Android desteği",
      "Offline çalışma",
      "Güvenli veri saklama",
      "Grafik ve raporlama",
      "Bütçe planlama",
      "Bildirimler"
    ],
    price: "From $19.95",
    badge: "Free [Sign Up]",
    badgeType: "free",
    specifications: [
      { label: "Platform", value: "iOS & Android" },
      { label: "Framework", value: "React Native" },
      { label: "Backend", value: "Firebase" },
      { label: "State Management", value: "Redux" }
    ],
    relatedProjects: [1, 6]
  },
  {
    id: 3,
    title: "Restoran Web Sitesi",
    description: "Rezervasyon sistemi entegre restoran sitesi",
    fullDescription: "Restoran işletmeleri için özel olarak tasarlanmış, rezervasyon sistemi entegre modern web sitesi. Menü yönetimi, online rezervasyon ve müşteri yorumları gibi özellikler içerir.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Online rezervasyon",
      "Menü yönetimi",
      "Galeri sistemi",
      "Yorum sistemi",
      "Responsive tasarım",
      "SEO optimizasyonu"
    ],
    price: "From $29.99",
    badge: "Pro",
    badgeType: "pro",
    specifications: [
      { label: "Platform", value: "Web" },
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "Node.js" },
      { label: "Database", value: "MongoDB" }
    ],
    relatedProjects: [1, 5]
  },
  {
    id: 4,
    title: "Fitness App UI/UX",
    description: "Fitness takip uygulaması için tasarım",
    fullDescription: "Modern ve kullanıcı dostu bir fitness takip uygulaması için kapsamlı UI/UX tasarımı. Antrenman takibi, beslenme planlama ve ilerleme görselleştirme özellikleri içerir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    category: "design",
    technologies: ["Figma", "Adobe XD", "Prototyping", "Design System"],
    features: [
      "Modern UI tasarımı",
      "İnteraktif prototipler",
      "Design system",
      "Dark mode desteği",
      "Responsive tasarım",
      "Animasyonlar"
    ],
    price: "From $ 4.99",
    badge: "Pro",
    badgeType: "pro",
    specifications: [
      { label: "Type", value: "UI/UX Design" },
      { label: "Tools", value: "Figma, Adobe XD" },
      { label: "Screens", value: "50+ Screens" },
      { label: "Components", value: "200+ Components" }
    ],
    relatedProjects: [2, 6]
  },
  {
    id: 5,
    title: "Kurumsal Dashboard",
    description: "Veri analizi ve raporlama dashboard'u",
    fullDescription: "İşletmeler için geliştirilmiş kapsamlı veri analizi ve raporlama dashboard'u. Gerçek zamanlı veri görselleştirme, özelleştirilebilir raporlar ve detaylı analitik özellikleri sunar.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    category: "web",
    technologies: ["Vue.js", "Chart.js", "D3.js", "TypeScript"],
    features: [
      "Gerçek zamanlı veri",
      "Özelleştirilebilir dashboard",
      "Gelişmiş grafikler",
      "Rapor oluşturma",
      "Veri export",
      "Kullanıcı rolleri"
    ],
    price: "From $9.99",
    badge: "Pro",
    badgeType: "pro",
    specifications: [
      { label: "Platform", value: "Web" },
      { label: "Framework", value: "Vue.js 3" },
      { label: "Charts", value: "Chart.js, D3.js" },
      { label: "API", value: "REST API" }
    ],
    relatedProjects: [1, 3]
  },
  {
    id: 6,
    title: "Sosyal Medya Uygulaması",
    description: "Topluluk odaklı mobil sosyal platform",
    fullDescription: "Kullanıcıların bağlantı kurması, içerik paylaşması ve topluluk oluşturması için tasarlanmış modern bir sosyal medya uygulaması.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "GraphQL", "Dart"],
    features: [
      "Gerçek zamanlı mesajlaşma",
      "Hikaye özelliği",
      "Grup oluşturma",
      "İçerik paylaşımı",
      "Bildirimler",
      "Arama ve keşfet"
    ],
    price: "From $29.99",
    badge: "Pro",
    badgeType: "pro",
    specifications: [
      { label: "Platform", value: "iOS & Android" },
      { label: "Framework", value: "Flutter" },
      { label: "Backend", value: "Firebase, GraphQL" },
      { label: "Language", value: "Dart" }
    ],
    relatedProjects: [2, 4]
  }
];

export function getProjectById(id: number): ProjectDetail | undefined {
  return projectDetails.find(p => p.id === id);
}

export function getSuggestedProducts(currentProjectId: number, limit: number = 5): ProjectDetail[] {
  const currentProject = getProjectById(currentProjectId);
  if (!currentProject) return [];
  
  // Önce ilgili projeleri al, yoksa aynı kategorideki projeleri al
  let relatedIds = currentProject.relatedProjects || [];
  if (relatedIds.length === 0) {
    relatedIds = projectDetails
      .filter(p => p.id !== currentProjectId && p.category === currentProject.category)
      .map(p => p.id);
  }
  
  // Eğer hala yeterli değilse, rastgele projeler ekle
  const suggested: ProjectDetail[] = [];
  const addedIds = new Set([currentProjectId]);
  
  // İlgili projeleri ekle
  relatedIds.forEach(id => {
    const project = getProjectById(id);
    if (project && !addedIds.has(id)) {
      suggested.push(project);
      addedIds.add(id);
    }
  });
  
  // Eğer yeterli değilse, diğer projelerden ekle
  if (suggested.length < limit) {
    projectDetails.forEach(project => {
      if (suggested.length < limit && !addedIds.has(project.id)) {
        suggested.push(project);
        addedIds.add(project.id);
      }
    });
  }
  
  return suggested.slice(0, limit);
}

