'use client'

import React from 'react';
import { Link, Button, Input } from "@nextui-org/react";
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiGithub,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Ana Sayfa", href: "#hero" },
    { name: "Hizmetler", href: "#services" },
    { name: "Projeler", href: "#portfolio" },
    { name: "Hakkımızda", href: "#about" },
    { name: "İletişim", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Digital Marketing",
    "Brand Identity",
    "E-commerce",
  ];

  const socialLinks = [
    { icon: <FiFacebook size={20} />, url: "#" },
    { icon: <FiTwitter size={20} />, url: "#" },
    { icon: <FiInstagram size={20} />, url: "#" },
    { icon: <FiLinkedin size={20} />, url: "#" },
    { icon: <FiGithub size={20} />, url: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <Link href="#hero" className="font-bold text-2xl text-primary mb-4 block">
              AJANS<span className="text-secondary">.</span>
            </Link>
            <p className="text-foreground/60 dark:text-foreground/70 text-sm mb-4">
              Dijital dünyada fark yaratan, yenilikçi çözümler üreten bir dijital ajansız. 
              Markanızı bir üst seviyeye taşıyoruz.
            </p>
            {/* Social Media */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  isIconOnly
                  size="sm"
                  variant="flat"
                  as="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 dark:text-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href="#services"
                    className="text-foreground/60 dark:text-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bülten</h3>
            <p className="text-foreground/60 dark:text-foreground/70 text-sm mb-4">
              Yeniliklerden haberdar olmak için bültene abone olun.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                size="sm"
                variant="bordered"
                startContent={<FiMail className="text-foreground/50" />}
              />
              <Button color="primary" size="sm" className="w-full">
                Abone Ol
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 dark:text-foreground/70 text-sm text-center md:text-left">
            © {currentYear} Dijital Ajans. Tüm hakları saklıdır.
          </p>
          
          {/* Legal Links */}
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-foreground/60 dark:text-foreground/70 hover:text-primary">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-foreground/60 dark:text-foreground/70 hover:text-primary">
              Kullanım Şartları
            </Link>
            <Link href="#" className="text-foreground/60 dark:text-foreground/70 hover:text-primary">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        isIconOnly
        color="primary"
        variant="shadow"
        className="fixed bottom-8 right-8 z-50"
        onClick={scrollToTop}
        aria-label="Yukarı çık"
      >
        <FiArrowUp size={20} />
      </Button>
    </footer>
  );
}

