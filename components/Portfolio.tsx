'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardFooter, Image, Chip, Button } from "@nextui-org/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animationDirection, setAnimationDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const projects = [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      description: "Modern ve kullanıcı dostu bir e-ticaret web sitesi",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["Next.js", "Stripe", "Tailwind"],
    },
    {
      id: 2,
      title: "Finans Mobil Uygulaması",
      description: "iOS ve Android için finans takip uygulaması",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 3,
      title: "Restoran Web Sitesi",
      description: "Rezervasyon sistemi entegre restoran sitesi",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 4,
      title: "Fitness App UI/UX",
      description: "Fitness takip uygulaması için tasarım",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      category: "design",
      technologies: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      id: 5,
      title: "Kurumsal Dashboard",
      description: "Veri analizi ve raporlama dashboard'u",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["Vue.js", "Chart.js", "D3.js"],
    },
    {
      id: 6,
      title: "Sosyal Medya Uygulaması",
      description: "Topluluk odaklı mobil sosyal platform",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["Flutter", "Firebase", "GraphQL"],
    },
  ];

  const filters = [
    { id: "all", label: "Tümü" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "design", label: "Design" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Sürekli döngü için projeleri kopyala (infinite scroll için)
  // En az 10 kart olacak şekilde kopyala ki smooth scroll sağlansın
  const getDuplicatedProjects = () => {
    const minItems = 10;
    const copiesNeeded = Math.ceil(minItems / filteredProjects.length) + 2;
    const duplicated = [];
    for (let i = 0; i < copiesNeeded; i++) {
      duplicated.push(...filteredProjects);
    }
    return duplicated;
  };

  const duplicatedProjects = filteredProjects.length > 0 ? getDuplicatedProjects() : [];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    // Filter değiştiğinde animasyonu durdur ve pozisyonu sıfırla
    controls.stop();
    x.set(0);
    setIsPaused(false);
  };

  // Her kartın genişliği (gap dahil)
  const cardWidth = 320; // 300px card + 20px gap (gap-4 = 16px, ama güvenli olması için 320)

  // Animasyonu başlat
  useEffect(() => {
    if (duplicatedProjects.length > 0 && filteredProjects.length > 0 && !isPaused) {
      const loopDistance = filteredProjects.length * cardWidth;
      const loopDuration = filteredProjects.length * 2;
      
      // Mevcut pozisyonu al
      const currentX = x.get();
      
      // Pozisyonu normalize et (loop aralığına) - her zaman 0 ile -loopDistance arasında
      let normalizedX = currentX % loopDistance;
      if (normalizedX > 0) {
        normalizedX = normalizedX - loopDistance;
      }
      if (normalizedX < -loopDistance) {
        normalizedX = normalizedX + loopDistance;
      }
      
      // Önemli: Animasyonu her zaman aynı hızda başlatmak için
      // Animasyonu her zaman tam loop mesafesi (normalizedX'ten normalizedX - loopDistance'e) için başlatıyoruz
      // Bu şekilde animasyon her zaman aynı mesafeyi aynı sürede katedecek
      
      // Pozisyonu ayarla
      x.set(normalizedX);
      
      // Animasyonu başlat - her zaman tam loop mesafesi için tam süre
      // normalizedX'ten normalizedX - loopDistance'e gidecek (tam loop mesafesi)
      // Bu şekilde animasyon her zaman aynı hızda olacak
      controls.start({
        x: normalizedX - loopDistance,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: loopDuration,
            ease: "linear",
          },
        },
      });
    }
  }, [activeFilter, filteredProjects.length, duplicatedProjects.length, isPaused, controls, cardWidth, x]);

  // Mouse hover kontrolü
  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    // useEffect otomatik olarak animasyonu devam ettirecek
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projelerimiz
          </h2>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto mb-8">
            Başarıyla tamamladığımız projelerden bazıları
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={activeFilter === filter.id ? "solid" : "bordered"}
                color={activeFilter === filter.id ? "primary" : "default"}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Infinite Slider Container */}
        <div className="relative w-full overflow-hidden">
          {/* Sol Ok Butonu */}
          <Button
            isIconOnly
            variant="solid"
            color="primary"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
            onClick={() => setAnimationDirection(-1)}
            aria-label="Önceki projeler"
          >
            <FiChevronLeft className="w-6 h-6" />
          </Button>

          {/* Sürekli Kaydıran Slider */}
          <div 
            className="overflow-hidden w-full py-4" 
            ref={sliderRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedProjects.length > 0 && (
              <motion.div
                className="flex gap-4"
                animate={controls}
                style={{
                  x,
                  width: `${duplicatedProjects.length * cardWidth}px`,
                }}
              >
                {duplicatedProjects.map((project, index) => (
                  <div
                    key={`${project.id}-${index}-${activeFilter}`}
                    className="flex-shrink-0 w-[300px]"
                  >
                    <Card
                      className="w-full h-[450px] hover:scale-105 transition-transform duration-300 bg-white dark:bg-slate-800 flex flex-col cursor-pointer"
                    >
                      <CardBody className="p-0 flex flex-col h-full">
                        <div className="relative w-full h-64 flex-shrink-0 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            radius="none"
                          />
                        </div>
                        <CardFooter className="flex-col items-start gap-2 p-4 flex-1 overflow-hidden">
                          <h3 className="text-lg font-bold line-clamp-1 w-full">{project.title}</h3>
                          <p className="text-sm text-foreground/70 dark:text-foreground/60 line-clamp-2 w-full mt-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-auto w-full">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <Chip key={i} size="sm" variant="flat" color="primary">
                                {tech}
                              </Chip>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="light"
                            color="primary"
                            className="mt-2"
                            endContent={<FiExternalLink />}
                          >
                            Detayları Gör
                          </Button>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sağ Ok Butonu */}
          <Button
            isIconOnly
            variant="solid"
            color="primary"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
            onClick={() => setAnimationDirection(1)}
            aria-label="Sonraki projeler"
          >
            <FiChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

