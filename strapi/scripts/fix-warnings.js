'use strict';
/**
 * Fixes all spot-check warnings:
 * 1. Category info text mismatches — update Strapi to match source JSON
 * 2. Duplicate products (extra slugs from old seed run) — delete extras
 * 3. News article content length diff — update Strapi content to match source
 */

const fs = require('fs');
const path = require('path');
const TOKEN = process.env.API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const h = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN };
const DATA_DIR = path.join(__dirname, '..', '..', 'public', 'data');

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function run() {
  const sourceCats  = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products-category.json'), 'utf8'));
  const sourceProds = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products.json'), 'utf8'));
  const sourceNews  = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8'));

  // ── 1. Fix category info ───────────────────────────────────────────────────
  console.log('\n── 1. Fix category info ──');
  const cr = await fetch(STRAPI_URL + '/api/product-categories?pagination[pageSize]=50', { headers: h });
  const cj = await cr.json();
  const strapiCats = cj.data;
  const catByTitle = {};
  for (const c of strapiCats) catByTitle[c.attributes.title] = c;

  for (const cat of sourceCats) {
    if (!cat.info) continue;
    const sc = catByTitle[cat.title];
    if (!sc) { console.log('  ❌ Not found: ' + cat.title); continue; }
    if ((sc.attributes.info || '').trim() === cat.info.trim()) {
      console.log('  ✅ Already correct: ' + cat.title);
      continue;
    }
    const pr = await fetch(STRAPI_URL + '/api/product-categories/' + sc.id, {
      method: 'PUT', headers: h,
      body: JSON.stringify({ data: { info: cat.info } }),
    });
    const pj = await pr.json();
    if (!pr.ok) console.log('  ❌ Failed: ' + cat.title, pj.error?.message);
    else console.log('  ✅ Updated info: ' + cat.title);
  }

  // ── 2. Delete duplicate products ──────────────────────────────────────────
  console.log('\n── 2. Delete duplicate products ──');
  const prodr = await fetch(STRAPI_URL + '/api/products?pagination[pageSize]=200', { headers: h });
  const prodj = await prodr.json();
  const strapiProds = prodj.data;

  const sourceSlugs = new Set(sourceProds.map(p => slugify(p.id)));
  const extraProds = strapiProds.filter(p => !sourceSlugs.has(p.attributes.slug));

  for (const ep of extraProds) {
    // Verify a "correct" version exists before deleting
    const correctSlug = strapiProds.find(p => p.attributes.name === ep.attributes.name && sourceSlugs.has(p.attributes.slug));
    if (!correctSlug) {
      console.log('  ⏭  Skip (no correct version found): ' + ep.attributes.name + ' (' + ep.attributes.slug + ')');
      continue;
    }
    const dr = await fetch(STRAPI_URL + '/api/products/' + ep.id, { method: 'DELETE', headers: h });
    if (dr.ok) console.log('  ✅ Deleted duplicate: ' + ep.attributes.name + ' (slug: ' + ep.attributes.slug + ')');
    else console.log('  ❌ Delete failed: ' + ep.attributes.name);
  }

  // ── 3. Fix news article content ───────────────────────────────────────────
  console.log('\n── 3. Fix news content ──');
  const nr = await fetch(STRAPI_URL + '/api/news-articles?pagination[pageSize]=20', { headers: h });
  const nj = await nr.json();

  for (const article of sourceNews) {
    const sn = nj.data.find(a => a.attributes.title === article.title);
    if (!sn) continue;
    const diff = Math.abs((sn.attributes.content || '').length - article.content.length);
    if (diff < 10) { console.log('  ✅ Already correct: ' + article.title.substring(0, 50)); continue; }

    const pr = await fetch(STRAPI_URL + '/api/news-articles/' + sn.id, {
      method: 'PUT', headers: h,
      body: JSON.stringify({ data: { content: article.content } }),
    });
    const pj = await pr.json();
    if (!pr.ok) console.log('  ❌ Failed: ' + article.title.substring(0, 50), pj.error?.message);
    else console.log('  ✅ Updated content: ' + article.title.substring(0, 50));
  }

  console.log('\nDone.');
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
