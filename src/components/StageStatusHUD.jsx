import React from 'react';
import { ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function StageStatusHUD({ currentPhase, scrollProgress, onSeekPhase }) {
  const phases = [
    { label: '01 ARRIVAL', target: 0.10 },
    { label: '02 MATRIX DRL', target: 0.32 },
    { label: '03 PROFILE', target: 0.52 },
    { label: '04 V10 BAY', target: 0.72 },
    { label: '05 LAUNCH', target: 0.92 },
  ];

  return (
    <footer className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-30 flex flex-col items-center gap-2 pointer-events-none px-4">
      {/* Dynamic Stage Status Pill */}
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F70E1E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F70E1E]"></span>
          </span>
          <span className="font-orbitron text-[11px] sm:text-xs font-bold tracking-widest text-slate-100 uppercase">
            {currentPhase}
          </span>
        </div>

        <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />

        {/* Interactive Milestone Jump Pills */}
        <div className="hidden sm:flex items-center gap-1.5">
          {phases.map((p, idx) => {
            const isActive = Math.abs(scrollProgress - p.target) < 0.1;
            return (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  onSeekPhase(p.target);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-rajdhani font-bold tracking-wider transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#F70E1E] text-white glow-crimson' 
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll Down Hint when near top */}
      {scrollProgress < 0.05 && (
        <div className="flex items-center gap-1 text-[10px] font-rajdhani uppercase tracking-[0.25em] text-slate-400 animate-bounce pt-1">
          <span>SCROLL TO EXPLORE HURACÁN</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#F70E1E]" />
        </div>
      )}
    </footer>
  );
}

