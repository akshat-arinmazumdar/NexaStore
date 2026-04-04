"use client";

import React from "react";
import { FileText, Scale, ShoppingCart, UserCheck, AlertCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  const lastUpdated = "April 2026";

  const terms = [
    {
      icon: <UserCheck className="w-6 h-6 text-indigo-400" />,
      title: "Acceptance of Terms",
      content: "By accessing and using NexaStore, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement."
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-indigo-400" />,
      title: "Digital Products Policy",
      content: "All digital products sold on NexaStore (Websites, AI Models, Mobile Apps) are non-refundable after they have been downloaded by the user. Users are responsible for verifying product requirements before purchase."
    },
    {
      icon: <Scale className="w-6 h-6 text-indigo-400" />,
      title: "Intellectual Property",
      content: "All content, including source code, designs, and text, are protected by intellectual property laws. Users are granted a limited license to use purchased assets for their intended purpose according to the specific product license."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-indigo-400" />,
      title: "Prohibited Activities",
      content: "Users may not use NexaStore for any illegal purpose, attempt to gain unauthorized access to our systems, or redistribute purchased assets without proper licensing authorization."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      title: "Payment Terms",
      content: "Payments are processed securely via Razorpay. All transactions are final unless otherwise stated in our Refund Policy. NexaStore does not store your credit/debit card information."
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: "Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts located in India."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Terms <span className="text-indigo-500">of Service</span>
          </h1>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8">
          {terms.map((term, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {term.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">{term.title}</h2>
                  <p className="text-slate-400 leading-relaxed">{term.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4">
          <p className="text-slate-300">
            For any legal inquiries regarding these terms, please contact our support team.
          </p>
          <p className="text-indigo-400 font-bold tracking-wider">pocketmoneystudents@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
