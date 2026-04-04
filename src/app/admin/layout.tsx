import React from "react";
import { auth } from "@/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-6 text-center px-6">
        <h2 className="text-3xl font-display font-bold text-white">Access Restricted</h2>
        <p className="text-slate-400 max-w-sm">This area is reserved for system administrators only. Not authorized.</p>
      </div>
    );
  }

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
}
