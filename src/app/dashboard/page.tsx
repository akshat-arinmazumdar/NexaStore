"use client";




import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Heart, 
  Clock, 
  Download, 
  Package,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Fetched orders from /api/orders

const DashboardOverview = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((orders) => {
          if (!Array.isArray(orders)) {
            setPurchasedItems([]);
            return;
          }
          // Flatten items from all orders
          const items = orders.flatMap((order: any) => 
            order.items.map((item: any) => ({
              id: item.id,
              name: item.product.name,
              category: item.product.category,
              date: new Date(order.createdAt).toLocaleDateString(),
              status: "Active",
              image: item.product.images?.[0] || "/images/placeholder.png",
              version: "v1.0.0",
              accessLink: item.accessLink || item.product.accessLink
            }))
          );
          setPurchasedItems(items);
        })
        .catch(() => {
          // Avoid noisy console errors during auth transitions.
          // If the user isn't actually authorized, we can safely show an empty state.
          setPurchasedItems([]);
        })
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const filteredItems = purchasedItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-grow space-y-10">
       
       {/* Header Section */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-indigo-500" />
              My Overview
            </h1>
            <p className="text-slate-400 text-sm">Welcome back! You have {purchasedItems.length} active digital assets.</p>
          </div>

          {/* Dashboard Specific Search */}
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               placeholder="Search your assets..."
               className="w-full bg-[#1E293B] border border-white/5 rounded-2xl py-3 pl-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
       </div>

       {/* Quick Stats Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Active Assets", value: purchasedItems.length.toString(), icon: <Package className="w-5 h-5 text-indigo-400" /> },
            { label: "Downloads", value: purchasedItems.length.toString(), icon: <Download className="w-5 h-5 text-green-400" /> },
            { label: "Wishlist", value: "8", icon: <Heart className="w-5 h-5 text-red-500" /> },
          ].map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass p-6 bg-[#1E293B]/40 group flex items-center justify-between border-white/5 hover:border-indigo-500/30 transition-all"
            >
               <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
               </div>
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
               </div>
            </motion.div>
          ))}
       </div>

       {/* Content Grid */}
       <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
             {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.id}
                    className="glass bg-[#1E293B]/40 group flex flex-col xl:flex-row items-center border-white/5 p-4 md:p-6 gap-6 hover:bg-[#1E293B]/60 transition-all border hover:border-indigo-500/30 shadow-xl"
                  >
                     <div className="w-full xl:w-40 h-28 rounded-xl overflow-hidden relative border border-white/10 shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                     </div>

                     <div className="flex-grow text-center md:text-left">
                        <div className="flex items-center flex-wrap justify-center md:justify-start gap-2 mb-2">
                           <span className="text-[10px] font-bold font-mono uppercase px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">{item.category}</span>
                           <span className="text-[10px] font-bold font-mono uppercase px-2 py-1 bg-white/5 text-slate-400 rounded-md">{item.version}</span>
                           <span className={cn(
                             "text-[10px] font-bold font-mono uppercase px-2 py-1 rounded-md",
                             item.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"
                           )}>
                             ● {item.status}
                           </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-slate-500 text-xs font-medium flex items-center justify-center md:justify-start gap-2">
                           <Clock className="w-3 h-3" /> Purchased on {item.date}
                        </p>
                     </div>

                     <div className="flex items-center gap-3 w-full xl:w-auto">
                        <button className="flex-1 xl:flex-none py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                           <Code2 className="w-4 h-4" /> Repository
                        </button>
                        <a 
                           href={item.accessLink} 
                           target="_blank"
                           rel="noreferrer"
                           className="flex-1 xl:flex-none py-3 px-6 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                           <Download className="w-4 h-4" /> Download Files
                        </a>
                     </div>
                  </motion.div>
                ))
             ) : (
                <div className="text-center py-20 bg-white/3 rounded-3xl border border-dashed border-white/10">
                   <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                   <h3 className="text-white font-bold text-lg">
                     {loading ? "Loading assets..." : "No assets found"}
                   </h3>
                   {!loading && <p className="text-slate-500 text-sm">Try adjusting your search query.</p>}
                </div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};

export default DashboardOverview;
