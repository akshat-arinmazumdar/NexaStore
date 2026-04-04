"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageCircle, Trash2, Send, Loader2, CheckCircle2, AlertCircle, User, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  adminReply: string | null;
  repliedAt: string | null;
  productId: string;
  product: {
    name: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?admin=true");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Wait, I didn't create /api/reviews/admin yet. 
  // I should update src/app/api/reviews/route.ts to handle 'admin=true'.

  return (
    <div className="p-8 space-y-8 bg-[#0F172A] min-h-screen text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-slate-400">Moderation and Administrative Replies</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#1a1a2e] border border-white/5 rounded-3xl p-6 space-y-6">
               <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                      {review.user.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold">{review.user.name} <span className="text-slate-500 text-xs font-normal">({review.user.email})</span></h3>
                      <p className="text-slate-400 text-sm">on <span className="text-indigo-400">{review.product.name}</span></p>
                      <div className="flex text-yellow-500 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "text-slate-800")} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">{formatDistanceToNow(new Date(review.createdAt))} ago</p>
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="mt-2 text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
               </div>

               <div className="p-4 bg-[#0F172A] rounded-2xl border border-white/5 italic text-slate-300">
                  "{review.comment}"
               </div>

               {review.adminReply ? (
                 <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Team Reply</p>
                      <p className="text-slate-300 text-sm">{review.adminReply}</p>
                      <p className="text-slate-500 text-[10px]">{formatDistanceToNow(new Date(review.repliedAt!))} ago</p>
                    </div>
                 </div>
               ) : (
                  <div className="space-y-3">
                    <textarea 
                       value={replyText[review.id] || ""}
                       onChange={(e) => setReplyText({...replyText, [review.id]: e.target.value})}
                       placeholder="Write an official response..."
                       className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                    />
                    <button 
                      onClick={() => handleReply(review.id)}
                      disabled={isSubmitting[review.id] || !replyText[review.id]}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                    >
                      {isSubmitting[review.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                      Post Official Reply
                    </button>
                  </div>
               )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  async function handleReply(id: string) {
    setIsSubmitting({...isSubmitting, [id]: true});
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminReply: replyText[id] }),
      });
      if (res.ok) fetchReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting({...isSubmitting, [id]: false});
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review permanence?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) fetchReviews();
    } catch (error) {
      console.error(error);
    }
  }
}
