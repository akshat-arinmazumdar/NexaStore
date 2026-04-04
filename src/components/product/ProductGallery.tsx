"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "/images/placeholder.png");

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative aspect-video rounded-xl overflow-hidden glass border transition-all group",
                activeImage === img ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-white/5 hover:border-white/20"
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
