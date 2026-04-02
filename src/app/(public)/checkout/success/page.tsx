"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Layout,
  Loader2,
  ChevronRight,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(5);
    const { data: session } = useSession();

    useEffect(() => {
        if (!orderId) {
            router.push("/dashboard");
            return;
        }

        // Fetch order details
        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                const foundOrder = data.find((o: any) => o.id === orderId);
                if (foundOrder) setOrder(foundOrder);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching order:", err);
                setLoading(false);
            });

        // 5s Countdown and Redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/dashboard/orders");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Validating Purchase...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                 {/* Animated Success Checkmark */}
                 <motion.div
                   initial={{ scale: 0, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ type: "spring", damping: 12, stiffness: 200 }}
                   className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/40 relative"
                 >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                    <motion.div 
                       animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       className="absolute inset-0 border-4 border-green-500 rounded-full" 
                    />
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="space-y-4"
                 >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                      Payment Successful! 🎉
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                      Thank you for choosing NexaStore. Your order <span className="text-indigo-400 font-mono font-bold">#{orderId?.slice(-8).toUpperCase()}</span> has been processed successfully.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mt-4">
                        Redirecting to dashboard in {countdown}s
                    </div>
                 </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="glass p-8 bg-white/2 border-white/5">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-indigo-400" /> Purchased Assets
                            </h3>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{order?.items?.length || 0} items</span>
                        </div>

                        <div className="space-y-4">
                            {order?.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center overflow-hidden">
                                            <img src={item.product?.images?.[0] || "/images/placeholder.png"} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{item.product?.name}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{item.product?.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">₹{item.price}</div>
                                        <div className="text-[10px] text-green-400 font-bold flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Ready to Download <Download className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="text-slate-500 text-sm">Total Amount Paid</div>
                            <div className="text-2xl font-display font-bold text-white">₹{order?.totalAmount}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/dashboard/orders" className="btn-primary !py-4 flex-grow flex items-center justify-center gap-2 text-xs">
                           Go to Dashboard <Layout className="w-4 h-4" />
                        </Link>
                        <Link href="/shop" className="btn-secondary !py-4 flex-grow flex items-center justify-center gap-2 text-xs">
                           Continue Shopping <ShoppingBag className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6"
                >
                    <div className="glass p-8 bg-indigo-600/5 border-indigo-600/20 space-y-6">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                           <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold font-display text-white">Digital Access</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          We've sent an order confirmation and access details to <span className="text-indigo-400 font-bold">{session?.user?.email}</span>.
                        </p>
                        <ul className="space-y-3 pt-2">
                            <li className="flex items-center gap-3 text-xs text-slate-500"><Zap className="w-4 h-4 text-amber-500" /> Instant Source Code</li>
                            <li className="flex items-center gap-3 text-xs text-slate-500"><ShieldCheck className="w-4 h-4 text-green-500" /> License Certificate</li>
                            <li className="flex items-center gap-3 text-xs text-slate-500"><ExternalLink className="w-4 h-4 text-indigo-500" /> Setup Documentation</li>
                        </ul>
                    </div>

                    <div className="p-6 border border-dashed border-white/10 rounded-2xl text-center">
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Transaction Verified by Razorpay Secure</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const SuccessPage = () => {
    return (
        <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 overflow-hidden relative">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                </div>
            }>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
};

export default SuccessPage;
