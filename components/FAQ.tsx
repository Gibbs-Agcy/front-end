'use client'

import React from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiMail } from "react-icons/fi";

export default function FAQ() {
  const faqItems = [
    {
      key: "1",
      question: "Hizmetleriniz nelerdir?",
      answer: "Web development, mobil uygulama geliştirme, UI/UX tasarım, dijital pazarlama, marka kimliği tasarımı ve e-ticaret çözümleri sunuyoruz. Her projeyi ihtiyaçlarınıza özel olarak tasarlıyoruz."
    },
    {
      key: "2",
      question: "Proje süreçleri nasıl işliyor?",
      answer: "İlk görüşmede ihtiyaçlarınızı belirliyoruz, ardından detaylı bir teklif hazırlıyoruz. Onay sonrası tasarım ve geliştirme aşamalarına geçiyoruz. Proje süresince düzenli güncellemeler ve test aşamaları ile ilerliyoruz."
    },
    {
      key: "3",
      question: "Fiyatlandırma nasıl yapılıyor?",
      answer: "Her proje benzersizdir ve ihtiyaçlarınıza göre özelleştirilir. Detaylı bir analiz sonrası size özel bir teklif hazırlıyoruz. Küçük projeler için sabit fiyat, büyük projeler için aşamalı ödeme seçenekleri sunuyoruz."
    },
    {
      key: "4",
      question: "Projelerinizde hangi teknolojileri kullanıyorsunuz?",
      answer: "Modern ve güncel teknolojiler kullanıyoruz. Web için Next.js, React, TypeScript; mobil için React Native ve Flutter; backend için Node.js, Python; tasarım için Figma ve Adobe XD gibi araçlar tercih ediyoruz."
    },
    {
      key: "5",
      question: "Proje teslim süresi ne kadar?",
      answer: "Proje kapsamına göre değişmekle birlikte, küçük projeler 2-4 hafta, orta ölçekli projeler 1-3 ay, büyük projeler 3-6 ay sürebilir. Detaylı zaman çizelgesi proje planlaması sırasında belirlenir."
    },
    {
      key: "6",
      question: "Başka bir sorum var",
      answer: "Aklınızdaki tüm sorular için bizimle iletişime geçebilirsiniz. E-posta, telefon veya iletişim formu üzerinden bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-white dark:text-foreground/70 mb-8">
            Aradığınızı bulamadınız mı? Bize e-posta gönderin
          </p>
          <a 
            href="mailto:info@example.com" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <FiMail className="w-5 h-5" />
            <span>info@example.com</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group w-full"
            >
              <Accordion
                variant="splitted"
                className="gap-0 w-full"
                itemClasses={{
                  base: "bg-slate-200 dark:bg-slate-800 rounded-xl border-none shadow-sm group-hover:shadow-md group-hover:bg-slate-300 dark:group-hover:bg-slate-700 transition-all duration-300 ease-out w-full",
                  title: "text-foreground dark:text-white font-semibold text-base md:text-lg",
                  trigger: "px-6 py-5 rounded-xl transition-all duration-300 ease-out w-full group-hover:bg-transparent data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent",
                  content: "px-6 pb-5 text-foreground/70 dark:text-foreground/60 text-base",
                  indicator: "text-foreground dark:text-white transition-transform duration-300"
                }}
              >
                <AccordionItem
                  aria-label={item.question}
                  title={item.question}
                  indicator={({ isOpen }) => (
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FiChevronDown className="w-5 h-5" />
                    </motion.div>
                  )}
                >
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pt-2 overflow-hidden"
                    >
                      <p className="text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

