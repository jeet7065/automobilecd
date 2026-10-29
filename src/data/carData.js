// Comprehensive Engineering & Telemetry Data for Lamborghini Huracán LP 580-2

export const VEHICLE_DATA = {
  brand: 'AUTOMOBILI LAMBORGHINI',
  model: 'HURACÁN LP 580-2',
  tagline: 'THE ESSENCE OF REAR-WHEEL DRIVE PURITY',
  classification: 'Naturally Aspirated Mid-Engine Super Sports Car',
  basePriceUSD: '$261,274',
  basePriceINR: '₹ 3.22 Cr',
  
  // Real-time HUD telemetry
  telemetry: {
    acceleration: '3.4 s',
    accelerationLabel: '0-100 KM/H',
    topSpeed: '320 km/h',
    topSpeedLabel: 'TOP SPEED (199 MPH)',
    maxPower: '580 CV',
    powerHp: '572 HP @ 8,000 RPM',
    maxTorque: '540 Nm',
    torqueLabel: '@ 6,500 RPM',
    weightDistribution: '40% Front / 60% Rear',
    dryWeight: '1,389 kg',
    powerToWeight: '2.4 kg/HP',
    fuelEfficiency: '11.9 L/100 km',
  },

  // Comprehensive Engineering Dossier
  dossier: {
    powertrain: [
      { key: 'Engine Type', value: 'Naturally Aspirated 90° V10, Titanium Intake Valves' },
      { key: 'Displacement', value: '5,204 cm³ (317.6 cu in)' },
      { key: 'Bore & Stroke', value: '84.5 mm x 92.8 mm' },
      { key: 'Compression Ratio', value: '12.7 : 1' },
      { key: 'Max Power', value: '580 CV (426 kW / 572 HP) @ 8,000 RPM' },
      { key: 'Max Torque', value: '540 Nm (398 lb-ft) @ 6,500 RPM' },
      { key: 'Lubrication', value: 'Dry Sump with 8 scavenge pumps' },
      { key: 'Emission Standard', value: 'Euro 6 - LEV II compliant' }
    ],
    drivetrain: [
      { key: 'Drive Type', value: 'Rear-Wheel Drive (RWD) with Mechanical Self-Locking Diff' },
      { key: 'Transmission', value: '7-speed LDF (Lamborghini Doppia Frizione) Dual-Clutch' },
      { key: 'Clutch', value: 'Dual-Plate Wet Clutch with Launch Control (Thrust Mode)' },
      { key: 'Driving Modes', value: 'ANIMA selector: STRADA, SPORT, CORSA' }
    ],
    chassis: [
      { key: 'Chassis Construction', value: 'Hybrid aluminum and carbon fiber spaceframe' },
      { key: 'Body Outer Skin', value: 'Aluminum and composite material' },
      { key: 'Suspension', value: 'Double wishbone front & rear with Magneto-Rheological Dampers' },
      { key: 'Steering', value: 'Electro-mechanical power steering / optional LDS dynamic ratio' }
    ],
    dimensions: [
      { key: 'Wheelbase', value: '2,620 mm (103.1 in)' },
      { key: 'Overall Length', value: '4,459 mm (175.6 in)' },
      { key: 'Overall Width (excl. mirrors)', value: '1,924 mm (75.7 in)' },
      { key: 'Overall Height', value: '1,165 mm (45.9 in)' },
      { key: 'Front / Rear Track', value: '1,668 mm / 1,620 mm' },
      { key: 'Fuel Tank Capacity', value: '83 Liters' }
    ]
  }
};

export const CAR_BRANDS = [
  { id: 'all', name: 'All Brands', count: 9 },
  { id: 'lamborghini', name: 'Lamborghini', count: 2, badge: '🐂', origin: 'Sant’Agata Bolognese, Italy' },
  { id: 'ferrari', name: 'Ferrari', count: 1, badge: '🐎', origin: 'Maranello, Italy' },
  { id: 'porsche', name: 'Porsche', count: 1, badge: '🛡️', origin: 'Stuttgart, Germany' },
  { id: 'rolls-royce', name: 'Rolls-Royce', count: 1, badge: '👑', origin: 'Goodwood, England' },
  { id: 'mclaren', name: 'McLaren', count: 1, badge: '⚡', origin: 'Woking, England' },
  { id: 'aston-martin', name: 'Aston Martin', count: 1, badge: '🦅', origin: 'Gaydon, England' },
  { id: 'bentley', name: 'Bentley', count: 1, badge: '🪽', origin: 'Crewe, England' },
  { id: 'bugatti', name: 'Bugatti', count: 1, badge: '💎', origin: 'Molsheim, France' }
];

export const CAR_TYPES = [
  { id: 'all', name: 'All Types' },
  { id: 'supercar', name: 'Super Sports Coupe' },
  { id: 'spyder', name: 'Open-Top Spyder / Roadster' },
  { id: 'hypercar', name: 'Hypercar / Track Edition' },
  { id: 'grand-tourer', name: 'Ultra-Luxury Grand Tourer' },
  { id: 'suv', name: 'High-Performance Super SUV' }
];

export const PRICE_RANGES = [
  { id: 'all', name: 'All Prices', min: 0, max: 10000000 },
  { id: 'under-250k', name: 'Under $250,000', min: 0, max: 250000, label: 'Entry Exotic Tier' },
  { id: '250k-500k', name: '$250,000 - $500,000', min: 250000, max: 500000, label: 'Supercar Tier' },
  { id: '500k-1m', name: '$500,000 - $1,000,000', min: 500000, max: 1000000, label: 'Hypercar Tier' },
  { id: '1m-plus', name: '$1,000,000+ (Ultra-Bespoke)', min: 1000000, max: 10000000, label: 'Bespoke Apex' }
];

export const LUXURY_CAR_FLEET = [
  {
    id: 'lambo-huracan-sto',
    name: 'Huracán STO',
    brand: 'Lamborghini',
    brandId: 'lamborghini',
    type: 'Hypercar / Track Edition',
    typeId: 'hypercar',
    priceUSD: 345000,
    priceFormatted: '$345,000',
    priceINR: '₹ 4.99 Cr',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    power: '640 HP',
    acceleration: '3.0s',
    topSpeed: '310 km/h',
    engine: '5.2L Naturally Aspirated V10',
    tag: 'TRACK WEAPON',
    dna: ['v10', 'track', 'zero-mileage'],
    status: 'IN SHOWROOM',
    year: '2025'
  },
  {
    id: 'ferrari-sf90-spider',
    name: 'SF90 Spider Assetto Fiorano',
    brand: 'Ferrari',
    brandId: 'ferrari',
    type: 'Open-Top Spyder / Roadster',
    typeId: 'spyder',
    priceUSD: 570000,
    priceFormatted: '$570,000',
    priceINR: '₹ 7.50 Cr',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
    power: '1,000 HP',
    acceleration: '2.5s',
    topSpeed: '340 km/h',
    engine: '4.0L Twin-Turbo V8 + 3 e-Motors',
    tag: 'HYBRID HYPERCAR',
    dna: ['hybrid', '0-100-under-3', 'zero-mileage'],
    status: 'COMMISSION ALLOCATION',
    year: '2025'
  },
  {
    id: 'porsche-911-gt3rs',
    name: '911 GT3 RS (992 Weissach)',
    brand: 'Porsche',
    brandId: 'porsche',
    type: 'Super Sports Coupe',
    typeId: 'supercar',
    priceUSD: 295000,
    priceFormatted: '$295,000',
    priceINR: '₹ 3.80 Cr',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    power: '525 HP',
    acceleration: '3.2s',
    topSpeed: '296 km/h',
    engine: '4.0L Naturally Aspirated Boxer-6',
    tag: 'AERODYNAMIC PINNACLE',
    dna: ['track', 'bespoke'],
    status: 'IN SHOWROOM',
    year: '2024'
  },
  {
    id: 'rolls-royce-spectre',
    name: 'Spectre Black Badge',
    brand: 'Rolls-Royce',
    brandId: 'rolls-royce',
    type: 'Ultra-Luxury Grand Tourer',
    typeId: 'grand-tourer',
    priceUSD: 485000,
    priceFormatted: '$485,000',
    priceINR: '₹ 9.20 Cr',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80',
    power: '585 HP',
    acceleration: '4.5s',
    topSpeed: '250 km/h',
    engine: 'Dual Synchronous Electric Motors',
    tag: 'BESPOKE MONARCH',
    dna: ['bespoke', 'zero-mileage'],
    status: 'RESERVED PREVIEW',
    year: '2025'
  },
  {
    id: 'mclaren-750s-spider',
    name: '750S Spider Carbon Edition',
    brand: 'McLaren',
    brandId: 'mclaren',
    type: 'Open-Top Spyder / Roadster',
    typeId: 'spyder',
    priceUSD: 345000,
    priceFormatted: '$345,000',
    priceINR: '₹ 5.10 Cr',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80',
    power: '750 HP',
    acceleration: '2.8s',
    topSpeed: '332 km/h',
    engine: '4.0L Twin-Turbo V8',
    tag: 'LIGHTWEIGHT MONOCOQUE',
    dna: ['0-100-under-3', 'track'],
    status: 'IN SHOWROOM',
    year: '2025'
  },
  {
    id: 'aston-martin-dbs',
    name: 'DBS 770 Ultimate',
    brand: 'Aston Martin',
    brandId: 'aston-martin',
    type: 'Ultra-Luxury Grand Tourer',
    typeId: 'grand-tourer',
    priceUSD: 415000,
    priceFormatted: '$415,000',
    priceINR: '₹ 6.20 Cr',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    power: '770 HP',
    acceleration: '3.4s',
    topSpeed: '340 km/h',
    engine: '5.2L Twin-Turbo V12',
    tag: '1 OF 499 WORLDWIDE',
    dna: ['v12', 'bespoke'],
    status: 'COLLECTOR GRADE',
    year: '2024'
  },
  {
    id: 'lambo-urus-performante',
    name: 'Urus Performante Full Carbon',
    brand: 'Lamborghini',
    brandId: 'lamborghini',
    type: 'High-Performance Super SUV',
    typeId: 'suv',
    priceUSD: 269000,
    priceFormatted: '$269,000',
    priceINR: '₹ 4.22 Cr',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    power: '666 HP',
    acceleration: '3.3s',
    topSpeed: '306 km/h',
    engine: '4.0L Twin-Turbo V8',
    tag: 'SUPER SUV APEX',
    dna: ['zero-mileage'],
    status: 'IN SHOWROOM',
    year: '2025'
  },
  {
    id: 'bugatti-chiron-ss',
    name: 'Chiron Super Sport 300+',
    brand: 'Bugatti',
    brandId: 'bugatti',
    type: 'Hypercar / Track Edition',
    typeId: 'hypercar',
    priceUSD: 3900000,
    priceFormatted: '$3,900,000',
    priceINR: '₹ 45.0 Cr',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    power: '1,600 HP',
    acceleration: '2.4s',
    topSpeed: '440 km/h',
    engine: '8.0L Quad-Turbo W16',
    tag: 'HYPERCAR ROYALTY',
    dna: ['0-100-under-3', 'bespoke', 'track'],
    status: 'PRIVATE RESERVE',
    year: '2024'
  },
  {
    id: 'bentley-continental-gt',
    name: 'Continental GT Speed Mulliner',
    brand: 'Bentley',
    brandId: 'bentley',
    type: 'Ultra-Luxury Grand Tourer',
    typeId: 'grand-tourer',
    priceUSD: 310000,
    priceFormatted: '$310,000',
    priceINR: '₹ 4.80 Cr',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    power: '659 HP',
    acceleration: '3.6s',
    topSpeed: '335 km/h',
    engine: '6.0L Twin-Turbo W12',
    tag: 'MULLINER BESPOKE',
    dna: ['bespoke', 'v12'],
    status: 'IN SHOWROOM',
    year: '2025'
  }
];

