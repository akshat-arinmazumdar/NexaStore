"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  values,
  onChange,
  onRemove,
  maxImages = 5
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (values.length + files.length > maxImages) {
      setUploadError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setIsUploading(true);
    setProgress(0);

    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          throw new Error('Please upload JPG, PNG, or WebP images.');
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File size must be less than 5MB.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.url) {
          uploadedUrls.push(data.url);
          setProgress(Math.round(((i + 1) / files.length) * 100));
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      }
      
      onChange([...values, ...uploadedUrls]);
    } catch (error: any) {
      console.error('Upload Error:', error);
      setUploadError(error.message || 'Failed to upload images.');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
    }
  }, [values, onChange, maxImages]);

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {values.map((url) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={url}
              className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10 group bg-[#1E293B]"
            >
              <Image
                fill
                className="object-cover transition-transform group-hover:scale-110"
                alt="Product"
                src={url}
              />
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="absolute top-2 right-2 p-1.5 bg-red-500/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {values.length < maxImages && (
          <label className="relative aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group overflow-hidden">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase">{progress}%</span>
              </div>
            ) : (
              <>
                <Plus className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-2 group-hover:text-white">Add Photo</span>
              </>
            )}
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {uploadError && (
        <p className="text-xs text-red-500 font-bold uppercase tracking-widest">{uploadError}</p>
      )}
      <p className="text-[10px] text-slate-500 uppercase tracking-widest">
        Max {maxImages} images (JPG, PNG, WebP). Drag multiple to upload at once.
      </p>
    </div>
  );
};
