import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'design/tokens.json');
const tokens = JSON.parse(readFileSync(source, 'utf8'));

const requiredColors = ['white', 'ice', 'skyPale', 'sky', 'seaGlass', 'aqua', 'teal', 'ocean', 'oceanDeep', 'ink', 'slate', 'muted'];
for (const key of requiredColors) {
  if (!tokens.color?.[key]?.value) throw new Error(`design/tokens.json: missing color.${key}.value`);
}
if (!Array.isArray(tokens.chapterThemes) || tokens.chapterThemes.length !== 6) {
  throw new Error('design/tokens.json: chapterThemes must contain six chapters');
}

const kebab = (value) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const colorVars = Object.entries(tokens.color)
  .map(([key, entry]) => `  --c-${kebab(key)}: ${entry.value};`)
  .join('\n');

const typeVars = [
  `  --font-sans: ${tokens.typography.family};`,
  ...Object.entries(tokens.typography)
    .filter(([, value]) => typeof value === 'object')
    .flatMap(([key, value]) => [
      `  --type-${kebab(key)}-size: ${value.size};`,
      `  --type-${kebab(key)}-weight: ${value.weight};`,
      `  --type-${kebab(key)}-line: ${value.lineHeight};`,
      `  --type-${kebab(key)}-tracking: ${value.tracking};`,
    ]),
].join('\n');

const radiusVars = Object.entries(tokens.radius)
  .map(([key, value]) => `  --radius-${kebab(key)}: ${value};`)
  .join('\n');

const spacingVars = tokens.spacing
  .map((value, index) => `  --space-${index + 1}: ${value};`)
  .join('\n');

const layoutVars = [
  `  --container-max: ${tokens.layout.container};`,
  `  --container-pad: ${tokens.layout.containerPadding};`,
  `  --navbar-height: ${tokens.layout.navbarHeight};`,
  `  --section-pad: ${tokens.layout.sectionPadding};`,
].join('\n');

const roleVars = Object.entries(tokens.roles)
  .map(([key, value]) => `  --role-${kebab(key)}: ${value};`)
  .join('\n');

const themeRules = tokens.chapterThemes
  .map((theme) => [
    `.chapterCard[data-chapter="${theme.id}"], .catalogArt[data-chapter="${theme.id}"] { background: ${theme.surface}; }`,
    `.chapterCard[data-chapter="${theme.id}"]::after { background: ${theme.accent}; }`,
  ].join('\n'))
  .join('\n');

const css = `/* GENERATED from design/tokens.json. Do not edit by hand. */
:root {
${colorVars}
${typeVars}
${radiusVars}
${spacingVars}
${layoutVars}
${roleVars}
  --ifm-color-primary: ${tokens.color.ocean.value};
  --ifm-color-primary-dark: ${tokens.roles.primaryDark};
  --ifm-color-primary-darker: ${tokens.roles.primaryDarker};
  --ifm-color-primary-darkest: ${tokens.roles.primaryDarkest};
  --ifm-color-primary-light: ${tokens.roles.primaryLight};
  --ifm-color-primary-lighter: ${tokens.roles.primaryLighter};
  --ifm-color-primary-lightest: ${tokens.color.aqua.value};
  --ifm-font-family-base: var(--font-sans);
  --ifm-heading-font-family: var(--font-sans);
  --ifm-font-color-base: var(--c-ink);
  --ifm-background-color: var(--c-white);
  --ifm-heading-color: var(--c-ink);
  --ifm-link-color: var(--c-ocean);
  --ifm-global-radius: var(--radius-card);
  --ifm-navbar-height: var(--navbar-height);
  --ink: var(--c-ink);
  --muted: var(--c-muted);
  --green: var(--c-ocean);
  --line: var(--role-border);
  --chapter-surface: var(--role-surface);
  --chapter-accent: var(--c-teal);
}
${themeRules}
`;

const ts = `/* GENERATED from design/tokens.json. Do not edit by hand. */
export const designTokens = ${JSON.stringify(tokens, null, 2)} as const;

export type DesignTokens = typeof designTokens;
export type ChapterTheme = (typeof designTokens.chapterThemes)[number];
export const coreColors = Object.entries(designTokens.color).map(([key, value]) => ({
  key,
  ...value,
}));
`;

mkdirSync(resolve(root, 'src/css'), {recursive: true});
mkdirSync(resolve(root, 'src/design'), {recursive: true});
writeFileSync(resolve(root, 'src/css/design-tokens.css'), css, 'utf8');
writeFileSync(resolve(root, 'src/design/tokens.generated.ts'), ts, 'utf8');
console.log('design tokens generated');
