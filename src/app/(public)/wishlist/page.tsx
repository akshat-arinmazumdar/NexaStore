"use client";




import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ChevronRight, 
  PackageSearch,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WishlistPage = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) return null;

  const handleMoveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    removeItem(item.id);
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
           <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
                 <Heart className="w-4 h-4 fill-current" /> Saved for Later
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white italic">
                 My <span className="text-indigo-400">Wishlist</span>.
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">Manage your curated collection of digital assets and ready-made tools.</p>
           </div>
           
           <Link href="/shop" className="btn-secondary flex items-center gap-2 group">
              Continue Shopping <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass group p-4 bg-[#1E293B]/70 border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                       <Link href={`/shop/${item.slug}`} className="bg-white text-indigo-950 px-6 py-2 rounded-lg font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          View Details
                       </Link>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">{item.category.replace("_", " ")}</p>
                          <h3 className="text-lg font-bold text-white truncate max-w-[200px]">{item.name}</h3>
                       </div>
                       <span className="text-xl font-mono font-bold text-white">₹{item.price}</span>
                    </div>

                    <div className="flex gap-3">
                       <button 
                         onClick={() => handleMoveToCart(item)}
                         className="flex-grow btn-primary !py-3 flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/20"
                       >
                          <ShoppingCart className="w-4 h-4" /> Move to Cart
                       </button>
                       <button 
                         onClick={() => removeItem(item.id)}
                         className="w-12 h-12 glass flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-colors border-white/5"
                       >
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center justify-center py-40 text-center"
            >
               <div className="w-24 h-24 bg-slate-800/50 rounded-[40px] flex items-center justify-center mb-8 transform -rotate-12 border border-white/5">
                  <PackageSearch className="w-10 h-10 text-slate-600" />
               </div>
               <h2 className="text-3xl font-display font-bold text-white mb-4">Your wishlist is empty.</h2>
               <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">Save your favorite digital assets here and they will be waiting for your next big project.</p>
               <Link href="/shop" className="btn-primary !px-10 !py-4 flex items-center gap-3">
                  Back to Shop <ArrowRight className="w-5 h-5" />
               </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
};

export default WishlistPage;
