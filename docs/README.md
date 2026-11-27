# FastWheels Documentation (`docs/`)

Project documentation for **FastWheels**, a PakWheels-style automotive website built for:
- **Course:** Software Engineering (Section SE-A)
- **Project Group:** `SE-A_Group04`
- **Assigned Roll Number:** `i263249` (Log directory: `26i-3249`)

## Project Structure Overview
```text
SE-A_group4_fastwheels/
├── index.html                 # Main home page with search, featured cars, and highlights
├── css/
│   └── styles.css             # Shared responsive royal-blue & red stylesheet with variables
├── js/
│   └── main.js                # Shared vanilla JavaScript for navigation, filtering & UI helpers
├── images/                    # Preserved car images and logo (read-only)
│   ├── audi.webp
│   ├── bentley.webp
│   ├── konisegg.webp
│   ├── logo.jpeg
│   ├── mazda.webp
│   ├── peugeot.webp
│   ├── taycan.webp
│   └── tesla.webp
├── pages/                     # Subpages folder for assigned pages
│   ├── used-cars.html         # Assigned Page 1: Used Cars Marketplace
│   ├── car-details.html       # Assigned Page 2: Vehicle Specs & Inspection Showcase
│   ├── post-ad.html           # Assigned Page 3: Seller Ad Posting & Verification
│   └── README.md              # Guidelines for page authors
└── docs/                      # Project documentation and audit logs
    ├── README.md              # Technical and design specification
    └── ai-logs/
        └── 26i-3249/          # AI session log exports for student i263249
            ├── README.md
            └── session-01-base-setup.md
```

## Technical Standards & Constraints
- **Strict Vanilla Stack:** 100% HTML5, CSS3, and Vanilla JavaScript. No external CDNs, React, Vue, jQuery, or CSS frameworks.
- **Color Theme:**
  - Royal Blue: `#0a3672` (Primary) / `#072550` (Dark) / `#164e96` (Light)
  - Crimson Red: `#d32f2f` (Accent) / `#b71c1c` (Hover)
- **Accessibility:** Includes skip links, distinct `:focus-visible` outlines, ARIA attributes on mobile menu toggle and search tabs, and semantic document outline.
- **Responsive Layout:** Fluid CSS Grid and Flexbox with media query breakpoints for desktop, tablet, and mobile viewports.
