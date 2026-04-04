"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  MessageCircle, 
  Users, 
  Camera, 
  Code2, 
  Mail, 
  Phone, 
  ArrowRight 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Marketplace",
      links: [
        { name: "All Products", href: "/shop" },
        { name: "AI Models", href: "#", comingSoon: true },
        { name: "Mobile Apps", href: "#", comingSoon: true },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Documentation", href: "#", comingSoon: true },
        { name: "Sellers Guide", href: "#", comingSoon: true },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <MessageCircle className="w-5 h-5" />, href: "https://twitter.com" },
    { icon: <Users className="w-5 h-5" />, href: "https://linkedin.com" },
    { icon: <Camera className="w-5 h-5" />, href: "https://instagram.com" },
    { icon: <Code2 className="w-5 h-5" />, href: "https://github.com" },
  ];

  return (
    <footer className="bg-[#0F172A] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              NexaStore
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-xs">
            The world's premium digital marketplace. Buy, deploy, and scale your business with ready-made apps and AI models.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-600 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {footerLinks.map((column) => (
          <div key={column.title} className="space-y-6">
            <h4 className="text-white font-bold text-lg">{column.title}</h4>
            <div className="flex flex-col gap-4">
              {column.links.map((link) => (
                link.comingSoon ? (
                  <div key={link.name} className="text-slate-600 flex items-center cursor-not-allowed opacity-70">
                    <span className="text-sm">{link.name}</span>
                    <span className="ml-2 text-[8px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-white/5 font-bold uppercase tracking-widest">Soon</span>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} NexaStore. All rights reserved. Made with ✨ by Nexa
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Mail className="w-4 h-4" /> support@nexastore.com
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Phone className="w-4 h-4" /> +91 (123) 456-7890
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
