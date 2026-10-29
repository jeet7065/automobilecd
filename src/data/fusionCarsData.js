// Comprehensive Data for Fusion Cars (New Delhi, India - fusioncars.in)
// Founded in 2008 by Manoj Malik & Tarun Malik

export const FUSION_CARS_INFO = {
  name: 'FUSION CARS',
  tagline: 'PRE-OWNED LUXURY & EXOTIC CARS IN INDIA',
  experienceYears: '16+',
  foundedYear: '2008',
  founders: 'Manoj Malik & Tarun Malik',
  rating: '4.8',
  totalReviews: '1,250+',
  carsDelivered: '5,000+',
  inspectionPoints: '150+',
  address: 'A-99/100, Ganesh Nagar, Tilak Nagar, New Delhi, Delhi 110018',
  landmark: 'Near Tilak Nagar Metro Station',
  phonePrimary: '+91 9999999681',
  phoneSecondary: '+91 9999992532',
  email: 'tarun.fusion@gmail.com',
  workingHours: 'Mon - Sun: 10:00 AM - 8:00 PM',
  whatsappUrl: 'https://wa.me/919999999681?text=Hi%20Fusion%20Cars%20Team%2C%20I%20am%20interested%20in%20exploring%20your%20luxury%20collection'
};

export const FUSION_BRANDS = [
  { id: 'all', name: 'All Brands', count: 12 },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', count: 4, badge: '⭐' },
  { id: 'bmw', name: 'BMW', count: 3, badge: '🔵' },
  { id: 'audi', name: 'Audi', count: 2, badge: '⭕' },
  { id: 'land-rover', name: 'Land Rover / Range Rover', count: 3, badge: '🛡️' },
  { id: 'porsche', name: 'Porsche', count: 2, badge: '🐎' },
  { id: 'lamborghini', name: 'Lamborghini', count: 1, badge: '🐂' },
  { id: 'rolls-royce', name: 'Rolls-Royce', count: 1, badge: '👑' },
  { id: 'bentley', name: 'Bentley', count: 1, badge: '🪽' },
  { id: 'ferrari', name: 'Ferrari', count: 1, badge: '🏎️' },
  { id: 'jaguar', name: 'Jaguar', count: 1, badge: '🐆' },
  { id: 'ford', name: 'Ford Mustang', count: 1, badge: '🐎' }
];

export const FUSION_BODY_TYPES = [
  { id: 'all', name: 'All Body Types' },
  { id: 'suv', name: 'Luxury SUVs & Off-Roaders' },
  { id: 'sedan', name: 'Flagship & Executive Sedans' },
  { id: 'coupe-convertible', name: 'Coupes & Convertibles' },
  { id: 'supercar', name: 'Supercars & Exotics' }
];

export const FUSION_PRICE_RANGES = [
  { id: 'all', name: 'All Price Segments', min: 0, max: 150000000 },
  { id: 'under-50l', name: 'Under ₹50 Lakhs', min: 0, max: 5000000, label: 'Entry Luxury' },
  { id: '50l-1cr', name: '₹50 Lakhs - ₹1 Crore', min: 5000000, max: 10000000, label: 'Executive Segment' },
  { id: '1cr-2.5cr', name: '₹1 Crore - ₹2.5 Crores', min: 10000000, max: 25000000, label: 'Super Luxury' },
  { id: '2.5cr-plus', name: '₹2.5 Crores - ₹10+ Crores', min: 25000000, max: 150000000, label: 'Exotic & Ultra-Luxury' }
];

export const FUSION_INVENTORY = [
  {
    id: 'fc-101',
    name: 'Land Rover Defender 110 D300 HSE',
    brand: 'Land Rover / Range Rover',
    brandId: 'land-rover',
    bodyType: 'Luxury SUVs & Off-Roaders',
    bodyTypeId: 'suv',
    year: '2023',
    regState: 'DL (Delhi)',
    kms: '14,200 km',
    fuel: 'Diesel',
    transmission: 'Automatic 8-Speed AWD',
    owners: '1st Owner',
    priceINR: '₹ 1.38 Crore',
    priceRaw: 13800000,
    emiStarts: '₹ 1,78,000/mo',
    color: 'Santorini Black with Khaki Windsor Leather',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '3.0L 6-Cylinder Turbocharged Ingenium Diesel',
      power: '300 PS @ 4,000 RPM',
      torque: '650 Nm @ 1,500 - 2,500 RPM',
      acceleration: '7.0s (0-100 km/h)',
      drive: 'All-Wheel Drive with Terrain Response 2'
    },
    features: [
      'Sliding Panoramic Sunroof',
      'Meridian 3D Surround Sound System',
      'Electronic Air Suspension with Adaptive Dynamics',
      '3D Surround Camera with Clearsight Ground View',
      '20-inch Gloss Dark Grey Diamond Turned Alloys'
    ],
    inspectionPassed: 150,
    status: 'IN DELHI SHOWROOM'
  },
  {
    id: 'fc-102',
    name: 'Mercedes-Benz G63 AMG 4MATIC',
    brand: 'Mercedes-Benz',
    brandId: 'mercedes-benz',
    bodyType: 'Luxury SUVs & Off-Roaders',
    bodyTypeId: 'suv',
    year: '2022',
    regState: 'HR (Haryana VIP Number)',
    kms: '18,500 km',
    fuel: 'Petrol',
    transmission: 'AMG SPEEDSHIFT 9G-TRONIC',
    owners: '1st Owner',
    priceINR: '₹ 2.95 Crore',
    priceRaw: 29500000,
    emiStarts: '₹ 3,85,000/mo',
    color: 'Designo Magno Matte Black / Red Nappa Leather',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '4.0L Bi-Turbo V8 Handcrafted by AMG',
      power: '585 HP @ 6,000 RPM',
      torque: '850 Nm @ 2,500 - 3,500 RPM',
      acceleration: '4.5s (0-100 km/h)',
      drive: 'All-Wheel Drive with 3 Differential Locks'
    },
    features: [
      'AMG Performance Exhaust with Dual Side Pipes',
      'Burmester High-End Surround Sound',
      '22-inch AMG Forged Cross-Spoke Matte Alloys',
      'AMG Ride Control Sport Suspension',
      'Exclusive Carbon Fiber Interior Trim'
    ],
    inspectionPassed: 150,
    status: 'READY FOR IMMEDIATE DELIVERY'
  },
  {
    id: 'fc-103',
    name: 'Rolls-Royce Ghost Series II Extended',
    brand: 'Rolls-Royce',
    brandId: 'rolls-royce',
    bodyType: 'Flagship & Executive Sedans',
    bodyTypeId: 'sedan',
    year: '2021',
    regState: 'DL (Delhi)',
    kms: '9,800 km',
    fuel: 'Petrol',
    transmission: '8-Speed Satellite Aided Transmission',
    owners: '1st Owner (Celebrity Owned)',
    priceINR: '₹ 5.25 Crore',
    priceRaw: 52500000,
    emiStarts: '₹ 6,80,000/mo',
    color: 'English White with Seashell & Mandarin Leather',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '6.75L Twin-Turbocharged V12 Engine',
      power: '571 HP @ 5,000 RPM',
      torque: '850 Nm @ 1,600 RPM',
      acceleration: '4.8s (0-100 km/h)',
      drive: 'All-Wheel Drive with All-Wheel Steering'
    },
    features: [
      'Bespoke Starlight Headliner with Shooting Star Feature',
      'Illuminated Spirit of Ecstasy & Pantheon Grille',
      'Rear Theater Lounge with Champagne Cooler',
      'Planar Suspension System with Flagbearer Road Scanner',
      'Effortless Electric Power-Closing Coach Doors'
    ],
    inspectionPassed: 150,
    status: 'IN DELHI SHOWROOM'
  },
  {
    id: 'fc-104',
    name: 'Lamborghini Huracán LP 610-4 Spyder',
    brand: 'Lamborghini',
    brandId: 'lamborghini',
    bodyType: 'Supercars & Exotics',
    bodyTypeId: 'supercar',
    year: '2020',
    regState: 'CH (Chandigarh VIP)',
    kms: '11,400 km',
    fuel: 'Petrol',
    transmission: '7-speed LDF Dual-Clutch with Paddle Shifters',
    owners: '2nd Owner',
    priceINR: '₹ 3.45 Crore',
    priceRaw: 34500000,
    emiStarts: '₹ 4,45,000/mo',
    color: 'Giallo Inti Pearl Yellow with Nero Ade Leather',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '5.2L Naturally Aspirated V10 Engine',
      power: '610 HP @ 8,250 RPM',
      torque: '560 Nm @ 6,500 RPM',
      acceleration: '3.4s (0-100 km/h)',
      drive: 'Electronically Controlled All-Wheel Drive'
    },
    features: [
      'Capristo Valved Titanium Exhaust System (₹8L upgrade)',
      'Front Axle Hydraulic Lifting System',
      'Carbon Ceramic Brakes with Yellow Calipers',
      'Sensonum Premium Audio System',
      'Electro-Hydraulic Lightweight Soft Top (opens in 17s)'
    ],
    inspectionPassed: 150,
    status: 'FEATURED EXOTIC'
  },
  {
    id: 'fc-105',
    name: 'Porsche 911 Carrera S (992)',
    brand: 'Porsche',
    brandId: 'porsche',
    bodyType: 'Coupes & Convertibles',
    bodyTypeId: 'coupe-convertible',
    year: '2022',
    regState: 'DL (Delhi VIP)',
    kms: '12,800 km',
    fuel: 'Petrol',
    transmission: '8-Speed Porsche Doppelkupplung (PDK)',
    owners: '1st Owner',
    priceINR: '₹ 1.88 Crore',
    priceRaw: 18800000,
    emiStarts: '₹ 2,45,000/mo',
    color: 'Guards Red with Full Black Leather & Red Stitching',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '3.0L Twin-Turbo Boxer-6 Rear Engine',
      power: '450 HP @ 6,500 RPM',
      torque: '530 Nm @ 2,300 - 5,000 RPM',
      acceleration: '3.5s (0-100 km/h with Sport Chrono)',
      drive: 'Rear-Wheel Drive with Rear Axle Steering'
    },
    features: [
      'Sport Chrono Package with Mode Switch on Steering',
      'Sports Exhaust System with Black Tailpipes',
      'PASM Sport Suspension (-10 mm ride height)',
      'BOSE Surround Sound System (570 Watts)',
      '20/21-inch Carrera Classic Diamond Cut Wheels'
    ],
    inspectionPassed: 150,
    status: 'IN DELHI SHOWROOM'
  },
  {
    id: 'fc-106',
    name: 'Range Rover Autobiography LWB 4.4 V8',
    brand: 'Land Rover / Range Rover',
    brandId: 'land-rover',
    bodyType: 'Luxury SUVs & Off-Roaders',
    bodyTypeId: 'suv',
    year: '2023',
    regState: 'DL (Delhi)',
    kms: '8,900 km',
    fuel: 'Petrol',
    transmission: '8-Speed Automatic with CommandShift',
    owners: '1st Owner',
    priceINR: '₹ 3.85 Crore',
    priceRaw: 38500000,
    emiStarts: '₹ 4,95,000/mo',
    color: 'Carpathian Grey Metallic with Perlino Semi-Aniline',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '4.4L Twin-Turbocharged V8 Engine',
      power: '530 PS @ 5,500 - 6,000 RPM',
      torque: '750 Nm @ 1,800 - 4,600 RPM',
      acceleration: '4.6s (0-100 km/h)',
      drive: 'Intelligent All-Wheel Drive with Active Rear Locking'
    },
    features: [
      'Executive Class Comfort Rear Lounge Seats with Hot Stone Massage',
      'Meridian Signature Sound System with Active Noise Cancellation in Headrests',
      'Tailgate Event Suite with Leather Cushions',
      'Four-Wheel Steering with 7.3° Rear Steering Angle',
      'Electronic Air Suspension with Dynamic Response Pro'
    ],
    inspectionPassed: 150,
    status: 'CERTIFIED LUXURY'
  },
  {
    id: 'fc-107',
    name: 'BMW M8 Competition Coupé',
    brand: 'BMW',
    brandId: 'bmw',
    bodyType: 'Coupes & Convertibles',
    bodyTypeId: 'coupe-convertible',
    year: '2021',
    regState: 'PB (Punjab VIP)',
    kms: '15,600 km',
    fuel: 'Petrol',
    transmission: '8-Speed M Steptronic with Drivelogic',
    owners: '1st Owner',
    priceINR: '₹ 1.55 Crore',
    priceRaw: 15500000,
    emiStarts: '₹ 1,98,000/mo',
    color: 'Isle of Man Green Metallic / Silverstone Full Merino',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '4.4L M TwinPower Turbo V8 Engine',
      power: '625 HP @ 6,000 RPM',
      torque: '750 Nm @ 1,800 - 5,860 RPM',
      acceleration: '3.2s (0-100 km/h)',
      drive: 'M xDrive AWD with 2WD Rear-Wheel Drift Mode'
    },
    features: [
      'M Carbon Ceramic Brakes with Gold Calipers',
      'Bowers & Wilkins Diamond Surround Sound System',
      'Carbon Fiber Roof & M Carbon Exterior Package',
      'BMW Laserlight with Selective Beam',
      'M Sports Exhaust with Quad Flap Controlled Pipes'
    ],
    inspectionPassed: 150,
    status: 'IN DELHI SHOWROOM'
  },
  {
    id: 'fc-108',
    name: 'Mercedes-Maybach S-Class S580 4MATIC',
    brand: 'Mercedes-Benz',
    brandId: 'mercedes-benz',
    bodyType: 'Flagship & Executive Sedans',
    bodyTypeId: 'sedan',
    year: '2023',
    regState: 'DL (Delhi VIP)',
    kms: '7,400 km',
    fuel: 'Mild Hybrid Petrol',
    transmission: '9G-TRONIC Automatic',
    owners: '1st Owner',
    priceINR: '₹ 2.85 Crore',
    priceRaw: 28500000,
    emiStarts: '₹ 3,65,000/mo',
    color: 'Two-Tone Obsidian Black / High-Tech Silver',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '4.0L V8 Biturbo with EQ Boost 48V Hybrid',
      power: '503 HP + 20 HP EQ Boost',
      torque: '700 Nm @ 2,000 - 4,500 RPM',
      acceleration: '4.8s (0-100 km/h)',
      drive: 'Fully Variable 4MATIC All-Wheel Drive'
    },
    features: [
      'First-Class Rear Compartment with Continuous Business Center Console',
      'Burmester 4D High-End Surround Sound with Exciters in Seat Backrests',
      'Digital Light Headlamps with Projection Guidance',
      'Active Road Noise Compensation',
      'Electrically Operated Comfort Rear Doors with Gesture Control'
    ],
    inspectionPassed: 150,
    status: 'TOP SPEC MAYBACH'
  },
  {
    id: 'fc-109',
    name: 'BMW X7 xDrive40i M Sport',
    brand: 'BMW',
    brandId: 'bmw',
    bodyType: 'Luxury SUVs & Off-Roaders',
    bodyTypeId: 'suv',
    year: '2022',
    regState: 'HR (Haryana)',
    kms: '22,000 km',
    fuel: 'Petrol',
    transmission: '8-Speed Steptronic Sport Automatic',
    owners: '1st Owner',
    priceINR: '₹ 98.00 Lakh',
    priceRaw: 9800000,
    emiStarts: '₹ 1,28,000/mo',
    color: 'Mineral White Metallic with Tartufo Extended Merino',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '3.0L BMW TwinPower Turbo Inline 6-Cylinder',
      power: '340 HP @ 5,500 - 6,500 RPM',
      torque: '450 Nm @ 1,500 - 5,200 RPM',
      acceleration: '6.1s (0-100 km/h)',
      drive: 'xDrive Intelligent All-Wheel Drive'
    },
    features: [
      'Sky Lounge Panoramic Glass Roof with 15,000 Illuminating Points',
      'CraftedClarity Glass Gear Lever & iDrive Controller',
      'Harman Kardon Surround Sound System',
      'Two-Axle Air Suspension with Height Adjustment',
      '5-Zone Automatic Climate Control'
    ],
    inspectionPassed: 150,
    status: 'UNDER ₹1 CRORE'
  },
  {
    id: 'fc-110',
    name: 'Audi Q7 55 TFSI Quattro Technology',
    brand: 'Audi',
    brandId: 'audi',
    bodyType: 'Luxury SUVs & Off-Roaders',
    bodyTypeId: 'suv',
    year: '2022',
    regState: 'DL (Delhi)',
    kms: '19,500 km',
    fuel: 'Petrol',
    transmission: '8-Speed Tiptronic Quattro',
    owners: '1st Owner',
    priceINR: '₹ 74.50 Lakh',
    priceRaw: 7450000,
    emiStarts: '₹ 98,000/mo',
    color: 'Navarra Blue Metallic with Saiga Beige Leather',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '3.0L V6 TFSI Turbocharged Petrol Engine',
      power: '340 HP @ 5,200 - 6,400 RPM',
      torque: '500 Nm @ 1,370 - 4,500 RPM',
      acceleration: '5.9s (0-100 km/h)',
      drive: 'Quattro Permanent All-Wheel Drive'
    },
    features: [
      'Matrix LED Headlights with Dynamic Indicators',
      'Bang & Olufsen 3D Premium Sound System',
      'Audi Virtual Cockpit Plus with Dual MMI Touchscreens',
      'Adaptive Air Suspension with 7 Drive Modes',
      'Park Assist Plus with 360-Degree Camera'
    ],
    inspectionPassed: 150,
    status: 'POPULAR CHOICE'
  },
  {
    id: 'fc-111',
    name: 'Ford Mustang GT 5.0 V8 Fastback',
    brand: 'Ford Mustang',
    brandId: 'ford',
    bodyType: 'Coupes & Convertibles',
    bodyTypeId: 'coupe-convertible',
    year: '2019',
    regState: 'DL (Delhi)',
    kms: '24,000 km',
    fuel: 'Petrol',
    transmission: '6-Speed SelectShift Automatic with Paddles',
    owners: '2nd Owner',
    priceINR: '₹ 62.00 Lakh',
    priceRaw: 6200000,
    emiStarts: '₹ 82,000/mo',
    color: 'Race Red with Dual Ebony Racing Stripes',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '5.0L Ti-VCT Naturally Aspirated V8 Coyote Engine',
      power: '401 HP @ 6,500 RPM',
      torque: '515 Nm @ 4,250 RPM',
      acceleration: '4.8s (0-100 km/h)',
      drive: 'Rear-Wheel Drive with Limited Slip Differential'
    },
    features: [
      'Borla ATAK Exhaust Upgrade (roaring American V8 tone)',
      'Track Apps with Electronic Line Lock & Launch Control',
      'Brembo 6-Piston Front Brake Calipers',
      'Selectable Drive Modes (Normal, Sport+, Track, Snow/Wet)',
      '19-inch Ebony Black Painted Aluminum Wheels'
    ],
    inspectionPassed: 150,
    status: 'V8 MUSCLE ICON'
  },
  {
    id: 'fc-112',
    name: 'Bentley Continental GT V8 Mulliner',
    brand: 'Bentley',
    brandId: 'bentley',
    bodyType: 'Coupes & Convertibles',
    bodyTypeId: 'coupe-convertible',
    year: '2021',
    regState: 'MH (Mumbai VIP)',
    kms: '10,200 km',
    fuel: 'Petrol',
    transmission: '8-Speed Dual-Clutch with Active AWD',
    owners: '1st Owner',
    priceINR: '₹ 3.65 Crore',
    priceRaw: 36500000,
    emiStarts: '₹ 4,75,000/mo',
    color: 'St. James Red with Beluga & Hotspur Diamond Quilting',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    keySpecs: {
      engine: '4.0L Twin-Turbocharged 32-Valve V8',
      power: '550 PS @ 6,000 RPM',
      torque: '770 Nm @ 2,000 - 4,500 RPM',
      acceleration: '4.0s (0-100 km/h)',
      drive: 'Active All-Wheel Drive with 48V Dynamic Ride'
    },
    features: [
      'Bentley Rotating Display (12.3-inch Touchscreen / Veneer / 3 Gauges)',
      'Naim for Bentley 2,200W 18-Speaker Audio System',
      'Mulliner Driving Specification with Diamond-in-Diamond Quilting',
      'Bentley Dynamic Ride 48V Electronic Anti-Roll Control',
      '22-inch Mulliner Polished Alloys with Floating Center Caps'
    ],
    inspectionPassed: 150,
    status: 'IN DELHI SHOWROOM'
  }
];

export const FUSION_SERVICES = [
  {
    id: 'buy',
    title: 'Certified Pre-Owned Luxury Sales',
    desc: 'Access to 100+ inspected luxury cars & supercars under one roof with verified service history and clear titles.',
    badge: '100% VERIFIED'
  },
  {
    id: 'sell',
    title: 'Instant Car Valuation & Doorstep Sale',
    desc: 'Sell your luxury vehicle at true market value with no hidden cuts, instant doorstep evaluation, and immediate RTGS payment.',
    badge: 'INSTANT CASH'
  },
  {
    id: 'finance',
    title: 'Custom Luxury Financing & Insurance',
    desc: 'Tie-ups with leading private banks (HDFC, ICICI, Kotak, Axis) providing lowest interest rates and up to 85% loan coverage.',
    badge: 'LOWEST EMI'
  },
  {
    id: 'transport',
    title: 'All-India Enclosed Transportation',
    desc: 'White-glove delivery directly to your driveway in Mumbai, Bengaluru, Hyderabad, Chandigarh, or any city across India.',
    badge: 'PAN INDIA'
  },
  {
    id: 'rto',
    title: 'Complete RTO Paperwork & NOC Transfer',
    desc: 'End-to-end hassle-free name transfer, state NOC generation, and road tax assistance handled by our dedicated documentation team.',
    badge: 'HASSLE FREE'
  },
  {
    id: 'detailing',
    title: 'In-House Ceramic Coating & Detailing Studio',
    desc: 'Every car leaves our showroom in showroom-floor condition with multi-stage paint correction, ceramic sealants, and deep interior hygiene.',
    badge: 'CONCOURS SHINE'
  }
];

export const FUSION_REVIEWS = [
  {
    id: 1,
    client: 'Vikramaditya Singhania',
    city: 'New Delhi (Civil Lines)',
    car: 'Purchased Range Rover Autobiography LWB',
    rating: 5,
    text: 'Fusion Cars delivered my Range Rover in pristine condition. Manoj & Tarun Malik provided complete transparency with genuine service records from JLR workshop. The vehicle drives like brand new.',
    date: 'March 2026'
  },
  {
    id: 2,
    client: 'Rajeshwar Chauhan',
    city: 'Gurugram (Golf Course Road)',
    car: 'Sold Porsche 911 & Bought Mercedes G63 AMG',
    rating: 5,
    text: 'Sold my 911 at a fair valuation in less than 24 hours with full payment into my account before car pickup. Then upgraded to a G63 AMG. The best luxury car dealership in Delhi NCR by far!',
    date: 'February 2026'
  },
  {
    id: 3,
    client: 'Dr. Ananya Sen',
    city: 'Bengaluru (Indiranagar)',
    car: 'Purchased BMW M8 Competition',
    rating: 5,
    text: 'I was hesitant about buying from Delhi while living in Bangalore, but the Fusion Cars team sent a 50-point video inspection and transported it in an enclosed container right to my home. Stellar service!',
    date: 'January 2026'
  }
];

export const FUSION_BLOGS = [
  {
    id: 1,
    title: 'The Ultimate Guide to Buying Pre-Owned Luxury Cars in India (2026)',
    excerpt: 'Key checkpoints, verified odometer testing, and why certified pre-owned supercars are the smartest financial choice today.',
    readTime: '5 min read',
    category: 'BUYER’S GUIDE',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Maintaining a V8/V10 Supercar in Delhi NCR Climate: Expert Insights',
    excerpt: 'From high summer cooling maintenance to fuel quality management, how Fusion Cars technicians keep exotics running at peak RPM.',
    readTime: '4 min read',
    category: 'TECHNICAL',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Range Rover Defender vs G-Wagon: Which Luxury SUV Dominates in India?',
    excerpt: 'A comprehensive telemetry, resale value, and road-presence comparison of India’s two most sought-after flagship SUVs.',
    readTime: '6 min read',
    category: 'COMPARISON',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
  }
];

