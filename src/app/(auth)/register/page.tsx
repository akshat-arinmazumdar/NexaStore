"use client";




import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Code2, 
  Globe, 
  Rocket, 
  CheckCircle2, 
  Info,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success
      router.push("/login?registered=true");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-40 pb-20 relative overflow-hidden flex flex-col items-center justify-center">
      <Navbar />

      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
         {/* Right Side - Marketing Content */}
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           className="hidden lg:block space-y-12"
         >
            <div className="space-y-6">
               <h1 className="text-6xl font-display font-bold text-white leading-tight">
                  Launch Your Next <br /> 
                  <span className="text-purple-400 italic">Startup Today.</span>
               </h1>
               <p className="text-slate-400 text-xl max-w-md leading-relaxed">
                  Join 12,000+ creators and scale your digital products with professional templates, tools, and models.
               </p>
            </div>

            <div className="space-y-6">
               {[
                  { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, title: "Unlimited Access", desc: "Access all your purchased products any time, including updates." },
                  { icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" />, title: "Developer Dashboard", desc: "Clean tools to manage your licenses, documentation, and support tickets." },
                  { icon: <CheckCircle2 className="w-5 h-5 text-purple-500" />, title: "Community Network", desc: "Connect with thousands of builders on our exclusive Discord channel." }
               ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-indigo-600/5 p-6 rounded-3xl border border-white/5 border-dashed">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        {item.icon}
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Left Side - Register Form */}
         <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-full max-w-lg ml-auto"
         >
            <div className="glass p-10 md:p-14 shadow-2xl bg-[#1E293B]/70 border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="flex flex-col items-center mb-10 text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-2xl shadow-purple-600/40 transform rotate-6">
                     <Rocket className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white italic">Create Creator Account</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Register with NexaStore Hub</p>
               </div>

               {error && (
                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                   <Info className="w-4 h-4" />
                   {error}
                 </div>
               )}

               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-widest pl-2">Full Name</label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                           type="text"
                           required
                           placeholder="John Doe"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/10"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-widest pl-2">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                           type="email"
                           required
                           placeholder="john@example.com"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/10"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-widest pl-2">Password</label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                           type="password"
                           required
                           minLength={6}
                           placeholder="••••••••"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/10"
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="pt-4">
                     <button 
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary !py-5 !bg-purple-600 text-sm flex items-center justify-center gap-3 shadow-2xl shadow-purple-600/40 relative overflow-hidden group disabled:opacity-50"
                     >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Register Hub Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                     </button>
                  </div>

                  <div className="relative py-4 flex items-center gap-4">
                     <div className="h-[1px] flex-grow bg-white/5" />
                     <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">or sign up with</span>
                     <div className="h-[1px] flex-grow bg-white/5" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <button type="button" className="btn-secondary !py-4 flex items-center justify-center gap-3 text-xs w-full bg-[#1E293B] border-white/5 hover:border-slate-400">
                        <Globe className="w-4 h-4" /> Google Hub
                     </button>
                     <button type="button" className="btn-secondary !py-4 flex items-center justify-center gap-3 text-xs w-full bg-[#1E293B] border-white/5 hover:border-slate-400">
                        <Code2 className="w-4 h-4" /> GitHub Hub
                     </button>
                  </div>

                  <div className="pt-8 text-center">
                     <p className="text-slate-400 text-sm">
                        Already have an account? <Link href="/login" className="text-purple-400 font-bold hover:text-white transition-all underline underline-offset-4">Log in</Link>
                     </p>
                  </div>
               </form>
            </div>
         </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default RegisterPage;
