"use client";

import React from "react";
import { ArrowLeft, RefreshCcw, FileX, MessageSquare, Timer, CheckCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RefundPolicy() {
  const router = useRouter();
  const lastUpdated = "April 2026";

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-8 group transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back Home</span>
        </button>

        {/* Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Refund <span className="text-indigo-500">Policy</span>
            </h1>
            <p className="text-slate-400">Last Updated: {lastUpdated}</p>
          </div>

          {/* Policy Body */}
          <div className="p-8 md:p-12 space-y-12 text-sm italic border-b border-white/5 opacity-50 text-center">
            <p>Transparency and clarity in our refund operations for digital goods.</p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <FileX className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">1. No Refund Policy</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                Since NexaStore specializes in digital, non-tangible assets, <strong>all products are non-refundable</strong> once 
                the download link has been provided or assets have been accessed. After you have accessed or downloaded 
                a product, no refund will be issued under any normal circumstances.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <RefreshCcw className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">2. Policy Exceptions</h2>
              </div>
              <div className="text-slate-400 leading-relaxed pl-8 space-y-3">
                <p>Refunds may be evaluated exclusively in the following scenarios:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li><strong>Broken Asset</strong>: The digital product is completely non-functional as described.</li>
                  <li><strong>Incorrect Product</strong>: You received an asset entirely different from what you purchased.</li>
                  <li><strong>Duplicate Transaction</strong>: You were charged twice for the same exact order due to a processing error.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Timer className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">3. How to Request & Resolution</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                To request a refund under the above exceptions, please email <strong className="text-indigo-400">pocketmoneystudents@gmail.com</strong> 
                within 48 hours of purchase. You must include your <strong>Order ID</strong> and 
                a clear explanation for the request. All decisions made by NexaStore Management are final and 
                processed on a case-by-case basis.
              </p>
            </section>

            <section className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-8 mt-12">
              <div className="flex items-center gap-3 text-white mb-3">
                <Mail className="w-5 h-5" />
                <h2 className="text-lg font-bold">Contact Support</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">If you have technical issues, our team can help you resolve them first.</p>
              <a href="mailto:pocketmoneystudents@gmail.com" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4">
                pocketmoneystudents@gmail.com
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
