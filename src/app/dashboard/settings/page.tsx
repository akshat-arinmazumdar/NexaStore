"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Zap,
  Globe,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const DashSettingsPage = () => {
   const { data: session, update } = useSession();
   const user = session?.user;
   const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
   const [isSaving, setIsSaving] = useState(false);
   const [name, setName] = useState(user?.name || "");
   const [email, setEmail] = useState(user?.email || "");
   const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

   useEffect(() => {
     if (user) {
       setName(user.name || "");
       setEmail(user.email || "");
     }
   }, [user]);

   const handleSave = async () => {
     setIsSaving(true);
     setMessage(null);
     try {
       const res = await fetch("/api/user/profile", {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, email }),
       });
       const data = await res.json();
       if (res.ok) {
         setMessage({ type: 'success', text: "Profile updated successfully!" });
         // Update the NextAuth session.
         await update({ name });
       } else {
         setMessage({ type: 'error', text: data.error || "Failed to update profile" });
       }
     } catch (error) {
       setMessage({ type: 'error', text: "An error occurred while saving." });
     } finally {
         setIsSaving(false);
         setTimeout(() => setMessage(null), 3000);
     }
   };

   return (
      <div className="space-y-10 pb-20">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
               <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                  <Settings className="w-8 h-8 text-slate-500" /> Account Settings
               </h1>
               <p className="text-slate-500 text-sm">Refine your profile and enhance your marketplace experience.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={cn(
                                "text-xs font-bold px-4 py-2 rounded-lg border",
                                message.type === 'success' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                            )}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 group disabled:opacity-70"
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-6">
            {/* Tabs Navigation */}
            <div className="flex flex-col gap-2">
               {[
                  { id: "profile", label: "Profile Info", icon: <User className="w-5 h-5" /> },
                  { id: "security", label: "Security & Login", icon: <ShieldCheck className="w-5 h-5" /> },
                  { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> }
               ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest text-left",
                      activeTab === tab.id 
                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-xl" 
                        : "text-slate-500 hover:text-white"
                    )}
                  >
                     {tab.icon} {tab.label}
                  </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-3">
               <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass p-10 bg-white/2 space-y-10"
                    >
                       <div className="flex flex-col md:flex-row gap-10 items-center border-b border-white/5 pb-10">
                          <div className="relative group">
                             <div className="w-32 h-32 rounded-full border-2 border-indigo-500/20 p-1 bg-indigo-600/10 flex items-center justify-center relative shadow-2xl overflow-hidden ring-4 ring-indigo-500/10">
                                <span className="text-4xl font-display font-bold text-indigo-400">{name?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || "J"}</span>
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                                   <Star className="w-6 h-6 text-white" />
                                </div>
                             </div>
                             <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-4 border-[#0F172A] shadow-lg">
                                <Zap className="w-4 h-4" />
                             </div>
                          </div>
                          <div className="space-y-4 flex-grow">
                             <h4 className="text-xl font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-indigo-400" /> Public Identity
                             </h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                   <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Display Name</label>
                                   <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-1 focus:ring-indigo-500/50" />
                                </div>
                                <div className="space-y-3">
                                   <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Username</label>
                                   <input value={`@${name.toLowerCase().replace(/\s/g, "")}`} readOnly className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-slate-500 text-sm focus:outline-none cursor-not-allowed" />
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <h4 className="text-xl font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                             <ArrowRight className="w-4 h-4 text-indigo-400" /> Digital Reach
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-white/5">
                             <div className="space-y-3">
                                <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Email Address (Read Only)</label>
                                <div className="relative">
                                   <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                   <input value={email} readOnly className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-slate-500 text-sm focus:outline-none cursor-not-allowed" />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Country</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-1 focus:ring-indigo-500/50 appearance-none">
                                   <option>India</option>
                                   <option>United States</option>
                                   <option>United Kingdom</option>
                                </select>
                             </div>
                          </div>
                          <div className="pt-4">
                             <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                   <Crown className="w-8 h-8 text-indigo-400" />
                                   <div>
                                      <p className="text-white font-bold text-sm">Nexa Gold Tier Member</p>
                                      <p className="text-slate-500 text-xs mt-1">Status: Active Lifetime Access</p>
                                   </div>
                                </div>
                                <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-600/20">Manage Badge</button>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
};

const Crown = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
   </svg>
)

export default DashSettingsPage;
