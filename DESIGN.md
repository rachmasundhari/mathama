# Cakrawala design system

This is the authoritative visual and interface specification for the Cakrawala
site in `web/`. It records what the site already uses, not a future redesign.
When a new value is needed, add it here first, then use it in code.

The live sample is the `/palette` page (`src/pages/palette.tsx`). The
implementation source is `src/css/custom.css`. If code and this document
disagree, this document wins and the code is the bug.

Scope: the learning site only. The Typst booklet in `notes/` has its own
palette (`lib.typ`) and is not governed by this spec.

## 1. Principles

1. **Coast, not decoration.** White ground, shallow-water surfaces, ocean
   accents. No warm hues, no gradients behind long text.
2. **Story first.** The interface stays quiet so the lesson scene, dialogue, and
   lab stay loudest.
3. **One accent per view.** Ocean or teal carries the action. Two competing
   accent fills in one viewport is a defect.
4. **Computed values live in tokens.** Raw hex is allowed only inside
   illustrations, SVG diagrams, and the palette page itself.
5. **Light mode only.** The site declares no dark theme and must not assume one.

## 2. Color

### 2.1 Core palette

Contrast values are measured against white `#FFFFFF` at WCAG 2.1.

| Token | Hex | Name | Role | Contrast | Text allowed |
|---|---|---|---|---|---|
| `--c-white` | `#FFFFFF` | Putih | Page ground, cards | 1:1 | Ground only |
| `--c-ice` | `#F4FAFD` | Es | Softest surface, panels | 1.05:1 | Ground only |
| `--c-sky-pale` | `#EAF5FA` | Langit pucat | Info blocks, reading areas | 1.13:1 | Ground only |
| `--c-sky` | `#CFE8F3` | Langit | Chips, highlighted bands | 1.3:1 | Ground only |
| `--c-sea-glass` | `#A7D8CD` | Air dangkal | Calm areas, success tint | 1.6:1 | Ground only |
| `--c-aqua` | `#62C4C3` | Aqua | Data points, water marks | 2.1:1 | Graphics only |
| `--c-teal` | `#1A9DB5` | Toska | Secondary accent, data lines | 3.2:1 | Large text and graphics |
| `--c-ocean` | `#0F6B8F` | Laut | Primary action, links | 6.0:1 | Yes |
| `--c-ocean-deep` | `#0A4F6B` | Laut dalam | Dark panels, emphasized text | 9.0:1 | Yes |
| `--c-ink` | `#173A46` | Tinta | Body and heading text | 12.1:1 | Yes |
| `--c-slate` | `#5F747B` | Slate | Secondary copy | 4.9:1 | Yes |
| `--c-muted` | `#86979C` | Muted | Metadata only, never body copy | 3.0:1 | No (fails 4.5:1) |

Rules:

- Body copy uses `--c-ink` or `--c-slate`. `--c-muted` is limited to
  non-essential metadata, and is still a known contrast gap (see section 10).
- Aqua, sky, and sea glass are surfaces. Never place text on them expecting
  readability beyond large decorative labels.
- Ocean on white is the default link and button color. Hover darkens to
  `#0A5674`; pressed uses `--c-ocean-deep`.
- No cream, beige, sand, peach, coral, orange, or warm grey anywhere. A class
  name containing "cream" or "sand" does not license a warm value.

### 2.2 Surfaces and lines

| Purpose | Value | Token |
|---|---|---|
| Card border | `#DCE8EE` | `--c-line` (to be added) |
| Navbar/footer border | `#D9E8F0` | `--c-line-strong` (to be added) |
| Muted surface | `#F7FBFD` | `--c-surface-muted` (to be added) |
| Focus ring | `#7EC6C9` | `--c-focus` (to be added) |

These four values are used constantly but are not yet tokens. Section 10 lists
them as the first migration targets.

### 2.3 Gradients

Allowed only as a large background or a diagram fill that follows the vertical
sky-to-sea direction. Nine gradient declarations exist today; three are enough:
morning sky, shallow sea, deep sea. Do not place a gradient behind body text,
and do not gradient every layer on one page.

## 3. Typography

Family: `Plus Jakarta Sans`, falling back to `Inter`, `ui-sans-serif`, system UI.
One family for headings and body. Headings use tight negative tracking; body
text uses none.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero h1 | `clamp(44px, 4.2vw, 58px)` | 850 | 1.08 | -0.075em |
| Page h1 | `clamp(32px, 3vw, 42px)` | 850 | 1.14 | -0.045em |
| Section h2 | 27px | 830 | 1.2 | -0.03em |
| Card h3 | 22px | 800 | 1.3 | -0.02em |
| Body | 15px | 400 | 1.8 | 0 |
| UI text | 14px | 400 | 1.7 | 0 |
| Metadata | 13px | 500 | 1.6 | 0 |
| Caption | 12px | 500 | 1.6 | 0 |
| Label / eyebrow | 11px | 850 | 1.4 | 0.1em, uppercase |
| Big number | 30px | 750 | 1.2 | -0.02em |

The scale lives in `design/tokens.json` and generates the `--type-*` variables.
Use those variables in components. Do not add a new font size for one element.

Rules:

- Reading text is 15px. Any 13px text in a lab or card is supporting detail,
  not the main explanation.
- Body line length stays comfortable on desktop. Hero paragraphs cap
  at 455px; the docs article column caps at 880px including 24px side padding.
- Heading levels never skip. A card title is `h3` only when an `h2` precedes it
  in the same region.
- Numerals shown as data use `clamp()` at display scale and stay attached to
  their unit with `white-space: nowrap`.
- Do not add a second display face. Emphasis uses weight or ocean color.

## 4. Spacing

Rhythm is 4px based. The working set is 4, 8, 12, 16, 20, 24, 28, 32, 40, 48,
64, 80, 96, 110.

- Section padding: 78–110px vertical on desktop, 60–70px on mobile.
- Page container: max 1180px, 24px side padding; 21px below 996px.
- Card padding: 24–30px desktop, 16–20px mobile.
- Stack gap: 8px inside a label group, 16–20px between cards, 32–40px between
  sections.
- Arbitrary values such as 13px or 27px are tolerated only where an existing
  component already ships them; new work rounds to the set.

## 5. Radius, border, elevation

Canonical radii:

| Step | Value | Use |
|---|---|---|
| Small | 8px | Inputs, value chips, code chips |
| Medium | 12px | Notes, inline panels |
| Card | 16px | Standard cards |
| Large | 20px | Hero panels, feature cards |
| Hero | 22–27px | Only the hero demo and spotlight panel |
| Pill | 999px | Buttons, tags, kickers |

Borders are 1px `#DCE8EE`; emphasis borders are 1.5px. Shadows come from three
levels only:

- Resting card: `0 2px 0 rgba(15,107,143,.05)`
- Hover lift: `0 16px 32px rgba(15,80,105,.13)`
- Hero panel: `0 25px 65px rgba(15,80,105,.13)`

No neon glow, no glass blur except the navbar's 14px backdrop blur, no
oversized radii on small controls.

## 6. Motion

| Interaction | Duration | Easing |
|---|---|---|
| Hover color, border | 120–150ms | ease |
| Card lift | 200ms | ease |
| Image scale | 350ms | ease |
| Progress bar | 200ms | ease |
| Marble pop, value flip | 420–450ms | `cubic-bezier(.16,1,.3,1)` |
| Hero entrance | 580–720ms | `cubic-bezier(.16,1,.3,1)` |
| Ambient loop | 6–24s | ease-in-out, alternate |
| Page-level scroll | browser default | smooth, disabled by reduced motion |

Rules:

- Animate `transform`, `opacity`, and color only. Never animate width, height,
  top, or left as a hover effect.
- Exit motion runs at 60–70% of the entrance duration.
- Every animation is disabled under `prefers-reduced-motion: reduce`. The
  global override at the end of `custom.css` handles most cases; the palette
  horizon waves need it explicitly.
- Motion explains a state change. Decorative idle motion stays in three approved
  places: the horizon sample on `/palette`, the home hero, and the chapter card
  symbols on the home page. A symbol sits straight, then wobbles under 2.5°.
  The wobble is two sine waves at unrelated periods summed in `rotate`, run
  linearly, so it never stops at a pivot. Fixed keyframes always pause at each
  stop, which reads as ticking. Do not promote the symbol to its own layer with
  `will-change`: a rotated text layer resamples glyphs and shimmers, while
  re-rasterised text stays clean. The wobble stops under the pointer and focus.

### 6.1 Home hero

The hero is the one authored motion sequence on the site. It carries the
product idea: a variable changes, and the picture and the equation change with
it.

- The lab demo may run by itself, one value step every 2.6s. It pauses when the
  demo leaves the viewport, stops for good once the visitor touches the slider
  or focuses it, and never starts under reduced motion. A value never changes
  under the visitor's hand.
- Entrance is choreographed once: copy children rise in order (580ms, 70ms
  apart), the demo settles its tilt (720ms), the notes arrive last. No element
  waits longer than 900ms, and the page stays readable if animations do not run.
- Each marble and the equation result acknowledge the new value (420–450ms).
  This is feedback, not decoration.
- Ambient loops (floating notes, spotlight boxes, hero aura) run 6–24s and are
  never the only cue for a state. The spotlight boxes bob and share the symbol
  noise sets, on their own delays. The demo card itself stays still: it holds a
  slider, and the value must not move under the visitor's hand.
- Use the separate `translate` and `scale` properties for idle loops so they do
  not fight a `transform` that carries a static rotation.

## 7. Components

### 7.1 Navbar and footer

- 78px tall desktop, 65px mobile. White ground, 1px bottom border, no shadow.
- Brand title `cakrawala.` at 25px, weight 850.
- Links 14px, weight 660, slate; active and hover use ocean.
- One primary pill CTA at the right, ocean background, white label.
- Brand mark: ocean rounded tile `#0F6B8F`, white stroke, sea-glass dot
  `#A7D8CD`. Never green, cream, or gold.
- Footer mirrors the navbar: white ground, top border, three link columns max.

### 7.2 Buttons

- `.button` is the shared base: inline-flex, gap 18px, pill radius, weight 800.
- `.primaryButton`: ocean ground, white label. Hover darkens; focus ring visible.
- `.outlineButton`: transparent, 1.5px border, slate label.
- `.lightButton`: white or pale sky ground for use on dark panels.
- `.successButton`: pale sea glass ground, deep ocean label, never the only
  success cue; pair with text or an icon.
- Disabled: 0.55 opacity, `not-allowed` cursor, no hover lift.
- Minimum height 44px; 52px for hero CTAs.

### 7.3 Cards

- One border, one background, one radius. The accent is a single 5px bottom bar
  on chapter cards only.
- Chapter cards use sea-tone grounds: `#EAF7FD`, `#DDF3F7`, `#EEF9FD`, `#D8EFEC`,
  `#D9E8F0`, `#F6FCFF`. Legacy class names (`cardMint`, `cardCream`, `cardSand`,
  `cardPeach`, `cardLilac`) are historical labels for these values.
- Hover lifts 4–6px and deepens the shadow. No hover state may reduce text
  contrast.
- Cast cards: square portrait frame, name, role, two-line description. The image
  fills the square with `object-fit: cover`; the square comes from
  `aspect-ratio`, never a fixed pixel height. No text over the image.
- Step cards: one pale-sky icon tile (`#EAF5FA`) with an ocean icon for all
  three steps; do not tint each step differently.

### 7.4 Lesson page

- Kicker pill: 10px uppercase, ocean label on pale sky.
- Lesson `h1` sits on a soft pale panel with a 20px radius. This is the only
  gradient heading treatment on the site.
- `h2` is ocean, 29px, followed by a 48px aqua underline.
- Body prose uses slate at 16px/1.86.
- Blockquotes: pale ground, 4px aqua left border.
- Tables: pale sky header, alternating `#F5FAFD` rows.
- Admonitions: 13px radius, aqua left border, no shadow.

### 7.5 Lab and quiz cards

- Lab card: 4px aqua top border; quiz card: 4px ocean top border.
- Padding 28–30px desktop, 16–20px mobile.
- Controls always have a visible `<label>`; the value chip shows the current
  number and never replaces the label.
- Sliders use the ocean thumb with a white 4px ring. Keyboard focus uses the
  global focus ring.
- Quiz options: 1.5px border, 13px radius, full-row clickable, selected state
  uses pale sky; correct state keeps a text or icon cue, not color alone.
- Feedback blocks always carry text: correct, incorrect, hint, explanation.

### 7.6 Icons

- One family: Lucide via `lucide-react`. Default 24px, stroke 1.9–2.
- Do not mix filled and outlined icons at the same hierarchy level.
- Do not use emoji as a functional icon. Decorative glyphs (`✦`, `✳`, `↗`,
  `→`) are allowed in marketing copy only, never as the sole control label.
- Content SVGs (charts, diagrams, illustrations) keep their own geometry and
  are never sized by the global `svg` rule.

### 7.7 Palette page

`/palette` is the live documentation. Its 12 core swatches must match section
2.1 exactly, including capitalization of the hex label. Adding a token means
adding a swatch and its CSS entry in the same change.

## 8. Accessibility floor

- Body text 4.5:1 minimum; large text, icons, and essential graphics 3:1.
- Every interactive element has a visible `:focus-visible` outline: 3px
  `#7EC6C9`, 3px offset.
- Every control is reachable and operable by keyboard.
- Never encode state with color alone. Correct, incorrect, selected, and
  disabled states pair color with text, icon, or shape.
- Touch targets are at least 44×44px with 8px separation.
- Images that carry meaning have descriptive Indonesian alt text; decorative
  art uses empty alt or `aria-hidden`.
- Layout survives 200% text scaling and 375px width without horizontal scroll.
- `prefers-reduced-motion` is honored everywhere.

## 9. Content voice

Interface language is Indonesian; code, comments, and documentation are English.

- Address the student as "kamu". No corporate tone, no exam-board jargon.
- Story copy follows `../agents/character-bible.md`: Ari notices, Naya
  organizes, Bima tests, Odi asks the obvious question, Kak Rani asks back.
- Open with a concrete problem and dialogue, never a definition. The first
  attempt fails before the concept appears.
- End a lesson with a short exchange and a question, not a moral summary.
- UI labels stay short and literal: "Mulai belajar", "Coba lab", "Cek
  pemahaman". No invented metrics, no fake urgency, no promises the product
  cannot keep (no login, no server grading).

## 10. Known drift (audit, 2026-11-05)

These were recorded before the master-token pass. Core tokens and chapter themes
now come from `design/tokens.json`; component-level raw hex remains the next
migration target.

| Finding | Detail |
|---|---|
| Token coverage | `custom.css` still contains raw hex in component styling; core colors, type, radius, spacing, and chapter themes are generated. |
| Duplicate layers | Generated `design-tokens.css` is imported first; older palette blocks in `custom.css` still exist but core values no longer override it. |
| Misleading alias | `--green` is still an ocean alias; retain for compatibility, do not use in new code. |
| Legacy names | `cardMint`, `cardCream`, `cardSand`, `cardPeach`, and `cardLilac` are removed from components; use `data-chapter`. |
| Contrast | `--c-muted` `#86979C` measures 3.0:1 and is limited to metadata. |
| Radius sprawl | 23 distinct pixel radii remain in legacy component CSS. |
| Focus token | `--role-focus` exists; legacy raw `#7EC6C9` still appears in places. |
| Gradient rule | Lesson `h1` and `lessonKicker` still use gradients; they are documented exceptions, not body backgrounds. |

Next: migrate component raw hex to `--c-*` and `--role-*`, then remove the
superseded palette blocks.

## 11. Governance

1. Change this document before changing the look.
2. Add or rename a token in one place: the `:root` block in `custom.css`.
3. Update `/palette` in the same change as any core color change.
4. Append new component styles at the end of `custom.css`, grouped under a
   comment, using existing tokens.
5. Do not edit global tokens without checking the home page, a lesson page, the
   practice page, and `/palette`.
6. New dependency for a visual effect needs a stated reason; prefer a small
   local component over a framework.

## 12. Canonical token block

Generated from `design/tokens.json` by `scripts/design-tokens.mjs`. Edit the
JSON, run `npm run design:tokens`, and never hand-edit
`src/css/design-tokens.css` or `src/design/tokens.generated.ts`.

The 12 core tokens, exactly as implemented:

```css
:root {
  --c-white: #FFFFFF;
  --c-ice: #F4FAFD;
  --c-sky-pale: #EAF5FA;
  --c-sky: #CFE8F3;
  --c-sea-glass: #A7D8CD;
  --c-aqua: #62C4C3;
  --c-teal: #1A9DB5;
  --c-ocean: #0F6B8F;
  --c-ocean-deep: #0A4F6B;
  --c-ink: #173A46;
  --c-slate: #5F747B;
  --c-muted: #86979C;
}
```

Framework aliases still map to these values through Docusaurus `--ifm-*`
variables. New component code uses the `--c-*` names.

## 13. Reference library

The OpenCode config `opencode.jsonc` installs
[`VoltAgent/awesome-design-md`](https://github.com/VoltAgent/awesome-design-md)
as the `awesome-design-md` reference. The global `design-reference` skill
(`~/.agents/skills/design-reference/`) looks up a brand's `DESIGN.md` and
adapts its rules to Cakrawala.

```powershell
& "$HOME/.agents/skills/design-reference/lookup.ps1" linear
& "$HOME/.agents/skills/design-reference/lookup.ps1" "reading surface"
```

A reference supplies decisions, not colors. The white/blue palette and the
rules in this document still win.
