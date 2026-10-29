import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Quote
} from 'lucide-react';
import { soundManager } from '../utils/audio';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    role: 'Industrialist • Civil Lines, New Delhi',
    avatarInitials: 'AR',
    avatarBg: 'bg-[#EA580C]', // Warm amber / orange from reference image
    quote: 'Incredible performance boost and the white-glove service is flawless. Support team is responsive and the transparency aligns perfectly with our needs. Sourcing our Range Rover through Fusion Cars was an effortless luxury experience.',
    tags: ['Verified Buyer', 'Range Rover LWB'],
    timestamp: '2 months ago',
    sharesText: 'Verified Purchase • Delhi NCR'
  },
  {
    id: 2,
    name: 'Rajeshwar Chauhan',
    role: 'Founder & CEO • Golf Course Rd, Gurugram',
    avatarInitials: 'RC',
    avatarBg: 'bg-[#2563EB]', // Electric blue
    quote: 'Sold my Porsche 911 at a fair valuation in less than 24 hours with full payment into my account before car pickup, then upgraded to a G63 AMG. The best luxury exotic dealership in Delhi NCR by far.',
    tags: ['VIP Client', 'Mercedes G63 AMG'],
    timestamp: '3 months ago',
    sharesText: 'Verified Trade-in • Gurugram'
  },
  {
    id: 3,
    name: 'Dr. Ananya Sen',
    role: 'Senior Neurosurgeon • Indiranagar, Bengaluru',
    avatarInitials: 'AS',
    avatarBg: 'bg-[#059669]', // Emerald green
    quote: 'Hesitant about purchasing from Delhi while living in Bangalore, but the Fusion Cars team sent a 150-point diagnostic video report and transported the BMW M8 in a private enclosed container directly to my doorstep.',
    tags: ['White-Glove Delivery', 'BMW M8 Competition'],
    timestamp: '5 months ago',
    sharesText: 'Pan-India Transit • Bengaluru'
  },
  {
    id: 4,
    name: 'Karan Mehra',
    role: 'Real Estate Developer • Worli, South Mumbai',
    avatarInitials: 'KM',
    avatarBg: 'bg-[#7C3AED]', // Royal violet
    quote: 'The non-accidental certification and verified electronic service records gave me complete peace of mind. Sourcing a Ferrari Roma in Mumbai through Fusion Cars Delhi was smoother than dealing with official factory showrooms.',
    tags: ['Collector', 'Ferrari Roma'],
    timestamp: '6 months ago',
    sharesText: 'Verified Purchase • Mumbai'
  },
  {
    id: 5,
    name: 'Harpreet Singh Chadha',
    role: 'Managing Director • Sector 9, Chandigarh',
    avatarInitials: 'HC',
    avatarBg: 'bg-[#CCA57E]', // Champagne Gold
    quote: 'Their paperless documentation and instant bank financing approval took barely 48 hours. Driving away in my Porsche Cayenne Turbo GT with ceremonial delivery was a memorable celebration for my entire family.',
    tags: ['Ceremonial Delivery', 'Porsche Cayenne Turbo'],
    timestamp: '7 months ago',
    sharesText: 'Verified Purchase • Chandigarh'
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  // Auto-advance every 6.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleSelect = (idx) => {
    soundManager.playClick();
    setActiveIndex(idx);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section 
      id="testimonials" 
      className="relative z-30 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-white text-[#1F2937] overflow-hidden select-none"
    >
      {/* ======================================================== */}
      {/* --- VIVID BOLD AMBIENT MESH GLOW (Punchy, High Contrast) --- */}
      {/* Deep Electric Blue on the left, Rich Sunset Crimson/Orange on the right */}
      {/* ======================================================== */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/4 -translate-x-1/2 w-[28rem] sm:w-[40rem] h-[22rem] sm:h-[30rem] bg-gradient-to-br from-[#2563EB]/60 via-[#1D4ED8]/45 to-cyan-400/35 rounded-full blur-[70px] sm:blur-[85px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 right-1/4 translate-x-1/2 w-[28rem] sm:w-[40rem] h-[22rem] sm:h-[30rem] bg-gradient-to-bl from-[#FF073A]/55 via-[#F97316]/50 to-amber-400/40 rounded-full blur-[70px] sm:blur-[85px] pointer-events-none" />
      {/* Center atmospheric fusion glow directly behind the stacked cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[32rem] h-[16rem] sm:h-[22rem] bg-gradient-to-r from-blue-500/25 via-purple-500/30 to-rose-500/30 rounded-full blur-[65px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        
        {/* ======================================================== */}
        {/* --- SECTION HEADER --- */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="font-semibold text-xs tracking-[0.2em] text-[#CCA57E] uppercase block mb-3">
            VERIFIED EXPERIENCES • GOOGLE 4.8★
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] leading-[1.18] tracking-tight">
            Trusted by discerning owners
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3.5 rounded-full" />
        </div>

        {/* ======================================================== */}
        {/* --- STACKED CARD DECK CAROUSEL (Transparent Blurred Glass) --- */}
        {/* ======================================================== */}
        <div 
          className="relative max-w-2xl mx-auto min-h-[340px] sm:min-h-[320px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {TESTIMONIALS.map((item, idx) => {
            // Distance from active index in cyclic order
            const diff = (idx - activeIndex + total) % total;

            let translateY = 0;
            let scale = 1;
            let zIndex = 0;
            let opacity = 0;
            let pointerEvents = 'none';

            if (diff === 0) {
              // Active Front Card
              translateY = 0;
              scale = 1;
              zIndex = 30;
              opacity = 1;
              pointerEvents = 'auto';
            } else if (diff === 1) {
              // 1st Card Peeking Directly Behind
              translateY = -24;
              scale = 0.94;
              zIndex = 20;
              opacity = 0.72;
              pointerEvents = 'auto';
            } else if (diff === 2) {
              // 2nd Card Peeking Further Behind
              translateY = -46;
              scale = 0.88;
              zIndex = 10;
              opacity = 0.45;
              pointerEvents = 'auto';
            } else {
              // Remaining Cards (Hidden, waiting in deck)
              translateY = 40;
              scale = 0.82;
              zIndex = 0;
              opacity = 0;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (diff !== 0) handleSelect(idx);
                }}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`absolute inset-x-0 mx-auto w-full max-w-xl sm:max-w-2xl rounded-3xl p-6 sm:p-9 bg-white/20 sm:bg-white/25 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_10px_25px_-5px_rgba(0,0,0,0.06)] will-change-transform ${
                  diff !== 0 ? 'cursor-pointer hover:opacity-85' : ''
                }`}
              >
                {/* --- Top Row: Avatar & Author Details --- */}
                <div className="flex items-center gap-3.5 mb-5">
                  {/* Initials Avatar Circle */}
                  <div 
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md shrink-0`}
                  >
                    {item.avatarInitials}
                  </div>

                  {/* Name and Subtitle */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-base sm:text-lg text-[#111827] tracking-tight leading-snug drop-shadow-sm">
                        {item.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* --- Middle: Quote Body --- */}
                <p className="font-medium text-sm sm:text-base text-[#1F2937] leading-[1.65] mb-6">
                  "{item.quote}"
                </p>

                {/* --- Bottom Row: Tags & Metadata (Clock & Verified Share) --- */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/40 text-xs">
                  
                  {/* Pill Tags */}
                  <div className="flex items-center gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full bg-white/45 backdrop-blur-md text-gray-800 font-semibold text-[11px] tracking-wide border border-white/50 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Timestamp & Verified badge */}
                  <div className="flex items-center gap-4 text-[11px] text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {item.timestamp}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Share2 className="w-3.5 h-3.5 text-gray-500" />
                      {item.sharesText}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* --- PAGINATION CONTROLS (Dots & Smooth Arrows) --- */}
        {/* ======================================================== */}
        <div className="mt-12 sm:mt-14 flex items-center justify-center gap-5">
          
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition-all shadow-sm cursor-pointer"
            title="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 5 Pagination Dots (Exact match to reference image) */}
          <div className="flex items-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === i
                    ? 'w-2.5 h-2.5 bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.5)] scale-110'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Review ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition-all shadow-sm cursor-pointer"
            title="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
}
