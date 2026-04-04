"use client";

import React from "react";
import { Shield, Lock, Eye, FileText, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const lastUpdated = "April 2026";

  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-indigo-400" />,
      title: "Data We Collect",
      content: "We collect information you provide directly to us, such as your name, email address, payment information (via Razorpay), and any other information you choose to provide. We also collect technical data such as IP address and browser type for security and analytics."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      title: "How We Use Data",
      content: "We use your data to process transactions, deliver digital assets, communicate with you about your orders, and improve our services. Your email is used for account verification and sending purchase receipts via SendGrid."
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: "Third Party Services",
      content: "We use trusted third-party services to power NexaStore: Razorpay for secure payments, Cloudinary for asset storage, and SendGrid for email communications. Each provider has their own privacy policy regarding your data."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: "User Rights",
      content: "You have the right to access, update, or delete your personal information at any time. You can manage your account settings from the user dashboard or contact us directly for data removal requests."
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: "Cookies Policy",
      content: "We use essential cookies to keep you logged in and remember your cart items. We also use analytics cookies to understand how users interact with our marketplace. You can disable cookies in your browser, but some features may not function correctly."
    },
    {
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at pocketmoneystudents@gmail.com. We aim to respond to all inquiries within 24-48 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Privacy <span className="text-indigo-500">Policy</span>
          </h1>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                  <p className="text-slate-400 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-center">
          <p className="text-slate-300">
            By using NexaStore, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>
      </div>
    </div>
  );
}
