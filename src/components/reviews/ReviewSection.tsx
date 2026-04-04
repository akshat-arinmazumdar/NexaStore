"use client";

import React, { useState, useEffect } from "react";
import { Star, User, Loader2, Send, MessageCircle, AlertCircle, CheckCircle2, ChevronDown, UserCircle, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
  adminReply: string | null;
  repliedAt: Date | string | null;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [canReview, setCanReview] = useState(false);
  
  // FORM STATE
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  // FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReviews(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // In a real scenario, we'd also hit an API to check if the user *can* review (purchased)
    // For now, we'll try submitting and let the backend handle the check
    setCanReview(!!session?.user);
  }, [productId, session]);

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Thank you for your review! It is now live.");
      setComment("");
      setRating(5);
      fetchReviews(); // Reload reviews
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Have you purchased this product?");
    } finally {
      setIsSubmitting(false);
    }
  };

  // CALCULATE SUMMARY
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
    : 0;

  const starBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="mt-20 space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        
        {/* RATING SUMMARY SLIDE-IN FROM LEFT */}
        <div className="w-full md:w-1/3 p-8 bg-[#1a1a2e]/50 backdrop-blur-xl border border-white/5 rounded-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Customer Reviews</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-white leading-none">{avgRating.toFixed(1)}</div>
            <div className="space-y-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5", 
                      i < Math.round(avgRating) ? "fill-current" : "text-slate-700"
                    )} 
                  />
                ))}
              </div>
              <p className="text-slate-400 text-sm">{totalReviews} Global Ratings</p>
            </div>
          </div>

          <div className="space-y-3">
            {starBreakdown.map((row) => (
              <div key={row.star} className="flex items-center gap-3">
                <span className="text-sm text-slate-400 w-12">{row.star} Stars</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-1000" 
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-slate-500 w-8 text-right">{Math.round(row.percentage)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW FORM / LOG IN STATE */}
        <div className="flex-1 w-full space-y-8">
          {session ? (
            <form onSubmit={handleSubmit} className="p-8 bg-[#1a1a2e]/50 backdrop-blur-xl border border-white/5 rounded-3xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Review this product</h3>
                <p className="text-slate-400 text-sm">Share your thoughts with other customers</p>
              </div>

              {/* STAR SELECTOR */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform active:scale-95"
                  >
                    <Star 
                      className={cn(
                        "w-8 h-8 transition-colors",
                        (hoveredStar || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-slate-700 hover:text-slate-500"
                      )}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here... (Minimum 10 characters)"
                className="w-full bg-[#0F172A] border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none min-h-[120px]"
              />

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm italic">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm italic font-medium">
                  <CheckCircle2 className="w-4 h-4" /> {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !comment || comment.length < 5}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Submit Review
              </button>
            </form>
          ) : (
            <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl text-center space-y-4">
              <UserCircle className="w-12 h-12 text-indigo-400 mx-auto opacity-50" />
              <h3 className="text-xl font-bold text-white">Login to Review</h3>
              <p className="text-slate-400 max-w-sm mx-auto">Only verified purchasers can leave reviews for NexaStore products.</p>
              <button 
                onClick={() => window.location.href = "/auth/login"}
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4"
              >
                Login to your account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-8 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-indigo-500" />
            Most Relevant Reviews
          </h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            Sort by: <span className="text-indigo-400 font-medium cursor-pointer flex items-center">Newest <ChevronDown className="w-3 h-3 ml-1" /></span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="p-6 bg-[#1a1a2e]/30 border border-white/5 rounded-3xl space-y-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                      {getInitials(review.user.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{review.user.name}</p>
                      <p className="text-slate-500 text-xs">{formatDistanceToNow(new Date(review.createdAt))} ago</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-current" : "text-slate-800")} />
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* ADMIN REPLY BOX */}
                {review.adminReply && (
                  <div className="mt-4 p-4 bg-indigo-600/10 border-l-2 border-indigo-500 rounded-r-xl space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3" />
                      NexaStore Team
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {review.adminReply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 border border-dashed border-white/5 rounded-3xl">
            <p className="text-slate-500 italic">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
