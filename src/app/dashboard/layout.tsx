"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShoppingBasket,
  ChevronRight,
  User as UserIcon,
  ShieldCheck,
  Package,
  ExternalLink,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "My Orders", href: "/dashboard/orders", icon: <ShoppingBasket className="w-5 h-5" /> },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: <Heart className="w-5 h-5" /> },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 h-fit sticky top-28">
           <div className="glass p-8 space-y-12 bg-[#1E293B]/70 shadow-2xl border-white/5">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 p-1 relative shadow-lg shadow-indigo-600/20">
                    <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                       {user?.name?.[0] || <UserIcon className="w-6 h-6" />}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#1E293B] flex items-center justify-center text-white">
                       <ShieldCheck className="w-3 h-3" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-lg truncate max-w-[140px]">{user?.name || "Premium User"}</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Nexa Member</p>
                    <p className="text-slate-500 text-[10px] font-mono truncate max-w-[180px]">
                      {user?.email || ""}
                    </p>
                 </div>
              </div>
              
              <nav className="flex flex-col gap-3">
                 {sidebarLinks.map((link) => (
                   <Link
                     key={link.name}
                     href={link.href}
                     className={cn(
                        "flex items-center justify-between px-6 py-4 rounded-xl transition-all font-medium text-sm group",
                        pathname === link.href 
                          ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                     )}
                   >
                      <div className="flex items-center gap-4">
                        {link.icon}
                        {link.name}
                      </div>
                      <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", pathname === link.href ? "opacity-100" : "opacity-0")} />
                   </Link>
                 ))}
                 
                 <div className="pt-8 mt-8 border-t border-white/5 flex flex-col gap-3">
                    <button 
                      onClick={() => logout()}
                      className="flex items-center gap-4 px-6 py-4 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium text-sm"
                    >
                       <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                 </div>
              </nav>
           </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden flex items-center justify-between mb-4 glass p-4 px-6 border-indigo-500/10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                 {user?.name?.[0] || "U"}
              </div>
              <h3 className="text-white font-bold">My Dashboard</h3>
           </div>
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 glass rounded-lg text-indigo-400">
              <Menu className="w-6 h-6" />
           </button>
        </div>

        {/* Main Dashboard Content */}
        <main className="flex-grow min-w-0">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
             >
                {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] md:hidden"
               onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div 
               initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[#0F172A] z-[61] md:hidden p-8 flex flex-col"
            >
               <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-display font-bold text-white">Dashboard Menu</span>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 border border-white/10 rounded-full text-slate-400">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               <nav className="flex flex-col gap-6">
                 {sidebarLinks.map((link) => (
                   <Link
                     key={link.name}
                     href={link.href}
                     onClick={() => setIsSidebarOpen(false)}
                     className={cn(
                        "flex items-center gap-6 text-lg font-medium",
                        pathname === link.href ? "text-indigo-400" : "text-slate-300"
                     )}
                   >
                     {link.icon} {link.name}
                   </Link>
                 ))}
               </nav>
               
               <div className="mt-auto pt-8 border-t border-white/5">
                  <button 
                    onClick={() => logout()}
                    className="flex items-center gap-6 text-red-400 font-bold text-lg"
                  >
                    <LogOut className="w-6 h-6" /> Sign Out
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
