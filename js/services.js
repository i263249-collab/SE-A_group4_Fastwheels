/**
 * FASTWHEELS - Member 4 Services Controller
 * Pages: Car Finance & Installments, Inspection & Detailing, Book Appointment
 * Group: SE-A_Group04 | Member 4 (Roll No: i263151)
 * Vanilla JavaScript (Zero third-party frameworks/libraries)
 */

'use strict';

/* ==========================================================================
   1. Shared Formatting & Query Parameter Utilities
   ========================================================================== */
function formatPKRShort(amount) {
  const value = Number(amount) || 0;
  if (value >= 10000000) {
    return `PKR ${(value / 10000000).toFixed(2)} Crore`;
  }
  if (value >= 100000) {
    return `PKR ${(value / 100000).toFixed(2)} Lacs`;
  }
  return `PKR ${Math.round(value).toLocaleString('en-PK')}`;
}

function formatPKRMonthly(amount) {
  const rounded = Math.round(Number(amount) || 0);
  return `PKR ${rounded.toLocaleString('en-PK')}`;
}

function getUrlParam(name) {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
  } catch (e) {
    return '';
  }
}

/* ==========================================================================
   2. Page 1: Car Finance & Installments Calculator
   ========================================================================== */
const FINANCE_PARTNER_PLANS = [
  {
    name: 'Meezan Car Ijarah',
    mode: 'Islamic',
    rate: 17.2,
    processingFee: 'PKR 12,000',
    minDownPct: 20,
    maxTenure: 5
  },
  {
    name: 'HBL CarLoan',
    mode: 'Conventional',
    rate: 16.5,
    processingFee: 'PKR 10,500',
    minDownPct: 15,
    maxTenure: 7
  },
  {
    name: 'Bank Alfalah Auto Finance',
    mode: 'Conventional',
    rate: 16.9,
    processingFee: 'PKR 11,000',
    minDownPct: 15,
    maxTenure: 7
  },
  {
    name: 'Dubai Islamic Auto Finance',
    mode: 'Islamic',
    rate: 17.5,
    processingFee: 'PKR 12,500',
    minDownPct: 20,
    maxTenure: 5
  }
];

let activeFinanceMode = 'Conventional';

function computeMonthlyInstallment(principal, annualRatePct, tenureYears) {
  const months = Math.max(1, tenureYears * 12);
  if (principal <= 0) return 0;
  const monthlyRate = annualRatePct / 12 / 100;
  if (monthlyRate <= 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function initCarFinancePage() {
  const form = document.getElementById('finance-calculator-form');
  if (!form) return;

  const carSelect = document.getElementById('finance-car-select');
  const priceInput = document.getElementById('finance-car-price');
  const downSlider = document.getElementById('finance-down-slider');
  const tenureSelect = document.getElementById('finance-tenure');
  const rateSlider = document.getElementById('finance-rate-slider');
  const modeButtons = document.querySelectorAll('.finance-mode-btn');

  // Populate vehicle dropdown from shared FASTWHEELS_INVENTORY
  const inventory = (window.FastWheels && window.FastWheels.inventory) ? window.FastWheels.inventory : [];
  if (carSelect && inventory.length > 0) {
    inventory.forEach((car) => {
      const option = document.createElement('option');
      option.value = car.id;
      option.textContent = `${car.year} ${car.make} ${car.model} (${car.priceDisplay})`;
      carSelect.appendChild(option);
    });
  }

  // Apply URL ?car= parameter if present, otherwise default to an affordable popular CKD car
  const requestedCarId = getUrlParam('car');
  if (carSelect && inventory.length > 0) {
    const matchedCar = inventory.find((c) => c.id === requestedCarId) || inventory.find((c) => c.id === 'fw-003') || inventory[0];
    if (matchedCar) {
      carSelect.value = matchedCar.id;
      priceInput.value = matchedCar.pricePKR;
    }
  }

  if (carSelect) {
    carSelect.addEventListener('change', () => {
      if (carSelect.value === 'custom') return;
      const car = inventory.find((c) => c.id === carSelect.value);
      if (car) {
        priceInput.value = car.pricePKR;
        updateFinanceCalculation();
      }
    });
  }

  if (priceInput) {
    priceInput.addEventListener('input', () => {
      if (carSelect) carSelect.value = 'custom';
      updateFinanceCalculation();
    });
  }

  if (downSlider) {
    downSlider.addEventListener('input', updateFinanceCalculation);
  }

  if (tenureSelect) {
    tenureSelect.addEventListener('change', updateFinanceCalculation);
  }

  if (rateSlider) {
    rateSlider.addEventListener('input', updateFinanceCalculation);
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeFinanceMode = btn.dataset.mode || 'Conventional';

      if (rateSlider) {
        rateSlider.value = activeFinanceMode === 'Islamic' ? '17.2' : '16.5';
      }
      updateFinanceCalculation();
    });
  });

  updateFinanceCalculation();
}

function updateFinanceCalculation() {
  const priceInput = document.getElementById('finance-car-price');
  const downSlider = document.getElementById('finance-down-slider');
  const tenureSelect = document.getElementById('finance-tenure');
  const rateSlider = document.getElementById('finance-rate-slider');
  const carSelect = document.getElementById('finance-car-select');

  if (!priceInput || !downSlider || !tenureSelect || !rateSlider) return;

  const rawPrice = Math.max(500000, Number(priceInput.value) || 0);
  const downPct = Number(downSlider.value) || 30;
  const tenureYears = Number(tenureSelect.value) || 5;
  const annualRate = Number(rateSlider.value) || 16.5;

  const downAmount = (rawPrice * downPct) / 100;
  const financedAmount = Math.max(0, rawPrice - downAmount);
  const months = tenureYears * 12;
  const monthlyEMI = computeMonthlyInstallment(financedAmount, annualRate, tenureYears);
  const totalPayable = monthlyEMI * months;
  const totalMarkup = Math.max(0, totalPayable - financedAmount);

  // Slider pill readouts
  const downPill = document.getElementById('down-payment-pill');
  const ratePill = document.getElementById('interest-rate-pill');
  if (downPill) downPill.textContent = `${downPct}% (${formatPKRShort(downAmount)})`;
  if (ratePill) ratePill.textContent = `${annualRate.toFixed(1)}% p.a.`;

  // Summary card outputs
  const emiEl = document.getElementById('emi-monthly-display');
  const emiNoteEl = document.getElementById('emi-mode-note');
  if (emiEl) emiEl.textContent = `${formatPKRMonthly(monthlyEMI)} / mo`;
  if (emiNoteEl) emiNoteEl.textContent = `${activeFinanceMode} Plan • ${months} Monthly Installments`;

  const setMap = {
    'summary-car-price': formatPKRShort(rawPrice),
    'summary-down-payment': `${formatPKRShort(downAmount)} (${downPct}%)`,
    'summary-loan-amount': formatPKRShort(financedAmount),
    'summary-tenure': `${tenureYears} Years (${months} Months)`,
    'summary-total-markup': formatPKRShort(totalMarkup),
    'summary-total-payable': formatPKRShort(totalPayable)
  };

  Object.keys(setMap).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = setMap[id];
  });

  // Update CTA link to Book Appointment
  const bookLink = document.getElementById('btn-book-finance');
  if (bookLink) {
    const selectedLabel = carSelect && carSelect.value !== 'custom'
      ? carSelect.options[carSelect.selectedIndex].textContent
      : `Custom Vehicle (${formatPKRShort(rawPrice)})`;
    const qs = new URLSearchParams({
      category: 'finance',
      service: 'Auto Finance Consultation',
      vehicle: selectedLabel
    });
    bookLink.href = `book-appointment.html?${qs.toString()}`;
  }

  // Update partner bank comparison table dynamically
  const comparisonBody = document.getElementById('partner-plans-body');
  if (comparisonBody) {
    comparisonBody.innerHTML = FINANCE_PARTNER_PLANS.map((plan) => {
      const effectiveDownPct = Math.max(downPct, plan.minDownPct);
      const effectiveTenure = Math.min(tenureYears, plan.maxTenure);
      const principal = rawPrice * (1 - effectiveDownPct / 100);
      const emi = computeMonthlyInstallment(principal, plan.rate, effectiveTenure);
      const tagClass = plan.mode === 'Islamic' ? 'plan-tag-islamic' : 'plan-tag-conventional';
      return `
        <tr>
          <td><strong>${plan.name}</strong></td>
          <td><span class="plan-tag ${tagClass}">${plan.mode}</span></td>
          <td>${plan.rate.toFixed(1)}% p.a.</td>
          <td>${plan.minDownPct}%</td>
          <td>Up to ${plan.maxTenure} Yrs</td>
          <td><strong>${formatPKRMonthly(emi)} / mo</strong></td>
        </tr>
      `;
    }).join('');
  }
}

/* ==========================================================================
   3. Page 2: Inspection & Detailing Services
   ========================================================================== */
const INSPECTION_CHECKLISTS = {
  engine: [
    { title: 'Engine Compression & Blow-by', detail: 'Cylinder health & smoke emission test' },
    { title: 'Transmission Shift Quality', detail: 'CVT / Automatic / Manual gear response check' },
    { title: 'Cooling System & Radiator', detail: 'Coolant pressure & thermostat inspection' },
    { title: 'Oil Leaks & Gasket Seals', detail: 'Valve cover, oil pan & crank seal check' }
  ],
  body: [
    { title: 'Digital Paint Depth Meter', detail: 'Panel-by-panel repaint & putty detection' },
    { title: 'Chassis & Pillars Alignment', detail: 'Frame rails, apron & radiator core verification' },
    { title: 'Windshield & Glass Codes', detail: 'Original factory glass serial verification' },
    { title: 'Rust & Flood Damage Check', detail: 'Underbody, trunk & floorboard inspection' }
  ],
  suspension: [
    { title: 'Shock Absorbers & Struts', detail: 'Road test bounce & damping response' },
    { title: 'Steering Rack & Bushings', detail: 'EPS motor play, tie rods & ball joints' },
    { title: 'Brake Pads, Rotors & ABS', detail: 'Pad thickness & emergency braking balance' },
    { title: 'Tyre Tread & Alloy Health', detail: 'Manufacturing date & uneven wear check' }
  ],
  electrical: [
    { title: 'OBD-II Computer Diagnostics', detail: 'Live ECU fault codes & sensor scanning' },
    { title: 'Hybrid Battery & Inverter', detail: 'Cell voltage balance & cooling fan check' },
    { title: 'Airbags & Safety Modules', detail: 'SRS warning & seatbelt pretensioner check' },
    { title: 'AC Compressor & Climate', detail: 'Cabin vent temperature & gas pressure check' }
  ]
};

const DETAILING_PRICING_BY_SIZE = {
  hatchback: { ceramic: 28000, interior: 7500, showroom: 16500 },
  sedan: { ceramic: 34000, interior: 9500, showroom: 21000 },
  suv: { ceramic: 44000, interior: 12500, showroom: 27500 }
};

function initInspectionDetailingPage() {
  const checklistTabs = document.querySelectorAll('.checklist-tab-btn');
  const sizeButtons = document.querySelectorAll('.vehicle-size-btn');

  if (!checklistTabs.length && !sizeButtons.length) return;

  // Inspection checklist tabs
  checklistTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      checklistTabs.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderChecklistCategory(btn.dataset.category || 'engine');
    });
  });

  if (checklistTabs.length) {
    renderChecklistCategory('engine');
  }

  // Detailing vehicle size pricing switcher
  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      updateDetailingPrices(btn.dataset.size || 'sedan');
    });
  });

  if (sizeButtons.length) {
    updateDetailingPrices('sedan');
  }
}

function renderChecklistCategory(categoryKey) {
  const container = document.getElementById('checklist-grid-container');
  if (!container) return;

  const items = INSPECTION_CHECKLISTS[categoryKey] || INSPECTION_CHECKLISTS.engine;
  container.innerHTML = items.map((item) => `
    <div class="checklist-item">
      <strong>✓ ${item.title}</strong>
      <span>${item.detail}</span>
    </div>
  `).join('');
}

function updateDetailingPrices(sizeKey) {
  const prices = DETAILING_PRICING_BY_SIZE[sizeKey] || DETAILING_PRICING_BY_SIZE.sedan;
  const sizeLabel = sizeKey === 'suv' ? 'SUV / 4x4' : sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1);

  const ceramicEl = document.getElementById('price-detailing-ceramic');
  const interiorEl = document.getElementById('price-detailing-interior');
  const showroomEl = document.getElementById('price-detailing-showroom');

  if (ceramicEl) ceramicEl.textContent = formatPKRMonthly(prices.ceramic);
  if (interiorEl) interiorEl.textContent = formatPKRMonthly(prices.interior);
  if (showroomEl) showroomEl.textContent = formatPKRMonthly(prices.showroom);

  // Update booking links with vehicle category note
  const links = document.querySelectorAll('.detailing-book-link');
  links.forEach((link) => {
    const serviceName = link.dataset.service || 'Full Showroom Detailing';
    const qs = new URLSearchParams({
      category: 'detailing',
      service: serviceName,
      vehicleType: sizeLabel
    });
    link.href = `book-appointment.html?${qs.toString()}`;
  });
}

/* ==========================================================================
   4. Page 3: Book Appointment (4-State Interactive Engine)
      State 1: Empty Form
      State 2: Date & Time Selected
      State 3: Error / Time Slot Unavailable
      State 4: Successful Booking / Confirmation
   ========================================================================== */
const APPOINTMENT_SERVICES = {
  inspection: [
    '200+ Point Comprehensive Inspection (PKR 5,500)',
    'Auction Sheet & Chassis Verification (PKR 3,500)',
    'Pre-Purchase Doorstep Inspection (PKR 6,500)'
  ],
  detailing: [
    'Interior Deep Clean & Steam Sanitization',
    'Full Showroom Paint & Interior Restoration',
    '9H Ceramic Coating & Paint Correction'
  ],
  finance: [
    'Auto Finance Consultation (Free)',
    'Islamic Car Ijarah Eligibility Review (Free)'
  ]
};

const APPOINTMENT_TIME_SLOTS = [
  { time: '09:30 AM', label: 'Morning' },
  { time: '11:00 AM', label: 'Morning' },
  { time: '12:30 PM', label: 'Afternoon' },
  { time: '02:30 PM', label: 'Afternoon' },
  { time: '04:00 PM', label: 'Evening' },
  { time: '05:30 PM', label: 'Evening' }
];

let appointmentState = {
  currentState: 1,
  selectedDate: '',
  selectedTime: '',
  selectedSlotUnavailable: false
};

function getTodayISODate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getTomorrowISODate() {
  const next = new Date();
  next.setDate(next.getDate() + 1);
  // Skip Sunday so demo tomorrow date is an open weekday/Saturday
  if (next.getDay() === 0) {
    next.setDate(next.getDate() + 1);
  }
  const y = next.getFullYear();
  const m = String(next.getMonth() + 1).padStart(2, '0');
  const d = String(next.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSundayDate(isoDate) {
  if (!isoDate) return false;
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3) return false;
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  return dt.getDay() === 0;
}

function getUnavailableSlotsForSelection(city, isoDate) {
  if (isSundayDate(isoDate)) {
    return APPOINTMENT_TIME_SLOTS.map((s) => s.time);
  }
  // Consistent realistic booked slots so users can test State 3 naturally
  if (city === 'Karachi') return ['11:00 AM', '04:00 PM'];
  if (city === 'Islamabad') return ['12:30 PM', '05:30 PM'];
  return ['12:30 PM', '04:00 PM'];
}

function initBookAppointmentPage() {
  const form = document.getElementById('appointment-booking-form');
  if (!form) return;

  const categorySelect = document.getElementById('appt-category');
  const serviceSelect = document.getElementById('appt-service');
  const citySelect = document.getElementById('appt-city');
  const dateInput = document.getElementById('appt-date');
  const vehicleInput = document.getElementById('appt-vehicle');

  if (dateInput) {
    dateInput.min = getTodayISODate();
  }

  // Handle category -> package dropdown population
  if (categorySelect && serviceSelect) {
    categorySelect.addEventListener('change', () => {
      populateServiceOptions(categorySelect.value);
      updateAppointmentSummary();
    });
  }

  // Pre-fill query params if arriving from Car Finance or Inspection & Detailing
  const qCategory = getUrlParam('category');
  const qService = getUrlParam('service');
  const qVehicle = getUrlParam('vehicle');
  const qVehicleType = getUrlParam('vehicleType');
  const qCity = getUrlParam('city');

  if (categorySelect && qCategory && APPOINTMENT_SERVICES[qCategory]) {
    categorySelect.value = qCategory;
  }
  populateServiceOptions(categorySelect ? categorySelect.value : 'inspection');

  if (serviceSelect && qService) {
    const match = Array.from(serviceSelect.options).find((opt) =>
      opt.value.toLowerCase().includes(qService.toLowerCase())
    );
    if (match) serviceSelect.value = match.value;
  }

  if (citySelect && qCity) {
    const cityMatch = Array.from(citySelect.options).find((opt) =>
      opt.value.toLowerCase() === qCity.toLowerCase()
    );
    if (cityMatch) citySelect.value = cityMatch.value;
  }

  if (vehicleInput && (qVehicle || qVehicleType)) {
    vehicleInput.value = qVehicle || qVehicleType;
  }

  // Date & City changes re-render time slot availability
  if (dateInput) {
    dateInput.addEventListener('change', handleDateOrCityChange);
  }
  if (citySelect) {
    citySelect.addEventListener('change', handleDateOrCityChange);
  }

  // Live summary updates for remaining inputs
  ['appt-service', 'appt-vehicle', 'appt-name', 'appt-phone', 'appt-email'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        clearFieldErrorByInput(id);
        updateAppointmentSummary();
      });
      el.addEventListener('change', updateAppointmentSummary);
    }
  });

  renderTimeSlots();
  updateAppointmentSummary();
  setAppointmentState(1);
}

function populateServiceOptions(categoryKey) {
  const serviceSelect = document.getElementById('appt-service');
  if (!serviceSelect) return;

  const list = APPOINTMENT_SERVICES[categoryKey] || APPOINTMENT_SERVICES.inspection;
  serviceSelect.innerHTML = '';
  list.forEach((serviceLabel) => {
    const opt = document.createElement('option');
    opt.value = serviceLabel;
    opt.textContent = serviceLabel;
    serviceSelect.appendChild(opt);
  });
}

function handleDateOrCityChange() {
  const dateInput = document.getElementById('appt-date');
  const citySelect = document.getElementById('appt-city');
  const chosenDate = dateInput ? dateInput.value : '';
  const chosenCity = citySelect ? citySelect.value : 'Lahore';

  appointmentState.selectedDate = chosenDate;
  clearFieldErrorByInput('appt-date');

  // Check if Sunday (centers closed)
  if (chosenDate && isSundayDate(chosenDate)) {
    appointmentState.selectedTime = '';
    appointmentState.selectedSlotUnavailable = true;
    renderTimeSlots();
    showUnavailableSlotBanner(
      `FastWheels Service Centers in ${chosenCity} are closed on Sundays. Please pick Monday–Saturday.`,
      chosenCity,
      getTomorrowISODate()
    );
    setAppointmentState(3);
    updateAppointmentSummary();
    return;
  }

  // Re-evaluate previously selected time slot against new date/city
  const unavailable = getUnavailableSlotsForSelection(chosenCity, chosenDate);
  if (appointmentState.selectedTime && unavailable.includes(appointmentState.selectedTime)) {
    appointmentState.selectedSlotUnavailable = true;
    renderTimeSlots();
    showUnavailableSlotBanner(
      `The ${appointmentState.selectedTime} slot in ${chosenCity} is already booked for ${chosenDate}. Select an available slot below.`,
      chosenCity,
      chosenDate
    );
    setAppointmentState(3);
  } else {
    appointmentState.selectedSlotUnavailable = false;
    hideUnavailableSlotBanner();
    renderTimeSlots();
    if (appointmentState.selectedDate && appointmentState.selectedTime) {
      setAppointmentState(2);
    } else if (appointmentState.currentState !== 4) {
      setAppointmentState(1);
    }
  }

  updateAppointmentSummary();
}

function renderTimeSlots() {
  const container = document.getElementById('time-slots-container');
  if (!container) return;

  const citySelect = document.getElementById('appt-city');
  const dateInput = document.getElementById('appt-date');
  const city = citySelect ? citySelect.value : 'Lahore';
  const dateVal = dateInput ? dateInput.value : '';
  const unavailable = getUnavailableSlotsForSelection(city, dateVal);

  container.innerHTML = APPOINTMENT_TIME_SLOTS.map((slot) => {
    const isBooked = unavailable.includes(slot.time);
    const isSelected = appointmentState.selectedTime === slot.time && !isBooked;
    const classes = ['time-slot-btn'];
    if (isBooked) classes.push('is-unavailable');
    if (isSelected) classes.push('is-selected');

    return `
      <button type="button"
              class="${classes.join(' ')}"
              data-time="${slot.time}"
              data-unavailable="${isBooked}"
              aria-pressed="${isSelected}"
              onclick="selectAppointmentSlot('${slot.time}')">
        <span class="time-slot-time">${slot.time}</span>
        <span class="time-slot-status">${isBooked ? 'Booked' : 'Available'}</span>
      </button>
    `;
  }).join('');
}

function selectAppointmentSlot(timeStr) {
  const dateInput = document.getElementById('appt-date');
  const citySelect = document.getElementById('appt-city');
  const city = citySelect ? citySelect.value : 'Lahore';

  // Ensure a date is selected so user sees clean feedback if they click a slot first
  if (dateInput && !dateInput.value) {
    dateInput.value = getTomorrowISODate();
  }

  const chosenDate = dateInput ? dateInput.value : '';
  appointmentState.selectedDate = chosenDate;

  if (isSundayDate(chosenDate)) {
    appointmentState.selectedTime = '';
    appointmentState.selectedSlotUnavailable = true;
    renderTimeSlots();
    showUnavailableSlotBanner(
      `Centers in ${city} are closed on Sundays. Please switch to an open weekday or Saturday.`,
      city,
      getTomorrowISODate()
    );
    setAppointmentState(3);
    updateAppointmentSummary();
    return;
  }

  const unavailable = getUnavailableSlotsForSelection(city, chosenDate);
  if (unavailable.includes(timeStr)) {
    appointmentState.selectedTime = timeStr;
    appointmentState.selectedSlotUnavailable = true;
    renderTimeSlots();
    showUnavailableSlotBanner(
      `${timeStr} on ${chosenDate} (${city}) is currently booked. Please choose one of the available slots below.`,
      city,
      chosenDate
    );
    setAppointmentState(3);
    updateAppointmentSummary();
    return;
  }

  // Valid available slot selected -> State 2: Date & Time Selected
  appointmentState.selectedTime = timeStr;
  appointmentState.selectedSlotUnavailable = false;
  clearAllAppointmentErrors();
  hideUnavailableSlotBanner();
  renderTimeSlots();
  setAppointmentState(2);
  updateAppointmentSummary();
}

function showUnavailableSlotBanner(message, city, suggestedDate) {
  const banner = document.getElementById('slot-unavailable-banner');
  const textEl = document.getElementById('slot-unavailable-text');
  const suggestionsEl = document.getElementById('slot-suggestions-row');
  if (!banner || !textEl || !suggestionsEl) return;

  textEl.textContent = message;
  const targetDate = suggestedDate || getTomorrowISODate();
  const unavailable = getUnavailableSlotsForSelection(city, targetDate);
  const availableSlots = APPOINTMENT_TIME_SLOTS.filter((s) => !unavailable.includes(s.time)).slice(0, 3);

  suggestionsEl.innerHTML = availableSlots.map((slot) => `
    <button type="button" class="btn-suggest-slot" onclick="applySuggestedSlot('${targetDate}', '${slot.time}')">
      Use ${slot.time} (${targetDate})
    </button>
  `).join('');

  banner.classList.add('visible');
}

function hideUnavailableSlotBanner() {
  const banner = document.getElementById('slot-unavailable-banner');
  if (banner) banner.classList.remove('visible');
}

function applySuggestedSlot(dateStr, timeStr) {
  const dateInput = document.getElementById('appt-date');
  if (dateInput) dateInput.value = dateStr;
  appointmentState.selectedDate = dateStr;
  selectAppointmentSlot(timeStr);
}

function setAppointmentState(stateNum) {
  appointmentState.currentState = stateNum;

  const badge = document.getElementById('appointment-state-badge');
  const formEl = document.getElementById('appointment-booking-form');
  const successEl = document.getElementById('booking-success-container');
  const pillButtons = document.querySelectorAll('.state-pill-btn');

  pillButtons.forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.state) === stateNum);
  });

  if (!badge || !formEl || !successEl) return;

  badge.className = 'inquiry-state-badge';

  if (stateNum === 1) {
    badge.classList.add('badge-state-empty');
    badge.textContent = 'State 1: Empty Form';
    formEl.style.display = 'block';
    successEl.style.display = 'none';
  } else if (stateNum === 2) {
    badge.classList.add('badge-state-filling');
    badge.textContent = 'State 2: Date & Time Selected';
    formEl.style.display = 'block';
    successEl.style.display = 'none';
  } else if (stateNum === 3) {
    badge.classList.add('badge-state-error');
    badge.textContent = 'State 3: Error / Slot Unavailable';
    formEl.style.display = 'block';
    successEl.style.display = 'none';
  } else if (stateNum === 4) {
    badge.classList.add('badge-state-success');
    badge.textContent = 'State 4: Booking Confirmed';
    formEl.style.display = 'none';
    successEl.style.display = 'block';
  }
}

function handleAppointmentSubmit(event) {
  if (event) event.preventDefault();

  clearAllAppointmentErrors();

  const citySelect = document.getElementById('appt-city');
  const dateInput = document.getElementById('appt-date');
  const vehicleInput = document.getElementById('appt-vehicle');
  const nameInput = document.getElementById('appt-name');
  const phoneInput = document.getElementById('appt-phone');
  const emailInput = document.getElementById('appt-email');

  const city = citySelect ? citySelect.value : 'Lahore';
  const dateVal = dateInput ? dateInput.value : '';
  let hasError = false;

  if (!dateVal || dateVal < getTodayISODate()) {
    showFieldErrorByIds('appt-date', 'error-appt-date');
    hasError = true;
  }

  const unavailable = getUnavailableSlotsForSelection(city, dateVal);
  if (!appointmentState.selectedTime) {
    showFieldErrorByIds(null, 'error-appt-slot');
    hasError = true;
  } else if (isSundayDate(dateVal) || unavailable.includes(appointmentState.selectedTime)) {
    showFieldErrorByIds(null, 'error-appt-slot');
    showUnavailableSlotBanner(
      `Selected slot (${appointmentState.selectedTime}) is unavailable on ${dateVal}. Pick an available time slot to continue.`,
      city,
      isSundayDate(dateVal) ? getTomorrowISODate() : dateVal
    );
    hasError = true;
  }

  if (!vehicleInput || vehicleInput.value.trim().length < 3) {
    showFieldErrorByIds('appt-vehicle', 'error-appt-vehicle');
    hasError = true;
  }

  if (!nameInput || nameInput.value.trim().length < 2) {
    showFieldErrorByIds('appt-name', 'error-appt-name');
    hasError = true;
  }

  const digits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
  if (digits.length < 11) {
    showFieldErrorByIds('appt-phone', 'error-appt-phone');
    hasError = true;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
    showFieldErrorByIds('appt-email', 'error-appt-email');
    hasError = true;
  }

  if (hasError) {
    setAppointmentState(3);
    return;
  }

  hideUnavailableSlotBanner();
  populateConfirmationView();
  setAppointmentState(4);
}

function populateConfirmationView() {
  const serviceVal = document.getElementById('appt-service')?.value || '200+ Point Inspection';
  const cityVal = document.getElementById('appt-city')?.value || 'Lahore';
  const vehicleVal = document.getElementById('appt-vehicle')?.value.trim() || 'Vehicle';
  const nameVal = document.getElementById('appt-name')?.value.trim() || 'Valued Customer';
  const phoneVal = document.getElementById('appt-phone')?.value.trim() || '';
  const dateVal = appointmentState.selectedDate || getTomorrowISODate();
  const timeVal = appointmentState.selectedTime || '11:00 AM';

  const refCode = `FW-APT-${Math.floor(10000 + Math.random() * 90000)}`;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('confirm-ref-code', `Booking Ref: #${refCode}`);
  setText('confirm-customer-name', nameVal);
  setText('confirm-service', serviceVal);
  setText('confirm-center', `FastWheels ${cityVal} Center`);
  setText('confirm-datetime', `${dateVal} at ${timeVal}`);
  setText('confirm-vehicle', vehicleVal);
  setText('confirm-phone', phoneVal);
}

function updateAppointmentSummary() {
  const serviceVal = document.getElementById('appt-service')?.value || 'Not selected';
  const cityVal = document.getElementById('appt-city')?.value || 'Lahore';
  const vehicleVal = document.getElementById('appt-vehicle')?.value.trim() || 'Not entered yet';
  const dateVal = appointmentState.selectedDate || 'Not selected';
  const timeVal = appointmentState.selectedTime
    ? `${appointmentState.selectedTime}${appointmentState.selectedSlotUnavailable ? ' (Unavailable)' : ''}`
    : 'Not selected';

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('summary-appt-service', serviceVal);
  setText('summary-appt-city', `FastWheels ${cityVal} Center`);
  setText('summary-appt-date', dateVal);
  setText('summary-appt-time', timeVal);
  setText('summary-appt-vehicle', vehicleVal);
}

function showFieldErrorByIds(inputId, errorId) {
  if (inputId) {
    const input = document.getElementById(inputId);
    if (input) input.classList.add('form-input-error');
  }
  if (errorId) {
    const msg = document.getElementById(errorId);
    if (msg) msg.classList.add('visible');
  }
}

function clearFieldErrorByInput(inputId) {
  const input = document.getElementById(inputId);
  if (input) input.classList.remove('form-input-error');
  const errEl = document.getElementById(`error-${inputId}`);
  if (errEl) errEl.classList.remove('visible');
}

function clearAllAppointmentErrors() {
  ['appt-date', 'appt-vehicle', 'appt-name', 'appt-phone', 'appt-email'].forEach((id) => {
    clearFieldErrorByInput(id);
  });
  const slotErr = document.getElementById('error-appt-slot');
  if (slotErr) slotErr.classList.remove('visible');
}

function resetAppointmentForm() {
  const form = document.getElementById('appointment-booking-form');
  if (form) form.reset();
  appointmentState.selectedDate = '';
  appointmentState.selectedTime = '';
  appointmentState.selectedSlotUnavailable = false;
  populateServiceOptions('inspection');
  clearAllAppointmentErrors();
  hideUnavailableSlotBanner();
  renderTimeSlots();
  updateAppointmentSummary();
  setAppointmentState(1);
}

/**
 * Interactive Preview Helper for Reviewers: lets evaluator switch between all 4 required states
 */
function previewAppointmentState(targetState) {
  const dateInput = document.getElementById('appt-date');
  const citySelect = document.getElementById('appt-city');
  const vehicleInput = document.getElementById('appt-vehicle');
  const nameInput = document.getElementById('appt-name');
  const phoneInput = document.getElementById('appt-phone');
  const emailInput = document.getElementById('appt-email');

  if (targetState === 1) {
    resetAppointmentForm();
    return;
  }

  if (targetState === 2) {
    clearAllAppointmentErrors();
    hideUnavailableSlotBanner();
    if (citySelect) citySelect.value = 'Lahore';
    const openDate = getTomorrowISODate();
    if (dateInput) dateInput.value = openDate;
    appointmentState.selectedDate = openDate;
    selectAppointmentSlot('11:00 AM');
    return;
  }

  if (targetState === 3) {
    clearAllAppointmentErrors();
    if (citySelect) citySelect.value = 'Lahore';
    const openDate = getTomorrowISODate();
    if (dateInput) dateInput.value = openDate;
    appointmentState.selectedDate = openDate;
    selectAppointmentSlot('12:30 PM'); // Booked slot triggers State 3
    showFieldErrorByIds(null, 'error-appt-slot');
    return;
  }

  if (targetState === 4) {
    clearAllAppointmentErrors();
    hideUnavailableSlotBanner();
    if (citySelect) citySelect.value = 'Lahore';
    const openDate = getTomorrowISODate();
    if (dateInput) dateInput.value = openDate;
    appointmentState.selectedDate = openDate;
    appointmentState.selectedTime = '11:00 AM';
    appointmentState.selectedSlotUnavailable = false;
    if (vehicleInput && !vehicleInput.value.trim()) vehicleInput.value = '2023 Honda Civic RS Turbo';
    if (nameInput && !nameInput.value.trim()) nameInput.value = 'Bilal Ahmed';
    if (phoneInput && !phoneInput.value.trim()) phoneInput.value = '03001234567';
    if (emailInput && !emailInput.value.trim()) emailInput.value = 'bilal.ahmed@example.com';
    renderTimeSlots();
    updateAppointmentSummary();
    populateConfirmationView();
    setAppointmentState(4);
  }
}

/* ==========================================================================
   5. Initialize Member 4 Controllers on DOM Ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initCarFinancePage();
  initInspectionDetailingPage();
  initBookAppointmentPage();
});

// Expose interactive handlers used by inline HTML attributes
window.selectAppointmentSlot = selectAppointmentSlot;
window.applySuggestedSlot = applySuggestedSlot;
window.handleAppointmentSubmit = handleAppointmentSubmit;
window.resetAppointmentForm = resetAppointmentForm;
window.previewAppointmentState = previewAppointmentState;
