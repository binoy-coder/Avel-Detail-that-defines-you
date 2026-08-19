const { readFileSync } = require('node:fs');

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];
for (const file of requiredFiles) {
  readFileSync(file, 'utf8');
}

const html = readFileSync('index.html', 'utf8');
const js = readFileSync('src/main.js', 'utf8');
const css = readFileSync('src/styles.css', 'utf8');

const checks = [
  ['brand name', html.includes('Avel — Detail that defines u')],
  ['baby-pink theme', css.includes('--pink') && css.includes('#ffd6e7')],
  ['mood matcher feature', html.includes('Avel Mood Match') && js.includes('renderRecommendation')],
  ['shopping cart interaction', js.includes('cartCount') && js.includes('addToCart')],
];

const failed = checks.filter(([, passed]) => !passed);
if (failed.length) {
  console.error(`Static site checks failed: ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}

console.log('Static site checks passed.');
