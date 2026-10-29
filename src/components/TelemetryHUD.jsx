import React, { useState, useEffect } from 'react';
import { ChevronRight, Activity } from 'lucide-react';
import { VEHICLE_DATA } from '../data/carData';

export default function TelemetryHUD({ scrollProgress, onOpenDossier }) {
  const [speed, setSpeed] = useState(0);
  const [lateralG, setLateralG] = useState(0.0);

  // Compute live telemetry according to scroll dynamics
  useEffect(() => {
    let targetSpeed = 0;
    let targetG = 0.05;

    if (scrollProgress <= 0.22) {
      // Entry
      const t = scrollProgress / 0.22;
      const invT = 1 - t;
      targetSpeed = Math.round(180 * invT + 30);
      targetG = (invT * 1.25).toFixed(2);
    } else if (scrollProgress <= 0.8) {
      // Stage inspection
      targetSpeed = 0;
      targetG = 0.02;
    } else {
      // Launch exit
      const t = (scrollProgress - 0.8) / 0.2;
      const launch = t * t;
      targetSpeed = Math.round(launch * 320);
      targetG = (launch * 1.55).toFixed(2);
    }

    setSpeed(targetSpeed);
    setLateralG(targetG);
  }, [scrollProgress]);

  return (
    <aside className="fixed left-4 sm:left-6 top-24 z-30 flex flex-col gap-3 pointer-events-none w-64 sm:w-72">
      {/* Main Glass Telemetry Card */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl pointer-events-auto scanline-effect backdrop-blur-md">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#F70E1E] animate-pulse" />
            <span className="text-[10px] font-orbitron tracking-widest text-slate-300 uppercase">
              LIVE TELEMETRY HUD
            </span>
          </div>
          <span className="text-[9px] font-rajdhani font-bold px-1.5 py-0.5 rounded bg-[#F70E1E]/20 text-[#F70E1E] border border-[#F70E1E]/40">
            RWD ACTIVE
          </span>
        </div>

        {/* Speed & Velocity Display */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-orbitron text-2xl sm:text-3xl font-black text-white tracking-tight">
                {speed}
              </span>
              <span className="font-rajdhani text-xs font-bold text-slate-400">KM/H</span>
            </div>
            <span className="text-[9px] font-rajdhani uppercase tracking-wider text-slate-400">
              Velocity Vector
            </span>
          </div>

          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-orbitron text-lg sm:text-xl font-black text-[#CCA57E] tracking-tight">
                580
              </span>
              <span className="font-rajdhani text-[10px] font-bold text-slate-400">CV</span>
            </div>
            <span className="text-[9px] font-rajdhani uppercase tracking-wider text-slate-400">
              V10 Naturally Aspirated
            </span>
          </div>
        </div>

        {/* 4 Core Hypercar Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-left mb-3">
          <div className="p-2 rounded bg-white/[0.04] border border-white/5">
            <div className="text-[9px] font-rajdhani text-slate-400 uppercase tracking-wider">0-100 KM/H</div>
            <div className="font-orbitron text-sm font-bold text-white text-glow-crimson">
              {VEHICLE_DATA.telemetry.acceleration}
            </div>
          </div>
          <div className="p-2 rounded bg-white/[0.04] border border-white/5">
            <div className="text-[9px] font-rajdhani text-slate-400 uppercase tracking-wider">TOP SPEED</div>
            <div className="font-orbitron text-sm font-bold text-white">
              {VEHICLE_DATA.telemetry.topSpeed}
            </div>
          </div>
          <div className="p-2 rounded bg-white/[0.04] border border-white/5">
            <div className="text-[9px] font-rajdhani text-slate-400 uppercase tracking-wider">MAX POWER</div>
            <div className="font-orbitron text-sm font-bold text-[#CCA57E]">
              {VEHICLE_DATA.telemetry.maxPower}
            </div>
          </div>
          <div className="p-2 rounded bg-white/[0.04] border border-white/5">
            <div className="text-[9px] font-rajdhani text-slate-400 uppercase tracking-wider">ALLOCATION</div>
            <div className="font-orbitron text-xs font-bold text-white">
              {VEHICLE_DATA.basePriceINR}
            </div>
          </div>
        </div>

        {/* G-Force & ANIMA Mode */}
        <div className="flex items-center justify-between text-[10px] font-rajdhani text-slate-400 pt-1 border-t border-white/10">
          <div className="flex items-center gap-1">
            <span>LATERAL G:</span>
            <span className="font-orbitron font-bold text-[#F70E1E]">{lateralG} G</span>
          </div>
          <div className="flex items-center gap-1">
            <span>ANIMA:</span>
            <span className="font-orbitron font-bold text-[#CCA57E]">CORSA</span>
          </div>
        </div>
      </div>

      {/* Trigger Full Technical Dossier */}
      <button
        onClick={onOpenDossier}
        className="pointer-events-auto w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-rajdhani font-semibold tracking-wider flex items-center justify-between group shadow-lg"
      >
        <span>View Full Technical Dossier</span>
        <ChevronRight className="w-4 h-4 text-[#CCA57E] group-hover:translate-x-1 transition-transform" />
      </button>
    </aside>
  );
}

