"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 30, stiffness: 100 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className="text-4xl font-display font-bold text-white flex items-center">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Products", value: 500, suffix: "+" },
    { label: "Customers", value: 12000, suffix: "+" },
    { label: "Uptime", value: 99.9, suffix: "%" },
    { label: "Support", value: 24, suffix: "/7" },
  ];

  return (
    <section className="bg-indigo-600/5 border-y border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center gap-3 group"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <span className="text-slate-400 group-hover:text-indigo-400 transition-colors uppercase tracking-[0.2em] text-xs font-bold font-mono">
               {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
