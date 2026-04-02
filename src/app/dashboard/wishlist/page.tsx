"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Search, 
  Trash2, 
  ShoppingCart, 
  ArrowRight,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";

const DashWishlistPage = () => {
   const { items, removeItem, clearWishlist } = useWishlistStore();
   const { addItem: addToCart } = useCartStore();
   const [search, setSearch] = useState("");
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
     setIsMounted(true);
   }, []);

   const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
   );

   if (!isMounted) return null;

   return (
      <div className="space-y-10 pb-20">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
               <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500/10" /> My Wishlist
               </h1>
               <p className="text-slate-500 text-sm">Review your saved items and secure them before they're gone.</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                     placeholder="Search saved items..."
                     className="bg-[#1E293B]/50 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-full md:w-64"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               
               {items.length > 0 && (
                  <button 
                     onClick={() => clearWishlist()}
                     className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                  >
                     <Trash2 className="w-5 h-5" />
                  </button>
               )}
            </div>
         </div>

         {/* Items Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
               {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="group"
                    >
                       <div className="glass overflow-hidden border-white/5 group-hover:border-indigo-500/30 transition-all shadow-xl bg-white/2 h-full flex flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden">
                             <img 
                                src={item.image} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                alt={item.name} 
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                             
                             <button 
                                onClick={() => removeItem(item.id)}
                                className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors border border-white/10"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>

                             <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                                   {item.category}
                                </span>
                             </div>
                          </div>

                          <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                             <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">{item.name}</h3>
                                <p className="text-2xl font-bold text-white">₹{item.price}</p>
                             </div>

                             <div className="flex gap-2 pt-2">
                                <button 
                                   onClick={() => {
                                      addToCart(item);
                                      removeItem(item.id);
                                   }}
                                   className="flex-grow btn-primary !py-3 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                                >
                                   <ShoppingCart className="w-4 h-4" /> Add to Cart
                                </button>
                                <Link 
                                   href={`/shop?q=${item.name}`}
                                   className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                                >
                                   <ArrowRight className="w-5 h-5" />
                                </Link>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ))
               ) : (
                  <motion.div 
                     layout
                     className="col-span-full py-32 text-center glass border-dashed bg-transparent border-white/5"
                  >
                     <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-slate-700" />
                     </div>
                     <h2 className="text-white font-bold text-2xl mb-2">Your wishlist is empty</h2>
                     <p className="text-slate-500 max-w-sm mx-auto mb-8">Start exploring our premium digital collection and save what you love.</p>
                     <Link href="/shop" className="btn-secondary !py-3 inline-flex items-center gap-2">
                        Browse Shop <ArrowRight className="w-4 h-4" />
                     </Link>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default DashWishlistPage;
