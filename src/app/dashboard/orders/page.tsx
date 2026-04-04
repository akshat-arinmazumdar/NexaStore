"use client";




import React, { useState, useEffect } from "react";
import { 
  ShoppingBasket, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Package, 
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  CreditCard,
  QrCode,
  ArrowUpRight,
  Filter,
  X,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOrdersStore, Order } from "@/store/ordersStore";

const DashOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "completed" | "processing">("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Map API response to local Order interface
                    const mappedOrders = data.map((order: any) => ({
                        id: order.id,
                        date: order.createdAt,
                        total: order.totalAmount,
                        status: order.status.toLowerCase(),
                        paymentMethod: order.paymentMethod?.toLowerCase() || 'card',
                        items: order.items.map((item: any) => ({
                            id: item.id,
                            name: item.product.name,
                            price: item.price,
                            category: item.product.category,
                            image: item.product.images?.[0] || "/images/placeholder.png"
                        }))
                    }));
                    setOrders(mappedOrders);
                }
            })
            .catch(err => console.error("Error fetching orders:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("PERMANENT DELETE? This order will be removed from your server account data.")) {
            try {
                const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setOrders(prev => prev.filter(order => order.id !== id));
                } else {
                    const data = await res.json();
                    alert(data.error || "Server error during deletion");
                }
            } catch (err) {
                alert("Network error. Could not delete.");
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                            order.items.some((item: any) => item.name.toLowerCase().includes(search.toLowerCase()));
        const matchesTab = activeTab === "all" || order.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            completed: "bg-green-500/10 text-green-500 border-green-500/20",
            processing: "bg-amber-500/10 text-amber-500 border-amber-500/20",
            pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
            failed: "bg-red-500/10 text-red-500 border-red-500/20",
            refunded: "bg-blue-500/10 text-blue-500 border-blue-500/20"
        };

        const icons: Record<string, React.ReactNode> = {
            completed: <CheckCircle2 className="w-3 h-3" />,
            processing: <Clock className="w-3 h-3" />,
            pending: <Clock className="w-3 h-3" />,
            failed: <X className="w-3 h-3" />,
            refunded: <Package className="w-3 h-3" />
        };

        const displayStatus = status === 'paid' ? 'completed' : status;

        return (
            <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", styles[status] || styles.pending)}>
                {icons[status] || icons.pending} {displayStatus}
            </div>
        );
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                        <ShoppingBasket className="w-8 h-8 text-indigo-400" /> My Orders
                    </h1>
                    <p className="text-slate-500 text-sm">View and manage your recent digital purchases.</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input 
                            placeholder="Search Order ID or Items..."
                            className="bg-[#1E293B]/50 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-full md:w-72"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/5 overflow-x-auto pb-px scrollbar-hide">
                {["all", "completed", "processing"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={cn(
                            "px-6 py-4 text-sm font-bold uppercase tracking-widest relative transition-all",
                            activeTab === tab ? "text-indigo-400" : "text-slate-500 hover:text-white"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId="order-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-t-full shadow-[0_-4px_10px_rgba(99,102,241,0.5)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Orders Grid/List */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-500 text-sm">Fetching orders...</p>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <motion.div
                                layout
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group"
                            >
                                <div className={cn(
                                    "glass overflow-hidden border-white/5 hover:border-indigo-500/30 transition-all shadow-xl",
                                    expandedId === order.id && "border-indigo-500/40 ring-1 ring-indigo-500/10"
                                )}>
                                    <div 
                                        onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                                        className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-white transition-colors">#{order.id.slice(0, 8)}...</span>
                                                <StatusBadge status={order.status} />
                                            </div>
                                            <div className="text-slate-400 text-sm flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Items ({order.items.length})</p>
                                                <div className="flex items-center -space-x-3">
                                                    {order.items.slice(0, 3).map((item: any, idx: number) => (
                                                        <div key={idx} className="w-8 h-8 rounded-full border-2 border-[#1E293B] overflow-hidden ring-1 ring-white/10">
                                                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#1E293B] flex items-center justify-center text-[10px] text-white font-bold">
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="h-10 w-px bg-white/5 hidden md:block" />
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Amount</p>
                                                <span className="text-2xl font-bold text-white">₹{order.total}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={cn("p-2 rounded-lg bg-white/5 transition-transform", expandedId === order.id && "rotate-180")}>
                                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <button 
                                                    onClick={(e) => handleDelete(order.id, e)}
                                                    className="p-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500/10 border border-red-500/10 transition-all shrink-0"
                                                    title="Remove from view"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedId === order.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-white/5 bg-white/3"
                                            >
                                                <div className="p-8 space-y-8">
                                                    {/* Item List */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                            <ArrowUpRight className="w-3 h-3" /> Order Contents
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {order.items.map((item: any) => (
                                                                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                                                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-lg" alt="" />
                                                                    <div>
                                                                        <h5 className="text-white font-bold text-sm mb-1">{item.name}</h5>
                                                                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{item.category}</span>
                                                                        <p className="text-slate-500 text-sm mt-1">₹{item.price}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Actions & Details */}
                                                    <div className="flex flex-col sm:flex-row gap-6 justify-between pt-8 border-t border-white/5">
                                                        <div className="flex gap-8">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Paid via</p>
                                                                <div className="flex items-center gap-2 text-white text-sm font-bold capitalize">
                                                                    {order.paymentMethod === 'card' ? <CreditCard className="w-4 h-4 text-indigo-400" /> : <QrCode className="w-4 h-4 text-indigo-400" />}
                                                                    {order.paymentMethod}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex flex-wrap gap-3">
                                                            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                                                                <Download className="w-4 h-4" /> Download Files
                                                            </button>
                                                            <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                                                <ExternalLink className="w-4 h-4" /> View Invoice
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="text-center py-20 glass border-dashed bg-transparent"
                        >
                            <ShoppingBasket className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <h3 className="text-white font-bold text-xl mb-2">No matching orders</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Try searching for a different ID or item name.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DashOrdersPage;
