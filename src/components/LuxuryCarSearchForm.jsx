import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  X, 
  ArrowRight,
  Volume2,
  CheckCircle2,
  SlidersHorizontal
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

export default function LuxuryCarSearchForm() {
  // State for form selections
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isSearching, setIsSearching] = useState(false);

  // Dropdown open states
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // Modal State for car view
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);

  // Refs for outside click closing
  const brandDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target)) {
        setIsBrandOpen(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setIsTypeOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setIsPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter cars based on selected criteria
  let filteredCars = FUSION_INVENTORY.filter((car) => {
    // Brand filter
    if (selectedBrand !== 'all' && car.brandId !== selectedBrand) {
      return false;
    }
    // Body Type filter
    if (selectedType !== 'all' && car.bodyTypeId !== selectedType) {
      return false;
    }
    // Price filter
    if (selectedPrice !== 'all') {
      const range = FUSION_PRICE_RANGES.find(r => r.id === selectedPrice);
      if (range) {
        if (car.priceRaw < range.min || car.priceRaw > range.max) {
          return false;
        }
      }
    }
    // Quick Tab filter
    if (activeTabFilter === 'suv') {
      if (car.bodyTypeId !== 'Luxury SUVs & Off-Roaders') return false;
    } else if (activeTabFilter === 'supercar') {
      if (car.bodyTypeId !== 'Supercars & Exotics' && car.bodyTypeId !== 'Coupes & Convertibles') return false;
    } else if (activeTabFilter === 'sedan') {
      if (car.bodyTypeId !== 'Flagship & Executive Sedans') return false;
    } else if (activeTabFilter === 'under-1cr') {
      if (car.priceRaw > 10000000) return false;
    }

    return true;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filteredCars = [...filteredCars].sort((a, b) => a.priceRaw - b.priceRaw);
  } else if (sortBy === 'price-high') {
    filteredCars = [...filteredCars].sort((a, b) => b.priceRaw - a.priceRaw);
  } else if (sortBy === 'year-latest') {
    filteredCars = [...filteredCars].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  // Trigger search action
  const handleSearchClick = () => {
    soundManager.playIgnition();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const resultsSection = document.getElementById('inventory-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  };

  const handleResetFilters = () => {
    soundManager.playClick();
    setSelectedBrand('all');
    setSelectedType('all');
    setSelectedPrice('all');
    setActiveTabFilter('all');
    setSortBy('default');
  };

  const getBrandDisplayName = () => {
    const brand = FUSION_BRANDS.find(b => b.id === selectedBrand);
    return brand ? brand.name : 'Select Car Brand';
  };

  const getTypeDisplayName = () => {
    const type = FUSION_BODY_TYPES.find(t => t.id === selectedType);
    return type ? type.name : 'Select Car Type';
  };

  const getPriceDisplayName = () => {
    const price = FUSION_PRICE_RANGES.find(p => p.id === selectedPrice);
    return price ? price.name : 'Select Car Price';
  };

  return (
    <section 
      id="collection" 
      className="relative z-30 w-full min-h-screen py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-white text-[#1F2937]"
    >
      <div className="relative max-w-7xl mx-auto">
        
        {/* --- SECTION HEADER: CLEAN TYPOGRAPHY HIERARCHY --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Text: Inter Medium, ALL CAPS, 0.15em spacing */}
          <span className="font-medium text-xs tracking-[0.15em] text-[#CCA57E] uppercase block mb-3">
            FEATURED INVENTORY • CERTIFIED PRE-OWNED
          </span>

          {/* Main Heading H2: Inter Extra Bold, Sentence case, tight line height (1.2) */}
          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] leading-[1.2] tracking-tight">
            Find your next vehicle
          </h2>

          {/* Thin brand accent border under section heading */}
          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3 rounded-full" />

          {/* Body Text: Inter Regular, 16px, relaxed line height (1.6) */}
          <p className="font-normal text-base text-[#4B5563] leading-[1.6] mt-4 max-w-2xl mx-auto">
            Explore 100+ multi-point verified luxury sedans, flagship off-roaders, and rare supercars available at our Tilak Nagar showroom in New Delhi.
          </p>
        </div>

        {/* ======================================================== */}
        {/* --- SEARCH & FILTER SECTION (LIGHT STEEL GREY #F4F5F7) --- */}
        {/* ======================================================== */}
        <div className="relative mb-14">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#F4F5F7] border border-gray-200/90 shadow-sm">
            
            {/* Top Bar Label */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200 text-xs font-medium text-[#4B5563]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-[#1F2937]">
                  SHOWROOM INVENTORY ({FUSION_INVENTORY.length} CARS IN STOCK)
                </span>
              </div>
              <span className="hidden sm:inline-block font-medium text-[#CCA57E]">
                150-POINT DIAGNOSTIC SCAN PASSED
              </span>
            </div>

            {/* 4-Column Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-end">
              
              {/* 1. CAR BRAND SELECTOR */}
              <div className="relative" ref={brandDropdownRef}>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2">
                  CAR BRAND
                </label>
                
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playHover();
                    setIsBrandOpen(!isBrandOpen);
                    setIsTypeOpen(false);
                    setIsPriceOpen(false);
                  }}
                  className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-left transition-all outline-none bg-white border border-gray-200 text-[#1F2937] hover:border-[#CCA57E] focus:ring-2 focus:ring-[#CCA57E]/30 cursor-pointer shadow-xs"
                >
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {getBrandDisplayName()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isBrandOpen ? 'rotate-180 text-[#CCA57E]' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isBrandOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl p-1.5 shadow-xl border border-gray-200 bg-white text-[#1F2937]">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {FUSION_BRANDS.map((brand) => (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedBrand(brand.id);
                            setIsBrandOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-left text-sm transition-all cursor-pointer ${
                            selectedBrand === brand.id
                              ? 'bg-[#1F2937] text-white font-semibold'
                              : 'hover:bg-gray-100 text-[#1F2937]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {brand.badge && <span className="text-base">{brand.badge}</span>}
                            <span>{brand.name}</span>
                          </div>
                          {brand.count && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedBrand === brand.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {brand.count}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. CAR TYPE SELECTOR */}
              <div className="relative" ref={typeDropdownRef}>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2">
                  CAR TYPE
                </label>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playHover();
                    setIsTypeOpen(!isTypeOpen);
                    setIsBrandOpen(false);
                    setIsPriceOpen(false);
                  }}
                  className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-left transition-all outline-none bg-white border border-gray-200 text-[#1F2937] hover:border-[#CCA57E] focus:ring-2 focus:ring-[#CCA57E]/30 cursor-pointer shadow-xs"
                >
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {getTypeDisplayName()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isTypeOpen ? 'rotate-180 text-[#CCA57E]' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isTypeOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl p-1.5 shadow-xl border border-gray-200 bg-white text-[#1F2937]">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {FUSION_BODY_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedType(type.id);
                            setIsTypeOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-left text-sm transition-all cursor-pointer ${
                            selectedType === type.id
                              ? 'bg-[#1F2937] text-white font-semibold'
                              : 'hover:bg-gray-100 text-[#1F2937]'
                          }`}
                        >
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. CAR PRICE SELECTOR */}
              <div className="relative" ref={priceDropdownRef}>
                <label className="block text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2">
                  CAR PRICE
                </label>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playHover();
                    setIsPriceOpen(!isPriceOpen);
                    setIsBrandOpen(false);
                    setIsTypeOpen(false);
                  }}
                  className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-left transition-all outline-none bg-white border border-gray-200 text-[#1F2937] hover:border-[#CCA57E] focus:ring-2 focus:ring-[#CCA57E]/30 cursor-pointer shadow-xs"
                >
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {getPriceDisplayName()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isPriceOpen ? 'rotate-180 text-[#CCA57E]' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isPriceOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl p-1.5 shadow-xl border border-gray-200 bg-white text-[#1F2937]">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {FUSION_PRICE_RANGES.map((range) => (
                        <button
                          key={range.id}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedPrice(range.id);
                            setIsPriceOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-left text-sm transition-all cursor-pointer ${
                            selectedPrice === range.id
                              ? 'bg-[#1F2937] text-white font-semibold'
                              : 'hover:bg-gray-100 text-[#1F2937]'
                          }`}
                        >
                          <div>
                            <p>{range.name}</p>
                            {range.label && (
                              <p className={`text-[10px] uppercase tracking-wider ${
                                selectedPrice === range.id ? 'text-gray-300' : 'text-gray-400'
                              }`}>
                                {range.label}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. LUXURY BRAND GOLD ACTION BUTTON (#CCA57E) */}
              <div>
                <button
                  type="button"
                  onClick={handleSearchClick}
                  disabled={isSearching}
                  className="w-full h-12 rounded-xl bg-[#CCA57E] hover:bg-[#ba926a] text-[#1F2937] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer border border-[#b89169]/30"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1F2937] border-t-transparent rounded-full animate-spin" />
                      <span>SEARCHING...</span>
                    </div>
                  ) : (
                    <>
                      <span>SEARCH NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick Filter Tabs beneath Form */}
            <div className="mt-5 pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 mr-1 uppercase tracking-wider">
                  Quick Filter:
                </span>
                
                {[
                  { id: 'all', label: 'All Inventory' },
                  { id: 'suv', label: 'Luxury SUVs & Defenders' },
                  { id: 'supercar', label: 'Supercars & Exotics' },
                  { id: 'sedan', label: 'Flagship Sedans' },
                  { id: 'under-1cr', label: 'Under ₹1 Crore' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTabFilter(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTabFilter === tab.id
                        ? 'bg-[#1F2937] text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {(selectedBrand !== 'all' || selectedType !== 'all' || selectedPrice !== 'all' || activeTabFilter !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#F70E1E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* --- VEHICLE LISTING CARDS (PURE WHITE #FFFFFF CANVAS) --- */}
        {/* ======================================================== */}
        <div id="inventory-results" className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl text-[#1F2937]">
                Showroom Inventory
              </h3>
              <p className="text-sm font-normal text-gray-500 mt-0.5">
                Showing {filteredCars.length} of {FUSION_INVENTORY.length} certified pre-owned luxury vehicles
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700 outline-none cursor-pointer"
              >
                <option value="default">Featured Showroom</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-latest">Model Year (Latest)</option>
              </select>
            </div>
          </div>

          {/* Cards Grid: Pure White Cards */}
          {filteredCars.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#F4F5F7] border border-gray-200 p-8">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Search className="w-6 h-6 text-[#CCA57E]" />
              </div>
              <h4 className="font-bold text-base text-[#1F2937] mb-1">
                No direct match in immediate Delhi stock
              </h4>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-5">
                Fusion Cars can source or commission this exact specification across our nationwide network within 7 to 10 days.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#1F2937] text-white font-semibold text-xs transition-all cursor-pointer hover:bg-black"
              >
                View Full Inventory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer overflow-hidden"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCarForModal(car);
                  }}
                >
                  {/* Vehicle Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Verified Status Badge (Gold Accent) */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#CCA57E] font-semibold text-[11px] tracking-wide shadow-sm border border-gray-200/80">
                        {car.status}
                      </span>
                    </div>

                    {/* Registration / Year */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 text-gray-800 font-semibold text-[11px] shadow-sm border border-gray-200/80">
                        {car.year} • {car.regState}
                      </span>
                    </div>

                    {/* Engine Sound Preview Button */}
                    <button
                      type="button"
                      title="Listen to Engine Rev"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playIgnition();
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-[#F70E1E] hover:text-white text-gray-700 flex items-center justify-center transition-all shadow-md cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Vehicle Card Body: Clean White, Charcoal Text */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Car Brand Subtitle */}
                      <p className="text-xs font-semibold text-[#CCA57E] uppercase tracking-wider mb-1">
                        {car.brand}
                      </p>

                      {/* Car Name (Sentence/Title case, Inter Bold) */}
                      <h4 className="font-bold text-lg text-[#1F2937] leading-tight mb-2 group-hover:text-[#CCA57E] transition-colors line-clamp-1">
                        {car.name}
                      </h4>

                      {/* Specs Row: Kms, Fuel, Owners (Inter Regular, relaxed) */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-4 pb-3 border-b border-gray-100">
                        <span>{car.kms}</span>
                        <span>•</span>
                        <span>{car.fuel}</span>
                        <span>•</span>
                        <span>{car.owners}</span>
                      </div>

                      {/* Quick Specs Grid */}
                      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#F4F5F7] mb-4 text-center">
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase">Power</p>
                          <p className="font-semibold text-xs text-[#1F2937] truncate mt-0.5">{car.keySpecs.power.split('@')[0]}</p>
                        </div>
                        <div className="border-x border-gray-200">
                          <p className="text-[10px] font-medium text-gray-500 uppercase">0-100</p>
                          <p className="font-semibold text-xs text-[#1F2937] mt-0.5">{car.keySpecs.acceleration}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase">Quality</p>
                          <p className="font-semibold text-xs text-emerald-600 mt-0.5">150-PT</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Primary Action */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 uppercase">
                          Price
                        </p>
                        <p className="font-extrabold text-xl text-[#1F2937] leading-none">
                          {car.priceINR}
                        </p>
                        <p className="text-[11px] font-normal text-gray-500 mt-0.5">
                          EMI: {car.emiStarts}
                        </p>
                      </div>

                      {/* Primary Conversion Button: Energetic Red */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                          setSelectedCarForModal(car);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Vehicle Detail Modal: Pure White Canvas */}
      {selectedCarForModal && (
        <CarDetailModal
          car={selectedCarForModal}
          onClose={() => setSelectedCarForModal(null)}
        />
      )}

    </section>
  );
}
