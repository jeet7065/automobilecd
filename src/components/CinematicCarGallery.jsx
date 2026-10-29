import React, { useRef, useState, useEffect, useCallback } from 'react';

// 12 Curated Exotic & Luxury Supercar Showroom Frames for Fusion Cars
const GALLERY_FRAMES = [
  {
    id: 'lambo-aventador',
    name: 'Lamborghini Aventador SVJ',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'ferrari-sf90',
    name: 'Ferrari SF90 Stradale',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'porsche-gt3rs',
    name: 'Porsche 911 GT3 RS',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'supercar-led-stream',
    name: 'Exotic Aerodynamic Silhouette',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'mclaren-750s',
    name: 'McLaren 750S / P1',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'bugatti-chiron',
    name: 'Bugatti Chiron Super Sport',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'amg-gt-black-series',
    name: 'Mercedes-AMG GT Black Series',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'rolls-royce-spectre',
    name: 'Rolls-Royce Ghost & Spectre',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'porsche-911-turbo',
    name: 'Porsche 911 Turbo S',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'defender-110',
    name: 'Land Rover Defender 110',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'mercedes-g63-amg',
    name: 'Mercedes-Benz G63 AMG',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'audi-r8-v10',
    name: 'Audi R8 V10 Performance',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85',
  }
];

export default function CinematicCarGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Dynamic Cylinder Angle
  const angleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoveredRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Total items in 360-degree cylinder
  const totalCards = GALLERY_FRAMES.length; // 12 cards
  const angleStep = (2 * Math.PI) / totalCards; // 30 degrees = π/6 rad

  // Mathematical Zero-Gap Geometry:
  // For 12 chord cards to touch with ZERO gap on a cylinder:
  // Chord Width W = 2 * R * sin(angleStep / 2) = 2 * R * sin(15°) => R = W / (2 * sin(15°)) ≈ 1.93185 * W
  const getMetrics = useCallback(() => {
    if (typeof window === 'undefined') {
      const cardWidth = 460;
      return { 
        cardWidth, 
        cardHeight: 285, 
        radius: Math.round(cardWidth * 1.93185), 
        perspective: 1400 
      };
    }
    const w = window.innerWidth;
    if (w < 640) {
      // Mobile
      const cardWidth = 275;
      return { 
        cardWidth, 
        cardHeight: 180, 
        radius: Math.round(cardWidth * 1.93185), 
        perspective: 900 
      };
    } else if (w < 1024) {
      // Tablet
      const cardWidth = 360;
      return { 
        cardWidth, 
        cardHeight: 230, 
        radius: Math.round(cardWidth * 1.93185), 
        perspective: 1150 
      };
    } else {
      // Desktop
      const cardWidth = 460;
      return { 
        cardWidth, 
        cardHeight: 290, 
        radius: Math.round(cardWidth * 1.93185), 
        perspective: 1400 
      };
    }
  }, []);

  const [metrics, setMetrics] = useState(getMetrics);

  useEffect(() => {
    const handleResize = () => setMetrics(getMetrics());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getMetrics]);

  // Animation Loop (60fps requestAnimationFrame)
  useEffect(() => {
    let animId;
    let prefersReducedMotion = false;

    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const render = () => {
      if (!isDraggingRef.current) {
        // Continuous smooth cruise: moves cards right-to-left
        const naturalSpeed = prefersReducedMotion ? 0 : isHoveredRef.current ? 0.0006 : 0.0016;

        if (Math.abs(velocityRef.current) > 0.0001) {
          angleRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction decay
        } else {
          velocityRef.current = 0;
          angleRef.current += naturalSpeed;
        }

        // Normalize angle within [0, 2π)
        if (angleRef.current >= 2 * Math.PI) {
          angleRef.current -= 2 * Math.PI;
        } else if (angleRef.current < 0) {
          angleRef.current += 2 * Math.PI;
        }
      }

      // Update 3D cylindrical transform for each card
      if (trackRef.current) {
        const cards = trackRef.current.children;
        const currentAngle = angleRef.current;
        const R = metrics.radius;

        for (let i = 0; i < cards.length; i++) {
          const cardEl = cards[i];
          if (!cardEl) continue;

          // Angular position of card i
          let cardAngle = (i * angleStep - currentAngle) % (2 * Math.PI);
          if (cardAngle < -Math.PI) cardAngle += 2 * Math.PI;
          if (cardAngle > Math.PI) cardAngle -= 2 * Math.PI;

          // Check if card is facing the front half of cylinder (cos >= -0.15)
          const cosVal = Math.cos(cardAngle);

          if (cosVal < -0.15) {
            // Card is around the back of the cylinder: hide
            cardEl.style.display = 'none';
          } else {
            cardEl.style.display = 'block';

            // Mathematical 3D Cylinder Projection with ZERO GAP:
            // X: exact horizontal chord position
            const x = R * Math.sin(cardAngle);
            // Z: exact depth into the screen along cylindrical surface
            const z = R * (cosVal - 1);
            // Rotate Y: perfectly tangent to cylinder surface
            const rotY = -(cardAngle * 180) / Math.PI;

            // Opacity: fade out naturally as it sweeps around the cylinder sides
            const opacity = Math.max(0, Math.min(1, Math.pow(Math.max(0, cosVal), 1.5)));

            // Z-Index: front-facing cards stack above side cards
            const zIndex = Math.round(100 * cosVal);

            cardEl.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg)`;
            cardEl.style.opacity = opacity.toFixed(3);
            cardEl.style.zIndex = zIndex;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    setIsReady(true);

    return () => cancelAnimationFrame(animId);
  }, [angleStep, metrics]);

  // Touch and Mouse Interaction
  const handlePointerDown = (clientX) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startAngleRef.current = angleRef.current;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - lastXRef.current;
    // Map horizontal pixel drag to cylinder angular rotation
    const sensitivity = (2 * Math.PI) / (metrics.radius * 3.2);
    angleRef.current -= deltaX * sensitivity;

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      velocityRef.current = (-deltaX * sensitivity) / (dt / 16);
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section 
      id="gallery"
      className="relative z-30 w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] bg-[#F4F5F7] text-[#1F2937] flex flex-col justify-between py-16 sm:py-20 lg:py-24 overflow-hidden select-none"
    >
      {/* ======================================================== */}
      {/* --- TOP HEADER (RELEVANT TO FUSION CARS LUXURY BUSINESS) --- */}
      {/* ======================================================== */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 mb-4 sm:mb-8">
        
        {/* Eyebrow: Inter Medium, ALL CAPS, 0.15em letter-spacing */}
        <span className="font-medium text-xs tracking-[0.15em] text-[#CCA57E] uppercase block mb-3">
          CURATED COLLECTION • DELHI FLAGSHIP SHOWROOM
        </span>

        {/* Main Heading: Inter Bold / Extra Bold, Sentence case, tight line height */}
        <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1F2937] tracking-tight leading-[1.15]">
          Every masterpiece,<br />
          brought into focus.
        </h2>

        {/* Thin Gold Accent Line */}
        <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3.5 rounded-full" />
      </div>

      {/* ======================================================== */}
      {/* --- 3D CURVED CYLINDRICAL GALLERY VIEWPORT (ZERO GAP) --- */}
      {/* ======================================================== */}
      <div 
        ref={containerRef}
        className="relative w-full h-[290px] sm:h-[350px] lg:h-[410px] my-auto cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        style={{
          perspective: `${metrics.perspective}px`,
          perspectiveOrigin: '50% 50%'
        }}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { 
          isHoveredRef.current = false; 
          isDraggingRef.current = false;
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches.length === 1) handlePointerDown(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handlePointerUp}
      >
        {/* Cylinder Track */}
        <div 
          ref={trackRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        >
          {GALLERY_FRAMES.map((frame, index) => (
            <div
              key={frame.id}
              className="absolute top-1/2 left-1/2 will-change-transform pointer-events-none"
              style={{
                width: `${metrics.cardWidth}px`,
                height: `${metrics.cardHeight}px`,
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 50%'
              }}
            >
              {/* Card Container with Clean Zero-Gap Flush Alignment & Luxury Shadow */}
              <div 
                className="relative w-full h-full overflow-hidden bg-white shadow-[0_20px_45px_rgba(31,41,55,0.14)] border-r border-l border-black/10 transition-transform duration-200"
              >
                {/* Automotive Image */}
                <img
                  src={frame.image}
                  alt={frame.name}
                  role="presentation"
                  draggable={false}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center filter contrast-[1.06] brightness-[1.0] select-none"
                />

                {/* Subtle Luxury Sheen Gradient */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 40%, rgba(31, 41, 55, 0.25) 100%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Soft edge fade left and right matching #F4F5F7 background */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 lg:w-56 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, #F4F5F7 25%, rgba(244, 245, 247, 0.85) 60%, transparent 100%)'
          }}
        />
        <div 
          className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 lg:w-56 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, #F4F5F7 25%, rgba(244, 245, 247, 0.85) 60%, transparent 100%)'
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* --- BOTTOM CAPTION (RELEVANT TO FUSION CARS BUSINESS) --- */}
      {/* ======================================================== */}
      <div className="relative z-20 text-center max-w-xl mx-auto px-4 mt-4 sm:mt-8">
        <p className="text-sm sm:text-base text-[#4B5563] font-normal leading-[1.6]">
          From bespoke flagship cruisers to track-bred supercars, explore our 150-point verified collection available for immediate white-glove delivery in New Delhi.
        </p>
      </div>
    </section>
  );
}
