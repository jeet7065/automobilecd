import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function VirtualShowroom() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimerRef = useRef(null);

  // Auto-play when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Fallback if browser requires user interaction for autoplay
        setIsPlaying(false);
      });
    }
  }, []);

  // Update time and progress bar
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    triggerControlsVisibility();
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    triggerControlsVisibility();
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
    triggerControlsVisibility();
  };

  // Timeline Scrub
  const handleScrub = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * video.duration;
    setProgress(newProgress * 100);
  };

  // Auto-hide controls after inactivity
  const triggerControlsVisibility = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3200);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="showroom" 
      className="relative z-30 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F4F5F7] text-[#1F2937] overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        
        {/* ======================================================== */}
        {/* --- SECTION HEADER --- */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-semibold text-xs tracking-[0.2em] text-[#CCA57E] uppercase block mb-3">
            FLAGSHIP ATELIER • 4K SHOWCASE
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] leading-[1.18] tracking-tight">
            Step inside our private atelier
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3.5 rounded-full" />

          <p className="font-normal text-sm sm:text-base text-[#4B5563] leading-[1.6] mt-4 max-w-xl mx-auto">
            Experience our multi-level architectural showroom in Tilak Nagar, New Delhi — home to India's most coveted exotic automotive masterpieces.
          </p>
        </div>

        {/* ======================================================== */}
        {/* --- ULTRA-MODERN CINEMATIC VIDEO THEATER --- */}
        {/* ======================================================== */}
        <div className="relative">
          
          {/* Ambient Theatre Backlight Reflection */}
          <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-[#CCA57E]/25 via-red-500/15 to-[#2563EB]/25 rounded-[2.5rem] blur-3xl opacity-60 pointer-events-none transition-opacity duration-700" />

          {/* Main Cinema Container */}
          <div 
            ref={containerRef}
            onMouseMove={triggerControlsVisibility}
            onMouseEnter={() => {
              setIsHovered(true);
              triggerControlsVisibility();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              if (isPlaying) setShowControls(false);
            }}
            onClick={togglePlay}
            className="group relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-gray-200/80 sm:border-gray-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src="/videos/showroom.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Top & Bottom Cinematic Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none transition-opacity duration-300" />

            {/* ======================================================== */}
            {/* --- TOP HUD BADGES (Always Elegant & High-Tech) --- */}
            {/* ======================================================== */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none z-20">
              
              {/* Left Live Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-gray-200">
                  FLAGSHIP TOUR • 4K
                </span>
              </div>

              {/* Right Brand Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#CCA57E]" />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#CCA57E] uppercase">
                  FUSION CARS ATELIER
                </span>
              </div>

            </div>

            {/* ======================================================== */}
            {/* --- CENTER PULSING PLAY BUTTON (When Paused) --- */}
            {/* ======================================================== */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-white/20 blur-md animate-pulse" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-xl border border-white flex items-center justify-center shadow-2xl text-[#1F2937] transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#1F2937] translate-x-0.5 fill-current" />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* --- BOTTOM CINEMA GLASS CONTROLS HUD --- */}
            {/* ======================================================== */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-xl border border-white/15 transition-all duration-300 z-30 ${
                showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              {/* Sleek Gradient Timeline Scrubber */}
              <div 
                onClick={handleScrub}
                className="group/timeline relative w-full h-1.5 sm:h-2 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all mb-3 overflow-hidden"
              >
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#CCA57E] via-[#FF073A] to-[#2563EB] relative transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Action Row */}
              <div className="flex items-center justify-between gap-3 text-white">
                
                {/* Left: Play/Pause & Time */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer text-white"
                    title={isPlaying ? 'Pause Tour' : 'Play Tour'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    )}
                  </button>

                  {/* Replay Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hidden sm:flex items-center justify-center transition-all cursor-pointer text-gray-300 hover:text-white"
                    title="Restart Tour"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-mono text-xs text-gray-300 tracking-wider">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Audio Toggle & Fullscreen */}
                <div className="flex items-center gap-2 sm:gap-3">
                  
                  {/* Audio Mute/Unmute with Status Tag */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-2 transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-white/10 hover:bg-white/20 border-white/20 text-gray-300'
                        : 'bg-[#FF073A]/90 hover:bg-[#FF073A] border-[#FF073A] text-white shadow-md'
                    }`}
                    title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">
                          MUTED
                        </span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">
                          SOUND ON
                        </span>
                      </>
                    )}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer text-white"
                    title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
