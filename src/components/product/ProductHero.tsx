"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Zap, Download } from "lucide-react";
import { Category } from "@/types/prisma";
import { cn } from "@/lib/utils";

interface ProductHeroProps {
  name: string;
  category: Category;
  rating: number;
  totalSales: number;
  image: string;
}

const ProductHero = ({ name, category, rating, totalSales, image }: ProductHeroProps) => {
  return (
    <section className="mb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-8">
        <span className="hover:text-indigo-400 cursor-pointer transition-colors">Home</span>
        <span>/</span>
        <span className="hover:text-indigo-400 cursor-pointer transition-colors">Shop</span>
        <span>/</span>
        <span className="text-white">{category.replace("_", " ")}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-[60%] space-y-6"
        >
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass border-white/10 group shadow-2xl">
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border-white/5 cursor-pointer hover:border-indigo-500/50 transition-colors group">
                  <Image src={image} alt={`${name} ${i}`} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
               </div>
             ))}
          </div>
        </motion.div>

        {/* Content Meta */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-[40%] flex flex-col justify-center gap-6"
        >
           <span className="px-4 py-1 self-start rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-widest">
              {category.replace("_", " ")}
           </span>
           
           <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
             {name}
           </h1>

           <div className="flex items-center gap-6 divide-x divide-white/10">
              <div className="flex items-center gap-2">
                 <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={cn("w-4 h-4", i < Math.floor(rating) ? "fill-orange-400 text-orange-400" : "text-slate-700")} />
                   ))}
                 </div>
                 <span className="text-white font-bold">{rating}</span>
                 <span className="text-slate-500 text-sm">(124 Reviews)</span>
              </div>
              
              <div className="pl-6 flex items-center gap-2 text-slate-400 text-sm">
                 <ShieldCheck className="w-5 h-5 text-green-500" />
                 Verified Product
              </div>
           </div>

           <p className="text-slate-400 leading-relaxed text-lg italic">
             "The absolute gold standard for digital asset development. Scalable, secure, and ready for production."
           </p>

           <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <Zap className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Sales</p>
                    <p className="text-white font-bold">{totalSales}+</p>
                 </div>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                    <Download className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Instant</p>
                    <p className="text-white font-bold">Access</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
