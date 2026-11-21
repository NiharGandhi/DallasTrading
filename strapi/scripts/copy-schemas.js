/**
 * Copies all non-JS files (schema.json, component JSON, etc.)
 * from src/ to dist/src/ so Strapi can find them in TypeScript mode.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST_SRC = path.join(__dirname, '..', 'dist', 'src');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith('.json')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(SRC, DIST_SRC);

// Also copy src/components to dist/src/components
const compSrc = path.join(__dirname, '..', 'src', 'components');
const compDest = path.join(__dirname, '..', 'dist', 'src', 'components');
copyDir(compSrc, compDest);

console.log('JSON schemas copied to dist/');
