'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('GLOBAL_ERROR_BOUNDARY:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 glass p-12 border-red-500/20 bg-red-500/5 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 blur-[100px] rounded-full" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Something went wrong!</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We've encountered an unexpected error on our end. Our maintenance crew has been notified.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3 pt-4">
            <button
              onClick={() => reset()}
              className="btn-primary !py-4 flex items-center justify-center gap-2 group w-full"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> 
              Try Again
            </button>
            
            <Link 
              href="/"
              className="btn-secondary !py-4 flex items-center justify-center gap-2 w-full"
            >
              <Home className="w-4 h-4" /> 
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
