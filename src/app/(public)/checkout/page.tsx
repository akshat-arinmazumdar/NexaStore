"use client";




import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  User, 
  ShoppingCart, 
  ChevronRight,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Load Razorpay script
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 500);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearTimeout(timer);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.push("/cart");
    }
  }, [isHydrated, items, router]);

  // 1. Check if user is logged in & 2. if not redirect to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login?redirect=/checkout')
    }
  }, [status, router])

  if (!isMounted || !isHydrated) {
    return (
      <main className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      </main>
    );
  }

  const handlePayment = async () => {
    // 3. In handlePayment function check session
    if (!session?.user) {
      toast.error("Please login to continue")
      router.push('/login')
      return
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create order on backend
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotal(),
          productIds: items.map(item => item.id),
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || "Failed to initiate payment");
      }

      // 2. Open Razorpay Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NexaStore",
        description: "Digital Products Purchase",
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            setIsProcessing(true);
            // 3. Verify payment on backend
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId: orderData.orderId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              clearCart();
              router.push("/checkout/success?orderId=" + verifyData.orderId);
            } else {
              throw new Error(verifyData.error || "Payment verification failed");
            }
          } catch (err: any) {
            setError(err.message);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const total = getTotal();

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 overflow-hidden relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-10">
          <span className="hover:text-indigo-400 cursor-pointer" onClick={() => router.push('/cart')}>Cart</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[60%] space-y-12">
             <section className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <User className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold font-display text-white">Billing Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 glass bg-white/2 border-white/5">
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Full Name</label>
                      <div className="text-white font-bold">{session?.user?.name || "Guest User"}</div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Email Address</label>
                      <div className="text-white font-bold">{session?.user?.email || "No email available"}</div>
                   </div>
                </div>
             </section>

             <section className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 border border-green-500/20">
                      <ShieldCheck className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold font-display text-white">Payment Method</h2>
                </div>
                
                <div className="p-8 glass bg-indigo-600/10 border-indigo-500/20 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg">
                        <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-full h-auto" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Razorpay Secure Checkout</h4>
                        <p className="text-slate-400 text-sm">Pay via Credit/Debit Cards, UPI, NetBanking, or Digital Wallets</p>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }}
                            className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400"
                        >
                            <AlertTriangle className="w-6 h-6 shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
             </section>
          </div>

          <div className="lg:w-[40%]">
             <div className="glass p-10 bg-[#1E293B]/90 shadow-2xl sticky top-28 border-white/5">
                <div className="flex items-center gap-2 mb-8">
                   <Lock className="w-4 h-4 text-green-400" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secured Order Summary</span>
                </div>

                <div className="space-y-4 mb-8">
                   {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                         <span className="text-slate-400">
                           {item.name}
                         </span>
                         <span className="text-white font-bold">
                           ₹{(item.price * (item.quantity ?? 1)).toFixed(2)}
                         </span>
                      </div>
                   ))}
                </div>
                
                <div className="border-t border-white/5 pt-6 flex justify-between items-center mb-10">
                   <span className="text-white">Total Amount</span>
                   <span className="text-3xl font-display font-bold text-indigo-400">₹{total}</span>
                </div>

                <button 
                  disabled={isProcessing}
                  onClick={handlePayment}
                  className="w-full btn-primary !py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                   {isProcessing ? (
                       <>
                           <Loader2 className="animate-spin w-5 h-5" />
                           <span className="uppercase font-bold tracking-widest text-xs">Processing...</span>
                       </>
                   ) : (
                       <>
                           <CreditCard className="w-5 h-5" />
                           <span className="uppercase font-bold tracking-widest text-xs">Pay Securely Now</span>
                       </>
                   )}
                </button>
                <p className="text-center mt-6 text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-loose">
                    By clicking, you agree to our Terms of Service.<br/> 
                    All transactions are 256-bit encrypted.
                </p>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
