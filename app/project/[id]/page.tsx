'use client'

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardBody, Chip, Button, Tabs, Tab } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiExternalLink, FiDownload } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuggestedProducts from "@/components/SuggestedProducts";
import { getProjectById, getSuggestedProducts, ProjectDetail } from "@/lib/projectData";
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.id as string);
  const project = getProjectById(projectId);
  const suggestedProducts = getSuggestedProducts(projectId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
          <Button onPress={() => router.push('/')}>Ana Sayfaya Dön</Button>
        </div>
      </div>
    );
  }

  const images = project.gallery || [project.image];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Button
          variant="light"
          startContent={<FiArrowLeft />}
          onPress={() => router.back()}
          className="mb-4"
        >
          Geri Dön
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              {/* Main Image */}
              <Card className="mb-4 shadow-xl overflow-hidden">
                <CardBody className="p-0">
                  <div className="relative w-full h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                    <img
                      src={images[selectedImage]}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {project.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <Chip
                          size="lg"
                          className="bg-black text-white border-none rounded-full px-4"
                          variant="flat"
                        >
                          {project.badge}
                        </Chip>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Title & Category */}
            <div>
              <Chip className="mb-6 rounded-full" variant="flat" color="primary">
                {project.category.toUpperCase()}
              </Chip>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-foreground/70 dark:text-foreground/60 mb-8 leading-relaxed">
                {project.description}
              </p>
              {project.price && (
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold text-green-500">
                    {project.price}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                color="primary"
                size="lg"
                className="flex-1 h-14 text-lg font-semibold"
                endContent={<FiExternalLink />}
                radius="lg"
              >
                Projeyi İncele
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="flex-1 h-14 text-lg font-semibold"
                endContent={<FiDownload />}
                radius="lg"
              >
                İndir
              </Button>
            </div>

            {/* Features */}
            <Card className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-6">Özellikler</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 dark:text-foreground/70 text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* Technologies */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Teknolojiler</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Chip key={index} variant="flat" color="primary" className="rounded-full">
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Specifications */}
            {project.specifications && project.specifications.length > 0 && (
              <Card className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-6">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-6">Teknik Özellikler</h3>
                  <div className="space-y-4">
                    {project.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
                        <span className="text-foreground/60 dark:text-foreground/50 text-base">
                          {spec.label}
                        </span>
                        <span className="font-semibold text-base">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs aria-label="Project details" className="w-full">
            <Tab key="description" title="Açıklama">
              <Card className="mt-4">
                <CardBody className="p-6">
                  <p className="text-foreground/80 dark:text-foreground/70 leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="features" title="Özellikler">
              <Card className="mt-4">
                <CardBody className="p-6">
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 dark:text-foreground/70">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="specifications" title="Teknik Detaylar">
              <Card className="mt-4">
                <CardBody className="p-6">
                  {project.specifications && project.specifications.length > 0 ? (
                    <div className="space-y-4">
                      {project.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                          <span className="text-foreground/60 dark:text-foreground/50">
                            {spec.label}
                          </span>
                          <span className="font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/60 dark:text-foreground/50">
                      Teknik detaylar mevcut değil.
                    </p>
                  )}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </motion.div>
      </section>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <SuggestedProducts
          currentProjectId={projectId}
          products={suggestedProducts.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price || "Price on request",
            image: p.image,
            badge: p.badge,
            badgeType: p.badgeType
          }))}
        />
      )}

      <Footer />
    </main>
  );
}

