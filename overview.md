---
title: overview

---

VERY IMPORTANT: BRAND, WEBSITE AND CONTENT HAS TO BE IN ITALIAN

## High-level overview of the project

### What you’re building

A **local-only Super 8 / 8mm digitization micro-service in Palermo** with:

* a **simple, tiered pricing model** (by total minutes per order),
* an optional **Clean+ enhancement pass** (stabilization/flicker/color balancing/denoise-light),
* a **risk-managed intake process** (autovalutazione + check-up path),
* **tight custody + privacy posture** (inventory photos, clear acceptance rules, 15-day retention).

### Target customers

* **Families with film archives** (primary): want safety, clarity, local custody, predictable pricing.
* **Artists** (secondary): want consistency and optional master export, but you’re not selling editing/story products.

### Core value proposition

* **No shipping. No ambiguity. No “per reel surprises.”**
* You sell **trust and simplicity**, not maximum technical restoration.

---

## Operating model (end-to-end)

### Service scope

* Base: **Digitize → MP4 1080p**, one file per reel.
* Optional: **Clean+ image pass** (conservative improvements).
* Optional: **Master export** (ProRes/DNxHR).
* Explicit exclusions: no audio capture, no editing/montage, no colorization.

### Intake & custody

* Local drop-off/pickup only.
* Inventory workflow: order ID, reel numbering, photos, notes on condition.
* Stop conditions: vinegar smell, severe deformation, torn perforations, contamination, brittleness.

### Data handling

* Deliver via customer drive or expiring download link.
* Keep files max **15 days** then delete.

---

## Brand direction (instructions)

### Brand idea

“**Memorie analogiche, rese accessibili oggi, senza perdere la loro anima.**”

### Positioning

* Artisan-like care + procedural rigor.
* Friendly, not nostalgic-kitsch.
* Transparent about limits.

### Visual mood

* **Warm yellow/amber base** (Kodak-like energy) + **geometric VHS/Super 8 packaging-inspired patterns**.
* Use original geometric compositions/pattern language; avoid trademark confusion (no copying brand assets).

### Visual system

* Define a small, repeatable system:

  * 4 proprietary patterns (diagonals, grid, diamond, capsule labels)
  * 6-color palette (yellow/black/cream + 2–3 accents)
  * strong layout geometry (diagonal cuts, modular blocks)
  * archival photo treatment: desaturated/film-like, with modern graphic overlays

### Logo direction

* Simple 1-color mark that works on labels:

  * frame + monogram OR lens circle + perforation hint OR wordmark with diagonal cut.

### Tone of voice

* Short, procedural, concrete.
* Trust language: “inventory, custody, retention, no shipping, clear pricing.”
* Avoid “restauro cinematografico” promises; call it “miglioramento conservativo”.

---

## Website direction (instructions)

### Site goal

Convert visitors into:

* **Digitalization bookings** (standard path)
* **Check-up bookings** (uncertain/damaged path)

### IA (single-page or small set)

* Home
* Prices
* Preventivo funnel entry (or embedded)
* Terms + Privacy (simple and explicit)

### Critical page blocks

1. **Hero**: what it is + local-only + simple pricing + CTA
2. **How it works**: 6-step timeline (drop-off → inventory → clean → scan → Clean+ optional → delivery + deletion)
3. **Pricing**: tier boxes (0–30, 31–60, etc.) + Clean+ tiers + master export + rush (optional) + delivery options
4. **Before/After**: small comparative section showing:

   * base digitization vs Clean+ outcome
   * four micro-cases: flicker, stabilization, denoise-light, color balance
5. **Trust/Policies**: acceptance criteria, stop conditions, custody/inventory, 15-day retention
6. **FAQ**: no shipping, no audio, no editing, expected limits
7. **Booking**: two CTAs (Digitize vs Check-up)

### UX constraints

* Pricing must be “choose a box, pay a number.”
* Make the “no audio / no editing” constraint impossible to miss.
* Every promise must map to a repeatable operational step.

---

## Funnel direction (instructions)

### Funnel objective

Collect enough structured info to:

* estimate the **minutes range** and corresponding price tier,
* route users into **Digitize vs Check-up**,
* record **declarations/consents** (ownership, limits, retention, TOS/Privacy),
* take an **advance payment that scales by tier** (plus separate paid check-up path).

### Funnel structure

1. **Condition self-check** (5 questions: vinegar smell, deformation, perforations, contamination, brittleness)

   * All “No” → Digitize path
   * Any “Yes/Not sure” → Check-up path
2. **Volume estimation**

   * number of reels
   * reel size selection with visual guidance
   * minute estimate using conservative ranges
3. **Tier assignment**

   * map estimated minutes → price tier
   * compute tier-based advance payment
4. **Add-on interest**

   * Clean+, master export, delivery preference, rush interest
5. **Identity + declarations**

   * contact info
   * ownership permission
   * “image only / no audio”
   * “quality depends on source”
   * “15-day retention”
   * accept TOS + Privacy
6. **Payment + booking**

   * Digitize path: advance payment by tier, then booking slot
   * Check-up path: fixed check-up payment, then booking slot

### Data logging requirements

* Order ID
* Funnel answers (condition + volume)
* Estimated minutes + tier
* Add-on interest
* Timestamp + TOS version identifier
* Payment status + booking status

### Operational alignment

* Funnel outputs must match intake form fields to avoid retyping.
* Check-up must be positioned as “paid evaluation” that can be credited toward the order if you proceed.

---

## Deliverables your agent should produce (high level)

* Brand kit: palette, patterns, typography, logo directions, image treatment rules, UI components.
* Website: content architecture + layout system + responsive components + pricing and before/after module.
* Funnel: question flow, routing logic, tier calculator, payment/booking handoff, data schema for logging.
* Legal text set (Italian): TOS, intake form, privacy/retention language, payment/refund rules consistent with funnel.
* Operational playbook: intake checklist, stop conditions, file naming + retention process, QA checklist.
