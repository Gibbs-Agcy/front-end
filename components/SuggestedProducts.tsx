'use client'

import React from 'react';
import { Card, CardBody, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import Link from 'next/link';

interface SuggestedProduct {
  id: number;
  title: string;
  price: string;
  image: string;
  badge?: string;
  badgeType?: 'pro' | 'free';
}

interface SuggestedProductsProps {
  currentProjectId: number;
  products: SuggestedProduct[];
}

export default function SuggestedProducts({ currentProjectId, products }: SuggestedProductsProps) {
  // Mevcut projeyi listeden çıkar
  const filteredProducts = products.filter(p => p.id !== currentProjectId);

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FiArrowDown className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl font-bold">Suggested products</h2>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {filteredProducts.slice(0, 5).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <Link href={`/project/${product.id}`}>
                  <div className="relative">
                    <Card className="w-[280px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer group rounded-xl overflow-visible border border-slate-200 dark:border-slate-700">
                      <CardBody className="p-0 relative">
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <Chip
                              size="sm"
                              className="bg-black dark:bg-black text-white border-none rounded-full px-3"
                              variant="flat"
                            >
                              {product.badge}
                            </Chip>
                          </div>
                        )}

                        {/* Product Preview Image */}
                        <div className="relative w-full h-[200px] bg-slate-200 dark:bg-slate-900 rounded-t-xl overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-4 pt-3">
                          <h3 className="text-foreground dark:text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-green-500 dark:text-green-400 font-medium text-sm">
                            {product.price}
                          </p>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Icon below card - alternating design */}
                    <div className="absolute -bottom-3 left-4 w-7 h-7 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-lg">
                      {index < 4 ? (
                        // Diagonal lines icon for first 4 cards
                        <div className="relative w-4 h-4">
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-black dark:bg-white transform rotate-45 origin-center"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-black dark:bg-white transform rotate-45 origin-center"></div>
                        </div>
                      ) : (
                        // Plain circle for last card
                        <div className="w-3 h-3 rounded-full bg-black dark:bg-white"></div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

