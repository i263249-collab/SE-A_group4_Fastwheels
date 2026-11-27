# FastWheels AI Engineering Session Log - 02: Used Cars Page Implementation

**Project:** FastWheels (PakWheels Style Automotive Marketplace)  
**Target File:** `pages/used-cars.html`  
**Group:** SE-A_Group04  
**Student Roll No:** i263249 (Session Directory: `26i-3249`)  
**Date:** November 2026  
**Stack:** Pure HTML5, CSS3, Vanilla JavaScript (No React, Vue, jQuery, or external libraries)

---

## 1. Objectives & Wireframe Requirements
Implement `pages/used-cars.html` strictly matching the user's two wireframe sketches (Desktop & Mobile):

1. **Top Bar & Navigation**:
   - **Desktop**: FastWheels logo on the left, navigation links for `"Used Cars"`, `"New Cars"`, `"Bikes"`, and `"Auto Store"` in the middle, and a red `"Post an Ad"` CTA button on the right over the royal-blue bar.
   - **Mobile (<768px)**: Accessible hamburger icon on the left (`order: 1`), FastWheels logo centered (`order: 2`), and red `"Post Ad"` button on the right (`order: 3`). Dropdown navigation toggles cleanly with ARIA accessibility, closing on Escape key or outside click.
2. **Search Section**:
   - **Desktop**: Royal-blue gradient banner titled `"Find Used Cars in Pakistan"` with a white search bar containing `"Car Make/Model"`, `"City"`, `"Price Range"`, and a red `"Search"` button with a magnifying glass SVG icon.
   - **Mobile (<768px)**: Stacked layout with `"Search Cars..."` text field, `"Select City"` dropdown, and a full-width red `"Search"` button.
   - **Functionality**: Live filtering connected via vanilla JavaScript without page reloads.
3. **Categories Section ("Browse Used Cars by Category")**:
   - **Desktop**: 4-card row for `"SUV"`, `"Sedan"`, `"Hatchback"`, and `"Bike"`.
   - **Mobile (<768px)**: 2x2 grid for `"Used Cars"`, `"New Cars"`, `"Bikes"`, and `"Auto Parts"`.
   - **Functionality**: Clicking any category tile filters and updates the vehicle cards list immediately with visual active states.
4. **Featured Cars Section**:
   - **Responsive Headings**: Desktop displays `"Featured Used Cars"`, mobile (<768px) displays `"Featured Car"`.
   - **Authentic Listings**: Zero lorem ipsum. Utilizes genuine Pakistani vehicle specs and prices in PKR Lakh and Crore.
   - **Assets**: Strictly utilizes existing images (`audi.webp`, `bentley.webp`, `konisegg.webp`, `mazda.webp`, `peugeot.webp`, `taycan.webp`, `tesla.webp`) via relative paths (`../images/...`).
   - **Navigation**: Each card includes a `"View Details"` link navigating to `car-details.html?id=...`.

---

## 2. Technical Implementation & Viva Notes

### How the Responsive Wireframe Navigation Works (CSS Flexbox Ordering)
- On desktop screens (`>768px`), standard flex layout distributes items:
  `[Logo / Brand] ─── [Middle Nav Links] ─── [Post an Ad Button]`
- On mobile viewports (`<768px`), CSS Flexbox ordering dynamically rearranges the items without DOM re-renders:
  - `.mobile-nav-toggle`: `order: 1` (Pins hamburger to the far left)
  - `.brand`: `order: 2; margin: 0 auto;` (Centers the logo and title)
  - `.header-cta-group`: `order: 3` (Pins the red "Post Ad" button to the far right)
  - `.main-nav`: Absolute positioning below the header, toggled with the `.is-open` class.

### How the Search & Category Filtering Works (Vanilla JavaScript)
- An internal `filterState` JavaScript object stores active criteria:
  ```javascript
  const filterState = { keyword: '', city: 'All', maxPrice: null, category: 'All', bodyType: 'All' };
  ```
- The `applyFiltersAndRender()` function filters the array using standard array methods (`filter()`), updates the result counter (`#results-count`), and outputs responsive card templates using template literals.
- When no results match, a helpful empty-state container with a `"Reset All Filters"` button is displayed.

---

## 3. Verification & Image Integrity
- Verified relative paths: `../index.html`, `car-details.html`, `post-ad.html`, `../css/styles.css`, `../js/main.js`, and `../images/`.
- All 8 image assets in `images/` remain untouched and intact.
