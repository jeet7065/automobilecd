import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  MessageSquare,
  ArrowRight,
  Volume2
} from 'lucide-react';
import { FUSION_CARS_INFO } from '../data/fusionCarsData';
import { soundManager } from '../utils/audio';

export default function CarDetailModal({ car, onClose }) {
  if (!car) return null;

  // EMI Calculator States
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(8.9);

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateMonthlyEMI = () => {
    const principal = car.priceRaw * (1 - downPaymentPercent / 100);
    const monthlyRate = (interestRate / 100) / 12;
    const months = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateMonthlyEMI();

  const handleBookTestDrive = (e) => {
    e.preventDefault();
    soundManager.playIgnition();
    setBookingSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Vehicle Detail Page Modal: Pure Clean White (#FFFFFF) */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-gray-200 shadow-2xl text-[#1F2937] p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md bg-[#CCA57E] text-white font-semibold text-[11px] uppercase">
            {car.status}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-100 text-[#4B5563] text-xs font-medium">
            {car.regState} • {car.owners} • {car.kms}
          </span>
          <button
            type="button"
            onClick={() => soundManager.playIgnition()}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#1F2937] transition-all cursor-pointer border border-gray-200"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#CCA57E]" />
            <span>Rev Engine</span>
          </button>
        </div>

        {/* Hero Title & Image */}
        <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] leading-tight mb-1">
          {car.name}
        </h2>
        <p className="text-xs font-semibold text-[#CCA57E] uppercase tracking-wider mb-5">
          {car.brand} • {car.bodyType}
        </p>

        <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-gray-200 shadow-sm">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm">
              <p className="text-[10px] text-gray-500 font-semibold uppercase">Fusion Cars Showroom Price</p>
              <p className="font-extrabold text-2xl text-[#1F2937]">{car.priceINR}</p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 text-emerald-600 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>150-Point Diagnostic Scan Passed</span>
            </div>
          </div>
        </div>

        {/* Key Engineering Telemetry Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-[#F4F5F7] border border-gray-200/90 text-center">
            <p className="text-[10px] font-semibold text-gray-500 uppercase">Max Power</p>
            <p className="font-bold text-sm text-[#1F2937] mt-1">{car.keySpecs.power}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F4F5F7] border border-gray-200/90 text-center">
            <p className="text-[10px] font-semibold text-gray-500 uppercase">Peak Torque</p>
            <p className="font-bold text-sm text-[#1F2937] mt-1">{car.keySpecs.torque}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F4F5F7] border border-gray-200/90 text-center">
            <p className="text-[10px] font-semibold text-gray-500 uppercase">0-100 km/h</p>
            <p className="font-bold text-sm text-[#CCA57E] mt-1">{car.keySpecs.acceleration}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F4F5F7] border border-gray-200/90 text-center">
            <p className="text-[10px] font-semibold text-gray-500 uppercase">Drivetrain</p>
            <p className="font-bold text-xs text-[#1F2937] mt-1 truncate">{car.transmission}</p>
          </div>
        </div>

        {/* Features & Options Checklist */}
        <div className="mb-8 p-5 rounded-xl bg-[#F4F5F7] border border-gray-200/90">
          <h4 className="font-bold text-xs text-[#1F2937] uppercase tracking-wider mb-3">
            Vehicle Specification Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#4B5563] font-normal leading-[1.6]">
            {car.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CCA57E] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* --- CAR LOAN & FINANCING CALCULATOR --- */}
        {/* ======================================================== */}
        <div className="p-6 rounded-2xl bg-[#F4F5F7] border border-gray-200/90 mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#CCA57E]" />
              <h4 className="font-bold text-sm text-[#1F2937]">
                Calculate Financing & EMI
              </h4>
            </div>
            <span className="text-xs text-gray-500 font-medium">HDFC, ICICI, Kotak, Axis Tie-ups</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#4B5563]">Down Payment:</span>
                <span className="text-[#1F2937] font-bold">{downPaymentPercent}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#CCA57E]"
              />
              <p className="text-[11px] text-gray-500 font-normal mt-1">
                ₹ {((car.priceRaw * downPaymentPercent) / 10000000).toFixed(2)} Cr
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#4B5563]">Loan Tenure:</span>
                <span className="text-[#1F2937] font-bold">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#CCA57E]"
              />
              <p className="text-[11px] text-gray-500 font-normal mt-1">{tenureYears * 12} Months</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-center flex flex-col justify-center shadow-sm">
              <p className="text-[10px] font-semibold text-gray-500 uppercase">Estimated Monthly EMI</p>
              <p className="font-extrabold text-xl text-[#1F2937] mt-0.5">
                ₹ {monthlyEMI.toLocaleString('en-IN')}/mo
              </p>
            </div>
          </div>
        </div>

        {/* Action Form: Book Test Drive / Make an Offer */}
        {bookingSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-base text-[#1F2937]">Test Drive Scheduled!</h4>
            <p className="text-sm text-[#4B5563] leading-[1.6]">
              Our New Delhi showroom director will call {clientPhone} to welcome you at Tilak Nagar with the keys prepared.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBookTestDrive} className="p-6 rounded-2xl bg-[#F4F5F7] border border-gray-200/90 space-y-4">
            <h4 className="font-bold text-sm text-[#1F2937]">
              Book Test Drive or Make an Offer
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm"
              />
              <input
                type="tel"
                required
                placeholder="Contact Mobile (+91)"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Energetic Red Primary Action: "Book Test Drive" */}
              <button
                type="submit"
                className="flex-1 h-12 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <span>Book Test Drive</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${FUSION_CARS_INFO.whatsappUrl}&text=Hi%20Fusion%20Cars%20Team%2C%20I%20am%20interested%20in%20${encodeURIComponent(car.name)}%20priced%20at%20${encodeURIComponent(car.priceINR)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 h-12 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 text-decoration-none shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
