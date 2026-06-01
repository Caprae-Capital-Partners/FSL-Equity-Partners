# Claude Code Prompt — FSL Equity Partners Website

> **Note:** If you have the HTML export from Claude Design, add this line at the very top before pasting:
> *"Reference file `fsl-design.html` is attached — use it as the visual source of truth for spacing, exact colors, and layout details. The spec below describes the intended structure and behavior."*

---

Build a one-page marketing website for **FSL Equity Partners**, a search fund investor based in Boca Raton, Florida. The design has been finalized — your job is to implement it cleanly and faithfully. Do not redesign or improvise; build exactly what is specified below.

## Tech stack

- **Plain HTML, CSS, and vanilla JavaScript.** No frameworks, no build step, no bundler. One `index.html`, one `styles.css`, one `script.js`. Easy to deploy to Vercel/Netlify/any static host.
- **Google Fonts:** Cormorant Garamond (display, with italic) + Inter (body). Load via `<link>` in the head.
- **Mobile responsive.** Desktop is the primary target (this is a B2B credibility site viewed on laptops), but it must work cleanly on tablet and mobile. Use a single breakpoint at ~768px for mobile adjustments.
- **No external JS libraries.** Smooth-scroll behavior should use CSS `scroll-behavior: smooth` plus minimal vanilla JS for the sticky header active-link state.

## File structure

```
/
├── index.html
├── styles.css
├── script.js
└── /images
    ├── frederico.jpg    (placeholder for now — leave a styled empty div with "Photo · Frederico")
    └── jessica.jpg      (placeholder for now — leave a styled empty div with "Photo · Jessica")
```

## Design system

### Colors

```css
--navy:        #0F1B2E;   /* primary dark — hero, criteria section, contact section */
--navy-deep:   #0A1422;   /* slightly deeper, for hover states or accents */
--cream:       #F5EFE3;   /* primary light background — story, operational style, transition */
--cream-warm:  #EBE4D2;   /* slightly warmer cream — leadership section background */
--cream-light: #FBF8F1;   /* lightest cream — commitment section */
--gold:        #C9A961;   /* accent — italic display text, CTA button, section numbers */
--gold-hover:  #B8975A;   /* gold hover state */
--ink:         #1A1A1A;   /* primary dark text on light backgrounds */
--ink-muted:   #4A4A4A;   /* secondary body text on light backgrounds */
--cream-muted: #D4CDB8;   /* muted text on dark backgrounds (section labels, footer) */
```

**Important:** The client specifically wants the navy **deeper and darker** than typical "PE navy." Use `#0F1B2E` as specified — do not lighten it.

### Typography

```css
/* Display — Cormorant Garamond, used for all section headlines and the hero */
font-family: 'Cormorant Garamond', serif;
/* font-weights used: 400 (regular), 500 (medium), 400 italic */

/* Body & UI — Inter */
font-family: 'Inter', sans-serif;
/* font-weights used: 300 (light), 400 (regular), 500 (medium), 600 (semibold) */
```

**Type scale:**

- Hero headline: 72px / 1.1 / Cormorant 400, with italic accent at same size
- Section headlines: 56px / 1.15 / Cormorant 400
- Section labels (e.g., "01 OUR STORY"): 12px / Inter 500 / letter-spacing 0.15em / uppercase
- Subheadings (e.g., "Financial Profile"): 22px / Cormorant 500
- Body large (hero paragraph, intros): 17px / 1.65 / Inter 400
- Body regular: 15px / 1.7 / Inter 400
- Body small (footer, metadata): 12px / 1.5 / Inter 400 / uppercase / letter-spacing 0.1em
- Pull quote / italic intros: Cormorant 400 italic, 26px / 1.4

### Spacing

- Section vertical padding: 120px top/bottom on desktop, 80px on mobile
- Max content width: 1200px, centered with `auto` horizontal margins and 32px side padding
- Inner content width for centered prose: 720px max

### Buttons

```css
/* Primary CTA */
background: var(--gold);
color: var(--navy);
padding: 16px 32px;
font: 14px/1 Inter 500;
letter-spacing: 0.05em;
text-transform: uppercase;
border: none;
transition: background 0.2s ease;
/* hover: background var(--gold-hover) */

/* Secondary link */
color: var(--cream);
text-decoration: underline;
text-underline-offset: 6px;
font: 14px/1 Inter 400;
```

## Site structure (top to bottom)

### Header (sticky)

- Sits on top of the hero (so navy background shows through)
- Becomes solid `var(--navy)` background when scrolled past hero
- Left: small "F" monogram in a square + "FSL Equity Partners" wordmark + "BOCA RATON · FLORIDA" smaller tagline below
- Right: nav links — `Our Story` · `Leadership` · `Criteria` · `Process` · `Contact`
- Nav links use Inter 500, 13px, letter-spacing 0.05em, cream color
- Active section link gets a gold underline (track with vanilla JS using IntersectionObserver)
- Mobile: collapse nav into a hamburger that slides down a navy panel

### Section 1 — Hero (top of page, no anchor needed)

- Background: `var(--navy)`
- Min height: 100vh
- Content centered horizontally, vertically biased slightly above center
- Top: small gold-tinted label "PRESERVING LEGACIES · OPERATING FOR LONG-TERM GROWTH" (12px, letter-spacing 0.15em, color `var(--gold)`, uppercase)
- Headline (large, Cormorant 400, color `var(--cream)`):

  > A Trusted Partner<br>for Your Business's<br><em>Next Chapter.</em>

- The word "Next Chapter." is in italic and in `var(--gold)`
- Body paragraph (Inter 400, 17px, color `var(--cream)`, max-width 580px, centered):

  > FSL Equity Partners was founded by experienced executives and healthcare operators to buy, run, and grow a specialized healthcare or professional services business. We are husband and wife — not a corporate fund looking to cut costs or flip companies. We step directly into your shoes as owners, protecting your team, serving your clients, and building upon the legacy you have spent decades creating.

- CTA row (centered, 24px gap):
  - Primary gold button: `Connect Confidentially →` (no-op for now, link to `#contact`)
  - Secondary link: `Read Our Story` (anchor to `#story`)

### Section 2 — Our Story (`#story`)

- Background: `var(--cream)`
- Section label: `01 · OUR STORY` (top-left aligned)
- Headline (centered, italic Cormorant 400, 48px, color `var(--ink)`):

  > Every great business is built on a foundation<br>of trust, hard work, and deep relationships.

- Two body paragraphs (Inter 400, 16px, color `var(--ink-muted)`, max-width 720px, centered, 24px gap between paragraphs):

  > Having co-founded a family-owned, private-pay residential senior care business, we understand firsthand the immense care it takes to scale a high-performing, impactful company — and the emotional weight of deciding who will take over the keys.

  > We founded FSL Equity Partners to provide business owners with an exit strategy defined by trustworthiness, transparency, and a humane experience. We combine the institutional skill sets gained at top-tier healthcare and financial organizations with the heart and soul of small business owners. Our goal is a smooth transition where your company culture remains completely intact, your employees are championed, and your business is positioned to thrive for decades to come.

- Soft CTA below (centered, gold underlined text link): `Meet the Partners →` (anchors to `#leadership`)

### Section 3 — Leadership (`#leadership`)

- Background: `var(--cream-warm)`
- Section label: `02 · LEADERSHIP`
- Headline (centered, Cormorant 400, 56px):

  > **A Husband and Wife Partnership**

  *(Important: this section heading must read "A Husband and Wife Partnership" — not "The Partners".)*

- Below the headline: two-column layout (50/50 on desktop, stacked on mobile), 48px gap

**Left column — Frederico:**

- Photo placeholder at top: 4:5 aspect ratio, full column width. Background `var(--cream)`, with diagonal hatching pattern overlay (use CSS `repeating-linear-gradient` at 45°, 1px lines, 8px spacing, color rgba(15,27,46,0.08)). Centered label inside: "PHOTO · FREDERICO" in 11px Inter 500, letter-spacing 0.1em, uppercase, color `var(--ink-muted)`. When the real image is dropped in `/images/frederico.jpg`, this placeholder is replaced.
- Below photo: small label "MANAGING PARTNER · INCOMING CEO" (11px uppercase, letter-spacing 0.15em, gold)
- Name (Cormorant 500, 36px): `Frederico Lourenço, Ph.D.`
- LinkedIn link: `LinkedIn · in/frederico-lourenco` (small, Inter 400, 13px, with arrow), links to `https://www.linkedin.com/in/frederico-lourenco/`
- Bio paragraphs (Inter 400, 15px, color `var(--ink-muted)`, line-height 1.7):

  > Frederico is an experienced healthcare executive and business operator with over a decade of strategy, growth operations, business development, and hands-on leadership. Before focusing on small business acquisition, he served as a growth and operations executive at Flagship Pioneering — founders of Moderna — where he guided the incubation and growth of multiple biotechnology companies with the potential to change human health.

  > He built his operational and financial foundation leading teams at McKinsey & Company, where he partnered with executives to improve business operations and find new growth opportunities across a range of healthcare institutions. A scientist by background, Frederico earned his Ph.D. in Neuroscience from Weill Cornell Medicine and holds BSc and MSc degrees in Biomedical Engineering.

  > Frederico and Jessica co-founded a premium residential Memory Care business in North Carolina, founded in 2017 and generating approximately $2M EBITDA. Yet their most important mission is as parents to their two young children.

  > *Outside of healthcare, Frederico enjoys spending time with his family, playing tennis, and flying as a licensed private pilot.*

  *(The last line is italic.)*

**Right column — Jessica:**

- Same photo placeholder treatment, labeled "PHOTO · JESSICA"
- Label: "PARTNER · CFO"
- Name (Cormorant 500, 36px): `Jessica Saks, MBA`
- LinkedIn link: `LinkedIn · Coming soon` (not a link yet, render as plain text in the same style)
- Bio section: render a smaller "BIOGRAPHY" label (10px uppercase, letter-spacing 0.15em, ink-muted), then italic placeholder text:

  > *Bio coming soon.*
  >
  > Pending from Jessica — will include her background in finance and operations.

  Wrap this in a subtle bordered card (1px border `var(--cream-muted)`, 24px padding, no background).

### Section 4 — Our Commitment to Sellers (`#commitment`)

- Background: `var(--cream-light)`
- Section label: `03 · OUR COMMITMENT TO SELLERS`
- Centered italic intro (Cormorant 400 italic, 28px, color `var(--ink)`, max-width 760px):

  > *Selling your business is a once-in-a-lifetime milestone. We approach this responsibility with the care it deserves, ensuring the transition honors everything you have built.*

- 2×2 grid below (24px gap, max-width 1000px centered)
- Each grid item is a card:
  - Subtle 1px top border in `var(--cream-muted)`
  - 32px internal padding
  - Number label in gold (e.g., "01") — 14px Inter 500
  - Title in Cormorant 500, 22px, `var(--ink)`
  - Description in Inter 400, 14px, `var(--ink-muted)`, line-height 1.7

**The four items, in order:**

1. **Absolute Privacy** — We protect your competitive advantage. Every conversation, financial document, and meeting is held in strict confidence to protect your daily operations, employees, and client relationships.
2. **Legacy Protection** — Your company is far more than a set of numbers on a spreadsheet. We commit to keeping your brand identity, core values, and community reputation as the foundation for all future growth.
3. **Care for Your People** — A business is only as strong as the team behind it. We pledge to support, retain, and protect your existing staff, providing them with clear and stable opportunities for professional growth.
4. **Highly Focused** — Unlike traditional investment firms that manage dozens of companies at the same time, we are looking to buy and grow a small number of high-quality businesses. Your company will matter more to us than it would to any investment firm, and it will receive the daily time, energy, and care it deserves.

### Section 5 — Investment Criteria (`#criteria`)

- Background: `var(--navy)` (text on dark)
- Section label: `04 · INVESTMENT CRITERIA` (color `var(--cream-muted)`)
- Two-column header row:
  - Left: large headline (Cormorant 400, 56px, `var(--cream)`):

    > What we are<br><em>looking for.</em>

    *("looking for." in italic + gold)*
  - Right: italic intro paragraph (Cormorant italic, 18px, `var(--cream-muted)`, max-width 440px):

    > *We are actively searching for an exceptional company that matches our operational expertise and values. We look for businesses with strong fundamentals and a clear reason for a transition.*

- 2×2 grid below (48px gap, separator lines between cells using 1px `var(--cream-muted)` at 0.2 opacity)
- Each quadrant has:
  - Number + category title row at top: "01" in gold + category name in Cormorant 500, 28px, `var(--cream)`
  - List of sub-criteria below, each with bolded title (Inter 500, 14px, `var(--cream)`) and italic description (Inter 400, 13px, `var(--cream-muted)`, line-height 1.7)

**The four quadrants:**

**01 · Financial Profile**

- **Annual Earnings** — Operating profit (EBITDA) in the $2–5 million range.
- **Revenue Quality** — High proportion of recurring or highly predictable revenue from a diverse, well-established customer base.
- **Healthy Margins** — Consistent historical profitability with clean, straightforward financial records.

**02 · Business & Operations**

- **Market Position** — A well-established company with a minimum of 10 years of stable operations and a premier reputation in its market.
- **Transition Need** — Founder- or family-owned businesses where the owner is seeking an exit plan due to retirement, health, or a desire to step back from daily leadership.
- **Sustainable Edge** — Businesses built on strong customer loyalty, unique service models, or high-touch care that cannot be easily displaced by large corporate chains.
- **Team Stability** — A loyal, skilled staff group or middle management tier capable of continuing daily operations alongside the incoming CEO.

**03 · Industry Focus**

- **Specialized Healthcare Services** — Examples include premium home health, concierge nursing, private-pay specialized clinical care, senior memory care, and high-end behavioral health businesses.
- **Elite Professional Services** — Premium consumer or business services characterized by strong client retention, specialized expertise, and clear brand equity.

**04 · Geographic Focus**

- **South Florida (Primary)** — Prioritizing businesses located in South Florida — we are based in Boca Raton.
- **Broader Southeast** — Open to select, high-quality opportunities throughout the broader Southeast region; requires an experienced GM or Director on site to ensure an effective transition process.

### Section 6 — Our Operational Style (`#operations`)

- Background: `var(--cream)`
- Section label: `05 · OUR OPERATIONAL STYLE`
- Two-column header row (same pattern as Criteria):
  - Left headline: `How we` (regular) + `operate.` (italic gold), Cormorant 400, 56px
  - Right italic intro:

    > *We combine long-term financial stability with full-time leadership to protect and unlock a company's full potential safely. Our business philosophy is built on clear communication, absolute integrity, and thoroughness.*

- Below: 5 horizontal rows. Each row is a 3-column grid:
  - Column 1 (narrow, ~80px): number in Cormorant 500, 28px, gold — "01", "02", etc.
  - Column 2 (~280px): title in Cormorant 500, 22px, ink
  - Column 3 (rest): description in Inter 400, 15px, ink-muted, line-height 1.7
- Rows separated by 1px `var(--cream-muted)` border-bottom, 32px vertical padding

**The five items:**

1. **Full-Time, Hands-On Leadership** — We are not hands-off financial investors. After the sale, Frederico will step directly into the business as the full-time CEO, dedicating his entire professional life to managing day-to-day operations and taking care of your customers.
2. **Patient, Steady Capital** — Our financial partners are long-term investors who care about sustainable, steady growth rather than quick profits. This allows us to make business decisions that look years into the future.
3. **Tailored Sale Options** — We know that every business owner has different personal and financial goals. Whether you want a clean break to enjoy retirement immediately, or a gradual, collaborative transition, we customize the timeline and terms around what works best for you.
4. **Upfront Honesty** — We believe in direct, clear conversations. We do not change our terms at the last minute or hide behind complex legal clauses. If a challenge comes up during our review, we address it openly and together.
5. **Respect for Your Expertise** — We know that you and your team are the ultimate experts in your business. We enter with a desire to listen and learn first, relying heavily on your team's knowledge before making any operational updates.

### Section 7 — The Transition Process (`#process`)

- Background: `var(--cream)` (continues from previous section, but separated by spacing)
- Section label: `06 · THE TRANSITION PROCESS`
- Two-column header row:
  - Left headline: `A clear path` (regular) + `to a sale.` (italic gold), Cormorant 400, 56px
  - Right italic intro:

    > *We value your time. We have designed a clear, straightforward path to a sale that minimizes distractions, letting you run your business while we plan its next chapter.*

- Below: 4-column grid (stacks to 2x2 on tablet, 1 column on mobile)
- Each step is a card:
  - Top: small label `STEP 01` (gold, Inter 500, 11px uppercase) + duration `1–2 Weeks` (Inter 400, 12px, ink-muted) on the same row
  - Step title in Cormorant 500, 22px, ink (24px top margin)
  - Small caps subheading "THE GOAL" (10px, uppercase, letter-spacing 0.15em, gold), then short text
  - Small caps subheading "WHAT HAPPENS", then longer description
  - Body text Inter 400, 14px, ink-muted, line-height 1.65

**The four steps:**

**STEP 01 · 1–2 Weeks — Getting Acquainted**

- THE GOAL: To see if we are a good match for each other.
- WHAT HAPPENS: We begin with a private, 30-minute phone call to share our backgrounds, discuss your goals for retirement or transition, and see if your business aligns with our criteria. If there is mutual interest, we sign a simple Confidentiality Agreement and review a high-level summary of your financial history.

**STEP 02 · 2–3 Weeks — An Honest Proposal**

- THE GOAL: To agree on a fair price and basic structure for the sale.
- WHAT HAPPENS: We perform a quick, focused review of your business operations and financial health. Using this information, we present you with a clear, easy-to-understand written proposal (a Letter of Intent). This document outlines our valuation of the business and a clear blueprint for the payout, completely free of financial games.

**STEP 03 · 60–90 Days — Collaborative Review & Financing**

- THE GOAL: To verify the business details and prepare the final legal paperwork.
- WHAT HAPPENS: Once we agree on a price, we work quietly alongside you to confirm financial and legal details. During this window, we also finalize our pre-arranged funding with our long-term investors. We carry out this process with a light touch to ensure your employees and daily operations are never disrupted.

**STEP 04 · Day 1 Onward — Handover & Long-Term Growth**

- THE GOAL: A seamless, worry-free transfer of ownership.
- WHAT HAPPENS: We close the sale, funds are transferred, and Frederico joins your team full-time. We step into the business alongside you for a customized, cooperative transition period (often up to 12 months) to ensure clients, partners, and employees feel completely secure as we take over day-to-day leadership.

### Section 8 — Contact (`#contact`)

- Background: `var(--navy)`
- Section label: `07 · GET IN TOUCH` (cream-muted)
- Two-column layout:
  - Left: Large headline (Cormorant 400, 64px, cream):

    > One conversation.<br><em>No commitments.</em>

    *("No commitments." italic + gold)*

    Supporting copy below (Inter 400, 16px, cream-muted, max-width 440px):

    > If you are looking for a reliable, qualified leader to carry your company forward, let's have a confidential conversation.

    CTA row: primary gold button `Schedule a Call →` + secondary cream link `Email Us`

  - Right: contact details column, each item with a small uppercase label and the value below:
    - DIRECT PHONE — (347) 640-0144
    - EMAIL — fred@fslequitypartners.com
    - LINKEDIN — Connect with Frederico (link)
    - OFFICE — Boca Raton, Florida

### Footer

- Background: `var(--navy-deep)` (slightly darker than the contact section above for separation)
- One row, full-width with side padding:
  - Left: small "F" monogram + "FSL EQUITY PARTNERS · BOCA RATON, FL" (11px Inter 400, cream-muted, letter-spacing 0.1em)
  - Right: "© 2026 FSL EQUITY PARTNERS · ALL RIGHTS RESERVED" (same styling)
- 40px vertical padding

## Behavior

- **Smooth scroll** on all nav links using `scroll-behavior: smooth` on html element + `scroll-margin-top: 80px` on each section (to offset the sticky header).
- **Sticky header background:** transparent at top of page; transitions to solid navy with subtle bottom border when scrolled more than 100px. Use a vanilla JS scroll listener to toggle a `.scrolled` class on the header.
- **Active nav link:** Use `IntersectionObserver` to detect which section is currently in the viewport and add an `.active` class to the corresponding nav link (gold underline).
- **No other animations for now.** Client will request specific animations in a later pass.

## Responsive

- Single breakpoint at 768px.
- On mobile:
  - All multi-column grids collapse to single column
  - Hero headline drops to 48px, section headlines drop to 36px
  - Section padding drops to 80px top/bottom
  - Header nav collapses to a hamburger toggle that reveals a navy overlay panel
- Test that everything is readable and well-spaced at 375px width (iPhone SE).

## What to defer

- Don't implement form submission for any CTA. Buttons are visual only — anchor `Connect Confidentially` and `Schedule a Call` to `#contact`. `Email Us` links to `mailto:fred@fslequitypartners.com`.
- Don't add any animations beyond smooth scrolling and the header scroll-state transition.
- Don't worry about real photos yet — use the styled placeholder treatment described in the Leadership section.

## Deliverable

Clean, commented, production-ready code. Three files. No build step. Open `index.html` in a browser and it works. Pass it through an HTML validator before finishing.
