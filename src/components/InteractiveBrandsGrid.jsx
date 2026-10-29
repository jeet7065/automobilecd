import React, { useRef, useEffect, useState } from 'react';

// Brand Catalog with authentic transparent PNG insignia (100% background-free)
const CAR_BRANDS = [
  { name: 'Porsche', origin: 'Stuttgart, Germany', logo: '/brand-logos/porsche.png' },
  { name: 'Ferrari', origin: 'Maranello, Italy', logo: '/brand-logos/ferrari.png' },
  { name: 'Lamborghini', origin: "Sant'Agata, Italy", logo: '/brand-logos/lamborghini.png' },
  { name: 'Rolls-Royce', origin: 'Goodwood, UK', logo: '/brand-logos/rolls-royce.png' },
  { name: 'Bentley', origin: 'Crewe, England', logo: '/brand-logos/bentley.png' },
  { name: 'Aston Martin', origin: 'Gaydon, UK', logo: '/brand-logos/aston-martin.png' },
  { name: 'McLaren', origin: 'Woking, UK', logo: '/brand-logos/mclaren.png' },
  { name: 'Bugatti', origin: 'Molsheim, France', logo: '/brand-logos/bugatti.png' },
  { name: 'Mercedes-Benz', origin: 'Stuttgart, Germany', logo: '/brand-logos/mercedes-benz.png' },
  { name: 'BMW', origin: 'Munich, Germany', logo: '/brand-logos/bmw.png' },
  { name: 'Audi', origin: 'Ingolstadt, Germany', logo: '/brand-logos/audi.png' },
  { name: 'Maserati', origin: 'Modena, Italy', logo: '/brand-logos/maserati.png' },
  { name: 'Land Rover', origin: 'Solihull, UK', logo: '/brand-logos/land-rover.png' },
  { name: 'Jaguar', origin: 'Coventry, UK', logo: '/brand-logos/jaguar.png' },
  { name: 'Maybach', origin: 'Stuttgart, Germany', logo: '/brand-logos/maybach.png' },
  { name: 'Alfa Romeo', origin: 'Milan, Italy', logo: '/brand-logos/alfa-romeo.png' },
  { name: 'Koenigsegg', origin: 'Ängelholm, Sweden', logo: '/brand-logos/koenigsegg.png' },
  { name: 'Pagani', origin: 'San Cesario, Italy', logo: '/brand-logos/pagani.png' }
];

export default function InteractiveBrandsGrid() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const [activeBrand, setActiveBrand] = useState(null);

  // Initialize and run Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Grid configuration
    const SPACING = 28; // spacing between grid dots in px
    const BASE_RADIUS = 1.75; // base dot size
    const MAX_RADIUS = 6.2; // maximum magnified dot size
    const REPEL_RADIUS = 135; // interactive influence radius
    const MAX_REPEL_FORCE = 26; // max px dots are pushed away

    // Smooth RGB interpolation:
    // t = 0   -> Light Gray  rgb(222, 226, 233)
    // t = 0.5 -> Vibrant Blue rgb(37, 99, 235)
    // t = 1.0 -> Electric Red rgb(255, 7, 58)
    const getDotColor = (t) => {
      const clamped = Math.max(0, Math.min(1, t));
      if (clamped <= 0.5) {
        const factor = clamped / 0.5;
        const r = Math.round(222 + (37 - 222) * factor);
        const g = Math.round(226 + (99 - 226) * factor);
        const b = Math.round(233 + (235 - 223) * factor);
        return `rgb(${r},${g},${b})`;
      } else {
        const factor = (clamped - 0.5) / 0.5;
        const r = Math.round(37 + (255 - 37) * factor);
        const g = Math.round(99 + (7 - 99) * factor);
        const b = Math.round(235 + (58 - 235) * factor);
        return `rgb(${r},${g},${b})`;
      }
    };

    const initDots = (w, h) => {
      const cols = Math.floor(w / SPACING) + 2;
      const rows = Math.floor(h / SPACING) + 2;
      const offsetX = (w - (cols - 1) * SPACING) / 2;
      const offsetY = (h - (rows - 1) * SPACING) / 2;

      const dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * SPACING;
          const originY = offsetY + r * SPACING;
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            radius: BASE_RADIUS,
            t: 0
          });
        }
      }
      dotsRef.current = dots;
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initDots(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop (60fps)
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const dots = dotsRef.current;
      const len = dots.length;

      for (let i = 0; i < len; i++) {
        const dot = dots[i];

        // Vector from cursor to dot origin
        const dx = dot.originX - mouseX;
        const dy = dot.originY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.originX;
        let targetY = dot.originY;
        let targetRadius = BASE_RADIUS;
        let targetT = 0;

        if (dist < REPEL_RADIUS && dist > 0) {
          // Proximity factor 1 at center, 0 at outer edge
          const proximity = 1 - dist / REPEL_RADIUS;
          // Smooth bell falloff
          const force = Math.pow(proximity, 1.4);

          // Angle of repulsion away from cursor
          const angle = Math.atan2(dy, dx);
          const push = force * MAX_REPEL_FORCE;

          targetX = dot.originX + Math.cos(angle) * push;
          targetY = dot.originY + Math.sin(angle) * push;
          targetRadius = BASE_RADIUS + force * (MAX_RADIUS - BASE_RADIUS);
          targetT = force;
        }

        // Spring / Ease interpolation toward target
        dot.x += (targetX - dot.x) * 0.16;
        dot.y += (targetY - dot.y) * 0.16;
        dot.radius += (targetRadius - dot.radius) * 0.18;
        dot.t += (targetT - dot.t) * 0.18;

        // Render dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = getDotColor(dot.t);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  // Mouse & Touch Tracking
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 0) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mousePosRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -9999, y: -9999 };
  };

  return (
    <section
      id="brands"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 w-full min-h-[85vh] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-white text-[#1F2937] overflow-hidden flex flex-col justify-center select-none"
    >
      {/* ======================================================== */}
      {/* --- BACKGROUND INTERACTIVE REPEL CANVAS --- */}
      {/* ======================================================== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ======================================================== */}
      {/* --- SECTION HEADER (FLOATING SEAMLESSLY OVER CANVAS) --- */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-14 sm:mb-20 pointer-events-none">

        {/* Eyebrow Label */}
        <span className="font-semibold text-xs tracking-[0.2em] text-[#CCA57E] uppercase block mb-3">
          Mini Space · Luxury Brands
        </span>

        {/* Section Heading */}
        <h2 className="font-extrabold text-3xl sm:text-5xl text-[#1F2937] tracking-tight leading-[1.15]">
          Explore Luxury Cars by Brand
        </h2>

        {/* Thin Gold Accent Line */}
        <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3.5 rounded-full" />

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mt-4 font-normal leading-relaxed">
          From legendary Italian coachbuilders to precision German racing engineers, we verify, source, and deliver the world's most coveted automotive icons.
        </p>
      </div>

      {/* ======================================================== */}
      {/* --- RESPONSIVE LOGOS GRID WITH LASER LINES OVERLAY --- */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pointer-events-none">

        {/* ======================================================== */}
        {/* --- CINEMATIC LASER MATRIX (Desktop & Tablet >= 768px: 6x3) --- */}
        {/* Ultra-subtle, elegant hairline laser borders with minimal non-intrusive glow */}
        {/* ======================================================== */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">

          {/* Horizontal Line 1 (Between Row 1 & Row 2) */}
          <div
            className="absolute left-[-2%] right-[-2%] h-[1.5px]"
            style={{
              top: '33.333%',
              background: 'linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.75) 8%, rgba(37,99,235,0.9) 27%, #FF073A 33.3%, #FF073A 66.7%, rgba(37,99,235,0.9) 73%, rgba(37,99,235,0.75) 92%, rgba(37,99,235,0) 100%)',
              boxShadow: '0 0 2px rgba(37,99,235,0.15), 0 0 2px rgba(255,7,58,0.18)'
            }}
          />

          {/* Horizontal Line 2 (Between Row 2 & Row 3) */}
          <div
            className="absolute left-[-2%] right-[-2%] h-[1.5px]"
            style={{
              top: '66.666%',
              background: 'linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.75) 8%, rgba(37,99,235,0.9) 27%, #FF073A 33.3%, #FF073A 66.7%, rgba(37,99,235,0.9) 73%, rgba(37,99,235,0.75) 92%, rgba(37,99,235,0) 100%)',
              boxShadow: '0 0 2px rgba(37,99,235,0.15), 0 0 2px rgba(255,7,58,0.18)'
            }}
          />

          {/* Center Vertical Divider (Between Col 3 & 4 - Down center between Mercedes & BMW) */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '50%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.8) 15%, #FF073A 28%, #FF073A 72%, rgba(37,99,235,0.8) 85%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.2)'
            }}
          />

          {/* Left Center Vertical Divider (Left of Mercedes-Benz - Between Col 2 & 3) */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '33.333%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.8) 16%, #FF073A 33.3%, #FF073A 66.7%, rgba(37,99,235,0.8) 84%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.18)'
            }}
          />

          {/* Right Center Vertical Divider (Right of BMW - Between Col 4 & 5) */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '66.666%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.8) 16%, #FF073A 33.3%, #FF073A 66.7%, rgba(37,99,235,0.8) 84%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.18)'
            }}
          />

          {/* Vertical Line 1 (Between Col 1 & 2 - Porsche/Ferrari, McLaren/Bugatti) */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '16.666%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.75) 15%, rgba(37,99,235,0.9) 50%, rgba(37,99,235,0.75) 85%, transparent 100%)',
              boxShadow: '0 0 2px rgba(37,99,235,0.15)'
            }}
          />

          {/* Vertical Line 5 (Between Col 5 & 6 - Bentley/Aston Martin, Audi/Maserati) */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '83.333%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.75) 15%, rgba(37,99,235,0.9) 50%, rgba(37,99,235,0.75) 85%, transparent 100%)',
              boxShadow: '0 0 2px rgba(37,99,235,0.15)'
            }}
          />

          {/* Far Outer Left Boundary Line */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] left-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.5) 18%, rgba(37,99,235,0.7) 50%, rgba(37,99,235,0.5) 82%, transparent 100%)'
            }}
          />

          {/* Far Outer Right Boundary Line */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] right-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.5) 18%, rgba(37,99,235,0.7) 50%, rgba(37,99,235,0.5) 82%, transparent 100%)'
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* --- CINEMATIC LASER MATRIX (Tablet: 3x6) --- */}
        {/* ======================================================== */}
        <div className="hidden sm:block md:hidden absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '33.333%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, #2563EB 25%, #FF073A 45%, #FF073A 55%, #2563EB 75%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.18)'
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '66.666%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, #2563EB 25%, #FF073A 45%, #FF073A 55%, #2563EB 75%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.18)'
            }}
          />
          {[16.666, 33.333, 50, 66.666, 83.333].map((pct) => (
            <div
              key={pct}
              className="absolute left-[-2%] right-[-2%] h-[1.5px]"
              style={{
                top: `${pct}%`,
                background: 'linear-gradient(90deg, transparent 0%, #2563EB 15%, #FF073A 50%, #2563EB 85%, transparent 100%)',
                boxShadow: '0 0 2px rgba(255,7,58,0.18)'
              }}
            />
          ))}
        </div>

        {/* ======================================================== */}
        {/* --- CINEMATIC LASER MATRIX (Mobile: 2x9) --- */}
        {/* ======================================================== */}
        <div className="block sm:hidden absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 bottom-0 w-[1.5px] -translate-x-1/2"
            style={{
              left: '50%',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, #2563EB 25%, #FF073A 45%, #FF073A 55%, #2563EB 75%, rgba(37,99,235,0.1) 100%)',
              boxShadow: '0 0 2px rgba(255,7,58,0.18)'
            }}
          />
          {[11.11, 22.22, 33.33, 44.44, 55.55, 66.66, 77.77, 88.88].map((pct) => (
            <div
              key={pct}
              className="absolute left-[-2%] right-[-2%] h-[1.5px]"
              style={{
                top: `${pct}%`,
                background: 'linear-gradient(90deg, transparent 0%, #2563EB 20%, #FF073A 50%, #2563EB 80%, transparent 100%)',
                boxShadow: '0 0 2px rgba(255,7,58,0.18)'
              }}
            />
          ))}
        </div>

        {/* ======================================================== */}
        {/* --- RESPONSIVE LOGOS GRID CELLS --- */}
        {/* Empty space allows mouse events to pass to canvas */}
        {/* ======================================================== */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-0 items-stretch justify-items-stretch">
          {CAR_BRANDS.map((brand) => {
            const isHovered = activeBrand === brand.name;
            return (
              <div
                key={brand.name}
                onMouseEnter={() => setActiveBrand(brand.name)}
                onMouseLeave={() => setActiveBrand(null)}
                className="group pointer-events-auto flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 px-3 sm:px-4 cursor-pointer relative will-change-transform transition-all duration-300 ease-out"
                style={{
                  transform: isHovered ? 'scale(1.35) translateZ(30px)' : 'scale(1) translateZ(0px)',
                  zIndex: isHovered ? 40 : 10
                }}
              >
                {/* Authentic Real Logo PNG with 3D Pop-Out & Drop-Shadow */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative select-none pointer-events-none"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    draggable={false}
                    loading="lazy"
                    className={`max-w-full max-h-full object-contain pointer-events-none select-none transition-all duration-300 ease-out ${isHovered
                        ? 'opacity-100 scale-105 filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.28)] contrast-110 brightness-105'
                        : 'opacity-75 grayscale-[15%] contrast-100'
                      }`}
                  />
                </div>

                {/* Uppercase, Widely Spaced Text Beneath */}
                <span
                  className={`text-xs uppercase transition-all duration-300 ease-out mt-3.5 text-center ${isHovered
                      ? 'text-black font-bold tracking-[0.24em] drop-shadow-sm'
                      : 'text-gray-400 font-semibold tracking-[0.2em]'
                    }`}
                >
                  {brand.name}
                </span>

                {/* Subtle Origin Tag (Visible on hover) */}
                <span
                  className={`text-[9px] tracking-widest text-[#CCA57E] uppercase mt-0.5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {brand.origin}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

