"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Rocket, 
  Send, 
  Upload, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Cpu, 
  Layout, 
  HelpCircle,
  ChevronDown,
  Calendar,
  Wallet,
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  Timer,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const projectTypes = [
  { id: "web", label: "Web App", icon: <Globe className="w-5 h-5" /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone className="w-5 h-5" /> },
  { id: "ai", label: "AI Model", icon: <Cpu className="w-5 h-5" /> },
  { id: "full", label: "Full Package", icon: <Layout className="w-5 h-5" /> },
  { id: "other", label: "Other", icon: <HelpCircle className="w-5 h-5" /> },
];

const budgets = [
  "Under ₹5K",
  "₹5K–₹20K",
  "₹20K–₹50K",
  "₹50K–₹1L",
  "₹1L+",
  "Let's Discuss",
];

const CustomProjectPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "web",
    budget: "₹20K–₹50K",
    timeline: "2 Weeks",
    description: "",
    links: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr" | null>(null);
  const [qrTimer, setQrTimer] = useState(300); // 5 mins

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentMethod === "qr" && qrTimer > 0) {
      interval = setInterval(() => setQrTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [paymentMethod, qrTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDepositAmount = () => {
    const budgetMap: Record<string, string> = {
      "Under ₹5K": "2,500",
      "₹5K–₹20K": "10,000",
      "₹20K–₹50K": "25,000",
      "₹50K–₹1L": "50,000",
      "₹1L+": "75,000",
      "Let's Discuss": "15,000"
    };
    return budgetMap[formData.budget] || "10,000";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const CustomSelect = ({ 
    options, 
    value, 
    onChange, 
    icon 
  }: { 
    options: string[], 
    value: string, 
    onChange: (val: string) => void,
    icon: React.ReactNode
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm flex items-center justify-between cursor-pointer transition-all hover:bg-white/10",
            isOpen && "ring-2 ring-indigo-500/50 border-indigo-500/50"
          )}
        >
           <div className="flex items-center gap-3">
              <span className="text-indigo-400 opacity-60">{icon}</span>
              <span className="font-medium">{value}</span>
           </div>
           <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform duration-300", isOpen && "rotate-180")} />
        </div>
        
        <AnimatePresence>
           {isOpen && (
             <>
               <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
               <motion.div
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 className="absolute left-0 right-0 top-full mt-3 bg-[#1E293B] border border-white/10 rounded-2xl p-2 shadow-2xl z-[101] backdrop-blur-3xl overflow-hidden"
               >
                  <div className="grid grid-cols-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                     {options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                             onChange(opt);
                             setIsOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-5 py-3.5 rounded-xl text-sm transition-all flex items-center justify-between group",
                            value === opt ? "bg-indigo-600/20 text-indigo-400 font-bold" : "text-slate-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                           {opt}
                           {value === opt && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                        </button>
                     ))}
                  </div>
               </motion.div>
             </>
           )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 overflow-hidden relative">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest"
           >
              <Rocket className="w-4 h-4" /> Custom Development Service
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-6xl font-display font-bold text-white"
           >
             Let's Build Your <br /> Dream Product
           </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
           >
             Tell us about your project requirements, and our team of experts will contact you within 24 hours with a custom proposal.
           </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 md:p-12 shadow-2xl bg-[#1E293B]/70 border-indigo-500/20"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Full Name (Required)</label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Email Address (Required)</label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                   </div>
                </div>

                {/* Project Type */}
                <div className="space-y-4">
                   <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Project Type</label>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({...formData, projectType: type.id})}
                          className={cn(
                             "flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all h-full",
                             formData.projectType === type.id 
                               ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10" 
                               : "bg-white/3 border-white/5 text-slate-500 hover:border-indigo-500/30 hover:text-indigo-400"
                          )}
                        >
                           {type.icon}
                           <span className="text-[10px] font-bold uppercase tracking-widest">{type.label}</span>
                        </button>
                      ))}
                   </div>
                </div>

                {/* Budget & Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Estimated Budget</label>
                       <CustomSelect 
                         options={budgets}
                         value={formData.budget}
                         onChange={(val) => setFormData({...formData, budget: val})}
                         icon={<Wallet className="w-4 h-4" />}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Expected Timeline</label>
                       <CustomSelect 
                         options={[
                           "ASAP (Immediate start)",
                           "1 Week",
                           "2 Weeks",
                           "1 Month",
                           "Flexible"
                         ]}
                         value={formData.timeline}
                         onChange={(val) => setFormData({...formData, timeline: val})}
                         icon={<Calendar className="w-4 h-4" />}
                       />
                    </div>
                 </div>

                {/* Project Description */}
                <div className="space-y-3 relative">
                   <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Project Description (min. 100 chars)</label>
                   <textarea 
                     required
                     minLength={100}
                     placeholder="Tell us about your project features, target audience, and preferred tech stack..."
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[180px] transition-all hover:bg-white/10"
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                   />
                   <span className="absolute bottom-4 right-6 text-[10px] font-mono text-slate-600">
                     {formData.description.length} chars
                   </span>
                </div>

                {/* Reference Links & File Upload Mock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Reference Links (Optional)</label>
                      <input 
                        type="text"
                        placeholder="e.g. Behance link, existing app, etc."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={formData.links}
                        onChange={(e) => setFormData({...formData, links: e.target.value})}
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Attach Files (Mock)</label>
                      <div className="w-full border-2 border-dashed border-white/10 rounded-2xl p-4 flex items-center justify-center gap-4 bg-white/3 hover:bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer">
                         <Upload className="w-6 h-6 text-indigo-400" />
                         <span className="text-slate-400 text-xs font-medium">Click to upload mock attachment</span>
                      </div>
                   </div>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full btn-primary !py-6 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/40 relative overflow-hidden group disabled:opacity-70"
                  >
                     {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                     ) : (
                        <>
                          Send My Request <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                     )}
                     <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 text-center shadow-2xl bg-indigo-600/5 border-indigo-600/20 max-w-2xl mx-auto overflow-hidden relative"
              >
                 <AnimatePresence mode="wait">
                   {!showPayment ? (
                      <motion.div 
                        key="success-msg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                         <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30 ring-8 ring-green-500/10">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                         </div>
                         <h2 className="text-4xl font-display font-bold text-white mb-4">Request Received! ⚡</h2>
                         <p className="text-slate-400 text-lg leading-relaxed">
                            Thank you, {formData.name.split(' ')[0]}! We've received your request. One of our lead advisors will contact you at <span className="text-indigo-400 font-bold">{formData.email}</span> within 24 hours.
                         </p>
                         
                         <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                              onClick={() => setShowPayment(true)}
                              className="btn-primary !px-8 !py-5 flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 group"
                            >
                               Pay 50% Deposit <Zap className="w-4 h-4 fill-white animate-pulse" />
                            </button>
                            <button 
                              onClick={() => setIsSubmitted(false)}
                              className="btn-secondary !px-8 !py-5"
                            >
                               Close & Return
                            </button>
                         </div>
                         <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-[4px] font-bold">Pay deposit to fast-track your project</p>
                      </motion.div>
                   ) : paymentMethod === null ? (
                      <motion.div 
                        key="payment-select"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                         <h2 className="text-3xl font-display font-bold text-white mb-2">Secure Payment</h2>
                         <p className="text-slate-500 mb-10">Choose your preferred method to pay the <span className="text-indigo-400 font-bold">₹{getDepositAmount()}</span> deposit.</p>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                            <button 
                              onClick={() => setPaymentMethod("card")}
                              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                            >
                               <CreditCard className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
                               <span className="font-bold text-white">Credit / Debit Card</span>
                            </button>
                            <button 
                              onClick={() => setPaymentMethod("qr")}
                              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                            >
                               <QrCode className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
                               <span className="font-bold text-white">Scan QR (UPI)</span>
                            </button>
                         </div>
                         
                         <button onClick={() => setShowPayment(false)} className="text-xs font-bold text-indigo-400 hover:text-white uppercase tracking-widest">← Back to confirmation</button>
                      </motion.div>
                   ) : paymentMethod === "card" ? (
                      <motion.div 
                        key="card-payment"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-left"
                      >
                         <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white">Card Details</h3>
                            <button onClick={() => setPaymentMethod(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                               <X className="w-5 h-5 text-slate-500" />
                            </button>
                         </div>
                         
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Card Number</label>
                               <div className="relative">
                                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Expiry</label>
                                  <input placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">CVC</label>
                                  <input placeholder="***" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                               </div>
                            </div>
                            
                            <button className="w-full btn-primary !py-4 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                               Securely Pay ₹{getDepositAmount()} <ShieldCheck className="w-4 h-4" />
                            </button>
                         </div>
                      </motion.div>
                   ) : (
                      <motion.div 
                        key="qr-payment"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                      >
                         <div className="flex items-center justify-between w-full mb-8">
                            <h3 className="text-xl font-bold text-white">Scan & Pay</h3>
                            <button onClick={() => setPaymentMethod(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                               <X className="w-5 h-5 text-slate-500" />
                            </button>
                         </div>
                         
                         <div className="relative p-4 bg-white rounded-3xl shadow-2xl mb-6 ring-8 ring-indigo-500/10 transition-all hover:scale-105 duration-500">
                            <div className="flex flex-col items-center">
                               <img 
                                 src={"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=nexastore@upi&pn=NexaStore&am="+getDepositAmount().replace(',','')+"&cu=INR"}
                                 alt="UPI QR Code" 
                                 className="w-48 h-48 mb-4"
                               />
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pay NexaStore Premium</span>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-3 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20 mb-8">
                            <Timer className="w-4 h-4 text-red-500 animate-pulse" />
                            <span className="text-sm font-mono font-bold text-red-500 underline decoration-red-500/30 underline-offset-4">Code expires in: {formatTime(qrTimer)}</span>
                         </div>
                         
                         <p className="text-xs text-slate-500">Waiting for payment confirmation from your app...</p>
                      </motion.div>
                   )}
                 </AnimatePresence>
              </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
};

export default CustomProjectPage;
