"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Filter, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      if (categoryFilter !== "ALL") query.set("category", categoryFilter);
      
      const res = await fetch(`/api/admin/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts(); // refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Products Management</h1>
          <p className="text-slate-400 text-sm">Manage your digital assets, templates, and courses.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary !px-6 !py-3 flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="glass p-4 border-white/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products by name..."
            className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64 relative flex items-center shrink-0">
          <Filter className="absolute left-4 w-4 h-4 text-slate-500 z-10" />
          <select
            className="w-full appearance-none bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 relative"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="SAAS_TOOL">SaaS Tool</option>
            <option value="AI_MODEL">AI Model</option>
            <option value="WEBSITE">Website Template</option>
            <option value="MOBILE_APP">Mobile App</option>
            <option value="BUNDLE">Bundle</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden border-white/5 bg-white/3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{product.name}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[250px]">{product.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                        {product.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white font-mono">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                        product.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      )}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
