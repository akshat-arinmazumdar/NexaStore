export const dynamic = "force-dynamic"
export const revalidate = 0
export async function generateStaticParams() { return [] }

import React from "react";
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ReviewSection from "@/components/reviews/ReviewSection";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    select: { name: true, description: true, images: true }
  });

  if (!product) {
    return { title: 'Product Not Found | NexaStore' };
  }

  return {
    title: `${product.name} | NexaStore`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      images: [product.images[0] || "/images/placeholder.png"]
    }
  };
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { reviews: true }
  });

  if (!product) {
    notFound();
  }

  const productImage = product.images?.[0] || "/images/placeholder.png";

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-6">
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden glass border-white/10">
               <Image 
                  src={product.images?.[0] || "/images/placeholder.png"} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
               />
               {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-bold font-mono uppercase px-3 py-1 bg-indigo-500 text-white rounded-md">
                     {product.badge}
                  </span>
               )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{product.name}</h1>
            <p className="text-xl text-indigo-400 font-bold font-mono mb-6">₹{product.price.toFixed(2)}</p>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {product.longDesc || product.description}
            </p>

            <div className="space-y-4 mb-8">
               <h3 className="text-white font-bold text-lg">Features</h3>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {product.features.map((feature: string, i: number) => (
                   <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                     <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                     {feature}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="space-y-4 mb-10">
               <h3 className="text-white font-bold text-lg">Tech Stack</h3>
               <div className="flex flex-wrap gap-2">
                 {product.techStack.map((tech: string, i: number) => (
                   <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 font-mono">
                     {tech}
                   </span>
                 ))}
               </div>
            </div>

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: productImage,
                category: product.category as unknown as string,
              }}
            />
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-20 border-t border-white/5 pt-20">
          <ReviewSection productId={product.id} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
