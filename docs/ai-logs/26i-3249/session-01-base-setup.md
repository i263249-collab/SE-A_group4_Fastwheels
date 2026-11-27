# FastWheels AI Engineering Session Log - 01

**Project:** FastWheels (PakWheels Style Automotive Marketplace)  
**Group:** SE-A_Group04  
**Student Roll No:** i263249 (Session Directory: `26i-3249`)  
**Date:** November 2026  
**Stack:** Pure HTML5, CSS3, Vanilla JavaScript (No React, Vue, jQuery, or external libraries)

---

## 1. Objectives & Requirements
1. Establish the clean baseline project directory structure with relative paths.
2. Build `index.html` featuring semantic `<header>`, `<nav>`, `<main>`, and `<footer>` containers without lorem ipsum.
3. Configure `css/styles.css` with a royal-blue and crimson-red theme, responsive desktop/mobile rules, and accessible focus states.
4. Develop `js/main.js` with vanilla JavaScript for shared navigation, search/filter helper functions, and vehicle data structures matching the provided assets.
5. Create `pages/` directory ready for 3 assigned subpages (`used-cars.html`, `car-details.html`, `post-ad.html`).
6. Create `docs/` structure with `docs/ai-logs/26i-3249/` for verifiable engineering records.
7. Preserve all existing assets in `images/` intact.

---

## 2. Architecture & Design Rationale

### Color System & Palette (PakWheels Styling)
- **Primary Royal Blue:** `#0a3672` (Represents reliability, corporate trust, and automotive branding).
- **Dark Royal Blue:** `#072550` (Header and top bar backgrounds).
- **Crimson Red Accent:** `#d32f2f` (High-contrast Call-to-Actions, badges, and attention points).
- **Backgrounds:** Clean neutral off-white `#f4f6f9` with white `#ffffff` cards for content legibility.

### Accessibility Implementations
- Included `.skip-link` for screen reader and keyboard users to skip directly to `#main-content`.
- Implemented explicit `:focus-visible` outlines using `--focus-outline: 3px solid #d32f2f`.
- Added ARIA states (`aria-expanded`, `aria-label`, `aria-labelledby`, `role="tab"`, `role="search"`).

### Vanilla JavaScript Architecture
- Modular vehicle catalog array `FASTWHEELS_INVENTORY` representing authentic cars with relative image references.
- Dynamic search filtering function `filterInventory()` supporting make, city, condition (New/Used), and budget.
- Accessible mobile navigation toggle with Escape-key listening and click-outside dismissal.
- Clean separation of UI logic, state, and rendering without third-party frameworks.

---

## 3. Implemented File Manifest

| File / Folder | Purpose |
| :--- | :--- |
| `index.html` | Semantic home page with hero search widget, verified highlights, car cards grid, categories, and footer |
| `css/styles.css` | Shared responsive stylesheet with CSS custom properties, grid/flex layouts, and focus rings |
| `js/main.js` | Vanilla JS logic for mobile menu toggle, search filtering, tab controls, and PKR currency formatting |
| `pages/used-cars.html` | Assigned Page 1: Filterable used car listings catalog |
| `pages/car-details.html` | Assigned Page 2: High-end vehicle technical specifications and inspection sheet |
| `pages/post-ad.html` | Assigned Page 3: Seller ad listing and inspection booking form |
| `pages/README.md` | Guidelines for extending and authoring subpages |
| `docs/README.md` | Architectural specification and project standards |
| `docs/ai-logs/26i-3249/` | Dedicated audit log directory for student i263249 |

---

## 4. Verification Check
- All files load via relative paths (`./` and `../`).
- Tested viewport adaptability across desktop (>1024px), tablet (768px-1024px), and mobile (<768px).
- Existing files in `images/` remained untouched and were effectively utilized across the site.
