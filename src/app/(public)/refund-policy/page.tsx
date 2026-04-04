"use client";

import React from "react";
import { RefreshCcw, FileX, MessageSquare, Timer, CheckCircle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function RefundPolicy() {
  const lastUpdated = "April 2026";

  const policies = [
    {
      icon: <FileX className="w-6 h-6 text-indigo-400" />,
      title: "Digital Products Policy",
      content: "Since we sell non-tangible, digital goods, we do not issue refunds once an order has been completed and the product has been downloaded. We recommend reviewing the live demos and technical requirements before your purchase."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-indigo-400" />,
      title: "Exceptions to the Rule",
      content: "Refunds may be considered only if the product is fundamentally defective or does not match the description. In such cases, we require detailed proof of the defect to proceed with any refund request."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-indigo-400" />,
      title: "Support before Refund",
      content: "Before requesting a refund, we strongly encourage you to contact our technical support. Most issues are due to incorrect configuration and can be resolved within minutes by our experts."
    },
    {
      icon: <Timer className="w-6 h-6 text-indigo-400" />,
      title: "Resolution Timeline",
      content: "All refund and support inquiries are reviewed within 48 hours. If a refund is approved, it takes approximately 5-7 business days to reflect in your original payment method via Razorpay."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      title: "How to Contact",
      content: "To initiate a support/refund request, please email pocketmoneystudents@gmail.com with your Order ID, proof of purchase, and a detailed description of the issue."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-indigo-400" />,
      title: "Final Decision",
      content: "NexaStore reserves the right to deny refund requests that do not meet the criteria specified in this policy. All decisions made by the NexaStore management team are final."
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
            Refund <span className="text-indigo-500">Policy</span>
          </h1>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {policy.icon}
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{policy.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{policy.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-center">
          <h3 className="text-white font-bold text-lg mb-2">Need Technical Help?</h3>
          <p className="text-slate-300 mb-6">Our support team is ready to help you deploy your digital assets.</p>
          <a 
            href="mailto:pocketmoneystudents@gmail.com" 
            className="inline-flex btn-primary !py-3 !px-8 text-sm"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
