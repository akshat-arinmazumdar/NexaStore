"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Rocket, 
  Award, 
  Clock 
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Who We Are",
    description: "NexaStore is a community-driven marketplace for digital products, specifically designed for modern creators and entrepreneurs.",
    color: "indigo"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Our Mission",
    description: "To democratize high-end technology and ready-made digital assets, making them accessible to everyone at affordable prices.",
    color: "purple"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Quality First",
    description: "Every product in our marketplace is hand-picked and verified across quality standards to ensure industry-level output.",
    color: "blue"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side - Visual Concept */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-1 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <img 
                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                 alt="Our Team" 
                 className="rounded-[22px] w-full h-[500px] object-cover mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-700"
               />
               
               {/* Stats Overlays */}
               <div className="absolute bottom-10 -right-10 glass p-6 rounded-2xl bg-[#0F172A]/80 border-indigo-500/20 shadow-2xl">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                        <Clock className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-white font-bold text-2xl">5 Years+</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Industry Experience</p>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Background Orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/30 blur-[100px] rounded-full" />
          </motion.div>

          {/* Right Side - Content */}
          <div className="space-y-12">
            <div className="space-y-4">
               <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-indigo-400 font-mono font-bold text-xs uppercase tracking-[0.3em]"
               >
                  Unlocking Potential
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
               >
                  The <span className="text-indigo-400 italic">Core</span> Behind the NexaStore.
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="text-slate-400 text-lg leading-relaxed max-w-xl"
               >
                  We are more than just a store — we are an ecosystem that bridges the gap between complex engineering and simplified business growth.
               </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex gap-6 items-start group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 transition-all duration-300",
                    "group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] bg-slate-900/50",
                    feature.color === "indigo" ? "text-indigo-400 group-hover:border-indigo-500/30" : 
                    feature.color === "purple" ? "text-purple-400 group-hover:border-purple-500/30" : 
                    "text-blue-400 group-hover:border-blue-500/30"
                  )}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group relative px-8 py-4 bg-white text-indigo-950 font-bold rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 active:scale-95"
            >
               <span className="relative z-10 flex items-center gap-2">
                 Join Our Journey <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-indigo-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
