import React, { useState, useEffect, useRef } from 'react';
import CanvasFramePlayer from './components/CanvasFramePlayer';
import Navbar from './components/Navbar';
import LuxuryCarCollectionShowcase from './components/LuxuryCarCollectionShowcase';
import InteractiveBrandsGrid from './components/InteractiveBrandsGrid';
import CarExplodedSection from './components/CarExplodedSection';
import CinematicCarGallery from './components/CinematicCarGallery';
import SellCarCalculator from './components/SellCarCalculator';
import AboutFusionCars from './components/AboutFusionCars';
import VirtualShowroom from './components/VirtualShowroom';
import TestimonialsSection from './components/TestimonialsSection';
import BlogsSection from './components/BlogsSection';
import ContactAndLocation from './components/ContactAndLocation';
import Footer from './components/Footer';
import { ChevronDown, ArrowDown, MessageSquare, Phone, Calculator, CheckCircle2 } from 'lucide-react';
import { soundManager } from './utils/audio';
import { FUSION_CARS_INFO } from './data/fusionCarsData';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const heroTrackRef = useRef(null);

  // Track window scroll progress isolated to the Hero 3D section (first 350vh on desktop)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroTrack = heroTrackRef.current;
          if (heroTrack) {
            const heroHeight = heroTrack.offsetHeight - window.innerHeight;
            if (heroHeight > 0) {
              const progress = Math.max(0, Math.min(1, window.scrollY / heroHeight));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1F2937] overflow-x-clip selection:bg-[#F70E1E] selection:text-white font-sans antialiased">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP 3D FRAME PLAYER (Fixed in background on >= md screens) */}
      {/* ======================================================== */}
      <div className="hidden md:block">
        <CanvasFramePlayer scrollProgress={scrollProgress} mode="desktop" />
      </div>

      {/* 2. Transparent Navbar (FUSION CARS & navlinks) */}
      <Navbar
        isAudioActive={isAudioActive}
        setIsAudioActive={setIsAudioActive}
      />

      {/* ======================================================== */}
      {/* 3A. MOBILE HERO SECTION (< md screens): 16:9 Auto-Run with Pause */}
      {/* ======================================================== */}
      <div id="home-mobile" className="block md:hidden pt-20 sm:pt-24 pb-8 px-4 max-w-xl mx-auto">
        {/* Eyebrow & Certified Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#F4F5F7] border border-gray-200 text-[11px] font-bold text-[#CCA57E] uppercase tracking-wider shadow-sm">
            ★ DELHI'S PREMIER SHOWROOM
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
            150-PT CERTIFIED
          </span>
        </div>

        {/* Mobile Main Headline */}
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#1F2937] tracking-tight leading-[1.15] mb-2">
          Curated Luxury &amp; <br />
          <span className="bg-gradient-to-r from-[#CCA57E] via-[#F70E1E] to-[#CCA57E] bg-clip-text text-transparent">
            Exotic Supercars
          </span>
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
          Experience India’s finest collection of certified pre-owned supercars, luxury sedans, and high-performance exotics.
        </p>

        {/* 16:9 Hero Video with Auto-Run at Normal Speed and Pause Option */}
        <div className="w-full mb-4">
          <CanvasFramePlayer mode="mobile" />
        </div>

        {/* Quick Action Mobile Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => scrollToSection('collection')}
            className="py-3 px-4 rounded-xl bg-[#1F2937] hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
          >
            <span>View Cars</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#CCA57E]" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('sell-car')}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-50 text-[#1F2937] border border-gray-200 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
          >
            <span>Sell Car</span>
            <Calculator className="w-3.5 h-3.5 text-[#CCA57E]" />
          </button>
        </div>

        {/* Mobile Trust Badges */}
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 py-2.5 px-3 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
          <span className="flex items-center gap-1 text-[#1F2937] font-semibold">
            <span className="text-emerald-600">✓</span> 150-Pt Checked
          </span>
          <span className="flex items-center gap-1 text-[#1F2937] font-semibold">
            <span className="text-[#CCA57E]">★</span> RC Transfer
          </span>
          <span className="flex items-center gap-1 text-[#1F2937] font-semibold">
            <span className="text-blue-600">✈</span> Pan-India
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3B. DESKTOP HERO SECTION TRACK (350vh) for 3D scrub on >= md */}
      {/* ======================================================== */}
      <div ref={heroTrackRef} id="home" className="hidden md:block relative h-[350vh] w-full pointer-events-none">
        
        {/* Top Initial Scroll Hint (Fades out immediately as user scrolls) */}
        <div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto transition-opacity duration-500 z-20 cursor-pointer"
          style={{ opacity: scrollProgress < 0.04 ? 1 - (scrollProgress / 0.04) : 0 }}
          onClick={() => {
            soundManager.playClick();
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
          }}
        >
          <span className="font-semibold text-xs tracking-[0.15em] text-[#1F2937] bg-white/90 px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm uppercase">
            Scroll to explore 3D showroom
          </span>
          <ChevronDown className="w-4 h-4 text-[#CCA57E] animate-bounce mt-1" />
        </div>

        {/* Transition Prompt to Showroom Form when approaching end of 3D Scrub */}
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-500 z-20"
          style={{ 
            opacity: scrollProgress >= 0.85 ? Math.min(1, (scrollProgress - 0.85) / 0.1) : 0,
            transform: `translate(-50%, ${scrollProgress >= 0.85 ? '0px' : '20px'})`,
            pointerEvents: scrollProgress >= 0.85 ? 'auto' : 'none'
          }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('collection')}
            className="px-6 py-3 rounded-full bg-[#1F2937] hover:bg-black text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore Showroom Inventory</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#CCA57E] transform group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* 4. SECTION 2: Collection Showcase (Clean Mobile Tabs + Desktop 320vh Pinning) */}
      <LuxuryCarCollectionShowcase />

      {/* 4.5. SECTION: Interactive Car Brands Grid on Interactive Dot Canvas (#brands) */}
      <InteractiveBrandsGrid />

      {/* 5. SECTION 3: 3D Exploded Supercar Anatomy (Clean Mobile Phase Stepper + Desktop 400vh Pinning) */}
      <CarExplodedSection />

      {/* 6. SECTION 4: Cinematic Luxury Car Image Gallery (Pure Visual 3D Curved Showcase) */}
      <CinematicCarGallery />

      {/* 7. SECTION 5: Light Steel Grey Section (#F4F5F7) - Sell Your Car Instant Valuation */}
      <SellCarCalculator />

      {/* 6. SECTION 4: Clean White Section (#FFFFFF) - About Fusion Cars & Services */}
      <AboutFusionCars />

      {/* 7. SECTION 5: Light Steel Grey Section (#F4F5F7) - Delhi Flagship Virtual Showroom */}
      <VirtualShowroom />

      {/* 8. SECTION 6: Clean White / Light Steel Grey Section (#F4F5F7) - Customer Reviews */}
      <TestimonialsSection />

      {/* 9. SECTION 7: Clean White Section (#FFFFFF) - Automotive Guides & Blogs */}
      <BlogsSection />

      {/* 10. SECTION 8: Light Steel Grey Section (#F4F5F7) - Contact Us, VIP Booking & Delhi Location */}
      <ContactAndLocation />

      {/* 11. Comprehensive Brand Footer: Light Steel Grey (#F4F5F7) */}
      <Footer />

      {/* 12. Floating Quick Action Bar (Bottom Right, clean and unobtrusive) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 pointer-events-auto">
        
        {/* Instant Valuation Quick Button */}
        <button
          type="button"
          onClick={() => scrollToSection('sell-car')}
          title="Instant Car Valuation"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#F4F5F7] text-[#1F2937] border border-gray-200 flex items-center justify-center shadow-lg transition-all cursor-pointer group active:scale-95"
        >
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCA57E]" />
        </button>

        {/* WhatsApp Direct Connect */}
        <a
          href={FUSION_CARS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Concierge"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

      </div>

    </div>
  );
}
