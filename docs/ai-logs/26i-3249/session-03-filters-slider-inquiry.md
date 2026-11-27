# FastWheels AI Engineering Session Log - 03: Filters, Slider & 4-State Inquiry

**Project:** FastWheels (PakWheels Style Automotive Marketplace)  
**Target Pages:** `pages/used-cars.html` and `pages/car-details.html`  
**Group:** SE-A_Group04  
**Student Roll No:** i263249 (Session Directory: `26i-3249`)  
**Date:** November 2026  
**Stack:** Pure HTML5, CSS3, Vanilla JavaScript (No React, Vue, jQuery, or external libraries)

---

## 1. Objectives & Implemented Enhancements

### A. Pages/used-cars.html
1. **Teammate Boundary Separation**:
   - Completely excluded any working "Post an Ad" / "Sell Your Car" logic or forms, retaining solely clean navigation links.
2. **Left Filters Sidebar**:
   - **Price Range**: Interactive range slider (PKR 20 Lacs up to PKR 10+ Crore) with live value display.
   - **City Checkboxes**: Lahore, Karachi, Islamabad with dynamic badge counts.
   - **Year Checkboxes**: 2015, 2018, 2020, 2023 with vehicle count badges.
   - **Make Checkboxes**: Toyota, Honda, Suzuki, Audi, Porsche, Tesla.
   - **One-Click Reset Button**: Small "Reset" button (`#btn-sidebar-reset`) in the sidebar header to clear all checkboxes and reset the price slider in a single click.
3. **Featured Inventory Cards**:
   - Authentic Pakistani vehicle data with zero lorem ipsum and zero dollar signs (`$`).
   - Photos strictly sourced from `../images/` (`audi.webp`, `bentley.webp`, `konisegg.webp`, `mazda.webp`, `peugeot.webp`, `taycan.webp`, `tesla.webp`).
   - **Favorite Toggle**: Interactive heart icon (`♥` / `♡`) in vanilla JS with `localStorage` persistence.
   - **PKR Prices**: Displayed in PKR Lakh and Crore (e.g. `PKR 4.85 Crore`, `PKR 92.5 Lacs`, `PKR 48.0 Lacs`).
   - **"View Details" Link**: Navigates to `car-details.html?id=...`.

### B. Pages/car-details.html
1. **Interactive Image Slider**:
   - Navigation controls: `<` (previous) and `>` (next) buttons.
   - Indicator dots (`• • •`) with active pill animation.
   - Smooth slide transition between vehicle angles.
2. **Title, Pricing & Seller Actions**:
   - Full vehicle title and large PKR price display.
   - **"Show Phone Number"** button: Reveals seller's authentic Pakistani contact (`+92 300 8472910`).
   - **"Send Message"** button: Smoothly scrolls and focuses the inquiry form.
3. **Key Specifications Table**:
   - Structured table listing Engine, Transmission, Mileage, Color, Fuel Type, Assembly, Registered In, and FastWheels Inspection Score (9.9/10).
4. **Seller Comments**:
   - Realistic description of maintenance, original paint, biometric status, and token tax.
5. **Inquiry Form 4 States (Pure Vanilla JS without extra pages)**:
   - **State 1 (Empty)**: Clean form ready for input with a neutral state badge (`State 1: Empty`).
   - **State 2 (Filling)**: Transitions as the user begins typing, showing an active blue badge (`State 2: Filling`).
   - **State 3 (Error)**: Transitions if required fields (Name, Email, 11-digit Phone, Message) fail validation upon submission, highlighting inputs in red with explicit error messages and badge (`State 3: Error`).
   - **State 4 ("Inquiry Sent Successfully!")**: Transitions upon successful validation to a green success card displaying the seller name, inquiry reference ID (`#FW-XXXXX`), and option to reset/send another inquiry (`State 4: Sent`).

---

## 2. Viva Examination Guide

- **Sidebar Filter State Architecture**:
  The `activeFilters` object tracks `maxPrice`, `cities[]`, `years[]`, and `makes[]`. Checkbox changes call `handleFilterChange()` which extracts checked values with `Array.from(document.querySelectorAll(...):checked).map(...)` and filters the inventory array in memory.
- **Inquiry 4-State Machine**:
  `setInquiryState(stateNum)` manages UI state by switching classes and toggling between the form element (`#vehicle-inquiry-form`) and the confirmation view (`#inquiry-success-container`).
- **Asset Integrity**:
  All image assets inside `images/` remain untouched and are referenced through relative paths (`../images/...`).
