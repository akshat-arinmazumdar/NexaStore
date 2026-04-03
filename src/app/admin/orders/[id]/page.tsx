"use client";





import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, ShoppingBag, CreditCard, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${params.id}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setOrder(data);
      setStatus(data.status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/orders/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      // refresh
      await fetchOrder();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-20 text-red-400 bg-red-500/10 rounded-xl mt-12">
        <p>{error || "Failed to load order"}</p>
        <Link href="/admin/orders" className="text-indigo-400 hover:text-white mt-4 inline-block underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <Link href="/admin/orders" className="p-2 glass rounded-xl text-slate-400 hover:text-white transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </Link>
           <div>
             <h1 className="text-3xl font-display font-bold text-white mb-2">Order Details</h1>
             <p className="text-slate-400 text-sm font-mono text-[10px]">#{order.id}</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <select 
             value={status}
             onChange={(e) => setStatus(e.target.value)}
             className="bg-[#1E293B] border border-white/10 rounded-xl py-2 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
           >
             <option value="PENDING">Pending</option>
             <option value="COMPLETED">Completed</option>
             <option value="FAILED">Failed</option>
             <option value="REFUNDED">Refunded</option>
           </select>
           <button 
             onClick={handleUpdateStatus}
             disabled={saving || status === order.status}
             className="btn-primary !px-4 !py-2 text-xs flex items-center gap-2"
           >
             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" /> } Update
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="glass p-6 border-white/5 space-y-4">
           <div className="flex items-center gap-3 text-indigo-400 mb-4 pb-4 border-b border-white/5">
              <User className="w-5 h-5" />
              <h3 className="font-bold uppercase tracking-widest text-xs text-slate-300">Customer</h3>
           </div>
           <div className="space-y-1">
              <p className="text-white font-bold">{order.user?.name || "Unknown"}</p>
              <p className="text-sm text-slate-400">{order.user?.email}</p>
           </div>
           <p className="text-[10px] text-slate-500 font-mono mt-4 pt-4 border-t border-white/5">
              User ID: {order.user?.id}
           </p>
        </div>

        {/* Payment Info */}
        <div className="glass p-6 border-white/5 space-y-4">
           <div className="flex items-center gap-3 text-indigo-400 mb-4 pb-4 border-b border-white/5">
              <CreditCard className="w-5 h-5" />
              <h3 className="font-bold uppercase tracking-widest text-xs text-slate-300">Payment Details</h3>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Total Amount:</span>
                 <span className="text-white font-bold font-mono">₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Method:</span>
                 <span className="text-white font-bold">Razorpay</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Status:</span>
                 <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    order.status === "COMPLETED" ? "bg-green-500/10 text-green-400" : 
                    order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" : 
                    order.status === "FAILED" ? "bg-red-500/10 text-red-400" :
                    "bg-slate-500/10 text-slate-400"
                 )}>{order.status}</span>
              </div>
           </div>
           <div className="space-y-1 mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 break-all">
              <p>RZP Order: {order.razorpayOrderId || "N/A"}</p>
              <p>RZP Payment: {order.razorpayPaymentId || "N/A"}</p>
           </div>
        </div>

        {/* Transaction Info */}
        <div className="glass p-6 border-white/5 space-y-4">
           <div className="flex items-center gap-3 text-indigo-400 mb-4 pb-4 border-b border-white/5">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-bold uppercase tracking-widest text-xs text-slate-300">Summary</h3>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Items Count:</span>
                 <span className="text-white font-bold">{order.items?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Date:</span>
                 <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Time:</span>
                 <span className="text-white">{new Date(order.createdAt).toLocaleTimeString()}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Ordered Products */}
      <div className="glass border-white/5 bg-white/3 overflow-hidden">
         <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="font-bold uppercase tracking-widest text-xs text-slate-300">Purchased Items</h3>
         </div>
         <div className="p-6 space-y-4">
            {order.items?.length === 0 ? (
               <p className="text-slate-400 italic text-sm">No items found for this order.</p>
            ) : (
               order.items?.map((item: any) => (
                 <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-indigo-400" />
                       </div>
                       <div>
                          <p className="text-white font-bold">{item.product?.name || "Unknown Product"}</p>
                          <p className="text-xs text-slate-400 mt-1 font-mono">Product ID: {item.productId}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-white font-bold font-mono">₹{item.price}</p>
                    </div>
                 </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
}
