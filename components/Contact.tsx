'use client'

import React, { useState } from 'react';
import { Card, CardBody, Input, Textarea, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: "E-posta",
      content: "info@dijitalajans.com",
      link: "mailto:info@dijitalajans.com",
    },
    {
      icon: <FiPhone size={24} />,
      title: "Telefon",
      content: "+90 212 555 0000",
      link: "tel:+902125550000",
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Adres",
      content: "Maslak, İstanbul, Türkiye",
      link: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { icon: <FiFacebook size={20} />, url: "#", label: "Facebook" },
    { icon: <FiTwitter size={20} />, url: "#", label: "Twitter" },
    { icon: <FiInstagram size={20} />, url: "#", label: "Instagram" },
    { icon: <FiLinkedin size={20} />, url: "#", label: "LinkedIn" },
    { icon: <FiGithub size={20} />, url: "#", label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background">
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
            İletişime Geçin
          </h2>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Projeleriniz hakkında konuşmak için bizimle iletişime geçin
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-content1 dark:bg-content1">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold mb-6">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Ad Soyad"
                    placeholder="Adınızı girin"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="bordered"
                  />
                  <Input
                    type="email"
                    label="E-posta"
                    placeholder="email@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="bordered"
                  />
                  <Input
                    type="tel"
                    label="Telefon"
                    placeholder="+90 5XX XXX XX XX"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="bordered"
                  />
                  <Textarea
                    label="Mesajınız"
                    placeholder="Projeniz hakkında detayları yazın..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="bordered"
                    minRows={4}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold"
                    endContent={<FiSend />}
                    isLoading={loading}
                  >
                    {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </Button>
                  {success && (
                    <p className="text-success text-center">
                      Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                    </p>
                  )}
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Right: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
            
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-content1 dark:bg-content1 hover:bg-content2 dark:hover:bg-slate-700 transition-colors">
                <CardBody className="p-6">
                  <a 
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4"
                  >
                    <div className="text-primary mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      <p className="text-foreground/60 dark:text-foreground/70">{info.content}</p>
                    </div>
                  </a>
                </CardBody>
              </Card>
            ))}

            {/* Social Media Links */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
              <CardBody className="p-6">
                <h4 className="font-semibold mb-4">Sosyal Medya</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      isIconOnly
                      variant="flat"
                      color="primary"
                      as="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Map or Additional Info */}
            <Card className="bg-content1 dark:bg-content1">
              <CardBody className="p-6">
                <h4 className="font-semibold mb-3">Çalışma Saatleri</h4>
                <div className="space-y-2 text-sm text-foreground/60 dark:text-foreground/70">
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p>Cumartesi: 10:00 - 16:00</p>
                  <p>Pazar: Kapalı</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

