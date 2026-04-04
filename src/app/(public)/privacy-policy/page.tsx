"use client";

import React from "react";
import { ArrowLeft, Shield, Lock, Eye, FileText, Globe, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const router = useRouter();
  const lastUpdated = "April 2026";

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Home</span>
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
              Privacy <span className="text-indigo-500">Policy</span>
            </h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span>NexaStore Digital Marketplace</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Policy Body */}
          <div className="p-8 md:p-12 space-y-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Eye className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                We collect information you provide directly to us, including your personal details such as name, email address, and 
                secure payment credentials. Additionally, we collect technical data like IP addresses, browser types, and usage 
                analytics to improve your browsing experience and platform security.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <FileText className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">2. How We Use Information</h2>
              </div>
              <div className="text-slate-400 leading-relaxed pl-8 space-y-3">
                <p>NexaStore uses your data for various purposes, including:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li>Processing secure payment transactions via <span className="text-indigo-400 font-medium">Razorpay</span>.</li>
                  <li>Delivering transactional emails and notifications through <span className="text-indigo-400 font-medium">SendGrid</span>.</li>
                  <li>Managing and delivering product assets and images using <span className="text-indigo-400 font-medium">Cloudinary</span>.</li>
                  <li>Maintaining your account and providing personalized support.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">3. Data Security & Encryption</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                Security is our top priority. We use industry-standard encryption protocols (SSL/TLS) for data transmission. 
                All user passwords are salted and hashed using Bcrypt before storage in our <span className="text-indigo-400 font-medium">Neon PostgreSQL</span> database. 
                We never store your raw credit card information on our servers.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Globe className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">4. Third Party Services</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                Our platform integrates with specialized service providers to ensure reliability:
                <br /><br />
                <span className="block border-l-2 border-indigo-500/30 pl-4 py-2 italic text-sm text-slate-500">
                  Razorpay (Payments), SendGrid (Emailing), Cloudinary (Assets Management), Neon (Database Infrastructure).
                </span>
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Shield className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">5. Your Digital Rights</h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-8">
                As a user of NexaStore, you have the full right to access, rectify, or request the deletion of your personal data. 
                You can manage these settings through your Dashboard or contact our support team for a permanent account closure.
              </p>
            </section>

            <section className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-8 mt-12">
              <div className="flex items-center gap-3 text-white mb-3">
                <Mail className="w-5 h-5" />
                <h2 className="text-lg font-bold">Need assistance?</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">If you have concerns about your privacy, please email us directly.</p>
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
