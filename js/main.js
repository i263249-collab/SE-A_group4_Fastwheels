/**
 * FASTWHEELS - Shared JavaScript Utilities & UI Helpers
 * Group: SE-A_Group04 | Student ID: i263249
 * Vanilla JavaScript (No external libraries or frameworks)
 */

'use strict';

/* ==========================================================================
   1. Shared Vehicle Data Structure
   ========================================================================== */
/**
 * FastWheels inventory data representing cars listed across Pakistan.
 * Uses realistic specifications and relative image paths pointing to /images.
 */
const FASTWHEELS_INVENTORY = [
  {
    id: 'fw-001',
    make: 'Audi',
    model: 'e-tron GT Quattro',
    year: 2023,
    pricePKR: 48500000,
    priceDisplay: 'PKR 4.85 Crore',
    city: 'Lahore',
    condition: 'Used',
    mileage: '12,500 km',
    transmission: 'Automatic',
    fuel: 'Electric',
    image: 'images/audi.webp',
    featured: true,
    badge: 'Verified'
  },
  {
    id: 'fw-002',
    make: 'Bentley',
    model: 'Continental GT V8',
    year: 2022,
    pricePKR: 115000000,
    priceDisplay: 'PKR 11.50 Crore',
    city: 'Islamabad',
    condition: 'Used',
    mileage: '8,200 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: 'images/bentley.webp',
    featured: true,
    badge: 'Featured'
  },
  {
    id: 'fw-003',
    make: 'Koenigsegg',
    model: 'Jesko Absolut Hypercar',
    year: 2024,
    pricePKR: 850000000,
    priceDisplay: 'PKR 85.0 Crore',
    city: 'Karachi',
    condition: 'New',
    mileage: '150 km',
    transmission: '9-Speed LST',
    fuel: 'Twin-Turbo V8',
    image: 'images/konisegg.webp',
    featured: true,
    badge: 'Exclusive'
  },
  {
    id: 'fw-004',
    make: 'Mazda',
    model: 'RX-Vision Concept Edition',
    year: 2023,
    pricePKR: 32000000,
    priceDisplay: 'PKR 3.20 Crore',
    city: 'Lahore',
    condition: 'Used',
    mileage: '5,400 km',
    transmission: 'Manual',
    fuel: 'Rotary Turbo',
    image: 'images/mazda.webp',
    featured: true,
    badge: 'Rare'
  },
  {
    id: 'fw-005',
    make: 'Peugeot',
    model: '508 GT Fastback',
    year: 2023,
    pricePKR: 18500000,
    priceDisplay: 'PKR 1.85 Crore',
    city: 'Islamabad',
    condition: 'New',
    mileage: '1,200 km',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    image: 'images/peugeot.webp',
    featured: false,
    badge: 'Official Dealer'
  },
  {
    id: 'fw-006',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2023,
    pricePKR: 62000000,
    priceDisplay: 'PKR 6.20 Crore',
    city: 'Karachi',
    condition: 'Used',
    mileage: '9,800 km',
    transmission: 'Automatic',
    fuel: 'Electric',
    image: 'images/taycan.webp',
    featured: true,
    badge: 'Verified'
  },
  {
    id: 'fw-007',
    make: 'Tesla',
    model: 'Model S Plaid Tri-Motor',
    year: 2024,
    pricePKR: 54000000,
    priceDisplay: 'PKR 5.40 Crore',
    city: 'Lahore',
    condition: 'New',
    mileage: '800 km',
    transmission: 'Direct Drive',
    fuel: 'Electric',
    image: 'images/tesla.webp',
    featured: true,
    badge: 'Zero Meter'
  }
];

/* ==========================================================================
   2. UI Helper Functions
   ========================================================================== */

/**
 * Format a Pakistani Rupee amount into Crore/Lakh standard notation
 * @param {number} amount
 * @returns {string} Formatted price string
 */
function formatPKR(amount) {
  if (amount >= 10000000) {
    return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    return `PKR ${(amount / 100000).toFixed(2)} Lacs`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

/**
 * Filter vehicles based on search criteria
 * @param {Object} criteria - Search options { make, city, condition, maxPrice }
 * @returns {Array} Filtered list of cars
 */
function filterInventory(criteria = {}) {
  return FASTWHEELS_INVENTORY.filter(car => {
    // Filter by Make
    if (criteria.make && criteria.make !== 'All' && car.make.toLowerCase() !== criteria.make.toLowerCase()) {
      return false;
    }
    // Filter by City
    if (criteria.city && criteria.city !== 'All' && car.city.toLowerCase() !== criteria.city.toLowerCase()) {
      return false;
    }
    // Filter by Condition (New / Used)
    if (criteria.condition && criteria.condition !== 'All' && car.condition.toLowerCase() !== criteria.condition.toLowerCase()) {
      return false;
    }
    // Filter by Max Price
    if (criteria.maxPrice && car.pricePKR > Number(criteria.maxPrice)) {
      return false;
    }
    return true;
  });
}

/* ==========================================================================
   3. DOM & Interaction Initializers
   ========================================================================== */

/**
 * Setup mobile navigation menu toggle with ARIA accessibility
 */
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

/**
 * Setup quick search tabs (All / New / Used)
 */
function initSearchTabs() {
  const tabButtons = document.querySelectorAll('.search-tab-btn');
  const conditionSelect = document.getElementById('search-condition');

  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const tabCategory = button.getAttribute('data-tab');
      if (conditionSelect && tabCategory) {
        conditionSelect.value = tabCategory;
      }
    });
  });
}

/**
 * Render vehicle card HTML template
 * @param {Object} car
 * @returns {string} HTML markup
 */
function createCarCardHTML(car) {
  return `
    <article class="car-card" data-id="${car.id}">
      <div class="car-card-media">
        <img src="${car.image}" alt="${car.make} ${car.model}" class="car-card-img" loading="lazy">
        <span class="car-card-tag">${car.badge}</span>
      </div>
      <div class="car-card-body">
        <h3 class="car-card-title">${car.year} ${car.make} ${car.model}</h3>
        <div class="car-card-price">${car.priceDisplay}</div>
        <div class="car-card-location">
          <span>📍</span> ${car.city} &bull; ${car.condition}
        </div>
        <div class="car-card-specs">
          <div class="car-card-spec-item">
            <span>${car.mileage}</span>
            <span>Mileage</span>
          </div>
          <div class="car-card-spec-item">
            <span>${car.fuel}</span>
            <span>Fuel Type</span>
          </div>
          <div class="car-card-spec-item">
            <span>${car.transmission}</span>
            <span>Gear</span>
          </div>
        </div>
      </div>
      <div class="car-card-actions">
        <button type="button" class="btn-card btn-card-primary" onclick="viewCarDetails('${car.id}')">View Details</button>
        <button type="button" class="btn-card btn-card-outline" onclick="contactSeller('${car.id}')">Contact Seller</button>
      </div>
    </article>
  `;
}

/**
 * Populate car listings into the container
 * @param {Array} cars
 */
function renderCarListings(cars) {
  const container = document.getElementById('featured-cars-container');
  if (!container) return;

  if (cars.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #fff; border-radius: 8px;">
        <p style="font-weight: 600; color: var(--color-primary);">No vehicles match your search criteria.</p>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try selecting "All" or adjusting your price filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cars.map(car => createCarCardHTML(car)).join('');
}

/**
 * Handle search form submissions
 */
function initSearchForm() {
  const searchForm = document.getElementById('fastwheels-search-form');
  if (!searchForm) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const makeSelect = document.getElementById('search-make');
    const citySelect = document.getElementById('search-city');
    const conditionSelect = document.getElementById('search-condition');
    const budgetSelect = document.getElementById('search-budget');

    const criteria = {
      make: makeSelect ? makeSelect.value : 'All',
      city: citySelect ? citySelect.value : 'All',
      condition: conditionSelect ? conditionSelect.value : 'All',
      maxPrice: budgetSelect && budgetSelect.value ? Number(budgetSelect.value) : null
    };

    const results = filterInventory(criteria);
    renderCarListings(results);

    // Scroll smoothly to results
    const resultsSection = document.getElementById('featured-vehicles');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/**
 * Placeholder actions for interactive buttons
 */
function viewCarDetails(carId) {
  const car = FASTWHEELS_INVENTORY.find(item => item.id === carId);
  if (car) {
    alert(`Viewing details for: ${car.year} ${car.make} ${car.model}\nPrice: ${car.priceDisplay}\nCity: ${car.city}`);
  }
}

function contactSeller(carId) {
  const car = FASTWHEELS_INVENTORY.find(item => item.id === carId);
  if (car) {
    alert(`FastWheels SafeConnect:\nConnecting you with verified seller for ${car.make} ${car.model} in ${car.city}.`);
  }
}

/* ==========================================================================
   4. DOM Ready Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initSearchTabs();
  initSearchForm();
  // Initial render of featured inventory
  renderCarListings(FASTWHEELS_INVENTORY);
});

// Export helper for window object for modularity and page scripts
window.FastWheels = {
  inventory: FASTWHEELS_INVENTORY,
  filterInventory,
  formatPKR,
  viewCarDetails,
  contactSeller
};
