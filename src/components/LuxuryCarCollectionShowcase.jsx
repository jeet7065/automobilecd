import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { 
  FUSION_BRANDS, 
  FUSION_BODY_TYPES, 
  FUSION_PRICE_RANGES, 
  FUSION_INVENTORY, 
  FUSION_CARS_INFO 
} from '../data/fusionCarsData';
import { soundManager } from '../utils/audio';
import CarDetailModal from './CarDetailModal';

// 5 Featured Cars for Continuous Scroll Pinning Showcase
const FEATURED_FIVE_CARS = [
  {
    id: 'feat-01',
    inventoryId: 'fc-105',
    name: 'Porsche 911 Carrera S (992)',
    brand: 'Porsche',
    bodyType: 'Coupes & Convertibles',
    year: '2022',
    priceINR: '₹ 1.88 Crore',
    emiStarts: '₹ 2,45,000/mo',
    kms: '12,800 km',
    color: 'Guards Red with Nero Black Leather',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    cutoutPng: 'https://pngimg.com/uploads/porsche/porsche_PNG10607.png',
    keySpecs: {
      engine: '3.0L Twin-Turbo Boxer-6 Rear Engine',
      power: '450 HP @ 6,500 RPM',
      torque: '530 Nm @ 2,300 - 5,000 RPM',
      acceleration: '3.5s (0-100 km/h with Sport Chrono)',
      transmission: '8-Speed Porsche Doppelkupplung (PDK)',
      drive: 'Rear-Wheel Drive with Rear Axle Steering'
    },
    features: [
      'Sport Chrono Package with Mode Switch on Steering',
      'Sports Exhaust System with Dual Black Tailpipes',
      'PASM Sport Suspension (-10 mm ride height)',
      'BOSE Surround Sound System (570 Watts)'
    ],
    inspectionPassed: 150
  },
  {
    id: 'feat-02',
    inventoryId: 'fc-104',
    name: 'Lamborghini Huracán LP 610-4 Spyder',
    brand: 'Lamborghini',
    bodyType: 'Supercars & Exotics',
    year: '2020',
    priceINR: '₹ 3.45 Crore',
    emiStarts: '₹ 4,45,000/mo',
    kms: '11,400 km',
    color: 'Giallo Inti Pearl Yellow with Nero Ade',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    cutoutPng: 'https://pngimg.com/uploads/lamborghini/lamborghini_PNG10683.png',
    keySpecs: {
      engine: '5.2L Naturally Aspirated V10 Engine',
      power: '610 HP @ 8,250 RPM',
      torque: '560 Nm @ 6,500 RPM',
      acceleration: '3.4s (0-100 km/h)',
      transmission: '7-Speed LDF Dual-Clutch with Paddles',
      drive: 'Electronically Controlled All-Wheel Drive'
    },
    features: [
      'Capristo Valved Titanium Exhaust System',
      'Front Axle Hydraulic Lifting System',
      'Carbon Ceramic Brakes with Yellow Calipers',
      'Sensonum Premium Audio System'
    ],
    inspectionPassed: 150
  },
  {
    id: 'feat-03',
    inventoryId: 'fc-108',
    name: 'Ferrari SF90 Stradale Assetto Fiorano',
    brand: 'Ferrari',
    bodyType: 'Supercars & Exotics',
    year: '2023',
    priceINR: '₹ 4.85 Crore',
    emiStarts: '₹ 6,25,000/mo',
    kms: '6,200 km',
    color: 'Rosso Corsa with Nero Two-Tone Roof',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    cutoutPng: 'https://pngimg.com/uploads/ferrari/ferrari_PNG102824.png',
    keySpecs: {
      engine: '4.0L Twin-Turbo V8 + 3 Electric Motors',
      power: '1,000 HP Hybrid Powertrain',
      torque: '800 Nm @ 6,000 RPM',
      acceleration: '2.5s (0-100 km/h)',
      transmission: '8-Speed F1 Dual-Clutch Transmission',
      drive: 'RAC-e All-Wheel Drive'
    },
    features: [
      'Assetto Fiorano Lightweight Track Package',
      'Multimatic Shock Absorbers Derived from GT Racing',
      'Carbon Fiber Rear Wing & High-Downforce Aero',
      'JBL Professional Sound System'
    ],
    inspectionPassed: 150
  },
  {
    id: 'feat-04',
    inventoryId: 'fc-102',
    name: 'Mercedes-Benz G63 AMG 4MATIC',
    brand: 'Mercedes-Benz',
    bodyType: 'Luxury SUVs & Off-Roaders',
    year: '2022',
    priceINR: '₹ 2.95 Crore',
    emiStarts: '₹ 3,85,000/mo',
    kms: '18,500 km',
    color: 'Designo Magno Matte Black / Red Nappa',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    cutoutPng: 'https://pngimg.com/uploads/mercedes/mercedes_PNG80220.png',
    keySpecs: {
      engine: '4.0L Bi-Turbo V8 Handcrafted by AMG',
      power: '585 HP @ 6,000 RPM',
      torque: '850 Nm @ 2,500 - 3,500 RPM',
      acceleration: '4.5s (0-100 km/h)',
      transmission: 'AMG SPEEDSHIFT 9G-TRONIC',
      drive: 'All-Wheel Drive with 3 Differential Locks'
    },
    features: [
      'AMG Performance Exhaust with Dual Side Pipes',
      'Burmester High-End Surround Sound',
      '22-inch AMG Forged Cross-Spoke Matte Alloys',
      'Exclusive Carbon Fiber Interior Trim'
    ],
    inspectionPassed: 150
  },
  {
    id: 'feat-05',
    inventoryId: 'fc-103',
    name: 'Rolls-Royce Ghost Series II Extended',
    brand: 'Rolls-Royce',
    bodyType: 'Flagship & Executive Sedans',
    year: '2021',
    priceINR: '₹ 5.25 Crore',
    emiStarts: '₹ 6,80,000/mo',
    kms: '9,800 km',
    color: 'English White with Seashell & Mandarin',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80',
    cutoutPng: 'https://pngimg.com/uploads/rolls_royce/rolls_royce_PNG57.png',
    keySpecs: {
      engine: '6.75L Twin-Turbocharged V12 Engine',
      power: '571 HP @ 5,000 RPM',
      torque: '850 Nm @ 1,600 RPM',
      acceleration: '4.8s (0-100 km/h)',
      transmission: '8-Speed Satellite Aided Transmission',
      drive: 'All-Wheel Drive with All-Wheel Steering'
    },
    features: [
      'Bespoke Starlight Headliner with Shooting Star',
      'Illuminated Spirit of Ecstasy & Pantheon Grille',
      'Rear Theater Lounge with Champagne Cooler',
      'Effortless Electric Power-Closing Coach Doors'
    ],
    inspectionPassed: 150
  }
];

export default function LuxuryCarCollectionShowcase() {
  const containerRef = useRef(null);
  
  // Mobile Viewport Detection (< 768px)
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCarIndex, setMobileCarIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pinned Scroll State for 5 Featured Cars: 'before' | 'pinned' | 'after'
  const [pinState, setPinState] = useState('before');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScrollCarIndex, setActiveScrollCarIndex] = useState(0);

  // View All Mode: false = scroll pinning showcase (5 cars), true = all cars arrow slider / grid
  const [isViewAllActive, setIsViewAllActive] = useState(false);
  const [viewAllIndex, setViewAllIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  // Search & Filter State
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // Modal State for Full Car Details
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);

  // Filter Inventory Cars for View All Mode
  const filteredAllCars = FUSION_INVENTORY.filter((car) => {
    if (selectedBrand !== 'all' && car.brandId !== selectedBrand) return false;
    if (selectedType !== 'all' && car.bodyTypeId !== selectedType) return false;
    if (selectedPrice !== 'all') {
      const range = FUSION_PRICE_RANGES.find(r => r.id === selectedPrice);
      if (range && (car.priceRaw < range.min || car.priceRaw > range.max)) return false;
    }
    return true;
  });

  // Current active car in View All mode
  const currentViewAllCar = filteredAllCars[viewAllIndex] || filteredAllCars[0] || FUSION_INVENTORY[0];

  // Pinned Continuous Scroll Listener (Only on desktop >= 768px when not in View All mode)
  useEffect(() => {
    if (isViewAllActive || isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScroll = container.offsetHeight - window.innerHeight;

            if (rect.top > 0) {
              setPinState('before');
              setScrollProgress(0);
              setActiveScrollCarIndex(0);
            } else if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
              setPinState('pinned');
              const current = -rect.top;
              const p = Math.max(0, Math.min(1, current / totalScroll));
              setScrollProgress(p);

              // 5 Cars mapped continuously across [0.0, 1.0]
              const carIndex = Math.min(FEATURED_FIVE_CARS.length - 1, Math.floor(p * FEATURED_FIVE_CARS.length));
              setActiveScrollCarIndex(carIndex);
            } else {
              setPinState('after');
              setScrollProgress(1);
              setActiveScrollCarIndex(FEATURED_FIVE_CARS.length - 1);
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
  }, [isViewAllActive]);

  // Keyboard navigation when in View All mode
  useEffect(() => {
    if (!isViewAllActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevCar();
      } else if (e.key === 'ArrowRight') {
        handleNextCar();
      } else if (e.key === 'Escape') {
        setIsViewAllActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewAllActive, filteredAllCars.length]);

  const handleNextCar = () => {
    soundManager.playClick();
    setViewAllIndex((prev) => (prev + 1) % filteredAllCars.length);
  };

  const handlePrevCar = () => {
    soundManager.playClick();
    setViewAllIndex((prev) => (prev - 1 + filteredAllCars.length) % filteredAllCars.length);
  };

  const handleJumpToFeaturedCar = (index) => {
    soundManager.playClick();
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (totalScroll * (index / (FEATURED_FIVE_CARS.length - 0.9)));

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleSearchFilterSubmit = () => {
    soundManager.playIgnition();
    setIsViewAllActive(true);
    setViewAllIndex(0);
  };

  // Active Car in Continuous Scroll mode
  const activeFeaturedCar = FEATURED_FIVE_CARS[activeScrollCarIndex] || FEATURED_FIVE_CARS[0];

  return (
    <section 
      id="collection" 
      ref={containerRef}
      className={`relative z-30 w-full bg-white text-[#1F2937] ${
        isViewAllActive ? 'min-h-screen py-12 sm:py-20' : (isMobile ? 'h-auto py-12 sm:py-16' : 'h-[320vh]')
      }`}
    >
      {/* ======================================================== */}
      {/* --- MODE 1A: MOBILE INTUITIVE SHOWCASE (< md) --- */}
      {/* ======================================================== */}
      {isMobile && !isViewAllActive && (
        <div className="w-full max-w-xl mx-auto px-4 flex flex-col gap-5">
          {/* Section Header */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F5F7] border border-gray-200 text-xs font-semibold text-[#CCA57E] tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>FEATURED COLLECTION • 150-PT CERTIFIED</span>
            </div>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] tracking-tight leading-[1.2]">
              Curated pre-owned luxury
            </h2>
            <div className="w-12 h-0.5 bg-[#CCA57E] mt-2 rounded-full" />
          </div>

          {/* View All Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsViewAllActive(true);
              setViewAllIndex(0);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#CCA57E] hover:bg-[#b89169] text-[#1F2937] font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#b89169]/30"
          >
            <span>VIEW ALL INVENTORY ({FUSION_INVENTORY.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Horizontal Vehicle Tabs / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            {FEATURED_FIVE_CARS.map((car, idx) => {
              const isSelected = idx === mobileCarIndex;
              return (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setMobileCarIndex(idx);
                  }}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#1F2937] text-white shadow-md'
                      : 'bg-[#F4F5F7] text-gray-600 hover:text-black border border-gray-200'
                  }`}
                >
                  <span className={isSelected ? 'text-[#CCA57E]' : 'text-gray-400'}>
                    0{idx + 1}
                  </span>
                  <span>{car.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Car Showcase Card */}
          {(() => {
            const car = FEATURED_FIVE_CARS[mobileCarIndex] || FEATURED_FIVE_CARS[0];
            return (
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl flex flex-col gap-4">
                {/* Brand & Inspection Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-widest text-[#CCA57E] uppercase">
                    {car.brand} • {car.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    ✓ 150-PT PASSED
                  </span>
                </div>

                {/* Big Car Cutout with Glow & Soft Shadow */}
                <div className="relative w-full h-48 sm:h-56 flex items-center justify-center my-1">
                  <div className="absolute inset-x-8 bottom-2 h-7 bg-black/15 blur-xl rounded-full" />
                  <img
                    src={car.cutoutPng}
                    alt={car.name}
                    className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* Name & Pricing */}
                <div>
                  <h3 className="font-extrabold text-xl text-[#1F2937] tracking-tight leading-snug">
                    {car.name}
                  </h3>
                  <div className="flex items-baseline justify-between mt-1.5">
                    <span className="font-extrabold text-2xl text-[#1F2937]">
                      {car.priceINR}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      EMI: {car.emiStarts}
                    </span>
                  </div>
                </div>

                {/* 4 Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Power</span>
                    <span className="font-bold text-[#1F2937] truncate block">{car.keySpecs.power.split('@')[0]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">0-100 km/h</span>
                    <span className="font-bold text-[#1F2937]">{car.keySpecs.acceleration.split('(')[0]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Engine</span>
                    <span className="font-bold text-[#1F2937] truncate block">{car.keySpecs.engine.split(' ')[0]} {car.keySpecs.engine.split(' ')[1]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Odometer</span>
                    <span className="font-bold text-[#1F2937]">{car.kms}</span>
                  </div>
                </div>

                {/* Navigation Controls: Prev / Next + Dots */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setMobileCarIndex((prev) => (prev - 1 + FEATURED_FIVE_CARS.length) % FEATURED_FIVE_CARS.length);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-[#F4F5F7] hover:bg-gray-200 text-[#1F2937] transition-all cursor-pointer flex items-center gap-1 text-xs font-bold active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {FEATURED_FIVE_CARS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setMobileCarIndex(dotIdx);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          dotIdx === mobileCarIndex ? 'w-6 bg-[#CCA57E]' : 'w-2 bg-gray-300'
                        }`}
                        aria-label={`Go to car ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setMobileCarIndex((prev) => (prev + 1) % FEATURED_FIVE_CARS.length);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-[#F4F5F7] hover:bg-gray-200 text-[#1F2937] transition-all cursor-pointer flex items-center gap-1 text-xs font-bold active:scale-95"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCarForModal(car.inventoryId);
                    }}
                    className="w-full py-3 rounded-xl bg-[#1F2937] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                  >
                    <Eye className="w-4 h-4 text-[#CCA57E]" />
                    <span>View Inspection Report &amp; Specs</span>
                  </button>

                  <a
                    href={FUSION_CARS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#1F2937] border border-gray-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-decoration-none shadow-xs"
                  >
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* --- MODE 1B: 5 CARS ON CONTINUOUS SCROLL (DESKTOP PINNED) --- */}
      {/* ======================================================== */}
      {!isMobile && !isViewAllActive && (
        <div 
          className={`w-full h-screen flex flex-col justify-between overflow-hidden p-4 sm:p-8 lg:p-12 transition-none bg-white ${
            pinState === 'pinned'
              ? 'fixed top-0 left-0 right-0 z-30'
              : pinState === 'after'
              ? 'absolute bottom-0 left-0 right-0 z-20'
              : 'absolute top-0 left-0 right-0 z-20'
          }`}
        >
          {/* Top HUD: Title, Eyebrow & "View All" Button */}
          <div className="relative z-20 max-w-7xl mx-auto w-full pt-14 sm:pt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F5F7] border border-gray-200 text-xs font-semibold text-[#CCA57E] tracking-wider uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>FEATURED COLLECTION • 150-PT CERTIFIED</span>
              </div>
              <h2 className="font-extrabold text-2xl sm:text-4xl text-[#1F2937] tracking-tight leading-[1.2]">
                Curated pre-owned luxury
              </h2>
              <div className="w-12 h-0.5 bg-[#CCA57E] mt-2 rounded-full" />
            </div>

            {/* "View All" Button to toggle Arrow Slider Mode */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsViewAllActive(true);
                  setViewAllIndex(0);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#CCA57E] hover:bg-[#b89169] text-[#1F2937] font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer border border-[#b89169]/30"
              >
                <span>VIEW ALL INVENTORY ({FUSION_INVENTORY.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="px-3.5 py-2 rounded-xl bg-[#F4F5F7] border border-gray-200 text-xs font-mono font-bold text-[#1F2937] hidden sm:flex items-center gap-1.5">
                <span className="text-gray-400">VEHICLE:</span>
                <span className="text-[#CCA57E]">0{activeScrollCarIndex + 1}</span>
                <span className="text-gray-400">/ 05</span>
              </div>
            </div>
          </div>

          {/* Main 2-Column Stage: Left Info Card + Right Transparent PNG Cutout */}
          <div className="relative flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 my-auto overflow-hidden">
            
            {/* ======================================================== */}
            {/* --- LEFT SIDE: INFO CARD WITH BLURRED CAR PHOTO --- */}
            {/* ======================================================== */}
            <div className="w-full lg:w-[42%] xl:w-[38%] shrink-0 z-20">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200/90 shadow-[0_16px_45px_rgba(31,41,55,0.08)] p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300">
                
                {/* Blurred Car Photo in Card Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                  <img
                    key={activeFeaturedCar.image}
                    src={activeFeaturedCar.image}
                    alt={activeFeaturedCar.name}
                    className="w-full h-full object-cover object-center filter blur-[14px] scale-135 opacity-40 transition-opacity duration-500"
                  />
                  {/* Subtle Brand Depth Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/90" />
                </div>

                {/* Card Foreground Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-200/80">
                    <span className="font-semibold text-[11px] tracking-[0.18em] text-[#CCA57E] uppercase">
                      {activeFeaturedCar.brand}
                    </span>
                    <span className="text-[11px] font-mono text-[#1F2937] font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-gray-200 shadow-2xs">
                      STAGE 0{activeScrollCarIndex + 1} / 05
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#1F2937] leading-tight mb-1">
                    {activeFeaturedCar.name}
                  </h3>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-xl sm:text-2xl font-black text-[#1F2937]">
                      {activeFeaturedCar.priceINR}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      EMI from {activeFeaturedCar.emiStarts}
                    </span>
                  </div>

                  {/* 3-Column Specifications Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 text-center shadow-2xs">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Engine</p>
                      <p className="font-bold text-[11px] sm:text-xs text-[#1F2937] truncate mt-0.5">
                        {activeFeaturedCar.keySpecs.engine.split(' ')[0]} {activeFeaturedCar.keySpecs.engine.split(' ')[1]}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 text-center shadow-2xs">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Power</p>
                      <p className="font-bold text-[11px] sm:text-xs text-[#1F2937] truncate mt-0.5">
                        {activeFeaturedCar.keySpecs.power.split('@')[0]}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 text-center shadow-2xs">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">0-100 km/h</p>
                      <p className="font-bold text-[11px] sm:text-xs text-[#F70E1E] truncate mt-0.5">
                        {activeFeaturedCar.keySpecs.acceleration.split(' ')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Highlight Features */}
                  <div className="space-y-1.5 mb-5 text-xs text-[#4B5563]">
                    {activeFeaturedCar.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Conversion Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-200/80">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        const invCar = FUSION_INVENTORY.find(c => c.name === activeFeaturedCar.name) || FUSION_INVENTORY[0];
                        setSelectedCarForModal(invCar);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#1F2937] border border-gray-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>View Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playIgnition();
                        const invCar = FUSION_INVENTORY.find(c => c.name === activeFeaturedCar.name) || FUSION_INVENTORY[0];
                        setSelectedCarForModal(invCar);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <span>Book VIP Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* ======================================================== */}
            {/* --- RIGHT SIDE: THAT SAME CAR IN TRANSPARENT PNG --- */}
            {/* ======================================================== */}
            <div className="relative w-full lg:w-[58%] xl:w-[62%] h-[42vh] sm:h-[52vh] lg:h-[62vh] flex items-center justify-center">
              
              {/* Soft Ambient Studio Lighting Backdrop */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(204, 165, 126, 0.12) 0%, rgba(244, 245, 247, 0.4) 60%, transparent 80%)'
                }}
              />

              {/* Realistic Car Ground Contact Shadow */}
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/25 blur-xl rounded-full pointer-events-none" />
              <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-3/5 h-4 bg-black/45 blur-md rounded-full pointer-events-none" />

              {/* High-Resolution Transparent Car Cutout Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-6 transition-all duration-500 transform scale-100 hover:scale-[1.02]">
                <img
                  key={activeFeaturedCar.cutoutPng}
                  src={activeFeaturedCar.cutoutPng}
                  alt={activeFeaturedCar.name}
                  draggable={false}
                  onError={(e) => {
                    // Fallback to high-res photo with clean rounded border if CDN fails
                    e.target.onerror = null;
                    e.target.src = activeFeaturedCar.image;
                    e.target.className += " rounded-3xl shadow-2xl object-cover";
                  }}
                  className="max-w-full max-h-[82%] object-contain select-none filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out animate-fadeIn"
                />
              </div>

            </div>

          </div>

          {/* Bottom HUD: Progress Scrubber Bar & Quick-Jump Pills */}
          <div className="relative z-20 max-w-7xl mx-auto w-full pb-2 sm:pb-4">
            
            {/* Continuous Scroll Scrub Bar */}
            <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-[#CCA57E] via-[#F70E1E] to-[#CCA57E] transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>

            {/* Quick-Jump Tab Pills for 5 Featured Cars */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {FEATURED_FIVE_CARS.map((car, idx) => {
                  const isActive = activeScrollCarIndex === idx;
                  return (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => handleJumpToFeaturedCar(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer border ${
                        isActive
                          ? 'bg-[#1F2937] text-white border-[#1F2937] shadow-sm'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-[#CCA57E]'
                      }`}
                    >
                      <span>0{idx + 1} {car.brand}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#1F2937] bg-white px-3.5 py-1.5 rounded-full border border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F70E1E] animate-pulse" />
                <span>SCROLL DOWN TO REVEAL NEXT SUPERCAR ({activeScrollCarIndex + 1} / 5)</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* --- MODE 2: "VIEW ALL" SHOWROOM (LEFT & RIGHT ARROWS) --- */}
      {/* ======================================================== */}
      {isViewAllActive && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Top Bar: Return to Scroll Showcase & Mode Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F5F7] border border-gray-200 text-xs font-semibold text-[#CCA57E] tracking-wider uppercase mb-2">
                <span>FULL SHOWROOM INVENTORY</span>
              </div>
              <h2 className="font-extrabold text-2xl sm:text-4xl text-[#1F2937] tracking-tight">
                All Available Vehicles ({filteredAllCars.length})
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Toggle Grid vs Interactive Arrow Showcase */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsGridView(!isGridView);
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-[#1F2937] flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {isGridView ? <Layers className="w-4 h-4 text-[#CCA57E]" /> : <LayoutGrid className="w-4 h-4 text-[#CCA57E]" />}
                <span>{isGridView ? 'Show 3D View' : 'Show Grid View'}</span>
              </button>

              {/* Close View All / Return to Continuous Scroll */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsViewAllActive(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
                <span>Return to Showcase</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Bar: Brand Dropdown, Body Type, Price */}
          <div className="rounded-2xl p-5 sm:p-6 bg-[#F4F5F7] border border-gray-200/90 shadow-xs mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* Brand Selector */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  CAR BRAND
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setViewAllIndex(0);
                  }}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-[#1F2937] outline-none cursor-pointer"
                >
                  {FUSION_BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.count || '0'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  CAR TYPE
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setViewAllIndex(0);
                  }}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-[#1F2937] outline-none cursor-pointer"
                >
                  {FUSION_BODY_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  CAR PRICE
                </label>
                <select
                  value={selectedPrice}
                  onChange={(e) => {
                    setSelectedPrice(e.target.value);
                    setViewAllIndex(0);
                  }}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-[#1F2937] outline-none cursor-pointer"
                >
                  {FUSION_PRICE_RANGES.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Reset Action */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedType('all');
                    setSelectedPrice('all');
                    setViewAllIndex(0);
                  }}
                  className="w-full h-11 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>

            </div>
          </div>

          {/* VIEW ALL SUB-MODE A: INTERACTIVE ARROW SHOWCASE (< and >) */}
          {!isGridView && (
            <div className="relative w-full">
              
              {/* Navigation Arrows & Counter Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-sm font-bold text-[#CCA57E]">
                  VEHICLE {String(viewAllIndex + 1).padStart(2, '0')} / {String(filteredAllCars.length).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-3">
                  {/* Left Arrow Button */}
                  <button
                    type="button"
                    onClick={handlePrevCar}
                    title="Previous Car (Left Arrow)"
                    className="w-12 h-12 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-[#1F2937] flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 group"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#1F2937] group-hover:text-[#CCA57E] transition-colors" />
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    type="button"
                    onClick={handleNextCar}
                    title="Next Car (Right Arrow)"
                    className="w-12 h-12 rounded-2xl bg-[#1F2937] hover:bg-black text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 group"
                  >
                    <ChevronRight className="w-6 h-6 text-white group-hover:text-[#CCA57E] transition-colors" />
                  </button>
                </div>
              </div>

              {/* 2-Column Stage in Arrow Mode: Left Info Card + Right Transparent PNG */}
              <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-10 rounded-3xl bg-[#F4F5F7] border border-gray-200">
                
                {/* Left Side: Info Card with Blurred Car Photo */}
                <div className="w-full lg:w-[42%] xl:w-[38%] shrink-0">
                  <div className="relative rounded-3xl overflow-hidden border border-white/90 shadow-[0_16px_45px_rgba(31,41,55,0.08)] p-6 sm:p-8 bg-white/80 backdrop-blur-2xl">
                    
                    {/* Blurred Photo Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                      <img
                        key={currentViewAllCar.image}
                        src={currentViewAllCar.image}
                        alt={currentViewAllCar.name}
                        className="w-full h-full object-cover object-center filter blur-[14px] scale-135 opacity-40 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                        <span className="font-semibold text-xs tracking-wider text-[#CCA57E] uppercase">
                          {currentViewAllCar.brand}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                          {currentViewAllCar.year} MODEL
                        </span>
                      </div>

                      <h3 className="font-extrabold text-2xl text-[#1F2937] leading-tight mb-1">
                        {currentViewAllCar.name}
                      </h3>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-black text-[#1F2937]">
                          {currentViewAllCar.priceINR}
                        </span>
                        <span className="text-xs text-gray-500">
                          EMI {currentViewAllCar.emiStarts}
                        </span>
                      </div>

                      {/* Specs Badges */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="p-2 rounded-xl bg-white/90 border border-gray-200 text-center">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Power</p>
                          <p className="font-bold text-xs text-[#1F2937] truncate mt-0.5">
                            {currentViewAllCar.keySpecs.power.split('@')[0]}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-white/90 border border-gray-200 text-center">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">0-100</p>
                          <p className="font-bold text-xs text-[#F70E1E] truncate mt-0.5">
                            {currentViewAllCar.keySpecs.acceleration.split(' ')[0]}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-white/90 border border-gray-200 text-center">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Odometer</p>
                          <p className="font-bold text-xs text-[#1F2937] truncate mt-0.5">
                            {currentViewAllCar.kms}
                          </p>
                        </div>
                      </div>

                      {/* Bullet Features */}
                      <div className="space-y-1.5 mb-5 text-xs text-[#4B5563]">
                        {currentViewAllCar.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => setSelectedCarForModal(currentViewAllCar)}
                          className="py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 font-semibold text-xs text-[#1F2937] transition-all cursor-pointer shadow-xs"
                        >
                          Vehicle Details
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playIgnition();
                            setSelectedCarForModal(currentViewAllCar);
                          }}
                          className="py-2.5 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs transition-all cursor-pointer shadow-sm"
                        >
                          Book Test Drive
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Side: Transparent Car Cutout */}
                <div className="relative w-full lg:w-[58%] xl:w-[62%] h-[40vh] sm:h-[48vh] flex items-center justify-center">
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/20 blur-xl rounded-full pointer-events-none" />
                  
                  <img
                    key={currentViewAllCar.id}
                    src={currentViewAllCar.cutoutPng || currentViewAllCar.image}
                    alt={currentViewAllCar.name}
                    draggable={false}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = currentViewAllCar.image;
                      e.target.className += " rounded-3xl shadow-xl object-cover";
                    }}
                    className="max-w-full max-h-[85%] object-contain select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-all duration-300"
                  />
                </div>

              </div>

            </div>
          )}

          {/* VIEW ALL SUB-MODE B: 3-COLUMN GRID VIEW */}
          {isGridView && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredAllCars.map((car) => (
                <div
                  key={car.id}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                  onClick={() => setSelectedCarForModal(car)}
                >
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#1F2937] border border-gray-200">
                      {car.year} • {car.kms}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#CCA57E] uppercase block mb-1">
                        {car.brand}
                      </span>
                      <h4 className="font-bold text-lg text-[#1F2937] group-hover:text-[#CCA57E] transition-colors leading-snug">
                        {car.name}
                      </h4>
                      <p className="text-xl font-extrabold text-[#1F2937] mt-2">
                        {car.priceINR}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-500">{car.fuel} • {car.regState}</span>
                      <span className="text-[#F70E1E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* --- CAR DETAIL MODAL (EMI CALCULATOR & VIP BOOKING) --- */}
      {/* ======================================================== */}
      {selectedCarForModal && (
        <CarDetailModal
          car={selectedCarForModal}
          onClose={() => setSelectedCarForModal(null)}
        />
      )}

    </section>
  );
}

