"use client";

import React from "react";
import { 
  ShoppingCart, 
  Heart, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Infinity 
} from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BuySidebarProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    slug: string;
  };
  originalPrice?: number;
  demoUrl?: string;
  whatYouGet: string[];
}

const BuySidebar = ({ product, originalPrice, demoUrl, whatYouGet }: BuySidebarProps) => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const router = useRouter();

  const handleBuyNow = () => {
    addItem(product);
    router.push("/checkout");
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 space-y-8 sticky top-28 bg-[#1E293B]/80 border-indigo-500/10 shadow-2xl"
    >
      <div className="space-y-2">
         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pricing Plan</p>
         <div className="flex items-center gap-4">
            <span className="text-4xl font-mono font-bold text-white">₹{product.price}</span>
            {originalPrice && (
              <span className="text-slate-500 text-lg line-through font-mono">₹{originalPrice}</span>
            )}
            {originalPrice && (
              <span className="bg-indigo-600/20 text-indigo-400 px-2 py-[2px] rounded-lg text-xs font-bold border border-indigo-500/30">
                 -{Math.round((1 - product.price / originalPrice) * 100)}%
              </span>
            )}
         </div>
         <p className="text-slate-400 text-sm">One-time purchase, lifetime access.</p>
      </div>

      <div className="flex flex-col gap-4 pt-4 divider-y divide-white/5">
         <button 
           onClick={handleBuyNow}
           className="btn-primary !py-5 !px-8 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 w-full group overflow-hidden relative"
         >
            <span className="relative z-10 flex items-center gap-2">
               <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Buy Now
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
         </button>
         
         <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => toggleWishlist(product)}
              className={cn(
                "btn-secondary !py-4 flex items-center justify-center gap-2 text-sm w-full transition-all",
                isWishlisted && "bg-red-500/10 text-red-500 border-red-500/30"
              )}
            >
               <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} /> Wishlist
            </button>
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary !py-4 flex items-center justify-center gap-2 text-sm w-full border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white"
              >
                 <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
         </div>
      </div>

      <section className="space-y-6 pt-6 border-t border-white/5">
        <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">What's Included</h4>
        <div className="flex flex-col gap-4">
          {whatYouGet.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
               <span className="text-slate-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
         <div className="flex items-center gap-3 text-sm text-slate-400">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Secure payment checkout</span>
         </div>
         <div className="flex items-center gap-3 text-sm text-slate-400">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span>Instant delivery via email</span>
         </div>
         <div className="flex items-center gap-3 text-sm text-slate-400">
            <Infinity className="w-5 h-5 text-indigo-400" />
            <span>Lifetime updates & support</span>
         </div>
      </section>
    </motion.aside>
  );
};

export default BuySidebar;
