"use client";

import React from "react";
import { Star, SlidersHorizontal, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All Categories", value: "ALL" },
  { label: "AI Models", value: "AI_MODEL" },
  { label: "Mobile Apps", value: "MOBILE_APP" },
  { label: "Websites", value: "WEBSITE" },
  { label: "SaaS Tools", value: "SAAS_TOOL" },
  { label: "Bundles", value: "BUNDLE" },
];

const ratings = [5, 4, 3, 2, 1];

const FilterSidebar = ({ 
  activeCategory, 
  setActiveCategory,
  activeRating,
  setActiveRating,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClose
}: {
  activeCategory: string;
  setActiveCategory: (val: string) => void;
  activeRating: number | null;
  setActiveRating: (val: number | null) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  onClose?: () => void;
}) => {
  const resetFilters = () => {
    setActiveCategory("ALL");
    setActiveRating(null);
    setPriceRange([0, 1000]);
    setSortBy("newest");
  };

  return (
    <div className="flex flex-col gap-10 p-6 glass h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between md:hidden mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-indigo-400" /> Filters
        </h3>
        <button onClick={onClose} className="p-2 glass rounded-full text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "text-left px-4 py-3 rounded-xl transition-all text-sm font-medium",
                activeCategory === cat.value 
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Price Range */}
      <section className="space-y-4">
        <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">Price Range</h4>
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="flex-1 space-y-2">
                 <label className="text-[10px] text-slate-500 font-bold uppercase">Min</label>
                 <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">₹</span>
                    <input 
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-[#1E293B] border border-white/5 rounded-xl py-2 pl-6 pr-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50" 
                    />
                 </div>
              </div>
              <div className="w-2 h-px bg-slate-700 mt-6" />
              <div className="flex-1 space-y-2">
                 <label className="text-[10px] text-slate-500 font-bold uppercase">Max</label>
                 <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">₹</span>
                    <input 
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-[#1E293B] border border-white/5 rounded-xl py-2 pl-6 pr-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50" 
                    />
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setPriceRange([0, 100])}
                className={cn(
                  "py-2 rounded-lg border text-[10px] uppercase font-bold transition-all",
                  priceRange[1] === 100 ? "bg-indigo-500 text-white border-indigo-500" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                )}
              >
                Under ₹100
              </button>
              <button 
                onClick={() => setPriceRange([100, 500])}
                className={cn(
                  "py-2 rounded-lg border text-[10px] uppercase font-bold transition-all",
                  priceRange[1] === 500 ? "bg-indigo-500 text-white border-indigo-500" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                )}
              >
                ₹100 - ₹500
              </button>
           </div>
        </div>
      </section>

      {/* Minimum Rating */}
      <section className="space-y-4">
        <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">Minimum Rating</h4>
        <div className="flex flex-col gap-2">
          {ratings.map((star) => (
            <button
               key={star}
               onClick={() => setActiveRating(activeRating === star ? null : star)}
               className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  activeRating === star 
                    ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
               )}
            >
               <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4",
                        i < star ? "fill-orange-400 text-orange-400" : "text-slate-700"
                      )} 
                    />
                 ))}
               </div>
               <span>{star}.0 & up</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sort By */}
      <section className="space-y-4">
        <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">Sort By</h4>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-[#1E293B] border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rated</option>
        </select>
      </section>
      
      <button 
        onClick={resetFilters}
        className="mt-4 w-full py-3 bg-red-400/10 border border-red-400/30 text-red-400 rounded-xl text-sm font-bold hover:bg-red-400/20 transition-all uppercase tracking-widest"
      >
         Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
