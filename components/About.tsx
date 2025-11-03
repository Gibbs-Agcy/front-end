'use client'

import React from 'react';
import { Card, CardBody, Avatar, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiTrendingUp, FiClock } from "react-icons/fi";

export default function About() {
  const stats = [
    {
      icon: <FiAward size={30} />,
      value: "150+",
      label: "Tamamlanan Proje",
      color: "primary",
    },
    {
      icon: <FiUsers size={30} />,
      value: "100+",
      label: "Mutlu Müşteri",
      color: "secondary",
    },
    {
      icon: <FiTrendingUp size={30} />,
      value: "95%",
      label: "Müşteri Memnuniyeti",
      color: "success",
    },
    {
      icon: <FiClock size={30} />,
      value: "8+",
      label: "Yıllık Tecrübe",
      color: "warning",
    },
  ];

  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "CEO & Kurucu",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Zeynep Kaya",
      role: "Lead Designer",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Mehmet Demir",
      role: "Senior Developer",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Ayşe Şahin",
      role: "Marketing Manager",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  ];

  const skills = [
    { name: "Web Development", value: 95 },
    { name: "Mobile Development", value: 90 },
    { name: "UI/UX Design", value: 92 },
    { name: "Digital Marketing", value: 88 },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background">
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
            Hakkımızda
          </h2>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Dijital dünyada fark yaratan, yenilikçi çözümler üreten bir ekibiz
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-content1 dark:bg-content1">
              <CardBody className="flex flex-col items-center justify-center p-6 text-center">
                <div className={`text-${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-foreground/60 dark:text-foreground/70">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </motion.div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Dijital Dönüşümünüzün Ortağı
            </h3>
            <p className="text-foreground/60 dark:text-foreground/70 mb-4">
              2016 yılından bu yana dijital dünyada markalar için fark yaratan çözümler 
              üretiyoruz. Deneyimli ekibimiz ve modern teknolojiler ile işletmenizi 
              dijital platformlarda en iyi şekilde temsil ediyoruz.
            </p>
            <p className="text-foreground/60 dark:text-foreground/70 mb-6">
              Web ve mobil uygulama geliştirme, UI/UX tasarım, dijital pazarlama ve 
              marka kimliği oluşturma konularında uzmanız. Müşteri memnuniyetini ön 
              planda tutarak, her projede mükemmeliyeti hedefliyoruz.
            </p>

            {/* Skills Progress Bars */}
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-foreground/60 dark:text-foreground/70">{skill.value}%</span>
                  </div>
                  <Progress 
                    value={skill.value} 
                    color="primary"
                    className="max-w-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Team Members */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Ekibimiz</h3>
            <div className="grid grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="bg-content1 dark:bg-content1">
                  <CardBody className="flex flex-col items-center text-center p-6">
                    <Avatar
                      src={member.avatar}
                      className="w-20 h-20 mb-4"
                      isBordered
                      color="primary"
                    />
                    <h4 className="font-bold mb-1">{member.name}</h4>
                    <p className="text-sm text-foreground/60 dark:text-foreground/70">{member.role}</p>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Mission Statement */}
            <Card className="mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
              <CardBody className="p-6">
                <h4 className="font-bold mb-2 text-primary">Misyonumuz</h4>
                <p className="text-sm text-foreground/60 dark:text-foreground/70">
                  Müşterilerimizin dijital varlıklarını güçlendirerek, onların 
                  hedef kitlelerine en etkili şekilde ulaşmalarını sağlamak ve 
                  sürdürülebilir büyüme için teknolojik çözümler sunmak.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

