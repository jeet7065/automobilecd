import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

const START_FRAME = 70;
const TOTAL_FRAMES = 398; // 70 to 467

// Module-level shared cache so frames are downloaded once across modes
const globalFramesCache = new Map();
let globalIsPreloading = false;
let globalPreloadListeners = new Set();

const preloadAllFrames = () => {
  if (globalIsPreloading) return;
  globalIsPreloading = true;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNum = START_FRAME + i;
    const padded = String(frameNum).padStart(4, '0');
    const img = new Image();
    img.src = `/frames/frame_${padded}.jpg`;
    img.onload = () => {
      globalFramesCache.set(i, img);
      globalPreloadListeners.forEach((cb) => cb(globalFramesCache.size));
    };
  }
};

export default function CanvasFramePlayer({ 
  scrollProgress = 0, 
  onPhaseChange, 
  mode = 'desktop' // 'desktop' (fixed scrub) | 'mobile' (16:9 inline auto-run with pause)
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(globalFramesCache.size);
  const [isReady, setIsReady] = useState(globalFramesCache.size >= 15);
  const currentRenderedIndex = useRef(0);
  const animationFrameRef = useRef(null);

  // Mobile Auto-run & Pause State
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const [mobileProgressPct, setMobileProgressPct] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);

  // Synchronize isPlaying ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // 1. Initial preload & attach to global cache listener
  useEffect(() => {
    const handlePreloadUpdate = (count) => {
      setLoadedCount(count);
      if (count >= 15) {
        setIsReady(true);
      }
    };

    globalPreloadListeners.add(handlePreloadUpdate);
    preloadAllFrames();

    if (globalFramesCache.size >= 15) {
      setIsReady(true);
    }

    return () => {
      globalPreloadListeners.delete(handlePreloadUpdate);
    };
  }, []);

  // 2. Scaled draw onto Canvas with devicePixelRatio
  const drawScaledImage = (ctx, canvas, img) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Use cover scaling to fill container cleanly without distorting 16:9
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = globalFramesCache.get(index);
    if (!img || !img.complete) {
      // Fallback: search backwards/forwards for closest loaded frame
      for (let offset = 1; offset <= 25; offset++) {
        const fallback = globalFramesCache.get(Math.max(0, index - offset)) || globalFramesCache.get(Math.min(TOTAL_FRAMES - 1, index + offset));
        if (fallback && fallback.complete) {
          drawScaledImage(ctx, canvas, fallback);
          return;
        }
      }
      return;
    }

    drawScaledImage(ctx, canvas, img);
  }, []);

  // 3. Handle Canvas Resize based on mode (desktop full-window vs mobile 16:9 container)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (mode === 'mobile') {
        const container = containerRef.current || canvas.parentElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          const w = rect.width || window.innerWidth;
          const h = rect.height || (w * 9) / 16;
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
        }
      } else {
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }

      renderFrame(currentRenderedIndex.current);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [mode, isReady, renderFrame]);

  // 4A. DESKTOP MODE: Scroll-driven scrub
  useEffect(() => {
    if (mode !== 'desktop') return;

    const p = Math.max(0, Math.min(1, scrollProgress));
    const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(p * (TOTAL_FRAMES - 1)));
    currentRenderedIndex.current = targetIndex;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      renderFrame(targetIndex);
    });

    if (onPhaseChange) {
      if (p < 0.22) {
        onPhaseChange('PHASE 01: HIGH-SPEED ARRIVAL');
      } else if (p < 0.45) {
        onPhaseChange('PHASE 02: FRONT SPLITTER & Y-MATRIX DRL');
      } else if (p < 0.65) {
        onPhaseChange('PHASE 03: PROFILE WEDGE & FORGED WHEELS');
      } else if (p < 0.85) {
        onPhaseChange('PHASE 04: V10 POWERTRAIN & QUAD EXHAUST');
      } else {
        onPhaseChange('PHASE 05: HYPER-VELOCITY LAUNCH EXIT');
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollProgress, mode, onPhaseChange, renderFrame]);

  // 4B. MOBILE MODE: Auto-run at normal speed (~30 fps) with smooth looping & pause option
  useEffect(() => {
    if (mode !== 'mobile') return;

    let animId;
    let lastTimestamp = performance.now();
    const frameIntervalMs = 1000 / 30; // 30 frames per second normal speed (~33.3ms)

    const loop = (now) => {
      if (isPlayingRef.current) {
        const delta = now - lastTimestamp;
        if (delta >= frameIntervalMs) {
          const framesToAdvance = Math.max(1, Math.floor(delta / frameIntervalMs));
          lastTimestamp = now - (delta % frameIntervalMs);

          const nextIndex = (currentRenderedIndex.current + framesToAdvance) % TOTAL_FRAMES;
          currentRenderedIndex.current = nextIndex;
          renderFrame(nextIndex);

          setMobileProgressPct((nextIndex / (TOTAL_FRAMES - 1)) * 100);
          setActiveFrameDisplay(nextIndex + 1);
        }
      } else {
        lastTimestamp = now;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [mode, renderFrame]);

  // Toggle Play / Pause for Mobile
  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    setIsPlaying((prev) => !prev);
  };

  // Restart video for Mobile
  const handleRestart = (e) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    currentRenderedIndex.current = 0;
    renderFrame(0);
    setMobileProgressPct(0);
    setActiveFrameDisplay(1);
    setIsPlaying(true);
  };

  // ========================================================
  // --- RENDER FOR MOBILE MODE (16:9 Aspect Ratio Container) ---
  // ========================================================
  if (mode === 'mobile') {
    return (
      <div 
        ref={containerRef}
        onClick={togglePlayPause}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-200/90 select-none cursor-pointer group"
      >
        {/* Canvas Element for 16:9 Frame Playback */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isReady ? 1 : 0 }}
        />

        {/* Ambient Top Vignette */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

        {/* Top Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-wider uppercase">
            <span 
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-red-500 animate-pulse' : 'bg-amber-400'
              }`} 
            />
            <span>{isPlaying ? '3D SHOWROOM • LIVE' : 'PAUSED'}</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-medium text-gray-200">
            {activeFrameDisplay} / {TOTAL_FRAMES}
          </div>
        </div>

        {/* Center Pause Indicator Overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all z-20 pointer-events-none">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/95 text-[#1F2937] flex items-center justify-center shadow-2xl transform scale-105 animate-pulse">
              <Play className="w-6 h-6 fill-[#1F2937] translate-x-0.5" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mt-2.5 drop-shadow-md">
              PAUSED • TAP TO RESUME
            </span>
          </div>
        )}

        {/* Ambient Bottom Gradient for Controls */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Interactive Controls Bar */}
        <div 
          className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Play/Pause Button Pill */}
          <button
            type="button"
            onClick={togglePlayPause}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#1F2937] text-[11px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md transition-all cursor-pointer active:scale-95"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-[#1F2937]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#1F2937]" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Right Action: Replay & Quality Label */}
          <div className="flex items-center gap-2">
            <span className="hidden xs:inline-block text-[10px] font-medium text-white/80 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
              1080P • 30 FPS
            </span>
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              title="Restart from beginning"
              aria-label="Restart Video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Progress Scrubber Line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#CCA57E] via-[#F70E1E] to-[#CCA57E] transition-all duration-75"
            style={{ width: `${mobileProgressPct}%` }}
          />
        </div>

        {/* Initial Loading Screen */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30 text-white p-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 animate-pulse">
              <Sparkles className="w-5 h-5 text-[#CCA57E]" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-200 mb-2">
              LOADING 16:9 SHOWROOM • {Math.min(100, Math.round((loadedCount / 20) * 100))}%
            </span>
            <div className="w-36 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#CCA57E] transition-all duration-150"
                style={{ width: `${Math.min(100, (loadedCount / 20) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========================================================
  // --- RENDER FOR DESKTOP MODE (Fixed Fullscreen Scrub) ---
  // ========================================================
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      {/* HTML5 High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0 }}
      />

      {/* Loading Progress Bar before initial frames cache */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
          <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] border border-[#CCA57E]/50 flex items-center justify-center mb-4 shadow-sm animate-pulse">
            <svg viewBox="0 0 100 100" className="w-7 h-7 fill-[#CCA57E]">
              <polygon points="50,4 96,86 50,72 4,86" />
              <polygon points="50,16 86,80 50,68 14,80" fill="#F4F5F7" />
              <path d="M50 24 L58 48 L72 50 L60 62 L64 76 L50 66 L36 76 L40 62 L28 50 L42 48 Z" fill="#CCA57E" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-[0.15em] text-[#1F2937] uppercase mb-3">
            INITIALIZING SHOWROOM • {Math.min(100, Math.round((loadedCount / 25) * 100))}%
          </span>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#CCA57E] to-[#F70E1E] transition-all duration-150"
              style={{ width: `${Math.min(100, (loadedCount / 25) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
