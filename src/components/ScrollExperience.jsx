import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { VEHICLE_DATA } from '../data/carData';

export default function ScrollExperience({ scrollProgress, onOpenDossier, onSeekPhase }) {
  return (
    <div className="relative w-full pointer-events-none select-none">
      {/* 500vh Virtual Scroll Track for Butter-Smooth Progression */}
      <div className="h-[500vh] w-full">

        {/* --- MILESTONE 1: HERO ENTRY (0% - 20%) --- */}
        <section 
          className="fixed inset-0 flex items-center justify-start p-6 sm:p-16 transition-opacity duration-500"
          style={{
            opacity: scrollProgress < 0.20 ? 1 - (scrollProgress / 0.20) * 1.2 : 0,
            transform: `translateY(${scrollProgress * -100}px)`,
            pointerEvents: scrollProgress < 0.18 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-xl text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-[#CCA57E]/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F70E1E] animate-ping" />
              <span className="font-rajdhani text-xs font-bold tracking-widest text-[#CCA57E] uppercase">
                SUPER SPORTS CAR MASTERPIECE
              </span>
            </div>

            <h1 className="font-orbitron text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
              PURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70E1E] via-white to-[#CCA57E]">
                REAR-WHEEL
              </span><br />
              DRIVE
            </h1>

            <p className="font-inter text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
              Designed for drivers who seek purest emotion and unadulterated mechanical feedback. 580 horsepower channeled exclusively through the rear wheels.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDossier}
                className="px-5 py-2.5 rounded-xl bg-[#F70E1E] hover:bg-[#d60a18] text-white font-orbitron text-xs font-bold tracking-wider transition-all glow-crimson flex items-center gap-2"
              >
                <span>COMMISSION SPEC</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSeekPhase(0.32)}
                className="px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white font-rajdhani text-xs font-semibold tracking-wider transition-all"
              >
                DISCOVER AERO
              </button>
            </div>
          </div>
        </section>

        {/* --- MILESTONE 2: SHOT 1 - MATRIX DRL & FRONT AERO (24% - 42%) --- */}
        <section 
          className="fixed inset-0 flex items-center justify-end p-6 sm:p-16 transition-opacity duration-500"
          style={{
            opacity: scrollProgress >= 0.22 && scrollProgress < 0.42
              ? Math.sin(((scrollProgress - 0.22) / 0.20) * Math.PI)
              : 0,
            pointerEvents: scrollProgress >= 0.24 && scrollProgress < 0.40 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-md text-right space-y-3 glass-panel p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
            <span className="font-orbitron text-[10px] tracking-widest text-[#F70E1E] uppercase font-bold">
              CHAPTER 01 • SCULPTED INTAKES
            </span>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-white">
              Y-MATRIX LED DRL
            </h2>
            <p className="font-inter text-xs text-slate-300 leading-relaxed">
              Front wedge splitters and aggressive cooling vents direct high-pressure airflow around the wheel wells to generate instantaneous front-axle bite.
            </p>
            <div className="flex justify-end gap-3 text-xs font-rajdhani font-bold text-[#CCA57E]">
              <span>4,200 LUMENS MATRIX</span>
              <span>•</span>
              <span>CARBON SPLITTER</span>
            </div>
          </div>
        </section>

        {/* --- MILESTONE 3: SHOT 2 - PROFILE WEDGE & 19" KARI WHEELS (44% - 62%) --- */}
        <section 
          className="fixed inset-0 flex items-center justify-start p-6 sm:p-16 transition-opacity duration-500"
          style={{
            opacity: scrollProgress >= 0.44 && scrollProgress < 0.62
              ? Math.sin(((scrollProgress - 0.44) / 0.18) * Math.PI)
              : 0,
            pointerEvents: scrollProgress >= 0.46 && scrollProgress < 0.60 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-md text-left space-y-3 glass-panel p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
            <span className="font-orbitron text-[10px] tracking-widest text-[#CCA57E] uppercase font-bold">
              CHAPTER 02 • THE PURIST PROPORTION
            </span>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-white">
              40:60 WEIGHT BALANCE
            </h2>
            <p className="font-inter text-xs text-slate-300 leading-relaxed">
              Low-slung 1,165 mm silhouette with 19-inch Kari forged multi-spoke gloss black wheels and Champagne Gold brake calipers engineered for late braking into corners.
            </p>
            <div className="flex items-center gap-3 text-xs font-rajdhani font-bold text-[#F70E1E]">
              <span>100-0 KM/H IN 31.9M</span>
              <span>•</span>
              <span>KARI FORGED</span>
            </div>
          </div>
        </section>

        {/* --- MILESTONE 4: SHOT 3 - MID-ENGINE V10 & EXHAUST (64% - 80%) --- */}
        <section 
          className="fixed inset-0 flex items-center justify-end p-6 sm:p-16 transition-opacity duration-500"
          style={{
            opacity: scrollProgress >= 0.64 && scrollProgress < 0.80
              ? Math.sin(((scrollProgress - 0.64) / 0.16) * Math.PI)
              : 0,
            pointerEvents: scrollProgress >= 0.66 && scrollProgress < 0.78 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-md text-right space-y-3 glass-panel p-6 rounded-2xl border border-[#CCA57E]/20 backdrop-blur-xl glow-gold">
            <span className="font-orbitron text-[10px] tracking-widest text-[#CCA57E] uppercase font-bold">
              CHAPTER 03 • NATURALLY ASPIRATED FURY
            </span>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-white">
              5.2L V10 POWERPLANT
            </h2>
            <p className="font-inter text-xs text-slate-300 leading-relaxed">
              Transparent engine glass reveals dual-bank cylinder covers finished in liquid Champagne Gold. Quad chrome exhausts unleash an 8,500 RPM visceral Italian roar.
            </p>
            <div className="flex justify-end gap-3 text-xs font-rajdhani font-bold text-white">
              <span className="text-[#CCA57E]">580 CV @ 8,000 RPM</span>
              <span>•</span>
              <span className="text-[#F70E1E]">540 NM TORQUE</span>
            </div>
          </div>
        </section>

        {/* --- MILESTONE 5: PHASE 3 - LAUNCH (82% - 100%) --- */}
        <section 
          className="fixed inset-0 flex items-center justify-center p-6 sm:p-16 transition-opacity duration-500"
          style={{
            opacity: scrollProgress >= 0.82 ? Math.min(1, (scrollProgress - 0.82) / 0.14) : 0,
            pointerEvents: scrollProgress >= 0.85 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-lg text-center space-y-5 glass-panel-crimson p-8 rounded-3xl border border-[#F70E1E]/50 shadow-2xl backdrop-blur-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-[#F70E1E]" />
              <span className="font-orbitron text-[10px] tracking-widest text-slate-300 uppercase">
                THRUST ACCELERATION LAUNCH
              </span>
            </div>

            <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-tight">
              320 KM/H <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70E1E] via-white to-[#CCA57E]">
                HYPER VELOCITY
              </span>
            </h2>

            <p className="font-inter text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              You have experienced the aerodynamic choreography of the Huracán LP 580-2. Commission your bespoke build now.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenDossier}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#F70E1E] to-[#b30814] text-white font-orbitron text-xs font-bold tracking-widest hover:brightness-110 transition-all glow-crimson"
              >
                REQUEST ALLOCATION
              </button>

              <button
                onClick={() => onSeekPhase(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl glass-panel text-slate-300 hover:text-white font-rajdhani text-xs font-bold tracking-wider transition-all"
              >
                REPLAY SEQUENCE
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

