"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  Users, 
  MessageSquare, 
  ChevronRight,
  LogOut,
  Bell,
  Search,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Products", href: "/admin/products", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Orders", href: "/admin/orders", icon: <Truck className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Support Tickets", href: "/admin/support", icon: <MessageSquare className="w-5 h-5" /> },
];

export default function AdminLayoutClient({ 
  children,
  session
}: { 
  children: React.ReactNode;
  session: Session | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1E293B]/50 border-r border-white/5 backdrop-blur-xl hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
              <ShieldAlert className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              NexaAdmin
            </span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2 py-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Main Menu</p>
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-4 rounded-2xl transition-all group",
                pathname === link.href 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  "transition-colors",
                  pathname === link.href ? "text-white" : "text-slate-500 group-hover:text-indigo-400"
                )}>
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.name}</span>
              </div>
              {pathname === link.href && <ChevronRight className="w-4 h-4" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <div className="bg-white/5 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-700 rounded-full border-2 border-indigo-500/30 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.email}`} alt="Admin" />
               </div>
               <div>
                  <p className="text-white font-bold text-sm truncate max-w-[120px]">{session?.user?.name}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Super Admin</p>
               </div>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="w-full btn-secondary !py-3 flex items-center justify-center gap-2 text-xs"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0F172A]/50 backdrop-blur-md sticky top-0 z-40">
           <div className="relative w-96 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                 placeholder="Search dashboard..." 
                 className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0F172A]" />
              </button>
              <div className="h-6 w-px bg-white/10" />
              <p className="text-slate-400 text-xs font-mono">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
           </div>
        </header>

        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
