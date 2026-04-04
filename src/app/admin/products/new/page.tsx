"use client";




import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "SAAS_TOOL",
    techStack: "",
    features: "",
    isFeatured: false,
    badge: "",
    demoUrl: "",
    images: [] as string[],
    downloadUrl: "",
  });

  // 1. Save draft to localStorage every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('product_draft', JSON.stringify(formData))
      setLastSaved(new Date());
      console.log('Draft saved!')
    }, 30000)
    return () => clearInterval(interval)
  }, [formData])

  // 2. Load draft on page open
  useEffect(() => {
    const draft = localStorage.getItem('product_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setFormData(parsed)
        toast.success('Draft restored!')
      } catch (err) {
        console.error("Failed to parse draft:", err);
      }
    }
  }, [])

  const clearDraft = () => {
    localStorage.removeItem('product_draft');
    setLastSaved(null);
    toast.success('Draft cleared!');
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "SAAS_TOOL",
      techStack: "",
      features: "",
      isFeatured: false,
      badge: "",
      demoUrl: "",
      images: [] as string[],
      downloadUrl: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.images || formData.images.length === 0) {
        throw new Error("Please upload a product image before saving.");
      }

      // Process comma separated fields
      const techStack = formData.techStack.split(",").map(i => i.trim()).filter(Boolean);
      const features = formData.features.split("\n").map(i => i.trim()).filter(Boolean);
      const images = formData.images;

      const payload = {
        ...formData,
        techStack,
        features,
        images,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create product");
      }

      // 3. Clear draft after successful submit
      localStorage.removeItem('product_draft');
      toast.success('Product created and draft cleared!');

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 glass rounded-xl text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Add New Product</h1>
            <p className="text-slate-400 text-sm">Create a new digital asset for the marketplace.</p>
          </div>
        </div>

        {/* 4. Draft save indicator and 5. Clear button */}
        <div className="flex items-center gap-4">
          {lastSaved && (
            <div className="text-right hidden md:block">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" /> Draft Saved
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Last at: {lastSaved.toLocaleTimeString()}
              </div>
            </div>
          )}
          <button 
            type="button"
            onClick={clearDraft}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all border border-red-500/20"
          >
            <Trash2 className="w-4 h-4" /> Clear Draft
          </button>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 space-y-8"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Next.js SaaS Starter" />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description *</label>
             <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full h-32 bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Detailed product description..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price (INR) *</label>
            <input required type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="2999" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none">
              <option value="SAAS_TOOL">SaaS Tool</option>
              <option value="AI_MODEL">AI Model</option>
              <option value="WEBSITE">Website Template</option>
              <option value="MOBILE_APP">Mobile App</option>
              <option value="BUNDLE">Bundle</option>
            </select>
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tech Stack (comma separated)</label>
            <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="React, Node.js, Tailwnind..." />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Features (one per line)</label>
             <textarea name="features" value={formData.features} onChange={handleChange} className="w-full h-32 bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="- User Auth&#10;- Stripe Payments&#10;- Dashboard Page"></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Badge (Optional)</label>
            <input type="text" name="badge" value={formData.badge} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="BESTSELLER, HOT..." />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Demo URL (Optional)</label>
            <input type="url" name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="https://demo.example.com" />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              📦 Secure Download Link (Google Drive/GitHub) *
            </label>
            <p className="text-[10px] text-slate-500 mb-2">This link will ONLY be shown after a successful payment in the customer dashboard.</p>
            <input required type="url" name="downloadUrl" value={formData.downloadUrl} onChange={handleChange} className="w-full bg-[#0F172A] border border-indigo-500/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="https://drive.google.com/..." />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Images *</label>
            <ImageUpload 
              values={formData.images} 
              onChange={(urls) => setFormData({ ...formData, images: urls })} 
              onRemove={(url) => setFormData({ ...formData, images: formData.images.filter((img) => img !== url) })} 
            />
          </div>

          <div className="flex items-center gap-3 col-span-1 md:col-span-2 mt-4">
             <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 bg-[#0F172A] border-white/10 rounded accent-indigo-500" />
             <label htmlFor="isFeatured" className="text-sm text-slate-300 font-bold">Feature this product on homepage?</label>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
           <button type="submit" disabled={loading} className="btn-primary !px-8 !py-4 flex items-center justify-center gap-2 min-w-[200px]">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Product</>}
           </button>
        </div>
      </motion.form>
    </div>
  );
}
