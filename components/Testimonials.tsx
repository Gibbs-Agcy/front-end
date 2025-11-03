'use client'

import React from 'react';
import { Card, CardBody, Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Can Öztürk",
      role: "CEO, TechStart",
      avatar: "https://i.pravatar.cc/150?img=12",
      content: "Ajans ekibi ile çalışmak harika bir deneyimdi. E-ticaret sitemiz beklentilerimizin çok üzerinde çıktı. Profesyonel yaklaşımları ve zamanında teslimatları için teşekkürler!",
      rating: 5,
    },
    {
      id: 2,
      name: "Elif Yıldız",
      role: "Kurucu, BeautyBox",
      avatar: "https://i.pravatar.cc/150?img=10",
      content: "Mobil uygulamamız için harika bir tasarım ve geliştirme süreci yaşadık. Kullanıcı geri bildirimleri mükemmel. Kesinlikle tavsiye ederim!",
      rating: 5,
    },
    {
      id: 3,
      name: "Murat Aksoy",
      role: "Pazarlama Müdürü, FoodHub",
      avatar: "https://i.pravatar.cc/150?img=7",
      content: "Dijital pazarlama stratejileri sayesinde online görünürlüğümüz %300 arttı. ROI'miz beklentilerimizin çok üzerinde. Harika bir iş çıkardılar!",
      rating: 5,
    },
    {
      id: 4,
      name: "Selin Koç",
      role: "Kurucu, GreenLife",
      avatar: "https://i.pravatar.cc/150?img=16",
      content: "Marka kimliği çalışması için aldığımız hizmet olağanüstüydü. Logo tasarımımız ve kurumsal kimliğimiz tam istediğimiz gibi oldu. Çok memnunuz!",
      rating: 5,
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Başarılı projelerimizde iş birliği yaptığımız müşterilerimizin görüşleri
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-slate-800">
              <CardBody className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center md:items-start">
                    <Avatar
                      src={testimonials[currentIndex].avatar}
                      className="w-20 h-20 md:w-24 md:h-24"
                      isBordered
                      color="primary"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Rating Stars */}
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <FiStar key={i} className="text-warning fill-warning" size={20} />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg text-foreground/70 dark:text-foreground/80 mb-6 italic">
                      "{testimonials[currentIndex].content}"
                    </p>

                    {/* Author Info */}
                    <div>
                      <h4 className="font-bold text-xl mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-foreground/60 dark:text-foreground/70">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-foreground/60 dark:text-foreground/70 mb-8">
            Güvenen Markalar
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 dark:opacity-30">
            {["TechStart", "BeautyBox", "FoodHub", "GreenLife", "SmartHome", "EduPlus"].map((brand, index) => (
              <div key={index} className="text-2xl font-bold text-foreground/50 dark:text-foreground/40">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

