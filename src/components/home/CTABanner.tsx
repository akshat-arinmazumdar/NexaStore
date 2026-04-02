"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-12 md:p-24 bg-gradient-to-br from-indigo-900/40 via-[#1E293B]/70 to-[#0F172A]/80 border-indigo-500/20 shadow-2xl relative overflow-hidden"
      >
        {/* Animated Background Orbs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full animate-pulse delay-1000" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4" /> Custom Project Services
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white max-w-2xl leading-[1.1]">
              Have a custom project <br /> in mind?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
              Don't find what you're looking for? Our team of expert developers and AI architects can build your dream tool from scratch.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 w-full md:w-auto"
          >
            <Link 
              href="/custom-project" 
              className="btn-primary !py-5 !px-12 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 group"
            >
              Let's Discuss <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-slate-500 text-sm italic">Free consultation included ⚡</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
