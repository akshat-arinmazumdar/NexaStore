"use client";





import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  
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
    isActive: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price ? String(data.price) : "",
          category: data.category || "SAAS_TOOL",
          techStack: data.techStack ? data.techStack.join(", ") : "",
          features: data.features ? data.features.join("\n") : "",
          isFeatured: data.isFeatured || false,
          badge: data.badge || "",
          demoUrl: data.demoUrl || "",
          images: data.images ? data.images : [],
          isActive: data.isActive !== false, // default true if undefined
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    
    fetchProduct();
  }, [params.id]);

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
      const techStack = formData.techStack.split(",").map(i => i.trim()).filter(Boolean);
      const features = formData.features.split("\n").map(i => i.trim()).filter(Boolean);
      const images = formData.images;

      const payload = {
        ...formData,
        techStack,
        features,
        images,
      };

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 glass rounded-xl text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Edit Product</h1>
          <p className="text-slate-400 text-sm">Update product information and configurations.</p>
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
              📦 Secure Download / Access Link *
            </label>
            <p className="text-[10px] text-slate-500 mb-2">This is the secret link (Google Drive, GitHub repo, etc) that the customer will receive ONLY AFTER a successful payment.</p>
            <input required type="url" name="accessLink" value={(formData as any).accessLink || ""} onChange={handleChange} className="w-full bg-[#0F172A] border border-indigo-500/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="https://drive.google.com/..." />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Image *</label>
            <ImageUpload 
              value={formData.images[0] || ""} 
              onChange={(url) => setFormData({ ...formData, images: [url] })} 
              onRemove={() => setFormData({ ...formData, images: [] })} 
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 p-4 border border-white/5 rounded-xl bg-white/5">
             <div className="flex items-center gap-3">
               <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 bg-[#0F172A] border-white/10 rounded accent-indigo-500" />
               <label htmlFor="isFeatured" className="text-sm text-slate-300 font-bold">Feature on Homepage</label>
             </div>
             
             <div className="flex items-center gap-3">
               <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 bg-[#0F172A] border-white/10 rounded accent-green-500" />
               <label htmlFor="isActive" className="text-sm text-slate-300 font-bold">Active in Store</label>
             </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
           <button type="submit" disabled={loading} className="btn-primary !px-8 !py-4 flex items-center justify-center gap-2 min-w-[200px]">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Update Product</>}
           </button>
        </div>
      </motion.form>
    </div>
  );
}
