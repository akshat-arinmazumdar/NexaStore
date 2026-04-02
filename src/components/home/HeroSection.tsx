"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden flex items-center justify-center">
      {/* Background Mesh Gradient (CSS only) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[130px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] bg-orange-500/10 blur-[110px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            ✦ #1 Digital Marketplace
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-white leading-tight"
            >
              Buy. Deploy. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
                Use. No Code
              </span> <br />
              Needed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
              A premium digital product marketplace where you can browse, buy, and instantly access ready-made apps, websites, AI models, and SaaS tools.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link 
              href="/shop" 
              className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group px-8"
            >
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/custom-project" 
              className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2 px-8"
            >
              Custom Project
            </Link>
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-6 pt-10"
          >
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <Zap className="text-indigo-500 w-5 h-5" /> ⚡ Instant Access
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <Shield className="text-green-500 w-5 h-5" /> 🔒 Secure Payment
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <Rocket className="text-orange-500 w-5 h-5" /> 🚀 1-Click Deploy
            </div>
          </motion.div>
        </div>

        {/* Right - 3D Product Card Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main Card */}
          <div className="glass p-1 w-[450px] aspect-[4/5] transform perspective-1000 rotate-y-[-10deg] rotate-x-[5deg] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none" />
            <div className="h-full w-full bg-[#1E293B] rounded-[14px] p-6 flex flex-col items-center justify-center gap-6">
              <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/30">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold font-display text-white">SaaS Starter Kit</h3>
                <p className="text-slate-400 text-sm max-w-[200px]">Next.js 14, Prisma, Tailwind CSS, NextAuth</p>
              </div>
              <div className="w-full space-y-3 pt-4">
                <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>Price</span>
                  <span className="text-indigo-400 font-bold">₹149.00</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-indigo-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 justify-center pt-2">
                   {[1,2,3,4,5].map(i => (
                     <span key={i} className="text-orange-400">★</span>
                   ))}
                   <span className="text-slate-500 text-[10px] ml-1">(4.9/5)</span>
                </div>
              </div>
            </div>
            {/* Gloss Highlight */}
            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          </div>

          {/* Floating Elements Around Card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-5 glass p-4 px-6 flex items-center gap-4 bg-indigo-600/10 border-indigo-600/20"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-xs text-white">✓</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">New Sale</p>
              <p className="text-xs font-bold text-white">#9841 Made a purchase</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] -left-12 glass p-4 py-5 flex items-center gap-4 bg-purple-600/10 border-purple-600/20"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center animate-bounce">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-bold text-indigo-400">⚡ Fast Deploy</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
