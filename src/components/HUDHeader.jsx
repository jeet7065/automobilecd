import React from 'react';
import { 
  Music, 
  RotateCcw, 
  FileText
} from 'lucide-react';
import { VEHICLE_DATA } from '../data/carData';
import { soundManager } from '../utils/audio';

export default function HUDHeader({
  onResetSequence,
  onOpenDossier,
  isAudioActive,
  setIsAudioActive,
}) {
  const handleToggleMusic = () => {
    const isNowPlaying = soundManager.toggleMusic();
    setIsAudioActive(isNowPlaying);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
      {/* Brand Identity / Shield Logo */}
      <div className="flex items-center gap-3.5 pointer-events-auto">
        <div 
          className="relative group cursor-pointer" 
          onClick={handleToggleMusic} 
          title={isAudioActive ? 'Pause Soundtrack' : 'Play Soundtrack'}
        >
          <div className="w-10 h-10 rounded-sm bg-[#121d24] border border-[#CCA57E]/50 flex items-center justify-center glow-gold transition-all duration-300 group-hover:border-[#F70E1E] group-hover:glow-crimson">
            <svg viewBox="0 0 100 100" className="w-6 h-6 fill-[#CCA57E] group-hover:fill-[#F70E1E] transition-colors">
              <polygon points="50,4 96,86 50,72 4,86" />
              <polygon points="50,16 86,80 50,68 14,80" fill="#121d24" />
              <path d="M50 24 L58 48 L72 50 L60 62 L64 76 L50 66 L36 76 L40 62 L28 50 L42 48 Z" fill="#CCA57E" />
            </svg>
          </div>
          {isAudioActive && (
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F70E1E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F70E1E]"></span>
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-orbitron text-xs sm:text-sm font-black tracking-[0.25em] text-slate-100 uppercase">
              {VEHICLE_DATA.brand}
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-rajdhani font-bold tracking-widest text-[#CCA57E] border border-[#CCA57E]/30 rounded">
              ITALIA
            </span>
          </div>
          <p className="font-orbitron text-base sm:text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F70E1E] via-white to-[#CCA57E]">
            {VEHICLE_DATA.model}
          </p>
        </div>
      </div>

      {/* Right Controls HUD Bar */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        {/* Soundtrack Audio Control with Equalizer Animation */}
        <button
          onClick={handleToggleMusic}
          title={isAudioActive ? 'Pause Soundtrack' : 'Play Soundtrack'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg glass-panel transition-all duration-200 text-xs font-rajdhani font-bold tracking-wider ${
            isAudioActive
              ? 'text-[#F70E1E] border-[#F70E1E]/50 glow-crimson'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {isAudioActive ? (
            <>
              {/* Equalizer bars */}
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 bg-[#F70E1E] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                <span className="w-0.5 bg-[#CCA57E] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
                <span className="w-0.5 bg-[#F70E1E] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
                <span className="w-0.5 bg-white rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-1/2" />
              </div>
              <span>MUSIC: ON</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-slate-400" />
              <span>MUSIC: OFF</span>
            </>
          )}
        </button>

        {/* Reset Sequence */}
        <button
          onClick={() => {
            soundManager.playClick();
            onResetSequence();
          }}
          title="Replay from start"
          className="p-2 rounded-lg glass-panel text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Open Technical Dossier Drawer */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenDossier();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#F70E1E] to-[#b30814] text-white text-xs font-orbitron font-bold tracking-wider hover:brightness-110 transition-all duration-200 glow-crimson"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">DOSSIER</span>
        </button>
      </div>
    </header>
  );
}

