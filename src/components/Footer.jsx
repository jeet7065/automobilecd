import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, ArrowUp, Clock } from 'lucide-react';
import { FUSION_CARS_INFO } from '../data/fusionCarsData';
import { soundManager } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="relative z-30 bg-white border-t border-gray-200/90 text-[#1F2937] pt-16 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center shadow-sm">
                <span className="font-extrabold text-sm text-[#CCA57E]">
                  FC
                </span>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#1F2937] uppercase">
                FUSION <span className="text-[#CCA57E]">CARS</span>
              </span>
            </div>
            <p className="font-normal text-sm text-[#4B5563] leading-[1.6]">
              India’s premier pre-owned luxury & exotic car dealership. Founded in 2008 by Manoj Malik & Tarun Malik in New Delhi. Over 5,000+ certified automobiles delivered nationwide.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-[#CCA57E] shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Global Iconic Awards Winner</span>
            </div>
          </div>

          {/* Flagship Showroom */}
          <div>
            <h4 className="font-bold text-xs tracking-wider text-[#1F2937] uppercase mb-4">
              New Delhi Showroom
            </h4>
            <div className="space-y-3 text-sm font-normal text-[#4B5563]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#CCA57E] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{FUSION_CARS_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-[#CCA57E]" />
                <span>{FUSION_CARS_INFO.workingHours} (Open 7 Days)</span>
              </p>
              <p className="text-xs text-emerald-600 font-medium">
                5 Mins from Tilak Nagar Metro Station
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-bold text-xs tracking-wider text-[#1F2937] uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-normal text-[#4B5563]">
              <li>
                <a href="#collection" className="hover:text-[#CCA57E] transition-colors">Showroom Collection</a>
              </li>
              <li>
                <a href="#engineering" className="hover:text-[#CCA57E] transition-colors">150-Point Deconstruction</a>
              </li>
              <li>
                <a href="#sell-car" className="hover:text-[#CCA57E] transition-colors">Sell Your Car (Instant Valuation)</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#CCA57E] transition-colors">About Manoj & Tarun Malik</a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-[#CCA57E] transition-colors">Virtual Showroom Tour</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#CCA57E] transition-colors">Client Reviews (4.8★)</a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-[#CCA57E] transition-colors">Automotive News & Buyer Guides</a>
              </li>
            </ul>
          </div>

          {/* Direct Hotlines & VIP Connect */}
          <div>
            <h4 className="font-bold text-xs tracking-wider text-[#1F2937] uppercase mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-[#4B5563]">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#CCA57E]" />
                <span className="font-semibold text-[#1F2937]">{FUSION_CARS_INFO.phonePrimary}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#CCA57E]" />
                <span className="font-semibold text-[#1F2937]">{FUSION_CARS_INFO.phoneSecondary}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#CCA57E]" />
                <span>{FUSION_CARS_INFO.email}</span>
              </p>
              <div className="pt-2">
                <a
                  href={FUSION_CARS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all shadow-sm"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-gray-500">
          <p>© {new Date().getFullYear()} Fusion Cars (fusioncars.in). All rights reserved. Tilak Nagar, New Delhi.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#1F2937] hover:text-[#CCA57E] transition-colors font-semibold cursor-pointer"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#CCA57E]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
