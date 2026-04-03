"use client";




import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CartPage = () => {
  const { items, removeItem, incrementQuantity, decrementQuantity, getTotal } =
    useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = getTotal();

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 overflow-hidden relative">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-display font-bold text-white mb-12">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-[65%] space-y-6">
             <AnimatePresence mode="popLayout">
               {items.length > 0 ? (
                 items.map((item) => (
                    <motion.div
                       layout
                       key={item.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="glass p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 bg-[#1E293B]/70 border-white/5 shadow-2xl relative group overflow-hidden"
                    >
                       <div className="relative w-32 aspect-square rounded-2xl overflow-hidden glass border-white/10 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                       
                       <div className="flex-grow text-center md:text-left space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{(item?.category || "").replace("_", " ")}</span>
                          <h3 className="text-xl font-bold text-white block hover:text-indigo-400 transition-colors">{item?.name}</h3>
                          <div className="flex items-center gap-3 justify-center md:justify-start pt-2">
                             <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                               <ShieldCheck className="w-4 h-4" /> Secure access
                             </div>
                             <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                               <Zap className="w-4 h-4" /> Instant Delivery
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                          <span className="text-2xl font-mono font-bold text-white">
                            ₹{(item.price * (item.quantity ?? 1)).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(item.id)}
                              className="w-9 h-9 rounded-xl glass border border-white/10 text-white text-lg font-bold hover:bg-white/5 transition-all"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span
                              className="text-white font-mono font-bold w-10 text-center"
                              data-testid="cart-quantity"
                            >
                              {item.quantity ?? 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(item.id)}
                              className="w-9 h-9 rounded-xl glass border border-white/10 text-white text-lg font-bold hover:bg-white/5 transition-all"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                       </div>
                       
                       <div className="absolute inset-y-0 right-0 w-1 bg-indigo-600/0 group-hover:bg-indigo-600 transition-all duration-300" />
                    </motion.div>
                 ))
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="glass p-20 text-center shadow-2xl bg-indigo-600/5 border-white/5"
                 >
                    <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                       <ShoppingBag className="w-12 h-12 text-slate-600" />
                    </div>
                    <h2 className="text-4xl font-display font-bold text-white mb-4">Your cart is empty</h2>
                    <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed mb-12">
                       It looks like you haven't added anything to your cart yet. Discover amazing digital products in our marketplace.
                    </p>
                    <Link href="/shop" className="btn-primary !px-12 !py-5 text-lg group inline-flex items-center gap-3">
                       Browse Shop <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <aside className="lg:w-[35%] space-y-6 shrink-0 h-fit sticky top-28">
               <div className="glass p-8 space-y-8 bg-[#1E293B]/90 shadow-2xl border-indigo-500/10">
                  <h3 className="text-xl font-bold text-white font-display">Order Summary</h3>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-slate-400">
                        <span>Subtotal</span>
                        <span className="text-white font-mono font-bold">₹{total.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-slate-400">
                        <span>Discount</span>
                        <span className="text-green-500 font-mono font-bold">-₹0.00</span>
                     </div>
                     <div className="flex justify-between text-slate-400">
                        <span>Tax (0%)</span>
                        <span className="text-white font-mono font-bold">₹0.00</span>
                     </div>
                     <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-lg font-bold text-white">Grand Total</span>
                        <div className="text-right">
                           <span
                             className="text-4xl font-mono font-bold text-indigo-400 block"
                             data-testid="cart-grand-total"
                           >
                             ₹{total.toFixed(2)}
                           </span>
                           <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Zero Fees</span>
                        </div>
                     </div>
                  </div>

                  {/* Coupon Mock */}
                  <div className="space-y-4">
                     <div className="flex gap-2">
                        <div className="relative flex-grow">
                           <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                           <input 
                              placeholder="Coupon Code" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                           />
                        </div>
                        <button className="btn-secondary !py-3 !px-6 text-sm">Apply</button>
                     </div>
                  </div>

                  <Link href="/checkout" className="w-full btn-primary !py-5 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/40 relative overflow-hidden group">
                     Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
               </div>

               <div className="glass p-6 border-dashed border-white/10 flex items-center gap-4 text-slate-400 bg-white/2">
                  <ShieldCheck className="w-8 h-8 text-indigo-500/50" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Guaranteed Safety</h4>
                    <p className="text-[10px] leading-relaxed">Secure transaction via encrypted payment gateways. No card details stored.</p>
                  </div>
               </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
