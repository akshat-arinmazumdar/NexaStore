"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ArrowRight, 
  Zap, 
  ExternalLink 
} from "lucide-react";
import { Category } from "@/types/prisma";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  totalReviews: number;
  image: string;
  isFeatured?: boolean;
}

const ProductCard = ({
  id,
  name,
  slug,
  category,
  description,
  price,
  originalPrice,
  rating,
  totalReviews,
  image,
  isFeatured,
}: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const router = useRouter();
  
  const isWishlisted = isInWishlist(id);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const product = { id, name, price, image, category: category as string, slug };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass group relative flex flex-col p-4 bg-[#1E293B]/70 hover:translate-y-[-8px] hover:shadow-indigo-500/10 shadow-xl transition-all duration-300 border border-white/5"
    >
      {/* Badge */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
          category === "AI_MODEL" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : 
          category === "SAAS_TOOL" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" :
          "bg-slate-500/20 text-slate-300 border border-slate-500/30"
        )}>
          {category.replace("_", " ")}
        </span>
        {isFeatured && (
          <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-indigo-500/30">
            <Zap className="w-3 h-3 fill-white" /> Featured
          </span>
        )}
      </div>

      {/* Action Buttons (Top Right) */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <button 
          onClick={(e) => handleAction(e, () => toggleWishlist(product))}
          className={cn(
            "w-10 h-10 rounded-full glass flex items-center justify-center transition-colors",
            isWishlisted ? "text-red-500 bg-red-500/10" : "text-slate-300 hover:text-red-400 hover:bg-red-400/10"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
        </button>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail */}
      <Link 
        href={`/shop/${slug}`} 
        onClick={(e) => handleAction(e, () => router.push(`/shop/${slug}`))}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5"
      >
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-indigo-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <span className="px-4 py-2 bg-white text-indigo-900 text-sm font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Quick View
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link 
            href={`/shop/${slug}`} 
            onClick={(e) => handleAction(e, () => router.push(`/shop/${slug}`))}
            className="text-xl font-bold font-display text-white hover:text-indigo-400 transition-colors"
          >
            {name}
          </Link>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
             <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
             <span className="text-yellow-500 text-xs font-bold leading-none">{rating.toFixed(1)}</span>
             <span className="text-slate-500 text-[10px] leading-none">({totalReviews})</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
          {description}
        </p>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white font-mono">₹{price}</span>
              {originalPrice && (
                <span className="text-slate-500 text-xs line-through font-mono">₹{originalPrice}</span>
              )}
            </div>
          </div>
          <button 
            onClick={(e) => handleAction(e, () => addItem(product))}
            className="btn-primary !py-2 !px-4 text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95"
          >
             <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
