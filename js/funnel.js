// ===== Funnel State =====
const state = {
  currentStep: 0,
  path: null, // 'digitize' or 'checkup'
  assessment: {},
  reelType: 'super8',
  reels: { small: 0, medium: 0, large: 0, xl: 0 },
  estimatedMinutes: 0,
  tier: null,
  addons: [],
  user: {}
};

// ===== Pricing Data =====
const tiers = [
  { min: 0, max: 30, price: 80, clean: 50, advance: 20, label: '0–30 min' },
  { min: 31, max: 60, price: 120, clean: 80, advance: 30, label: '31–60 min' },
  { min: 61, max: 120, price: 190, clean: 140, advance: 40, label: '61–120 min' },
  { min: 121, max: 180, price: 250, clean: 190, advance: 50, label: '121–180 min' },
  { min: 181, max: 240, price: 300, clean: 230, advance: 60, label: '181–240 min' },
  { min: 241, max: 300, price: 350, clean: 270, advance: 70, label: '241–300 min' },
  { min: 301, max: Infinity, price: null, clean: null, advance: 80, label: '300+ min', perMin: 1.10, cleanPerMin: 0.90 }
];

const riskLabels = {
  q1: 'Odore di aceto (possibile sindrome acetica)',
  q2: 'Pellicola deformata o ondulata',
  q3: 'Perforazioni strappate o bordi danneggiati',
  q4: 'Muffa, polvere o contaminazioni',
  q5: 'Pellicola fragile o spezzata'
};

// ===== DOM Elements =====
const steps = document.querySelectorAll('.funnel-step');
const progressSteps = document.querySelectorAll('.progress-step');

// ===== Navigation =====
function goToStep(step) {
  state.currentStep = step;
  steps.forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.funnel-step[data-step="${step}"]`);
  if (target) target.classList.add('active');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  progressSteps.forEach(ps => {
    const s = parseInt(ps.dataset.step);
    ps.classList.remove('active', 'completed');
    if (s < state.currentStep) ps.classList.add('completed');
    if (s === state.currentStep) ps.classList.add('active');
  });
}

// ===== Step 0: Path Selection =====
const pathDigitize = document.getElementById('pathDigitize');
const pathCheckup = document.getElementById('pathCheckup');

if (pathDigitize) {
  pathDigitize.addEventListener('click', () => {
    state.path = 'digitize';
    goToStep(1);
  });
  pathDigitize.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pathDigitize.click(); }
  });
}

if (pathCheckup) {
  pathCheckup.addEventListener('click', () => {
    state.path = 'checkup';
    goToStep(5); // Skip to identity for check-up
  });
  pathCheckup.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pathCheckup.click(); }
  });
}

// ===== Step navigation buttons =====
document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => handleNext());
});

document.querySelectorAll('[data-prev]').forEach(btn => {
  btn.addEventListener('click', () => handlePrev());
});

function handlePrev() {
  const step = state.currentStep;
  if (step === 1) goToStep(0);
  else if (step === 2) goToStep(1);
  else if (step === 3) goToStep(2);
  else if (step === 4) goToStep(3);
  else if (step === 5) {
    if (state.path === 'checkup') goToStep(0);
    else goToStep(4);
  }
}

function handleNext() {
  const step = state.currentStep;

  if (step === 1) {
    if (!validateAssessment()) return;
    processAssessment();
  } else if (step === 2) {
    if (!validateVolume()) return;
    calculateTier();
    goToStep(3);
  } else if (step === 3) {
    goToStep(4);
  } else if (step === 4) {
    collectAddons();
    goToStep(5);
  } else if (step === 5) {
    if (!validateIdentity()) return;
    collectIdentity();
    showResult();
  }
}

// ===== Assessment Logic =====
function validateAssessment() {
  for (let i = 1; i <= 5; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert('Rispondi a tutte le domande prima di proseguire.');
      return false;
    }
    state.assessment[`q${i}`] = selected.value;
  }
  return true;
}

function processAssessment() {
  const answers = Object.values(state.assessment);
  const hasRisk = answers.some(a => a === 'si' || a === 'nonso');
  const highRisk = answers.filter(a => a === 'si').length >= 3;

  if (highRisk) {
    state.path = 'not-eligible';
    goToStep(6);
    showResult();
  } else if (hasRisk) {
    state.path = 'checkup';
    goToStep(6);
    showResult();
  } else {
    state.path = 'digitize';
    goToStep(2);
  }
}

// ===== Volume Estimation =====
const reelInputs = {
  small: document.getElementById('reelSmall'),
  medium: document.getElementById('reelMedium'),
  large: document.getElementById('reelLarge'),
  xl: document.getElementById('reelXL')
};

const minuteRanges = {
  small: { min: 3, max: 5 },
  medium: { min: 8, max: 12 },
  large: { min: 15, max: 20 },
  xl: { min: 25, max: 35 }
};

Object.values(reelInputs).forEach(input => {
  if (input) {
    input.addEventListener('input', updateMinuteEstimate);
  }
});

function updateMinuteEstimate() {
  let minTotal = 0;
  let maxTotal = 0;
  Object.keys(reelInputs).forEach(size => {
    const count = parseInt(reelInputs[size].value) || 0;
    state.reels[size] = count;
    minTotal += count * minuteRanges[size].min;
    maxTotal += count * minuteRanges[size].max;
  });
  const avg = Math.round((minTotal + maxTotal) / 2);
  state.estimatedMinutes = avg;
  const display = document.getElementById('estimatedMinutes');
  if (display) {
    if (avg === 0) {
      display.textContent = '0 min';
    } else {
      display.textContent = `~${avg} min (${minTotal}–${maxTotal})`;
    }
  }
}

function validateVolume() {
  const total = Object.values(state.reels).reduce((sum, v) => sum + v, 0);
  if (total === 0) {
    alert('Inserisci almeno una bobina.');
    return false;
  }
  return true;
}

// ===== Tier Calculation =====
function calculateTier() {
  const mins = state.estimatedMinutes;
  let tier = tiers.find(t => mins >= t.min && mins <= t.max);
  if (!tier) tier = tiers[tiers.length - 1];
  state.tier = tier;

  const tierMinutes = document.getElementById('tierMinutes');
  const tierPrice = document.getElementById('tierPrice');
  const tierAdvance = document.getElementById('tierAdvance');
  const tierClean = document.getElementById('tierClean');

  if (tierMinutes) tierMinutes.textContent = `Fascia: ${tier.label} (~${mins} minuti stimati)`;

  if (tier.price !== null) {
    if (tierPrice) tierPrice.textContent = `€${tier.price}`;
    if (tierClean) tierClean.textContent = `Clean+: +€${tier.clean}`;
  } else {
    const totalPrice = Math.round(mins * tier.perMin);
    const cleanPrice = Math.round(mins * tier.cleanPerMin);
    if (tierPrice) tierPrice.textContent = `~€${totalPrice}`;
    if (tierClean) tierClean.textContent = `Clean+: ~+€${cleanPrice}`;
  }

  if (tierAdvance) tierAdvance.textContent = `Anticipo richiesto: €${tier.advance}`;
}

// ===== Add-ons =====
function collectAddons() {
  state.addons = [];
  document.querySelectorAll('input[name="addon"]:checked').forEach(cb => {
    state.addons.push(cb.value);
  });
}

// ===== Identity & Validation =====
function validateIdentity() {
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const comune = document.getElementById('userComune').value.trim();

  if (!name || !phone || !email || !comune) {
    alert('Compila tutti i campi obbligatori.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Inserisci un indirizzo email valido.');
    return false;
  }

  const declarations = document.querySelectorAll('input[name="decl"]');
  const allChecked = Array.from(declarations).every(d => d.checked);
  if (!allChecked) {
    alert('Accetta tutte le dichiarazioni obbligatorie per proseguire.');
    return false;
  }

  return true;
}

function collectIdentity() {
  state.user = {
    name: document.getElementById('userName').value.trim(),
    phone: document.getElementById('userPhone').value.trim(),
    email: document.getElementById('userEmail').value.trim(),
    comune: document.getElementById('userComune').value.trim()
  };
}

// ===== Result Display =====
function showResult() {
  goToStep(6);

  const resultDigitize = document.getElementById('resultDigitize');
  const resultCheckup = document.getElementById('resultCheckup');
  const resultNotEligible = document.getElementById('resultNotEligible');

  // Hide all
  if (resultDigitize) resultDigitize.style.display = 'none';
  if (resultCheckup) resultCheckup.style.display = 'none';
  if (resultNotEligible) resultNotEligible.style.display = 'none';

  if (state.path === 'digitize') {
    if (resultDigitize) {
      resultDigitize.style.display = 'block';
      const details = document.getElementById('resultDetails');
      if (details && state.tier) {
        const priceLabel = state.tier.price !== null
          ? `€${state.tier.price}`
          : `~€${Math.round(state.estimatedMinutes * state.tier.perMin)}`;

        let html = `
          <div class="detail-row"><span>Minuti stimati</span><span>~${state.estimatedMinutes}</span></div>
          <div class="detail-row"><span>Fascia</span><span>${state.tier.label}</span></div>
          <div class="detail-row"><span>Digitalizzazione</span><span>${priceLabel}</span></div>
        `;

        if (state.addons.includes('clean')) {
          const cleanLabel = state.tier.clean !== null
            ? `+€${state.tier.clean}`
            : `~+€${Math.round(state.estimatedMinutes * state.tier.cleanPerMin)}`;
          html += `<div class="detail-row"><span>Clean+</span><span>${cleanLabel}</span></div>`;
        }
        if (state.addons.includes('master')) {
          html += `<div class="detail-row"><span>Master Export</span><span>+€30</span></div>`;
        }
        if (state.addons.includes('drive')) {
          html += `<div class="detail-row"><span>Nostro disco</span><span>+€15</span></div>`;
        }

        html += `<div class="detail-row"><span>Anticipo</span><span>€${state.tier.advance}</span></div>`;
        details.innerHTML = html;
      }
    }
  } else if (state.path === 'checkup') {
    if (resultCheckup) {
      resultCheckup.style.display = 'block';
      const riskList = document.getElementById('riskList');
      if (riskList) {
        let html = '';
        Object.keys(state.assessment).forEach(key => {
          if (state.assessment[key] === 'si' || state.assessment[key] === 'nonso') {
            html += `<li>${riskLabels[key]}</li>`;
          }
        });
        if (!html) html = '<li>Richiesto controllo su indicazione del cliente.</li>';
        riskList.innerHTML = html;
      }
    }
  } else if (state.path === 'not-eligible') {
    if (resultNotEligible) resultNotEligible.style.display = 'block';
  }
}

// ===== Handle hash for direct check-up access =====
if (window.location.hash === '#checkup') {
  state.path = 'checkup';
  goToStep(5);
}

// ===== Mobile nav (reuse from main) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}
