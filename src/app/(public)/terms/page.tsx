"use client";

import React from "react";
import { ArrowLeft, Scale, ShoppingCart, UserCheck, AlertCircle, MapPin, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TermsOfService() {
  const router = useRouter();
  const lastUpdated = "April 2026";

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto font-sans">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Go Back</span>
        </button>

        {/* Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Terms <span className="text-indigo-500">Of Service</span>
            </h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span>Agreement for Use of NexaStore Platform</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Policy Body */}
          <div className="p-8 md:p-12 space-y-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Scale className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                By accessing and using NexaStore, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, you should not access or use the marketplace.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">2. Digital Products Policy</h2>
              </div>
              <div className="text-slate-400 leading-relaxed pl-8 space-y-3">
                <p>NexaStore products (Websites, AI Models, Mobile Apps) are sold as digital assets:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li><strong>All sales are final</strong>. Refunds are not issued for any digital products after download or access has been provided.</li>
                  <li><strong>License</strong>: Every purchase grants a limited license for use within your 프로젝트. License is non-transferable.</li>
                  <li><strong>Redistribution</strong>: Strict prohibition on unauthorized reselling or redistribution of source code.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <UserCheck className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">3. User Accounts</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                Users are required to provide accurate information during registration and are responsible 
                for maintaining the confidentiality and security of their account credentials. NexaStore 
                shall not be held liable for any loss resulting from unauthorized account access.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">4. Prohibited Activities</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                Users may not engage in reverse engineering, unauthorized API access, reselling, or using NexaStore 
                for any illegal purpose. Any violation of these terms may result in immediate account termination.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <MapPin className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">5. Governing Law (India)</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                These terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. 
                Any disputes arising from these terms will be subject to the exclusive jurisdiction of the 
                authorized courts located in India.
              </p>
            </section>

            <section className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-8 mt-12">
              <div className="flex items-center gap-3 text-white mb-3">
                <Mail className="w-5 h-5" />
                <h2 className="text-lg font-bold">Legal Inquiries</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">For any clarifications on these terms, please contact our legal team.</p>
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
