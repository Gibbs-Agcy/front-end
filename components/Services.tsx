'use client'

import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  FiCode, 
  FiSmartphone, 
  FiLayout, 
  FiTrendingUp, 
  FiPackage,
  FiShoppingCart 
} from "react-icons/fi";

export default function Services() {
  const services = [
    {
      icon: <FiCode size={40} />,
      title: "Web Development",
      description: "Modern, hızlı ve SEO uyumlu web siteleri ve web uygulamaları geliştiriyoruz.",
      color: "primary",
    },
    {
      icon: <FiSmartphone size={40} />,
      title: "Mobile App Development",
      description: "iOS ve Android için native ve cross-platform mobil uygulamalar oluşturuyoruz.",
      color: "secondary",
    },
    {
      icon: <FiLayout size={40} />,
      title: "UI/UX Design",
      description: "Kullanıcı deneyimini ön planda tutan, modern ve etkileyici tasarımlar yapıyoruz.",
      color: "success",
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: "Digital Marketing",
      description: "SEO, SEM ve sosyal medya pazarlama ile markanızı büyütüyoruz.",
      color: "warning",
    },
    {
      icon: <FiPackage size={40} />,
      title: "Brand Identity",
      description: "Markanız için özgün logo, renk paleti ve kurumsal kimlik çalışmaları sunuyoruz.",
      color: "danger",
    },
    {
      icon: <FiShoppingCart size={40} />,
      title: "E-commerce Solutions",
      description: "Güvenli, ölçeklenebilir ve dönüşüm odaklı e-ticaret platformları kuruyoruz.",
      color: "primary",
    },
  ];

  // Animasyon varyantları
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 px-4 bg-background dark:bg-background">
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
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Dijital dünyada ihtiyacınız olan her şey için kapsamlı çözümler sunuyoruz
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer bg-content1 dark:bg-content1"
                isPressable
              >
                <CardHeader className="flex flex-col items-start pb-0">
                  <div className={`text-${service.color} mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-foreground/60 dark:text-foreground/70">{service.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

