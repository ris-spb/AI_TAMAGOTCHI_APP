import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const mustExist = [
  'src/design-system/tokens.css',
  'src/design-system/components/Button.tsx',
  'src/design-system/components/Card.tsx',
  'src/design-system/components/Field.tsx',
  'src/design-system/components/Chip.tsx',
  'src/design-system/components/Layout.tsx',
  'src/design-system/components/NavigationPreview.tsx',
  'src/design-system/components/Modal.tsx',
  'src/design-system/components/Feedback.tsx',
  'src/design-system/components/SelectionControls.tsx',
  'src/design-system/gallery/DesignSystemGallery.tsx',
  'tests/unit/design-system.test.tsx',
  'docs/STAGE_2_COMPONENT_GALLERY.html',
];
for (const rel of mustExist) {
  if (!fs.existsSync(path.join(root, rel))) throw new Error(`Missing ${rel}`);
}

const tokens = fs.readFileSync(path.join(root, 'src/design-system/tokens.css'), 'utf8');
const expected = {
  '--color-background-primary': '#f5f1e9',
  '--color-surface-primary': '#faf8f3',
  '--color-surface-secondary': '#e9e1d5',
  '--color-text-primary': '#292824',
  '--color-text-secondary': '#6c675e',
  '--color-action-primary': '#d39a3c',
  '--color-action-primary-dark': '#9e6e24',
  '--color-state-success': '#65816b',
  '--color-state-error': '#b95e56',
  '--space-mobile-margin': '18px',
  '--radius-action-primary': '10px',
  '--radius-card': '12px',
  '--radius-navigation-active': '8px',
  '--radius-input': '10px',
  '--radius-modal': '14px',
  '--size-hit-min': '44px',
  '--size-primary-action-height': '52px',
  '--size-input-min-height': '48px',
  '--size-bottom-navigation-height': '68px',
  '--motion-button-press': '140ms',
};
for (const [name, value] of Object.entries(expected)) {
  if (!tokens.includes(`${name}: ${value};`)) throw new Error(`Token mismatch: ${name}`);
}

const gallery = fs.readFileSync(path.join(root, 'src/design-system/gallery/DesignSystemGallery.tsx'), 'utf8');
for (const text of ['Foundations', 'Buttons', 'Inputs & selection', 'Cards & feedback', 'Navigation', 'Modal']) {
  if (!gallery.includes(text)) throw new Error(`Gallery missing section: ${text}`);
}

const nav = fs.readFileSync(path.join(root, 'src/design-system/components/NavigationPreview.tsx'), 'utf8');
for (const label of ['Главная', 'История', 'Рейтинг', 'Профиль']) {
  if (!nav.includes(label)) throw new Error(`Navigation label missing: ${label}`);
}
for (const forbiddenLabel of ["'Добавить'", "'Задачи'"]) {
  if (nav.includes(forbiddenLabel)) throw new Error(`Superseded navigation label present: ${forbiddenLabel}`);
}

const componentFiles = [];
function collectDesignFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectDesignFiles(full);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) componentFiles.push(full);
  }
}
collectDesignFiles(path.join(root, 'src/design-system'));
const componentSource = componentFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
for (const forbidden of ['glassmorphism', 'linear-gradient(', 'radial-gradient(', '🔥', '💎', '🪙']) {
  if (componentSource.includes(forbidden)) throw new Error(`Forbidden/generic visual pattern found: ${forbidden}`);
}
if (!(componentSource.includes('scale(0.985)') || componentSource.includes('scale(.985)'))) throw new Error('Button/selection press baseline 0.985 missing');
if (!tokens.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Reduced motion branch missing');

console.log('STAGE2_STATIC_AUDIT=PASS');
console.log(`FILES=${mustExist.length}`);
console.log(`TOKENS_CHECKED=${Object.keys(expected).length}`);
console.log('NAV_LABELS=Главная|История|Рейтинг|Профиль');
console.log('FORBIDDEN_VISUAL_SCAN=PASS');
