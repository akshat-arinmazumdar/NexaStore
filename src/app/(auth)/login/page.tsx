"use client";




import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Code2, 
  Globe, 
  ShoppingBag, 
  ShieldCheck, 
  Zap,
  Info,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered")) {
      setShowSuccess(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-40 pb-20 relative overflow-hidden flex flex-col items-center justify-center">
      <Navbar />

      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
         {/* Left Side - Marketing Content */}
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           className="hidden lg:block space-y-12"
         >
            <div className="space-y-6">
               <h1 className="text-6xl font-display font-bold text-white leading-tight">
                  Welcome back to the <br /> 
                  <span className="text-indigo-400 italic">Marketplace.</span>
               </h1>
               <p className="text-slate-400 text-xl max-w-md leading-relaxed">
                  Log in to access your digital assets, manage your custom requests, and explore new potential.
               </p>
            </div>

            <div className="space-y-8">
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-lg">Secure Access</h4>
                     <p className="text-slate-500 text-sm">Every account is protected by industry-standard encryption protocols.</p>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                     <Zap className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-lg">Instant Sync</h4>
                     <p className="text-slate-500 text-sm">Your purchases are instantly available across all your developer environments.</p>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Right Side - Login Form */}
         <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-full max-w-md mx-auto"
         >
            <div className="glass p-10 md:p-12 shadow-2xl bg-[#1E293B]/70 border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="flex flex-col items-center mb-10 text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40 transform -rotate-6">
                     <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white italic">Enter Workspace</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Provide login credentials</p>
               </div>

               {showSuccess && (
                 <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400 text-sm">
                   <CheckCircle2 className="w-4 h-4" />
                   Registration successful! Please login.
                 </div>
               )}

               {error && (
                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                   <Info className="w-4 h-4" />
                   {error}
                 </div>
               )}

               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-widest pl-2">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                           type="email"
                           required
                           placeholder="john@example.com"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between items-center px-2">
                        <label className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-widest">Password</label>
                        <Link href="/forgot-password" className="text-[10px] text-indigo-400 font-bold uppercase hover:text-white transition-colors">Forgot?</Link>
                     </div>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                           type="password"
                           required
                           placeholder="••••••••"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                     </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary !py-5 text-sm flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/40 relative overflow-hidden group disabled:opacity-50"
                  >
                     {loading ? (
                       <Loader2 className="w-5 h-5 animate-spin" />
                     ) : (
                       <>
                         Sign in <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </>
                     )}
                     <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </button>

                  <div className="pt-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/5">
                     Social logins are temporarily disabled
                  </div>

                  <div className="pt-4 text-center">
                     <p className="text-slate-500 text-sm">
                        Don&apos;t have an account? <Link href="/register" className="text-indigo-400 font-bold hover:text-white transition-all underline underline-offset-4">Join Hub</Link>
                     </p>
                  </div>
               </form>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
               <Info className="w-4 h-4" /> Password reset link available via email
            </div>
         </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default LoginPage;
