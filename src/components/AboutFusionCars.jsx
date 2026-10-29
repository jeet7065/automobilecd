import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  Users, 
  Car, 
  Sparkles
} from 'lucide-react';
import { FUSION_CARS_INFO, FUSION_SERVICES } from '../data/fusionCarsData';

export default function AboutFusionCars() {
  return (
    <section id="about" className="relative z-30 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-white text-[#1F2937]">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-medium text-xs tracking-[0.15em] text-[#CCA57E] uppercase block mb-3">
            ABOUT FUSION CARS • ESTABLISHED 2008
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] leading-[1.2] tracking-tight">
            India's premier pre-owned exotic dealership
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3 rounded-full" />

          <p className="font-normal text-base text-[#4B5563] leading-[1.6] mt-4 max-w-2xl mx-auto">
            Founded by the Malik brothers (Manoj & Tarun Malik), Fusion Cars has redefined pre-owned luxury motoring in India through uncompromising transparency and hand-curated perfection.
          </p>
        </div>

        {/* 4 Key Pillars Numbers Grid: Light Steel Grey Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {[
            { label: 'Years of Heritage', value: FUSION_CARS_INFO.experienceYears, sub: 'ESTABLISHED 2008' },
            { label: 'Cars Delivered', value: FUSION_CARS_INFO.carsDelivered, sub: 'ACROSS PAN-INDIA' },
            { label: 'Point Diagnostics', value: FUSION_CARS_INFO.inspectionPoints, sub: 'RIGOROUS EVALUATION' },
            { label: 'Google Rating', value: `${FUSION_CARS_INFO.rating} ★`, sub: `${FUSION_CARS_INFO.totalReviews} REVIEWS` }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#F4F5F7] border border-gray-200/90 text-center hover:shadow-sm transition-all"
            >
              <p className="font-extrabold text-3xl sm:text-4xl text-[#1F2937] mb-1">
                {stat.value}
              </p>
              <p className="font-bold text-xs text-[#1F2937] uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="font-medium text-[10px] text-[#CCA57E] uppercase tracking-widest">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* The Fusion Guarantee: Two Column Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Authentic National Award Photo & Verified Heritage */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/90 shadow-lg bg-gray-900">
              <img 
                src="/images/fusion-award.jpg" 
                alt="Fusion Cars founders Manoj and Tarun Malik receiving National Gratitude Award" 
                className="w-full h-[420px] sm:h-[450px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              {/* Top Award Floating Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-lg">
                <Award className="w-3.5 h-3.5 text-[#CCA57E]" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                  National Gratitude Awards
                </span>
              </div>

              {/* Bottom Credibility & Award Information Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1F2937] border border-[#CCA57E]/40 flex items-center justify-center text-[#CCA57E] shrink-0 shadow-sm">
                    <Award className="w-6 h-6 text-[#CCA57E]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#CCA57E] tracking-wider uppercase block">
                      Award of Excellence
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1F2937] leading-tight">
                      India's Leading Luxury Car Dealership
                    </h4>
                    <p className="text-[11px] font-normal text-gray-500 mt-0.5">
                      Manoj & Tarun Malik • Founders, Fusion Cars
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments */}
          <div className="lg:col-span-7 space-y-4">
            
            <h3 className="font-bold text-2xl text-[#1F2937] leading-tight">
              Why discerning owners choose <span className="text-[#CCA57E]">Fusion Cars</span>
            </h3>

            <p className="font-normal text-sm sm:text-base text-[#4B5563] leading-[1.6]">
              At Fusion Cars Tilak Nagar, New Delhi, every vehicle must survive our exhaustive 150+ point diagnostic scan before ever reaching our showroom floor. We reject cars with frame damage, odometer tampering, or murky ownership records.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: '150+ Point Multi-System Diagnostics', text: 'Complete mechanical, electrical, drivetrain, and computer scans conducted by master technicians.' },
                { title: 'Authentic Dealership Service History', text: 'Verified electronic service records from authorized Mercedes, BMW, Audi, and JLR centers.' },
                { title: 'Instant Car Loan Approvals', text: 'Tie-ups with HDFC, ICICI, Kotak, and Axis with attractive interest rates and quick paperless sanction.' },
                { title: 'Pan-India Doorstep White-Glove Delivery', text: 'Insured enclosed container transport straight to your residence across Mumbai, Bengaluru, Hyderabad, and Delhi NCR.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F5F7] border border-gray-200/80">
                  <CheckCircle className="w-4 h-4 text-[#CCA57E] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-[#1F2937] uppercase">{item.title}</h5>
                    <p className="font-normal text-xs text-[#4B5563] mt-0.5 leading-[1.5]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Services Grid (What We Offer) */}
        <div id="services">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-bold text-2xl text-[#1F2937]">
              Comprehensive Services
            </h3>
            <div className="w-10 h-0.5 bg-[#CCA57E] mx-auto mt-2 rounded-full" />
            <p className="font-normal text-sm text-[#4B5563] mt-2">End-to-end luxury automotive solutions tailored to discerning collectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUSION_SERVICES.map((serv) => (
              <div 
                key={serv.id} 
                className="p-6 rounded-2xl bg-[#F4F5F7] border border-gray-200/90 hover:shadow-md transition-all duration-300"
              >
                <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[#CCA57E] font-semibold text-[11px] tracking-wider uppercase mb-3 inline-block shadow-sm">
                  {serv.badge}
                </span>
                <h4 className="font-bold text-base text-[#1F2937] mb-2">{serv.title}</h4>
                <p className="font-normal text-xs sm:text-sm text-[#4B5563] leading-[1.6]">{serv.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
