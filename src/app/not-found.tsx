import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-6 text-center">
      <div className="glass p-12 max-w-2xl mx-auto rounded-3xl border border-white/10 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border-2 border-indigo-500/30">
            <span className="text-6xl font-black font-mono tracking-tighter">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back to exploring NexaStore's premium digital assets.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" /> Go to Home
          </Link>
          <Link 
            href="/shop" 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
