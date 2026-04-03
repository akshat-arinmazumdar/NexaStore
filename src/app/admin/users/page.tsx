"use client";




import React, { useState, useEffect } from "react";
import { Search, Filter, Loader2, UserCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      if (roleFilter !== "ALL") query.set("role", roleFilter);
      
      const res = await fetch(`/api/admin/users?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    setUpdating(userId);
    try {
      const res = await fetch(`/api/admin/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (res.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Users Management</h1>
        <p className="text-slate-400 text-sm">Manage user accounts and administrative privileges.</p>
      </div>

      {/* Filters */}
      <div className="glass p-4 border-white/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Name or Email..."
            className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64 relative flex items-center shrink-0">
          <Filter className="absolute left-4 w-4 h-4 text-slate-500 z-10" />
          <select
            className="w-full appearance-none bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 relative"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden border-white/5 bg-white/3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-bold uppercase overflow-hidden shrink-0">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.name} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white tracking-wide">{user.name}</p>
                          <p className="text-xs text-slate-500 font-mono tracking-tight">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white border border-white/10">
                        {user._count?.orders || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300 font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center w-max gap-1",
                        user.role === "ADMIN" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                      )}>
                        {user.role === "ADMIN" ? <ShieldAlert className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       {updating === user.id ? (
                         <Loader2 className="w-5 h-5 animate-spin text-indigo-500 ml-auto" />
                       ) : user.role === "USER" ? (
                         <button 
                           onClick={() => handleUpdateRole(user.id, "ADMIN")}
                           className="inline-flex items-center gap-2 p-2 px-4 bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider"
                         >
                           Make Admin
                         </button>
                       ) : (
                         <button 
                           onClick={() => handleUpdateRole(user.id, "USER")}
                           className="inline-flex items-center gap-2 p-2 px-4 bg-slate-500/10 text-slate-400 hover:bg-slate-500 hover:text-white border border-slate-500/20 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider"
                         >
                           Revoke Admin
                         </button>
                       )}
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
