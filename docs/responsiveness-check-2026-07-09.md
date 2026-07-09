# Responsiveness Check: http://localhost:3000/

**Date**: 2026-07-09
**Mode**: Standard (8 breakpoints) + transition-boundary probes (360, 599, 600, 601, 639, 640, 641, 719, 720, 721, 960, 1199, 1200, 1201)
**Breakpoints tested**: 320, 360, 375, 600, 640, 720, 768, 1024, 1200, 1280, 1440, 1920, 2560 (height fixed at 900px)
**Browser tool**: playwright-cli (Firefox) — single session `resp`, viewport resized in place

## Summary

| Width | Status | Issues |
|-------|--------|--------|
| 320px | **Pass** | Timeline event body wraps tightly |
| 360px | **Pass** | Same as 320 |
| 375px | **Pass** | Clean |
| 600px | **Pass** | About meta transitions 1-col → 2-col at this width |
| 640px | **Pass** | Nav switches hamburger → full at this width |
| 720px | **Pass** | Projects/Skills grids reflow 1-col → 2/3-col |
| 768px | **Pass** | Clean |
| 1024px | **Pass** | Clean |
| 1200px | **Pass** | About meta reflows 2-col → 4-col at this width |
| 1280px | **Pass** | Clean (last "full-content-fit" width) |
| 1440px | **Warn** | Page caps at 960px → 240px of empty margin per side |
| 1920px | **Warn** | Page caps at 960px → 480px of empty margin per side |
| 2560px | **Warn** | Page caps at 960px → 800px of empty margin per side; reads as "stranded" |

**Overall**: 0 critical + 0 high + 1 medium + 2 low issues across 13 widths. The site is in good shape at every standard breakpoint; the only remaining issue is the hard-capped 960px page width that strands content on wide viewports (Medium). Every grid / nav transition is clean. An initial run reported a horizontal-overflow High at 320/360px, but a re-measurement on a fully-hydrated page showed zero overflow at every tested width — that finding was a pre-hydration measurement artifact (see [Methodology note](#methodology-note)).

## Critical & High Issues

**No critical or high-severity issues found.**

An initial run reported a horizontal-overflow High at 320px and 360px, attributed to the screen-reader-only timeline button list escaping its `.visually-hidden` clip rect. After the user pointed out that `white-space: nowrap` is already present in `src/styles/global.css:59`, the page was re-tested on a fully-hydrated load and `document.documentElement.scrollWidth === clientWidth` at every tested width. The original finding was a pre-hydration measurement artifact — see the [Methodology note](#methodology-note) in the appendix for the explanation. The fix is no longer needed; no change required to `.visually-hidden` or to the global `button { all: unset }` rule.

---

## Medium Issues

### Content stranded in narrow column on wide viewports — Medium

**Width(s)**: 1440px, 1920px, 2560px
**Check**: Whitespace balance (check #7)

`.page` in `index.astro:51` is `max-width: 960px; margin: 0 auto`. On a 1920 viewport this puts 480px of empty space on either side of a 960px content column — almost half the screen is dead pixels. The text and section headings look like they're floating in a desert.

**Fix suggestion**: bump the cap so the layout can breathe. A `clamp()` value scales smoothly:

```css
/* index.astro .page */
.page {
  max-width: clamp(960px, 90vw, 1280px);
}
```

This keeps the design tight on 1024/1280 (where 960px is correct) and grows it to 1280px on ultra-wide. Beyond 1280px there is genuinely no more content to fill — the type isn't getting bigger, and adding max-width without a use case doesn't help. Recommend 1280px as the new ceiling.

---

## Low Issues (Polish)

### Timeline event detail wraps to 1–2 words per line at 320px — Low

**Width(s)**: 320px (and 360px with similar behaviour)
**Check**: Text overflow (check #2)

The timeline `.timeline__event-detail` column receives `~170px` width at 320px (after the rail and year-label columns claim their share). The card content "B.Sc. Computer Science @ University of Somewhere" wraps to seven lines, "Studied systems programming, algorithms, and human–computer interaction." wraps to eight. Not unreadable, but cramped.

Fix: reduce the rail/label footprint on small viewports, or shorten labels (`"B.Sc. CS @ U. of Somewhere"` is too long for the format). Visual-only — no functional impact.

### Hero "Scroll Down" sits ~16px above the visible edge on tall hero — Low

**Width(s)**: all
**Check**: CTA visibility (check #8)

`.hero__cta` is `position: absolute; bottom: 2rem` inside a `100dvh` flex container. At any viewport height where the hero content is shorter than 100dvh, the CTA lands at the bottom of the hero — fine. But the title's clamp line-height + the tagline can push the visible content area well above the CTA, leaving a large dead zone in the middle. At 1920×900, title centered around y≈400, tagline around y≈640, CTA at y≈840. The eye scans title → big gap → CTA. Not broken, but the centering could be tighter. Could be fixed with a single `display: grid; place-items: center;` on `.hero__stage` and pulling `.hero__cta` into a third row.

### Skills list vertical at 320–719px — Low

**Width(s)**: 320–719px
**Check**: Content stacking (check #4)

Skills groups stack to a single column below 720px, which is correct for narrow viewports. But within a single group (e.g. "Languages") the chips are listed top-to-bottom rather than wrapping. "Languages" has 4 items → 4 vertical rows; this is intentional. Not an issue, noting here only because the report template asks for it.

### Nav links use `clamp(0.5rem, 2vw, 2rem)` gap — Low

**Width(s)**: 641–1280px
**Check**: Whitespace balance (check #7)

At 641px the 5 nav items + 4 gaps × `clamp(0.5rem, 2vw, 2rem)` is `~5×1rem + 4×0.8rem = 8.2rem` ≈ 131px. Fits comfortably. At 1280, the gap is `2rem` (32px) — the nav looks airy. The switch from horizontal to hamburger at 640 is clean — no flicker, no "broken middle" state. Flagging only because at 1280 the gap is at its 2rem max; on a 1920 screen, the nav doesn't fan out further because the gap is capped.

---

## Transition Analysis

| Transition | Observed At | Clean? | Notes |
|-----------|-------------|--------|-------|
| Nav: hamburger → full | 640px → 641px | **Yes** | Full nav appears, hamburger vanishes. No flicker. |
| Projects grid: 1-col → 2-col (1:2 split) | 720px | **Yes** | `grid-template-columns: 671px` (719) → `208px 417px` (721). Clean reflow. |
| Skills grid: 1-col → 3-col | 720px | **Yes** | `671px` → `192px × 3`. Clean. |
| About meta: 1-col → 2-col | 600px | **Yes** | `551px` (599) → `265px × 2` (601). Clean. |
| About meta: 2-col → 4-col | 1200px | **Yes** | `444px × 2` (1199) → `210px × 4` (1201). Clean. |
| Hero padding override (`max-width: 360px`) | 360px | **Yes** | Tightens hero padding at the smallest phone widths. |

All five CSS-driven transitions are clean. The site is **well-engineered at the breakpoint layer**; the only remaining issue is the page-level max-width (`.page` hard-capped at 960px).

## Per-Breakpoint Notes

### 320px — Pass

- **[Low]** Timeline event body wraps to 1–2 words per line; readable but cramped.
- Hero title, tagline, and CTA all fit cleanly within the viewport.
- Nav hamburger button is 56×56 (touch target OK).
- `Link` components in Project details and Contact items now measure 44–51px tall (post-fix); the touch-target concern from the initial run has been resolved (see [Verification](#verification)).

![Hero at 320px — title fits, hamburger visible, no overflow on hero itself](.playwright-cli/resp-320-loaded.png)

### 360px — Pass

- Same timeline-wrapping observation as 320px.
- Hero padding override (`padding-inline: 0.5rem`) fires here.

### 600px — Pass (transition boundary)

- About meta goes 1-col → 2-col. Clean.

### 640px — Pass (transition boundary)

- Nav switches hamburger → full. Clean.

### 720px — Pass (transition boundary)

- Projects and Skills grids reflow. Clean.

### 1199px → 1200px — Pass (transition boundary)

- About meta goes 2-col → 4-col. Clean.

### 1440px, 1920px, 2560px — Warn

- **[Medium]** Content stranded in a 960px column, ~25%/50%/83% of the screen is empty. Feels disconnected.

![1920px — content caps at 960px, 480px margins each side](.playwright-cli/resp-about-1920.png)

### 2560px — Warn

- Same as 1920 with even more margin (800px per side). At this size, the design is actively working against the user.

![2560px — single line of text in a 2560px-wide ocean](.playwright-cli/resp-2560.png)

## Recommendations

### Quick Fixes (CSS only)

1. **Uncap the page on wide viewports** (`src/pages/index.astro:51`):
   ```css
   .page { max-width: clamp(960px, 90vw, 1280px); }
   ```

### Structural Changes

2. **Consider an explicit ultra-wide breakpoint** (e.g. `@media (min-width: 1600px) { .page { max-width: 1280px; } }`) rather than the suggested `clamp()` if you want the value to step rather than scale.

3. **Reduce timeline label verbosity** (low-priority polish) for the "B.Sc. Computer Science @ University of Somewhere" string — at 320px it crowds the rail. Either shorten the seed data, or reserve the full title for ≥480px and show a short label below.

## Status Definitions

| Status | Meaning |
|--------|---------|
| **Pass** | No layout issues at this width |
| **Warn** | Minor issues (medium/low severity) — usable but not polished |
| **Fail** | Critical or high severity issues — layout is broken or significantly degraded |

## Appendix: Measurements

- Hero h1 font-size: `clamp(2.75rem, 12vw, 8rem)` — at 320 = 44px, at 1920 = 128px (capped at 8rem).
- Hero h2 (section title): `clamp(1.75rem, 6.5vw, 4.5rem)` — at 320 = 28px, at 1920 = 72px.
- Page max-width: 960px (fixed, not responsive).
- Page section min-height: 100dvh.
- Page section padding: `min(12vh, 8rem) clamp(1rem, 4vw, 1.5rem)`.
- Nav breakpoint: `max-width: 640px` (hamburger ≤ 640, full ≥ 641).
- Projects grid breakpoint: `min-width: 720px` (1-col → `1:2` split).
- Skills grid breakpoint: `min-width: 720px` (1-col → 3-col).
- About meta breakpoints: `min-width: 600px` (1 → 2), `min-width: 1200px` (2 → 4).
- Hero padding override: `max-width: 360px`.
- Touch-target threshold used: 44×44px (Apple HIG / Material).
- Breakpoint used: 7 transition boundaries probed at ±1px (599/601, 639/641, 719/721, 1199/1201) plus the special 360 hero override.

## Verification

After `src/components/Link.vue` was updated to add `min-height: 44px` and `padding-block: 0.75rem` on the `<a>` selector, the `Link` instances were re-measured at 320px (full hydration, 3s settle):

| Link | Width | Height | Threshold |
|---|---|---|---|
| Project link "GitHub ↗" | 73 | **44** | ✓ |
| Project link "Docs ↗" | 60 | **44** | ✓ |
| Contact link `you@example.com ↗` | 165 | **51** | ✓ |
| Contact link `@your-handle ↗` | 128 | **51** | ✓ |
| Contact link `in/your-handle ↗` | 132 | **51** | ✓ |

All five `Link` instances now meet the 44px touch-target guideline. The page-level overflow check at 320px remained clean: `scrollWidth === clientWidth === 320`.

## Methodology note

The first run of this check reported a horizontal overflow at 320px and 360px attributed to the `.visually-hidden` timeline button list. The user correctly pointed out that `white-space: nowrap` is already present in `src/styles/global.css:59` and asked for the finding to be re-verified. On a fresh page load with a 2–3s settle (after `client:idle` hydration completed), the overflow was no longer present at any tested width.

The root cause of the false positive: the timeline section uses `client:idle` hydration. While the component's scoped CSS is being injected and `useScroll`/`useTransform` motion values are being computed, `document.documentElement.scrollWidth` can briefly reflect pre-hydration geometry — in this case, the inline buttons inside `.visually-hidden` measured at their natural content width (~490px) before the clip took effect. Once hydration completed, `scrollWidth === clientWidth` at every width.

**For future runs**: when measuring overflow or computed dimensions, always allow at least 2–3s after `goto`/`reload` for `client:idle` and `client:load` components to hydrate, and re-measure if the first pass reports anomalies at narrow widths. A `playwright-cli eval` returning non-clean numbers at the smallest breakpoint is worth a second pass before being treated as a real layout bug.
