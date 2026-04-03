"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB.');
      return;
    }

    setIsUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append('file', file);

    try {
        // Simulate progress for better UX
        const interval = setInterval(() => {
          setProgress(prev => (prev < 90 ? prev + 10 : prev));
        }, 300);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      const data = await response.json();
      
      if (data.url) {
        onChange(data.url);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload Error:', error);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
    }
  }, [onChange]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden shadow-2xl border-2 border-indigo-500/20 group transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={() => onRemove(value)}
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product Image"
              src={value}
            />
          </div>
        ) : (
          <div className="w-full">
            <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50 transition-all cursor-pointer group overflow-hidden">
               {isUploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                     <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                     <div className="w-48 bg-indigo-100 rounded-full h-2 overflow-hidden">
                        <div 
                           className="bg-indigo-600 h-full transition-all duration-300" 
                           style={{ width: `${progress}%` }}
                        />
                     </div>
                     <span className="text-xs font-semibold text-indigo-600 mt-2">{progress}% Uploading...</span>
                  </div>
               )}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-3 bg-indigo-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="mb-2 text-sm text-indigo-700 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-indigo-400">
                  JPG, PNG, WebP (MAX. 5MB)
                </p>
              </div>
                <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
            {uploadError && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                {uploadError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
