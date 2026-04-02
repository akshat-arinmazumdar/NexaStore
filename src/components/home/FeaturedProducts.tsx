"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/prisma";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowRight, Box } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  { id: "ALL", label: "All Products" },
  { id: "AI_MODEL", label: "AI Models" },
  { id: "MOBILE_APP", label: "Mobile Apps" },
  { id: "WEBSITE", label: "Websites" },
  { id: "SAAS_TOOL", label: "SaaS Tools" },
  { id: "BUNDLE", label: "Bundles" },
];

// Products fetched from API

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products/featured");
        const data = await res.json();
        const mappedData = data.map((p: any) => ({
          ...p,
          image: p.images?.[0] || "/images/placeholder.png",
        }));
        setProducts(mappedData);
      } catch (err) {
        // Avoid logging during component unmount / navigation.
        // On failure we just show the empty state.
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
         <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-indigo-400 font-mono text-sm font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <Box className="w-4 h-4" /> Discover Our Collection
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white"
            >
              Featured Products
            </motion.h2>
         </div>
         
         {/* Categories Horizontal Scroll */}
         <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all",
                  activeCategory === cat.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
         </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="col-span-full text-center text-white pt-10">Loading featured products...</div>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <Link href="/shop" className="btn-secondary group flex items-center gap-2 px-12">
          View All Products
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
