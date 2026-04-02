'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-xl shadow-indigo-500/20 relative">
          <Loader2 className="w-8 h-8 animate-spin" />
          <div className="absolute inset-0 border-2 border-indigo-500/40 rounded-full animate-ping opacity-25" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white tracking-tight animate-pulse">Initializing Hub...</h2>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest font-bold">Connecting to NexaStore Ecosystem</p>
        </div>
      </div>
    </div>
  );
}
