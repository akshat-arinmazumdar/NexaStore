import React from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  ArrowRight,
  BarChart3,
  Package,
  Calendar,
  IndianRupee,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

async function getStats() {
  const [totalUsers, totalProducts, totalOrders, completedOrders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      where: { status: "COMPLETED" as any }
    })
  ]);

  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
    recentOrders,
    recentUsers
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const kpiStats = [
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <IndianRupee className="w-6 h-6 text-green-400" />, sub: "From completed orders" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: <ShoppingBag className="w-6 h-6 text-indigo-400" />, sub: "All time orders" },
    { label: "Total Users", value: stats.totalUsers.toString(), icon: <Users className="w-6 h-6 text-purple-400" />, sub: "Registered creators" },
    { label: "Total Products", value: stats.totalProducts.toString(), icon: <Package className="w-6 h-6 text-orange-400" />, sub: "Active assets" },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 italic">Dashboard <span className="text-slate-700">/</span> Overview</h1>
            <p className="text-slate-400 text-lg">Detailed system analytics and recent activity.</p>
         </div>
         <div className="flex gap-4">
             <button className="btn-primary flex items-center justify-center gap-3 px-8 py-4">
                <BarChart3 className="w-5 h-5" /> Detailed Reports
             </button>
         </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {kpiStats.map((stat, idx) => (
           <div
             key={idx}
             className="glass p-8 bg-[#1E293B]/70 border-white/5 space-y-6 group hover:bg-gradient-to-br hover:from-[#1E293B] hover:to-indigo-900/20 transition-all shadow-2xl relative overflow-hidden"
           >
              <div className="flex items-center justify-between relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                    {stat.icon}
                 </div>
              </div>
              <div className="space-y-1 relative z-10">
                 <h4 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</h4>
                 <p className="text-3xl font-display font-bold text-white tracking-tight">{stat.value}</p>
                 <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{stat.sub}</p>
              </div>
              <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 bg-white/3 rounded-full blur-[30px] z-0" />
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Recent Orders */}
         <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold font-display text-white">Recent Orders</h3>
               <Link href="/admin/orders" className="text-sm font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                 View All <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
            
            <div className="glass overflow-hidden border-white/5 bg-white/3">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {stats.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                           <td className="px-6 py-4 text-xs font-mono text-slate-400">#{order.id.slice(-8)}</td>
                           <td className="px-6 py-4">
                              <p className="text-sm font-bold text-white uppercase">{order.user.name}</p>
                              <p className="text-[10px] text-slate-500">{order.user.email}</p>
                           </td>
                           <td className="px-6 py-4 text-sm font-bold text-white">₹{order.totalAmount}</td>
                           <td className="px-6 py-4">
                              <span className={cn(
                                 "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                                 order.status === "COMPLETED" ? "bg-green-500/10 text-green-400" : 
                                 order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
                              )}>
                                 {order.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Recent Users */}
         <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold font-display text-white italic">Recent Creators</h3>
               <Link href="/admin/users" className="text-sm font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                 View All <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
            
            <div className="flex flex-col gap-4">
               {stats.recentUsers.map((user) => (
                  <div key={user.id} className="glass p-6 bg-white/3 border-white/5 flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20">
                           <UserPlus className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white uppercase">{user.name}</h4>
                           <p className="text-slate-500 text-[10px] tracking-wider uppercase font-bold">{user.email}</p>
                        </div>
                     </div>
                     <span className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {new Date(user.createdAt).toLocaleDateString()}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
