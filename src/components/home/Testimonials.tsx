"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "SaaS Founder",
    rating: 5,
    quote: "NexaStore saved me 3 months of development time. The starter kit I bought was clean, professional, and well-documented. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Marketing Director",
    rating: 5,
    quote: "The GPT-4 model integration was seamless. We deployed our financial chatbot in less than 48 hours. The support team is also top-notch.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Full-Stack Dev",
    rating: 4,
    quote: "Cleanest source code I've ever purchased. The bundle was worth every penny. Ready to scale our e-commerce operations next week.",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: 4,
    name: "Olivia White",
    role: "Startup Entrepreneur",
    rating: 5,
    quote: "I didn't know anything about coding, but with NexaStore's 1-click deploy, I launched my mobile app without any training. Remarkable!",
    avatar: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    id: 5,
    name: "Mark Wilson",
    role: "Agency Owner",
    rating: 5,
    quote: "The quality of the AI models is incredible. Best marketplace for digital assets hands down. Looking forward to more SaaS tools.",
    avatar: "https://i.pravatar.cc/150?u=mark",
  }
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Loved by 12,000+ Customers</h2>
          <p className="text-slate-400 max-w-lg mx-auto">See what entrepreneurs and developers are saying about our premium digital products.</p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass p-10 md:p-16 text-center w-full relative"
            >
              <Quote className="w-12 h-12 text-indigo-500/20 absolute top-8 left-8" />
              
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-1">
                  {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-200 font-medium italic leading-relaxed">
                  "{testimonials[activeIdx].quote}"
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/20">
                     <Image src={testimonials[activeIdx].avatar} alt={testimonials[activeIdx].name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-bold">{testimonials[activeIdx].name}</h4>
                    <span className="text-indigo-400 text-sm">{testimonials[activeIdx].role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-10 flex gap-4">
            <button 
              onClick={() => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-3 glass rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
               <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveIdx((prev) => (prev + 1) % testimonials.length)}
              className="p-3 glass rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
               <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-[30%] -left-[10%] w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;
