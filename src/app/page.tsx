import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none opacity-[0.15] bg-[radial-gradient(circle_at_20%_20%,#6366F1_0%,transparent_50%)]" />
      <div className="absolute top-[50%] right-0 w-full h-[150vh] pointer-events-none opacity-[0.1] bg-[radial-gradient(circle_at_80%_50%,#A855F7_0%,transparent_50%)]" />
      
      <Navbar />
      
      <HeroSection />
      
      <StatsBar />
      
      <div id="shop">
        <FeaturedProducts />
      </div>
      
      <HowItWorks />
      
      <Testimonials />
      
      <CTABanner />
      
      <AboutSection />
      
      <Footer />
    </main>
  );
}
