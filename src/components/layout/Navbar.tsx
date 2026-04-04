"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", protected: false },
    { name: "Shop", href: "/shop", protected: true },
    { name: "Custom Project", href: "/custom-project", protected: true },
    { name: "AI Models", href: "#", comingSoon: true },
    { name: "Mobile Apps", href: "#", comingSoon: true },
    { name: "About", href: "/#about", protected: false },
  ];

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.protected && !isAuthenticated) {
      e.preventDefault();
      router.push("/login");
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (link.href.startsWith("/#")) {
      const id = link.href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isDashboard = pathname === "/dashboard";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            NexaStore
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.comingSoon ? (
              <div key={link.name} className="flex items-center gap-2 text-slate-500 opacity-70 cursor-not-allowed">
                <span className="text-sm font-medium">{link.name}</span>
                <span className="bg-[#f59e0b] text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Soon</span>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-indigo-400",
                  pathname === link.href ? "text-indigo-400" : "text-slate-300"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

         {/* Action Icons */}
        <div className="flex items-center gap-5">
          <AnimatePresence>
            {!isDashboard && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center"
              >
                {isSearchOpen ? (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="relative flex items-center"
                  >
                    <input 
                      autoFocus
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    />
                    <button type="submit" className="absolute right-3 text-slate-500 hover:text-indigo-400 p-1">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                    <button 
                       type="button" 
                       onClick={() => setIsSearchOpen(false)}
                       className="absolute -right-8 text-slate-500 hover:text-white"
                    >
                       <X className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-slate-300 hover:text-indigo-400 transition-colors p-2"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <Link href="/wishlist" className="relative group p-2">
            <Heart className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistItems.length}</span>
          </Link>

          <Link href="/cart" className="relative group p-2">
            <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.length}</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {(user as any)?.role === "ADMIN" && (
                <Link href="/admin" className="hidden lg:inline-flex text-[10px] font-bold uppercase tracking-widest text-[#FCD34D] bg-[#FCD34D]/10 px-3 py-1.5 rounded-full border border-[#FCD34D]/20 hover:bg-[#FCD34D]/20 transition-colors">
                  Admin Panel
                </Link>
              )}
              <Link href="/dashboard" className={cn(
                "inline-flex text-[10px] font-bold uppercase tracking-widest transition-colors",
                isDashboard ? "text-indigo-400" : "text-slate-400 hover:text-white"
              )}>
                Dashboard
              </Link>
              <button 
                onClick={() => logout()}
                className="inline-flex btn-secondary !py-2 !px-4 text-[10px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="inline-flex btn-primary !py-2 !px-6 text-sm"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[51] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0F172A] border-l border-white/10 z-[52] md:hidden p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-display font-bold text-white">Navigation</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 border border-white/10 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  link.comingSoon ? (
                    <div key={link.name} className="flex items-center justify-between text-slate-500 opacity-60">
                      <span className="text-lg font-medium">{link.name}</span>
                      <span className="bg-[#f59e0b] text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">Coming Soon</span>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="flex items-center justify-between group"
                    >
                      <span className={cn(
                        "text-lg font-medium",
                        pathname === link.href ? "text-indigo-400" : "text-slate-300"
                      )}>
                        {link.name}
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                <Link 
                  href="/login" 
                  className="w-full btn-primary flex justify-center py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="w-full btn-secondary flex justify-center py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
