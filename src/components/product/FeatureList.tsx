"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Cpu, 
  Layout, 
  Layers, 
  Database, 
  Lock, 
  Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureListProps {
  longDesc: string;
  features: string[];
  techStack: string[];
}

const FeatureList = ({ longDesc, features, techStack }: FeatureListProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: <Layout className="w-4 h-4" /> },
    { id: "features", label: "Features", icon: <Layers className="w-4 h-4" /> },
    { id: "tech", label: "Tech Stack", icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <div className="glass overflow-hidden border-white/5 shadow-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-white/5 bg-white/2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all relative overflow-hidden",
              activeTab === tab.id ? "text-indigo-400 bg-indigo-500/5" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="desc"
              className="prose prose-invert max-w-none prose-slate"
            >
              <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {longDesc}
              </div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="feat"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <span className="text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="tech"
              className="flex flex-wrap gap-4"
            >
              {techStack.map((tech, idx) => (
                <div key={idx} className="glass px-6 py-4 flex items-center gap-4 bg-white/5 border-white/5 hover:border-indigo-500/30 group transition-all">
                   <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                      <Database className="w-5 h-5" />
                   </div>
                   <span className="text-white font-bold">{tech}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureList;
