"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductCard from "@/components/shop/ProductCard";
import { Search, SlidersHorizontal, PackageX, ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/types/prisma";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

  // Products fetched from API

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const mappedData = data.map((p: any) => ({
          ...p,
          image: p.images?.[0] || "/images/placeholder.png", // fallback image
        }));
        setProducts(mappedData);
      } catch (err) {
        // Avoid noisy console logs during navigation/unmount.
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "ALL" || product.category === activeCategory;
    const matchesRating = !activeRating || product.rating >= activeRating;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesRating && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popular") return b.rating - a.rating; // Placeholder for popularity
    return 0; // "newest" as default (items are already in order)
  });

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-4">
           <div className="relative flex-1 mr-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                placeholder="Search products..." 
                className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="p-3 glass rounded-xl text-indigo-400 hover:text-white"
           >
             <SlidersHorizontal className="w-6 h-6" />
           </button>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 h-fit sticky top-28">
           <FilterSidebar 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeRating={activeRating}
              setActiveRating={setActiveRating}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
           />
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Top Bar (Desktop Search + Stats) */}
          <div className="hidden md:flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
             <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Shop All Products</h1>
                <p className="text-slate-400 text-sm">Showing {filteredProducts.length} results of premium digital products</p>
             </div>
             
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  placeholder="Search products..." 
                  className="w-full bg-[#1E293B] border border-white/10 rounded-2xl py-4 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {loading ? (
                  <div className="col-span-3 text-center text-white py-12">Loading products...</div>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                 <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                    <PackageX className="w-12 h-12 text-slate-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
                 <p className="text-slate-400 max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
                 <button 
                  onClick={() => {
                    setActiveCategory("ALL");
                    setActiveRating(null);
                    setPriceRange([0, 1000]);
                    setSortBy("newest");
                    setSearchQuery("");
                  }}
                  className="mt-8 text-indigo-400 font-bold hover:text-white transition-colors"
                 >
                   Clear All Filters
                 </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600/20 transition-all active:scale-95 border-white/5">
                <ChevronLeft className="w-6 h-6" />
              </button>
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  className={cn(
                    "w-12 h-12 rounded-full font-bold transition-all border border-white/5",
                    page === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "glass text-slate-400 hover:text-white"
                  )}
                >
                  {page}
                </button>
              ))}
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600/20 transition-all active:scale-95 border-white/5">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] md:hidden"
               onClick={() => setIsFilterOpen(false)}
            />
            <motion.div 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed bottom-0 left-0 right-0 h-[85vh] bg-[#0F172A] rounded-t-[40px] z-[61] md:hidden overflow-y-auto"
            >
               <FilterSidebar 
                  activeCategory={activeCategory}
                  setActiveCategory={(val) => {
                    setActiveCategory(val);
                    setIsFilterOpen(false);
                  }}
                  activeRating={activeRating}
                  setActiveRating={setActiveRating}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onClose={() => setIsFilterOpen(false)}
               />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
