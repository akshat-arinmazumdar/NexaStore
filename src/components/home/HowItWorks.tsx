"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, Play } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "1. Browse",
    description: "Explore our collection of premium apps, websites, and AI models.",
    color: "bg-indigo-500",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "2. Buy",
    description: "Secure payment with instant access after purchase.",
    color: "bg-purple-500",
  },
  {
    icon: <Play className="w-8 h-8" />,
    title: "3. Use Instantly",
    description: "Download the source code or deploy with 1-click.",
    color: "bg-green-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">How It Works</h2>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Get your project up and running in minutes, not months. Our streamlined 3-step process is designed for entrepreneurs and small businesses alike.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-start">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-[15%] left-[20%] right-[20%] h-[2px] border-t-2 border-dashed border-white/10" />

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center group relative z-10"
          >
            <div className={`w-20 h-20 rounded-2xl ${step.color} bg-opacity-20 flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform shadow-2xl mb-8`}>
               {step.icon}
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-4">{step.title}</h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
