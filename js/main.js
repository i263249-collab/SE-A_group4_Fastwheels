/**
 * FASTWHEELS - Shared JavaScript Utilities & Vehicle Catalog
 * Vanilla JavaScript (Zero third-party frameworks/libraries)
 */

'use strict';

/* ==========================================================================
   1. Shared Vehicle Data Structure (Pakistani Marketplace)
   ========================================================================== */
/**
 * Authentic Pakistani vehicle listings with realistic pricing, specs, and cities.
 * Preserves existing images inside images/ without modifying or deleting them.
 */
const FASTWHEELS_INVENTORY = [
  {
    id: 'fw-001',
    make: 'Audi',
    model: 'e-tron GT Quattro',
    year: 2023,
    bodyType: 'Sedan',
    pricePKR: 48500000,
    priceDisplay: 'PKR 4.85 Crore',
    city: 'Lahore',
    condition: 'Used',
    mileage: '12,500 km',
    engine: '93.4 kWh Dual Permanent Magnet Electric Motors (523 bhp)',
    transmission: 'Automatic (2-Speed Rear / 1-Speed Front)',
    fuel: 'Electric',
    color: 'Daytona Gray Pearl',
    assembly: 'Imported (Germany)',
    registeredIn: 'Lahore',
    image: 'images/audi.webp',
    sliderImages: ['images/audi.webp', 'images/taycan.webp', 'images/tesla.webp'],
    badge: 'Verified',
    featured: true,
    sellerName: 'Malik Zulfiqar Autos',
    sellerPhone: '+92 300 8472910',
    sellerComments: 'First owner driven vehicle imported through authorized Audi Pakistan channel. Complete 100% genuine bumper-to-bumper original paint, ceramic coated from day one. Full FastWheels 200+ point inspection report with 9.9/10 score. Biometric transfer on spot.'
  },
  {
    id: 'fw-002',
    make: 'Toyota',
    model: 'Land Cruiser ZX V8 (URJ202)',
    year: 2020,
    bodyType: 'SUV',
    pricePKR: 49500000,
    priceDisplay: 'PKR 4.95 Crore',
    city: 'Islamabad',
    condition: 'Used',
    mileage: '38,000 km',
    engine: '4.6L 1UR-FE 32-Valve Dual VVT-i V8 (304 hp)',
    transmission: '6-Speed Super ECT Automatic with Sequential Shift',
    fuel: 'Petrol',
    color: 'Pearl White 070',
    assembly: 'Imported (Japan)',
    registeredIn: 'Islamabad',
    image: 'images/bentley.webp',
    sliderImages: ['images/bentley.webp', 'images/konisegg.webp', 'images/peugeot.webp'],
    badge: 'Inspected',
    featured: true,
    sellerName: 'Capital Car Motors',
    sellerPhone: '+92 333 5148902',
    sellerComments: 'Grade 4.5 Auction Sheet verified car imported in 2021. Features Height Control Air Suspension, Rear Entertainment Screens, 360-degree cameras, cool box, and beige Nappa leather interior. Genuine low mileage guaranteed.'
  },
  {
    id: 'fw-003',
    make: 'Honda',
    model: 'Civic RS Turbo (11th Gen)',
    year: 2023,
    bodyType: 'Sedan',
    pricePKR: 9250000,
    priceDisplay: 'PKR 92.5 Lacs',
    city: 'Lahore',
    condition: 'Used',
    mileage: '14,000 km',
    engine: '1.5L VTEC Turbocharged DOHC In-line 4-Cylinder (176 hp)',
    transmission: 'M-CVT with Steering Paddle Shifters',
    fuel: 'Petrol',
    color: 'Meteoroid Gray Metallic',
    assembly: 'Local (CKD)',
    registeredIn: 'Punjab',
    image: 'images/peugeot.webp',
    sliderImages: ['images/peugeot.webp', 'images/audi.webp', 'images/mazda.webp'],
    badge: 'Certified',
    featured: true,
    sellerName: 'Hamza Tariq (Direct Owner)',
    sellerPhone: '+92 321 4488339',
    sellerComments: 'Home driven Honda Civic RS Turbo under official company warranty. Features Honda Sensing Suite (Adaptive Cruise Control, Collision Mitigation, Lane Keep Assist). All service history maintained at Honda Point Lahore.'
  },
  {
    id: 'fw-004',
    make: 'Suzuki',
    model: 'Swift GLX CVT Top of the Line',
    year: 2023,
    bodyType: 'Hatchback',
    pricePKR: 4800000,
    priceDisplay: 'PKR 48.0 Lacs',
    city: 'Karachi',
    condition: 'Used',
    mileage: '9,200 km',
    engine: '1.2L K12M VVT 4-Cylinder DOHC (81 hp)',
    transmission: 'CVT Automatic with Sports Mode',
    fuel: 'Petrol',
    color: 'Silky Silver Metallic',
    assembly: 'Local (CKD)',
    registeredIn: 'Sindh',
    image: 'images/mazda.webp',
    sliderImages: ['images/mazda.webp', 'images/peugeot.webp', 'images/taycan.webp'],
    badge: 'Verified',
    featured: true,
    sellerName: 'DHA Premium Automobiles',
    sellerPhone: '+92 300 2319401',
    sellerComments: 'Top trim Suzuki Swift GLX CVT with 6 airbags, LED projector headlights, digital climate control, cruise control, and push-start engine. Scratchless condition, first oil change completed at Pak Suzuki dealership.'
  },
  {
    id: 'fw-005',
    make: 'Porsche',
    model: 'Taycan Turbo S Performance',
    year: 2020,
    bodyType: 'Sedan',
    pricePKR: 62000000,
    priceDisplay: 'PKR 6.20 Crore',
    city: 'Karachi',
    condition: 'Used',
    mileage: '9,800 km',
    engine: 'Dual Permanent-Magnet Synchronous Motors (750 hp overboost)',
    transmission: '2-Speed Transmission on Rear Axle',
    fuel: 'Electric',
    color: 'Carrara White Metallic',
    assembly: 'Imported (Germany)',
    registeredIn: 'Sindh',
    image: 'images/taycan.webp',
    sliderImages: ['images/taycan.webp', 'images/audi.webp', 'images/tesla.webp'],
    badge: 'Exclusive',
    featured: true,
    sellerName: 'South Coast Exotics',
    sellerPhone: '+92 301 8294022',
    sellerComments: 'Porsche Centre Lahore imported Taycan Turbo S with Porsche Ceramic Composite Brakes (PCCB), Sport Chrono package, passenger display, and Burmester 3D High-End Surround Sound System. 0-100 in 2.8 seconds.'
  },
  {
    id: 'fw-006',
    make: 'Tesla',
    model: 'Model S Plaid Tri-Motor',
    year: 2023,
    bodyType: 'Sedan',
    pricePKR: 54000000,
    priceDisplay: 'PKR 5.40 Crore',
    city: 'Islamabad',
    condition: 'Used',
    mileage: '4,100 km',
    engine: 'Tri-Motor All-Wheel Drive Platform (1,020 hp)',
    transmission: 'Single-Speed Fixed Gear Direct Drive',
    fuel: 'Electric',
    color: 'Solid Black with Full Stealth PPF',
    assembly: 'Imported (USA)',
    registeredIn: 'Islamabad',
    image: 'images/tesla.webp',
    sliderImages: ['images/tesla.webp', 'images/taycan.webp', 'images/audi.webp'],
    badge: 'Zero Meter',
    featured: true,
    sellerName: 'Blue Area EV Imports',
    sellerPhone: '+92 345 5589120',
    sellerComments: 'Fastest accelerating production sedan on earth (0-100 km/h in 1.99s). Features Yoke steering wheel, 17-inch cinematic touchscreen, Full Self-Driving (FSD) computer hardware, and mobile Tesla supercharger included.'
  },
  {
    id: 'fw-007',
    make: 'Toyota',
    model: 'Corolla Altis Grande 1.8 CVT-i',
    year: 2018,
    bodyType: 'Sedan',
    pricePKR: 5400000,
    priceDisplay: 'PKR 54.0 Lacs',
    city: 'Lahore',
    condition: 'Used',
    mileage: '58,000 km',
    engine: '1.8L 2ZR-FE 16-Valve Dual VVT-i (138 hp)',
    transmission: 'CVT-i with 7-Speed Sport Sequential Shiftmatic',
    fuel: 'Petrol',
    color: 'Super White',
    assembly: 'Local (CKD)',
    registeredIn: 'Punjab',
    image: 'images/peugeot.webp',
    sliderImages: ['images/peugeot.webp', 'images/bentley.webp', 'images/mazda.webp'],
    badge: 'Verified',
    featured: false,
    sellerName: 'Sheikh Motors Gulberg',
    sellerPhone: '+92 300 4821099',
    sellerComments: 'Maintained throughout with genuine Toyota motor oil and filter changes. Sunroof, leather upholstery, cruise control, push start, and Android navigation. 100% non-accidental with original book and file.'
  },
  {
    id: 'fw-008',
    make: 'Honda',
    model: 'City Aspire 1.5 Prosmatec',
    year: 2015,
    bodyType: 'Sedan',
    pricePKR: 3150000,
    priceDisplay: 'PKR 31.5 Lacs',
    city: 'Karachi',
    condition: 'Used',
    mileage: '84,000 km',
    engine: '1.5L SOHC 16-Valve i-VTEC (120 hp)',
    transmission: '5-Speed Prosmatec Automatic',
    fuel: 'Petrol',
    color: 'Taffeta White',
    assembly: 'Local (CKD)',
    registeredIn: 'Sindh',
    image: 'images/mazda.webp',
    sliderImages: ['images/mazda.webp', 'images/audi.webp', 'images/peugeot.webp'],
    badge: 'Inspected',
    featured: false,
    sellerName: 'Clifton Drive Wheels',
    sellerPhone: '+92 321 9920144',
    sellerComments: 'Family used Honda City Aspire with genuine alloy wheels, built-in navigation, leather seats, and chill AC. Tax paid up to June 2026. Very economical fuel consumption of 14-16 km/L in city.'
  },
  {
    id: 'fw-009',
    make: 'Suzuki',
    model: 'Cultus VXL Dual Airbags',
    year: 2018,
    bodyType: 'Hatchback',
    pricePKR: 2650000,
    priceDisplay: 'PKR 26.5 Lacs',
    city: 'Islamabad',
    condition: 'Used',
    mileage: '62,000 km',
    engine: '1.0L K10B 3-Cylinder DOHC 12-Valve (67 hp)',
    transmission: '5-Speed Manual',
    fuel: 'Petrol',
    color: 'Graphite Gray Metallic',
    assembly: 'Local (CKD)',
    registeredIn: 'Islamabad',
    image: 'images/audi.webp',
    sliderImages: ['images/audi.webp', 'images/mazda.webp', 'images/peugeot.webp'],
    badge: 'Verified',
    featured: false,
    sellerName: 'Rawal Auto Deals',
    sellerPhone: '+92 333 5819033',
    sellerComments: 'Extremely clean and fuel-efficient hatchback giving 18+ km/L on Islamabad highway. Power windows, power steering, ABS brakes, and keyless entry. Original number plates and return file available.'
  },
  {
    id: 'fw-010',
    make: 'Koenigsegg',
    model: 'Jesko Absolut Hypercar',
    year: 2023,
    bodyType: 'SUV',
    pricePKR: 850000000,
    priceDisplay: 'PKR 85.0 Crore',
    city: 'Karachi',
    condition: 'Used',
    mileage: '150 km',
    engine: '5.0L Twin-Turbo Flat-Plane V8 (1,600 bhp on E85)',
    transmission: '9-Speed LST (Light Speed Transmission)',
    fuel: 'Petrol',
    color: 'Liquid Silver with Carbon Accents',
    assembly: 'Imported (Sweden)',
    registeredIn: 'Customs Cleared',
    image: 'images/konisegg.webp',
    sliderImages: ['images/konisegg.webp', 'images/bentley.webp', 'images/taycan.webp'],
    badge: 'Exclusive',
    featured: true,
    sellerName: 'Elite Motors Pakistan',
    sellerPhone: '+92 300 9999888',
    sellerComments: 'Pristine collectors vehicle with zero track use. Active aerodynamics with carbon fiber body panels and Autoskin automated dihedral synchro-helix doors. FastWheels Verified Exclusive Certificate.'
  }
];

/* ==========================================================================
   2. Favorites Management (Vanilla JS & Local Storage)
   ========================================================================== */
function getFavorites() {
  try {
    const stored = localStorage.getItem('fastwheels_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function isCarFavorited(carId) {
  const favs = getFavorites();
  return favs.includes(carId);
}

function toggleCarFavorite(carId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  let favs = getFavorites();
  if (favs.includes(carId)) {
    favs = favs.filter(id => id !== carId);
  } else {
    favs.push(carId);
  }
  try {
    localStorage.setItem('fastwheels_favorites', JSON.stringify(favs));
  } catch (e) {}

  // Update UI heart button for this car
  const btns = document.querySelectorAll(`.btn-favorite[data-id="${carId}"]`);
  btns.forEach(btn => {
    const active = favs.includes(carId);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-label', active ? 'Remove from favorites' : 'Add to favorites');
    btn.innerHTML = active ? '♥' : '♡';
  });
}

/* ==========================================================================
   3. Mobile Navigation Helper
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('is-open');
  });

  // Close menu when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });

  // Close when clicking outside of navigation
  document.addEventListener('click', (e) => {
    if (
      mainNav.classList.contains('is-open') &&
      !mainNav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      mainNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   4. Initialize on DOM Ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
});

// Export FastWheels API object for page scripts
window.FastWheels = {
  inventory: FASTWHEELS_INVENTORY,
  getFavorites,
  isCarFavorited,
  toggleCarFavorite
};
