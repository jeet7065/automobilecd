import React, { useState } from 'react';
import { Music, Menu, X, Phone } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { FUSION_CARS_INFO } from '../data/fusionCarsData';

export default function Navbar({ isAudioActive, setIsAudioActive }) {
  const [activeLink, setActiveLink] = useState('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', targetId: null },
    { label: 'Collection', href: '#collection', targetId: 'collection' },
    { label: 'Brands', href: '#brands', targetId: 'brands' },
    { label: 'Engineering', href: '#engineering', targetId: 'engineering' },
    { label: 'Gallery', href: '#gallery', targetId: 'gallery' },
    { label: 'Sell Car', href: '#sell-car', targetId: 'sell-car' },
    { label: 'About Us', href: '#about', targetId: 'about' },
    { label: 'Showroom', href: '#showroom', targetId: 'showroom' },
    { label: 'Services', href: '#services', targetId: 'services' },
    { label: 'Reviews', href: '#testimonials', targetId: 'testimonials' },
    { label: 'Blogs', href: '#blogs', targetId: 'blogs' },
    { label: 'Contact', href: '#contact', targetId: 'contact' },
  ];

  const handleToggleMusic = () => {
    const isNowPlaying = soundManager.toggleMusic();
    setIsAudioActive(isNowPlaying);
  };

  const handleNavClick = (label, targetId) => {
    soundManager.playClick();
    setActiveLink(label.toUpperCase());
    setIsMobileMenuOpen(false);

    if (label.toUpperCase() === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between pointer-events-none transition-all duration-300">
      
      {/* Brand Logo: FUSION CARS */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('HOME', null);
          }}
          className="group flex items-center gap-3 text-decoration-none select-none bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-sm"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1F2937] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <span className="font-extrabold text-sm text-[#CCA57E]">
              FC
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#1F2937] uppercase leading-none">
              FUSION <span className="text-[#CCA57E]">CARS</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] text-gray-500 uppercase mt-0.5">
              NEW DELHI
            </span>
          </div>
        </a>
      </div>

      {/* Center Navlinks */}
      <div className="hidden xl:flex items-center gap-1 pointer-events-auto bg-white/90 px-3 py-1.5 rounded-full border border-gray-200/80 shadow-sm backdrop-blur-md">
        {navLinks.map((link) => {
          const isActive = activeLink === link.label.toUpperCase();
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.label, link.targetId);
              }}
              className={`text-[13px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200 relative select-none ${
                isActive
                  ? 'text-[#1F2937] bg-gray-100 font-bold'
                  : 'text-gray-600 hover:text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#CCA57E] rounded-full" />
              )}
            </a>
          );
        })}
      </div>

      {/* Right Controls: Hotline & Soundtrack & Menu */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        
        {/* Direct Delhi Hotline */}
        <a
          href={`tel:${FUSION_CARS_INFO.phonePrimary.replace(/\s+/g, '')}`}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white border border-gray-200/80 text-[#1F2937] font-semibold text-xs transition-all text-decoration-none shadow-sm backdrop-blur-md"
        >
          <Phone className="w-3.5 h-3.5 text-[#CCA57E]" />
          <span>{FUSION_CARS_INFO.phonePrimary}</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-white/90 text-gray-800 hover:text-black border border-gray-200/80 shadow-sm backdrop-blur-md cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col gap-1.5 pointer-events-auto xl:hidden max-h-[75vh] overflow-y-auto animate-in fade-in duration-200">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label.toUpperCase();
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.label, link.targetId);
                }}
                className={`text-sm font-semibold py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#1F2937] bg-gray-100 font-bold'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
