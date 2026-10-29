import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Cpu, 
  Volume2, 
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { soundManager } from '../utils/audio';

const TOTAL_FRAMES = 300;
const INITIAL_PRELOAD = 25;

// Format frame URL: /car-exploded-frames/ezgif-frame-001.jpg
const getFrameUrl = (frameIndex) => {
  const padded = String(frameIndex).padStart(3, '0');
  return `/car-exploded-frames/ezgif-frame-${padded}.jpg`;
};

const PHASES = [
  {
    id: 1,
    title: 'Aerodynamic Composite Shell',
    shortLabel: 'Aerodynamics',
    subtitle: 'PHASE 01 • ACTIVE AERO DECONSTRUCTION',
    range: [0.0, 0.22],
    progressTarget: 0.10,
    specs: [
      { label: 'Downforce', value: '350 kg @ 250 km/h' },
      { label: 'Drag Coeff', value: '0.33 Cd' },
      { label: 'Body Skin', value: 'Aluminum & Carbon' }
    ],
    description: 'Ultra-lightweight aerodynamic panels lift away to reveal active cooling ducts, front variable splitters, and high-downforce vortex generators.'
  },
  {
    id: 2,
    title: 'Twin-Turbocharged Boxer-6 Engine',
    shortLabel: 'Flat-6 Powertrain',
    subtitle: 'PHASE 02 • FLAT-6 POWERTRAIN ISOLATION',
    range: [0.22, 0.48],
    progressTarget: 0.35,
    specs: [
      { label: 'Displacement', value: '3.8L Twin-Turbo Boxer-6' },
      { label: 'Max Output', value: '650 HP @ 6,750 RPM' },
      { label: 'Peak Torque', value: '800 Nm @ 2,500 RPM' }
    ],
    description: 'Rear-mounted horizontally opposed 6-cylinder engine with variable turbine geometry (VTG) and dual charge-air coolers for instant throttle response.'
  },
  {
    id: 3,
    title: 'High-Rigidity Hybrid Spaceframe',
    shortLabel: 'Spaceframe Cell',
    subtitle: 'PHASE 03 • STRUCTURAL SAFETY CELL',
    range: [0.48, 0.72],
    progressTarget: 0.60,
    specs: [
      { label: 'Rigidity', value: '40,000 Nm/degree' },
      { label: 'Chassis Core', value: 'Aluminum-Steel Hybrid' },
      { label: 'Certification', value: '150-Pt Laser Pass' }
    ],
    description: '150-Point computerized laser frame alignment verified. Zero structural deflection or micro-fractures, fully certified.'
  },
  {
    id: 4,
    title: 'PASM Active Suspension & Ceramic Brakes',
    shortLabel: 'Active Chassis & PCCB',
    subtitle: 'PHASE 04 • CHASSIS & BRAKING EXPANSION',
    range: [0.72, 0.90],
    progressTarget: 0.80,
    specs: [
      { label: 'Front Discs', value: '410mm Carbon Ceramic' },
      { label: 'Calipers', value: '10-Piston Monobloc' },
      { label: 'Dampers', value: 'PASM Electronic Active' }
    ],
    description: 'Independent double-wishbone architecture paired with active anti-roll stabilization (PDCC) and fade-free ceramic deceleration.'
  },
  {
    id: 5,
    title: 'Certified Reassembly & Harmony',
    shortLabel: 'Certified Perfection',
    subtitle: 'PHASE 05 • SHOWROOM-READY MASTERPIECE',
    range: [0.90, 1.0],
    progressTarget: 0.98,
    specs: [
      { label: 'Diagnostic', value: '150 / 150 Checkpoints' },
      { label: 'Odometer', value: 'Certified Genuine' },
      { label: 'Warranty', value: '1 Year Comprehensive' }
    ],
    description: 'Every subsystem perfectly reassembled, dyno-tested, and verified for immediate white-glove delivery from our Delhi showroom.'
  }
];

export default function CarExplodedSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  
  // Mobile Viewport & Phase State (< 768px)
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePhaseId, setMobilePhaseId] = useState(1);
  const [mobileFrameNum, setMobileFrameNum] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pinning state: 'before' | 'pinned' | 'after'
  const [pinState, setPinState] = useState('before');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 1. Preload frames
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current.set(i, img);
        count++;
        setLoadedCount(count);

        if (count >= INITIAL_PRELOAD && !isReady) {
          setIsReady(true);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Draw active frame on canvas with increased scale
  const renderFrame = (frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current.get(frameNum);
    
    // Fallback: search closest loaded frame if this one is buffering
    if (!img || !img.complete) {
      for (let offset = 1; offset <= 25; offset++) {
        const fallbackBefore = imagesRef.current.get(Math.max(1, frameNum - offset));
        if (fallbackBefore && fallbackBefore.complete) {
          img = fallbackBefore;
          break;
        }
        const fallbackAfter = imagesRef.current.get(Math.min(TOTAL_FRAMES, frameNum + offset));
        if (fallbackAfter && fallbackAfter.complete) {
          img = fallbackAfter;
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Use contain-scaling with boost for larger bold appearance
    const baseScale = Math.min(cw / iw, ch / ih);
    const scale = baseScale * 1.20; // Increased size of car explosion
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    // Pure white canvas background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // Render Mobile Exploded Frame onto Mobile 16:9 Canvas
  const renderMobileFrame = useCallback((frameNum) => {
    const canvas = mobileCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current.get(frameNum);
    if (!img || !img.complete) {
      for (let offset = 1; offset <= 25; offset++) {
        const fallbackBefore = imagesRef.current.get(Math.max(1, frameNum - offset));
        if (fallbackBefore && fallbackBefore.complete) {
          img = fallbackBefore;
          break;
        }
        const fallbackAfter = imagesRef.current.get(Math.min(TOTAL_FRAMES, frameNum + offset));
        if (fallbackAfter && fallbackAfter.complete) {
          img = fallbackAfter;
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const baseScale = Math.min(cw / iw, ch / ih);
    const scale = baseScale * 1.15;
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Resize Mobile Canvas
  useEffect(() => {
    if (!isMobile) return;
    const canvas = mobileCanvasRef.current;
    if (!canvas) return;

    const resizeMobileCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || (w * 9) / 16;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      renderMobileFrame(mobileFrameNum);
    };

    window.addEventListener('resize', resizeMobileCanvas);
    resizeMobileCanvas();
    return () => window.removeEventListener('resize', resizeMobileCanvas);
  }, [isMobile, isReady, mobileFrameNum, renderMobileFrame]);

  // 3. Handle Desktop Canvas Resize with devicePixelRatio
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = (rect.width || window.innerWidth) * dpr;
      canvas.height = (rect.height || window.innerHeight) * dpr;

      renderFrame(currentFrameIndex);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, isMobile, currentFrameIndex]);

  // 4. Bulletproof Scroll Pinning (Desktop >= 768px only)
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScroll = container.offsetHeight - window.innerHeight;

            if (rect.top > 0) {
              // Above section: before scroll
              setPinState('before');
              setScrollProgress(0);
              setCurrentFrameIndex(1);
              renderFrame(1);
            } else if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
              // Inside section: FIXED / PINNED!
              setPinState('pinned');
              const current = -rect.top;
              const p = Math.max(0, Math.min(1, current / totalScroll));
              setScrollProgress(p);

              const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(p * (TOTAL_FRAMES - 1)) + 1));
              setCurrentFrameIndex(targetFrame);
              renderFrame(targetFrame);
            } else {
              // Past section: after scroll completed
              setPinState('after');
              setScrollProgress(1);
              setCurrentFrameIndex(TOTAL_FRAMES);
              renderFrame(TOTAL_FRAMES);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  // Active Phase identification
  const activePhase = PHASES.find(
    (phase) => scrollProgress >= phase.range[0] && scrollProgress <= phase.range[1]
  ) || PHASES[0];

  // Jump to specific phase
  const handleJumpToPhase = (targetProgress) => {
    soundManager.playClick();
    const container = containerRef.current;
    if (!container) return;
    
    const containerTop = container.offsetTop;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (totalScroll * targetProgress);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handlePlayEngineRev = () => {
    soundManager.playAudiR8Rev();
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3500);
  };

  return (
    <section 
      id="engineering"
      ref={containerRef}
      className={`relative z-30 w-full ${isMobile ? 'h-auto py-12 sm:py-16' : 'h-[400vh]'} bg-white text-[#1F2937]`}
    >
      {/* ======================================================== */}
      {/* --- MOBILE INTUITIVE PHASE STEPPER (< md) --- */}
      {/* ======================================================== */}
      {isMobile ? (
        <div className="w-full max-w-xl mx-auto px-4 flex flex-col gap-5">
          {/* Mobile Top Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F5F7] border border-gray-200 text-xs font-semibold text-[#CCA57E] tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F70E1E] animate-ping" />
              <span>150+ POINT DIAGNOSTIC DECONSTRUCTION</span>
            </div>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] leading-[1.2] tracking-tight">
              The anatomy of perfection
            </h2>
            <div className="w-12 h-0.5 bg-[#CCA57E] mt-2 rounded-full" />
          </div>

          {/* Engine Rev Audio Button */}
          <button
            type="button"
            onClick={handlePlayEngineRev}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border ${
              isPlayingAudio
                ? 'bg-[#F70E1E] text-white border-[#F70E1E] shadow-md'
                : 'bg-[#F4F5F7] hover:bg-gray-100 text-[#1F2937] border-gray-200'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-[#CCA57E]'}`} />
            <span>{isPlayingAudio ? 'FLAT-6 ROARING...' : 'REV FLAT-6 POWERTRAIN'}</span>
          </button>

          {/* 5 Phase Buttons (Horizontal scrollable pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            {PHASES.map((phase) => {
              const isSelected = phase.id === mobilePhaseId;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setMobilePhaseId(phase.id);
                    const frameMap = { 1: 30, 2: 105, 3: 180, 4: 240, 5: 295 };
                    const f = frameMap[phase.id] || 30;
                    setMobileFrameNum(f);
                    renderMobileFrame(f);
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#1F2937] text-white shadow-md'
                      : 'bg-[#F4F5F7] text-gray-600 hover:text-black border border-gray-200'
                  }`}
                >
                  <span className={isSelected ? 'text-[#CCA57E]' : 'text-gray-400'}>
                    0{phase.id}
                  </span>
                  <span>{phase.shortLabel || phase.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* 16:9 Exploded Canvas Player Viewport */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl flex items-center justify-center">
            <canvas
              ref={mobileCanvasRef}
              className="w-full h-full object-cover"
            />

            {/* Phase Overlay Badges */}
            <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                PHASE 0{mobilePhaseId} OF 05
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/60 text-gray-200 backdrop-blur-md text-[10px] font-mono">
                FRAME {String(mobileFrameNum).padStart(3, '0')} / 300
              </span>
            </div>

            {/* Prev / Next Phase Floating Buttons */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                const prevId = mobilePhaseId === 1 ? 5 : mobilePhaseId - 1;
                setMobilePhaseId(prevId);
                const frameMap = { 1: 30, 2: 105, 3: 180, 4: 240, 5: 295 };
                const f = frameMap[prevId] || 30;
                setMobileFrameNum(f);
                renderMobileFrame(f);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#1F2937] shadow-md border border-gray-200 cursor-pointer active:scale-90 transition-transform z-10"
              aria-label="Previous Phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                const nextId = mobilePhaseId === 5 ? 1 : mobilePhaseId + 1;
                setMobilePhaseId(nextId);
                const frameMap = { 1: 30, 2: 105, 3: 180, 4: 240, 5: 295 };
                const f = frameMap[nextId] || 30;
                setMobileFrameNum(f);
                renderMobileFrame(f);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#1F2937] shadow-md border border-gray-200 cursor-pointer active:scale-90 transition-transform z-10"
              aria-label="Next Phase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Smooth Mobile Interactive Scrubber Slider */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#F4F5F7] border border-gray-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-600">
              <span className="uppercase tracking-wider text-[#CCA57E]">Interactive Frame Scrubber</span>
              <span className="font-mono text-gray-500">{mobileFrameNum} / 300</span>
            </div>
            <input
              type="range"
              min="1"
              max="300"
              value={mobileFrameNum}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setMobileFrameNum(val);
                renderMobileFrame(val);
                const p = val / 300;
                const ph = PHASES.find((item) => p >= item.range[0] && p <= item.range[1]);
                if (ph && ph.id !== mobilePhaseId) {
                  setMobilePhaseId(ph.id);
                }
              }}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#CCA57E]"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-mono">
              <span>01 Aero</span>
              <span>02 Engine</span>
              <span>03 Spaceframe</span>
              <span>04 Brakes</span>
              <span>05 Reassembly</span>
            </div>
          </div>

          {/* Phase Specs & Details Card */}
          {(() => {
            const ph = PHASES.find((p) => p.id === mobilePhaseId) || PHASES[0];
            return (
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg flex flex-col gap-3">
                <span className="text-[11px] font-bold tracking-widest text-[#CCA57E] uppercase">
                  {ph.subtitle}
                </span>
                <h3 className="font-extrabold text-lg text-[#1F2937] tracking-tight">
                  {ph.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {ph.description}
                </p>

                {/* 3 Specs Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                  {ph.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="p-2 rounded-xl bg-[#F4F5F7] border border-gray-200/80 text-center">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block truncate">
                        {spec.label}
                      </span>
                      <span className="font-bold text-xs text-[#1F2937] block truncate mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>150-Point Computerized Laser Alignment Verified</span>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* ======================================================== */
        /* --- DESKTOP PINNED VIEWPORT CONTAINER (>= md) --- */
        /* ======================================================== */
        <div 
          className={`w-full h-screen flex flex-col justify-between overflow-hidden p-4 sm:p-8 lg:p-12 transition-none bg-white ${
            pinState === 'pinned'
              ? 'fixed top-0 left-0 right-0 z-30'
              : pinState === 'after'
              ? 'absolute bottom-0 left-0 right-0 z-20'
              : 'absolute top-0 left-0 right-0 z-20'
          }`}
        >
        
        {/* ======================================================== */}
        {/* --- TOP HUD BAR: TITLE & AUDIO REVVING BUTTON --- */}
        {/* ======================================================== */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-7xl mx-auto w-full pt-14 sm:pt-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 border border-gray-200/90 shadow-sm mb-2 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#F70E1E] animate-ping" />
              <span className="font-semibold text-xs tracking-[0.15em] text-[#CCA57E] uppercase">
                150+ POINT DIAGNOSTIC DECONSTRUCTION
              </span>
            </div>

            <h2 className="font-extrabold text-2xl sm:text-4xl text-[#1F2937] leading-[1.2] tracking-tight">
              The anatomy of perfection
            </h2>

            <div className="w-12 h-0.5 bg-[#CCA57E] mt-2 rounded-full" />
          </div>

          {/* Engine Sound Preview & Frame Counter */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayEngineRev}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 cursor-pointer backdrop-blur-xl border ${
                isPlayingAudio
                  ? 'bg-[#F70E1E] text-white border-[#F70E1E] shadow-md'
                  : 'bg-white/50 hover:bg-white text-[#1F2937] border-gray-200/90 hover:border-[#CCA57E]'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-[#CCA57E]'}`} />
              <span>{isPlayingAudio ? 'FLAT-6 ROARING...' : 'REV FLAT-6 POWERTRAIN'}</span>
            </button>

            <div className="px-3.5 py-2 rounded-xl bg-white/50 backdrop-blur-xl border border-gray-200/90 shadow-sm text-xs font-semibold text-[#1F2937] hidden sm:flex items-center gap-2">
              <span className="text-gray-500 font-normal">FRAME:</span>
              <span className="font-mono text-[#CCA57E] font-bold">{String(currentFrameIndex).padStart(3, '0')} / 300</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* --- MAIN STAGE: 2-COLUMN (LEFT: INFO CARD, RIGHT: BIGGER CAR EXPLOSION) --- */}
        {/* ======================================================== */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 my-auto overflow-hidden">
          
          {/* ======================================================== */}
          {/* --- LEFT SIDE: INFO CARD WITH BLURRED BLUE PORSCHE IMAGE --- */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[38%] xl:w-[35%] shrink-0 z-20">
            <div className="relative rounded-3xl overflow-hidden border border-white/90 shadow-[0_16px_50px_rgba(30,58,138,0.12)] p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300">
              
              {/* Blurred Blue Porsche Car Image Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <img
                  src="/car-exploded-frames/ezgif-frame-001.jpg"
                  alt="Blue Porsche 911"
                  className="w-full h-full object-cover object-center filter blur-[10px] scale-135 opacity-45 transform -rotate-1"
                />
                {/* Subtle blue luxury gradient tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-sky-500/10 to-transparent" />
                {/* Semi-transparent frosted glass sheet */}
                <div className="absolute inset-0 bg-white/65 backdrop-blur-md" />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-300/60">
                  <span className="font-semibold text-[11px] tracking-[0.15em] text-[#CCA57E] uppercase">
                    {activePhase.subtitle}
                  </span>
                  <span className="text-[11px] font-mono text-[#1F2937] font-bold bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/90 shadow-2xs">
                    STAGE {activePhase.id} / 5
                  </span>
                </div>

                <h4 className="font-extrabold text-xl sm:text-2xl text-[#1F2937] leading-tight mb-2">
                  {activePhase.title}
                </h4>

                <p className="font-normal text-xs sm:text-sm text-[#374151] leading-[1.6] mb-4">
                  {activePhase.description}
                </p>

                {/* Quick Specs Badges: Transparent Blurred */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-300/50">
                  {activePhase.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 text-center shadow-xs">
                      <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">{spec.label}</p>
                      <p className="font-bold text-[11px] sm:text-xs text-[#1F2937] truncate mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* --- RIGHT SIDE: CAR EXPLOSION CANVAS (INCREASED SIZE) --- */}
          {/* ======================================================== */}
          <div className="relative w-full lg:w-[62%] xl:w-[65%] h-[54vh] sm:h-[64vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
            {/* HTML5 Canvas with White Studio Contrast Scaling */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-300 filter contrast-[1.04] brightness-[1.12]"
              style={{ opacity: isReady ? 1 : 0 }}
            />

            {/* Loading Indicator */}
            {!isReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-30">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-[#CCA57E]/50 flex items-center justify-center mb-3 shadow-sm animate-pulse">
                  <Cpu className="w-5 h-5 text-[#CCA57E]" />
                </div>
                <span className="text-xs font-semibold tracking-[0.15em] text-[#1F2937] uppercase mb-2">
                  CACHING ANATOMY • {Math.min(100, Math.round((loadedCount / INITIAL_PRELOAD) * 100))}%
                </span>
                <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#CCA57E] to-[#F70E1E] transition-all duration-150"
                    style={{ width: `${Math.min(100, (loadedCount / INITIAL_PRELOAD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ======================================================== */}
        {/* --- BOTTOM HUD: PHASE QUICK-JUMP BUTTONS & SCRUB BAR --- */}
        {/* ======================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pb-2 sm:pb-4">
          
          {/* Scroll Progress Bar */}
          <div className="relative w-full h-1.5 bg-gray-200/80 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-[#CCA57E] via-[#F70E1E] to-[#CCA57E] transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          {/* Phase Quick-Jump Navigation Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {PHASES.map((phase) => {
                const isActive = activePhase.id === phase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => handleJumpToPhase(phase.progressTarget)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer border backdrop-blur-xl ${
                      isActive
                        ? 'bg-[#1F2937] text-white border-[#1F2937] shadow-sm'
                        : 'bg-white/50 hover:bg-white text-gray-700 border-gray-200/90 hover:border-[#CCA57E]'
                    }`}
                  >
                    <span>0{phase.id} {phase.shortLabel || phase.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#1F2937] bg-white/50 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-gray-200/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F70E1E] animate-pulse" />
              <span>{Math.round(scrollProgress * 100)}% DECONSTRUCTED • SCROLL TO EXPLORE</span>
            </div>
          </div>

        </div>

      </div>
    )}
  </section>
);
}
