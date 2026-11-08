# Cakrawala — Interactive Grade 7 Mathematics

Cakrawala is a Docusaurus + React + TypeScript site for junior-high mathematics.
Every lesson is a scene in the story of **Klub Cakrawala**, a group of students
in the fictional coastal town of Tanjung Cakrawala. The Grade 7 curriculum is
complete; Grades 8 and 9 are placeholders.

The site is in Indonesian. Documentation and code are in English.

## Quick start

Requirements: Node.js 20+ (22+ recommended), npm, and internet for the first
install.

```bash
cd web
npm install
npm run start
```

Open http://localhost:3000.

```bash
npm run test       # quiz bank and numeric answer tests
npm run typecheck  # TypeScript
npm run build      # production build (broken link = failure)
npm run serve      # inspect the build
```

## What is implemented

- Six Grade 7 chapters, 19 lessons, 14 practice sets
- Story-driven MDX lessons with recurring characters and one community mission
  per chapter
- Interactive React labs, including a three.js 3D similarity lab
- KaTeX math, quiz hints and explanations, local progress and best scores
- Responsive layout, keyboard-accessible controls, reduced-motion support
- Character portraits in `static/img/characters/`
- Coast palette and visual guide at `/palette`

Grade 8 and 9 course pages are placeholders. There is no login, server-side
grading, database, or analytics.

## Curriculum

| Chapter | Folder | Lessons |
|---|---|---|
| 1. Bilangan Bulat | `docs/grade-7/integers/` | number line, operations, factors |
| 2. Bilangan Rasional | `docs/grade-7/rational/` | between, compare, operations |
| 3. Rasio | `docs/grade-7/ratios/` | ratios, scale, rates |
| 4. Bentuk Aljabar | `docs/grade-7/algebra/` | variables, like terms, distributive, modelling |
| 5. Kesebangunan | `docs/grade-7/similarity/` | angles, meaning, triangles |
| 6. Data dan Diagram | `docs/grade-7/data/` | investigation, types, diagrams |

## Story and characters

The canon is `../agents/character-bible.md`. Ari notices, Naya organizes, Bima
tests, Odi asks the obvious question, and Kak Rani guides with questions. Each
chapter has one mission, from the lighthouse tide board to the town survey.

Character portraits are generated illustrations stored in
`static/img/characters/`.

## Interactive components

| Component | Purpose |
|---|---|
| `NumberLineLab` | move along a number line |
| `IntegerOpsLab` | sign rules for integer operations |
| `FactorLab` | factors, FPB, KPK, primes |
| `FractionLab` | compare and operate on fractions |
| `PercentLab` | discounts and tax |
| `RatioLab` | direct and inverse proportion |
| `ScaleLab` | map scale |
| `RateLab` | speed and unit rates |
| `AlgebraLab` | substitution |
| `LikeTermsLab` | like terms |
| `DistributiveLab` | distributive property |
| `EquationLab` | balance-scale equations |
| `PatternLab` | number patterns |
| `AngleLab` | parallel lines and transversals |
| `SimilarityLab` | similar triangles |
| `Similarity3DLab` | three.js similar cuboids |
| `DataLab` | charts and statistics |
| `QuizRunner` | quiz player |
| `LessonComplete` | progress button |

## Adding a lesson

1. Create an MDX file in the matching chapter folder.
2. Follow the frontmatter and narrative template in `../AGENTS.md`.
3. Register the doc id in `sidebars.ts`.
4. Add questions to `src/data/questions.ts` when needed.
5. Use a unique `lessonId` for `<LessonComplete>`.
6. Run `npm run typecheck && npm run test && npm run build`.
7. Run the `humanizer` review on the prose before finishing.

## Repository map

```text
web/
├── docs/                     lesson content
├── src/
│   ├── components/           interactive labs
│   ├── data/questions.ts     quiz bank
│   ├── hooks/                localStorage progress
│   ├── lib/answerChecker.ts  safe numeric answer parser
│   ├── pages/                home, courses, practice, about
│   └── css/custom.css        design system
├── static/img/characters/    character portraits
├── tests/                    Node unit tests
├── sidebars.ts
├── docusaurus.config.ts
└── package.json
```

## Design tokens

The single source of truth is `design/tokens.json` (colors, type, spacing,
radius, shadows, and chapter themes). Generate the CSS variables and typed
tokens after editing it:

```bash
npm run design:tokens
```

`npm run start`, `npm run build`, and `npm run typecheck` regenerate them
automatically. Do not edit `src/css/design-tokens.css` or
`src/design/tokens.generated.ts` by hand. The visual spec is `DESIGN.md`.

## Deployment

1. Replace `url: 'https://cakrawala.example.com'` in `docusaurus.config.ts`
   with the production domain.
2. Run `npm run build`.
3. Deploy `build/` to Cloudflare Pages, Netlify, or Vercel.

The site is static. Progress stays in `localStorage`, so results are not
tamper-proof and are not suitable for official grading.

## Credits

- [React Bits](https://github.com/DavidHDev/react-bits): `Waves` WebGL background, MIT with Commons Clause.
- [Lucide](https://lucide.dev): interface icons, ISC.
- [three.js](https://threejs.org): 3D similarity lab, MIT.
- Docusaurus, React, KaTeX: see `package.json`.

## License

Code is available under the MIT license. Verify third-party package licenses
separately.
