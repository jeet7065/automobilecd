import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  BadgePercent,
  X
} from 'lucide-react';
import { FUSION_CARS_INFO } from '../data/fusionCarsData';
import { soundManager } from '../utils/audio';

export default function SellCarCalculator() {
  const [selectedBrand, setSelectedBrand] = useState('Mercedes-Benz');
  const [selectedModel, setSelectedModel] = useState('E-Class / GLE');
  const [regYear, setRegYear] = useState('2022');
  const [kmsDriven, setKmsDriven] = useState(25000);
  const [ownerCount, setOwnerCount] = useState('1st Owner');
  const [fuelType, setFuelType] = useState('Diesel');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic Valuation Algorithm based on Indian Luxury Car Market
  const calculateEstimate = () => {
    let basePrice = 6500000; // Base ₹65 Lakh

    if (selectedBrand === 'Rolls-Royce' || selectedBrand === 'Bentley' || selectedBrand === 'Lamborghini') {
      basePrice = 28000000; // ₹2.80 Cr base
    } else if (selectedBrand === 'Porsche' || selectedBrand === 'Land Rover / Range Rover') {
      basePrice = 12000000; // ₹1.20 Cr base
    } else if (selectedBrand === 'Mercedes-Benz' || selectedBrand === 'BMW') {
      basePrice = 7500000; // ₹75 Lakh base
    } else {
      basePrice = 5500000; // ₹55 Lakh base
    }

    // Depreciation for year
    const yearDiff = 2026 - parseInt(regYear);
    const yearMultiplier = Math.max(0.4, 1 - (yearDiff * 0.08));

    // Depreciation for kms
    const kmMultiplier = Math.max(0.7, 1 - ((kmsDriven / 10000) * 0.03));

    // Ownership penalty
    const ownerMultiplier = ownerCount === '1st Owner' ? 1.0 : ownerCount === '2nd Owner' ? 0.92 : 0.85;

    const finalVal = Math.round(basePrice * yearMultiplier * kmMultiplier * ownerMultiplier);
    const lowRange = Math.round(finalVal * 0.95);
    const highRange = Math.round(finalVal * 1.05);

    return {
      mid: finalVal,
      low: lowRange,
      high: highRange,
      formattedRange: `₹ ${(lowRange / 100000).toFixed(2)} Lakh - ₹ ${(highRange / 100000).toFixed(2)} Lakh`
    };
  };

  const estimate = calculateEstimate();

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    soundManager.playIgnition();
    setIsSubmitted(true);
  };

  return (
    <section id="sell-car" className="relative z-30 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-black text-[#1F2937]">
      <div className="relative max-w-7xl mx-auto">

        {/* Section Header: Pure Inter Typography */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-medium text-xs tracking-[0.15em] text-gray-300 uppercase block mb-3">
            INSTANT EVALUATION • ZERO HASSLE SALE
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-gray-300 leading-[1.2] tracking-tight">
            Sell your luxury car with instant valuation
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3 rounded-full" />

          <p className="font-normal text-base text-gray-300 leading-[1.6] mt-4 max-w-2xl mx-auto">
            Get the true market valuation for your pre-owned exotic or luxury automobile with immediate doorstep inspection and guaranteed instant payment in Delhi NCR.
          </p>
        </div>

        {/* 3 Step Process: Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              step: '01',
              title: 'Submit Car Details',
              desc: 'Enter your vehicle brand, model, registration year, and mileage into our instant online calculator.',
              icon: Car
            },
            {
              step: '02',
              title: 'Instant Market Offer',
              desc: 'Receive a transparent, competitive cash quote backed by real-time Delhi NCR luxury market benchmarks.',
              icon: BadgePercent
            },
            {
              step: '03',
              title: 'Doorstep RTGS Transfer',
              desc: 'Our certified evaluation engineers inspect your vehicle at your location and transfer full payment instantly.',
              icon: ShieldCheck
            }
          ].map((item) => (
            <div
              key={item.step}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-extrabold text-2xl text-[#CCA57E]">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] border border-gray-200 flex items-center justify-center text-[#1F2937]">
                  <item.icon className="w-5 h-5 text-[#CCA57E]" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[#1F2937] mb-1.5">{item.title}</h3>
              <p className="font-normal text-sm text-[#4B5563] leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* --- CALCULATOR CONTAINER (CLEAN WHITE #FFFFFF) --- */}
        {/* ======================================================== */}
        <div className="relative rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-10 shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">

              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <Calculator className="w-4 h-4 text-[#CCA57E]" />
                <h3 className="font-bold text-base sm:text-lg text-[#1F2937]">
                  Real-time Valuation Calculator
                </h3>
              </div>

              {/* Grid 1: Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Select Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      soundManager.playClick();
                      setSelectedBrand(e.target.value);
                    }}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Land Rover / Range Rover">Land Rover / Range Rover</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Bentley">Bentley</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Ford">Ford Mustang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Model / Variant
                  </label>
                  <input
                    type="text"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder="e.g. Defender 110, G63 AMG, 911"
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Grid 2: Year & Ownership */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Registration Year
                  </label>
                  <select
                    value={regYear}
                    onChange={(e) => {
                      soundManager.playClick();
                      setRegYear(e.target.value);
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none transition-all cursor-pointer shadow-sm"
                  >
                    {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Ownership
                  </label>
                  <select
                    value={ownerCount}
                    onChange={(e) => {
                      soundManager.playClick();
                      setOwnerCount(e.target.value);
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="1st Owner">1st Owner</option>
                    <option value="2nd Owner">2nd Owner</option>
                    <option value="3rd Owner">3rd+ Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => {
                      soundManager.playClick();
                      setFuelType(e.target.value);
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Slider: Kilometers Driven */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-[#4B5563] uppercase tracking-wider">Kilometers Driven:</span>
                  <span className="text-[#1F2937] font-bold text-sm">
                    {kmsDriven.toLocaleString()} KM
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="2500"
                  value={kmsDriven}
                  onChange={(e) => setKmsDriven(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#CCA57E]"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-normal mt-1">
                  <span>5,000 KM</span>
                  <span>40,000 KM</span>
                  <span>80,000+ KM</span>
                </div>
              </div>

            </div>

            {/* Right Display: Estimated Valuation & Energetic Red Action Form */}
            <div className="lg:col-span-5 rounded-2xl bg-[#F4F5F7] border border-gray-200/90 p-6 flex flex-col justify-between">

              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Estimated Market Valuation
                </span>

                <div className="mt-2 py-4 px-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="font-extrabold text-2xl sm:text-3xl text-[#1F2937]">
                    {estimate.formattedRange}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    ● Instant Wire Payment Ready in Delhi NCR
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1F2937]">
                    Offer request received!
                  </h4>
                  <p className="text-xs text-[#4B5563] leading-[1.6]">
                    Our lead evaluator will call you at <span className="text-[#1F2937] font-semibold">{customerPhone}</span> within 15 minutes to schedule your doorstep inspection.
                  </p>
                  <a
                    href={FUSION_CARS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-xs"
                  >
                    <span>Connect on WhatsApp Directly</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitOffer} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-xs outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile / WhatsApp Number (+91)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-xs outline-none shadow-sm"
                    />
                  </div>

                  {/* Primary Action Button: Energetic Red */}
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Get Instant Cash Offer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-gray-500 font-normal">
                    100% Free • No Obligation • Instant Doorstep Pickup
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
