import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  MessageSquare,
  Navigation
} from 'lucide-react';
import { FUSION_CARS_INFO } from '../data/fusionCarsData';
import { soundManager } from '../utils/audio';

export default function ContactAndLocation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buy Luxury Car',
    preferredCar: 'Defender / G63 / Huracan',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playIgnition();
    setIsSent(true);
  };

  return (
    <section id="contact" className="relative z-30 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F4F5F7] text-[#1F2937]">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-medium text-xs tracking-[0.15em] text-[#CCA57E] uppercase block mb-3">
            VISIT OUR NEW DELHI SHOWROOM
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] leading-[1.2] tracking-tight">
            Connect with Fusion Cars
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3 rounded-full" />

          <p className="font-normal text-base text-[#4B5563] leading-[1.6] mt-4 max-w-2xl mx-auto">
            Book a private showroom walk-through, request an off-market supercar commission, or schedule a doorstep valuation anywhere in Delhi NCR.
          </p>
        </div>

        {/* 2 Column Content: Clean White Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-6">
              
              <h3 className="font-bold text-lg text-[#1F2937]">
                Flagship Showroom
              </h3>

              <div className="space-y-4 text-xs font-normal text-[#4B5563]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F5F7] border border-gray-200 flex items-center justify-center text-[#CCA57E] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1F2937] uppercase">Showroom Address</h5>
                    <p className="text-[#4B5563] mt-0.5 leading-relaxed">{FUSION_CARS_INFO.address}</p>
                    <p className="text-[#CCA57E] font-medium mt-0.5">{FUSION_CARS_INFO.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F5F7] border border-gray-200 flex items-center justify-center text-[#CCA57E] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1F2937] uppercase">Direct Phone Hotlines</h5>
                    <p className="text-[#1F2937] font-semibold mt-0.5">{FUSION_CARS_INFO.phonePrimary}</p>
                    <p className="text-[#1F2937] font-semibold">{FUSION_CARS_INFO.phoneSecondary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F5F7] border border-gray-200 flex items-center justify-center text-[#CCA57E] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1F2937] uppercase">Hours of Operation</h5>
                    <p className="text-[#4B5563] mt-0.5">{FUSION_CARS_INFO.workingHours}</p>
                    <p className="text-emerald-600 font-medium text-[11px]">Open All 7 Days Including Sundays</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F5F7] border border-gray-200 flex items-center justify-center text-[#CCA57E] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1F2937] uppercase">Executive Email</h5>
                    <p className="text-[#1F2937] font-medium mt-0.5">{FUSION_CARS_INFO.email}</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${FUSION_CARS_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#1F2937] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 text-decoration-none transition-all shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#CCA57E]" />
                  <span>Call Directly</span>
                </a>

                <a
                  href={FUSION_CARS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 text-decoration-none transition-all shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: VIP Appointment / Inquiry Form */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-white border border-gray-200/90 shadow-sm">
            
            <div className="mb-6">
              <h3 className="font-bold text-xl text-[#1F2937] mb-1">
                Schedule VIP Test Drive or Inquiry
              </h3>
              <p className="font-normal text-sm text-[#4B5563]">
                Our executive sales director will personally confirm your private consultation.
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-xl text-[#1F2937]">
                  Inquiry received with priority
                </h4>
                <p className="font-normal text-sm text-[#4B5563] max-w-md mx-auto leading-[1.6]">
                  Thank you, <span className="text-[#1F2937] font-semibold">{formData.name}</span>. Our team has received your request regarding <span className="text-[#1F2937] font-semibold">{formData.preferredCar}</span>.
                </p>
                <p className="text-xs text-gray-500 font-normal">
                  We will contact you via WhatsApp / Phone at {formData.phone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                      Interested In
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm cursor-pointer"
                    >
                      <option value="Buy Luxury Car">Buy Luxury Car</option>
                      <option value="Sell My Luxury Car">Sell My Luxury Car</option>
                      <option value="Book VIP Showroom Visit">Book VIP Showroom Visit</option>
                      <option value="Custom Supercar Commission">Custom Supercar Commission</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                      Car Model of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Defender, G-Wagon, 911"
                      value={formData.preferredCar}
                      onChange={(e) => setFormData({ ...formData, preferredCar: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">
                    Personalized Message or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your preferred timing, test drive request, or custom financing requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white border border-gray-200 focus:border-[#CCA57E] text-[#1F2937] text-sm outline-none resize-none shadow-sm"
                  />
                </div>

                {/* Primary Action Button: Energetic Red */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#F70E1E] hover:bg-[#DC2626] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit VIP Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
