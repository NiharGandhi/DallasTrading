'use strict';

/**
 * Spot-check script: compares Strapi data against source JSON files.
 * Usage: STRAPI_URL=https://cms.dallastrading.net API_TOKEN=<token> node scripts/spotcheck.js
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.error('ERROR: API_TOKEN env variable is required.');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${API_TOKEN}` };
const DATA_DIR = path.join(__dirname, '..', '..', 'public', 'data');

let passed = 0;
let failed = 0;
let warnings = 0;

function ok(msg)   { console.log(`  ✅ ${msg}`); passed++; }
function fail(msg) { console.log(`  ❌ ${msg}`); failed++; }
function warn(msg) { console.log(`  ⚠️  ${msg}`); warnings++; }

async function getAll(endpoint, populate = '') {
  const qs = populate ? `&populate=${populate}` : '';
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200${qs}`, { headers });
  const json = await res.json();
  if (!res.ok) throw new Error(`GET /api/${endpoint} failed`);
  return json.data;
}

async function check() {
  console.log(`\nSpot-check against ${STRAPI_URL}\n`);

  // ── 1. Product Categories ─────────────────────────────────────────────────
  console.log('── Product Categories ──');
  const sourceCats = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products-category.json'), 'utf8'));
  const strapiCats = await getAll('product-categories');
  const strapiCatTitles = new Set(strapiCats.map(c => c.attributes.title));

  ok(`Strapi has ${strapiCats.length} categories, source has ${sourceCats.length}`);
  if (strapiCats.length !== sourceCats.length) {
    fail(`Count mismatch: expected ${sourceCats.length}, got ${strapiCats.length}`);
  }

  for (const cat of sourceCats) {
    if (strapiCatTitles.has(cat.title)) {
      ok(`Found: "${cat.title}"`);
    } else {
      fail(`Missing: "${cat.title}"`);
    }
  }

  // ── 2. Products ───────────────────────────────────────────────────────────
  console.log('\n── Products ──');
  const sourceProds = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products.json'), 'utf8'));
  const strapiProds = await getAll('products', 'category');
  const strapiProdTitles = new Set(strapiProds.map(p => p.attributes.name));

  ok(`Strapi has ${strapiProds.length} products, source has ${sourceProds.length}`);
  if (strapiProds.length !== sourceProds.length) {
    warn(`Count mismatch: expected ${sourceProds.length}, got ${strapiProds.length} (may be expected due to duplicate names)`);
  }

  // Spot-check 5 specific products
  const checks = [
    { title: 'Armoured Cables',           category: 'Cables' },
    { title: 'Industrial Plug & Socket',  category: 'Industrial Plugs & Sockets' },
    { title: 'PVC Conduits',              category: 'PVC Conduits' },
    { title: 'Nylon Cable Tie',           category: 'Cable Ties' },
    { title: 'Laser Marking Machine',     category: 'Laser Marking Machine' },
  ];

  for (const check of checks) {
    const strapiProd = strapiProds.find(p => p.attributes.name === check.title);
    if (!strapiProd) {
      fail(`Product not found: "${check.title}"`);
      continue;
    }
    const catName = strapiProd.attributes.category?.data?.attributes?.title;
    if (catName === check.category) {
      ok(`"${check.title}" → category "${catName}" ✓`);
    } else {
      fail(`"${check.title}" → expected category "${check.category}", got "${catName}"`);
    }
  }

  // Check PDFs are linked
  const withPdf = strapiProds.filter(p => p.attributes.downloadFile !== null && p.attributes.downloadFile !== undefined);
  ok(`${withPdf.length} products have a linked PDF`);

  // ── 3. Product Details ────────────────────────────────────────────────────
  console.log('\n── Product Details ──');
  const sourceDetails = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'product-details.json'), 'utf8'));
  const detailsWithSpecs = sourceDetails.filter(d => d.Specification && d.Specification.length > 0);

  // Spot-check Armoured Cables details
  const armouredInStrapi = strapiProds.find(p => p.attributes.name === 'Armoured Cables');
  const armouredInSource = sourceDetails.find(d => d.id === 'armoured_cables');
  if (armouredInStrapi && armouredInSource) {
    const hasSpecs = armouredInStrapi.attributes.specifications &&
                     JSON.stringify(armouredInStrapi.attributes.specifications) !== '[]';
    hasSpecs
      ? ok('Armoured Cables has specifications populated')
      : fail('Armoured Cables specifications are empty');
  }

  // ── 4. Team Members ───────────────────────────────────────────────────────
  console.log('\n── Team Members ──');
  const sourceTeam = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'our-team.json'), 'utf8'));
  const strapiTeam = await getAll('team-members', 'photo');

  ok(`Strapi has ${strapiTeam.length} team members, source has ${sourceTeam.length}`);
  if (strapiTeam.length !== sourceTeam.length) {
    fail(`Count mismatch: expected ${sourceTeam.length}, got ${strapiTeam.length}`);
  }

  for (const member of sourceTeam) {
    const strapiMember = strapiTeam.find(m => m.attributes.name === member.name);
    if (!strapiMember) {
      fail(`Team member not found: "${member.name}"`);
      continue;
    }
    // Check position matches
    if (strapiMember.attributes.position === member.position) {
      ok(`"${member.name}" — position matches`);
    } else {
      fail(`"${member.name}" — position mismatch: expected "${member.position}", got "${strapiMember.attributes.position}"`);
    }
    // Check bio length is roughly correct
    const bioDiff = Math.abs((strapiMember.attributes.bio || '').length - member.bio.length);
    if (bioDiff < 10) {
      ok(`"${member.name}" — bio matches`);
    } else {
      warn(`"${member.name}" — bio length differs by ${bioDiff} chars`);
    }
    // Check photo
    const hasPhoto = strapiMember.attributes.photo?.data != null;
    hasPhoto ? ok(`"${member.name}" — photo linked`) : warn(`"${member.name}" — no photo linked`);
  }

  // ── 5. News Articles ──────────────────────────────────────────────────────
  console.log('\n── News Articles ──');
  const sourceNews = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8'));
  const strapiNews = await getAll('news-articles', 'mainImage,images');

  ok(`Strapi has ${strapiNews.length} articles, source has ${sourceNews.length}`);
  if (strapiNews.length !== sourceNews.length) {
    fail(`Count mismatch: expected ${sourceNews.length}, got ${strapiNews.length}`);
  }

  for (const article of sourceNews) {
    const strapiArticle = strapiNews.find(a => a.attributes.title === article.title);
    if (!strapiArticle) {
      fail(`Article not found: "${article.title}"`);
      continue;
    }
    // Check date
    if (strapiArticle.attributes.date === article.date) {
      ok(`"${article.title}" — date matches (${article.date})`);
    } else {
      fail(`"${article.title}" — date mismatch: expected ${article.date}, got ${strapiArticle.attributes.date}`);
    }
    // Check images
    const strapiImageCount = strapiArticle.attributes.images?.data?.length || 0;
    const sourceImageCount = article.images.length;
    if (strapiImageCount === sourceImageCount) {
      ok(`"${article.title}" — ${strapiImageCount} images linked`);
    } else {
      warn(`"${article.title}" — image count: expected ${sourceImageCount}, got ${strapiImageCount}`);
    }
    // Check main image
    const hasMain = strapiArticle.attributes.mainImage?.data != null;
    hasMain ? ok(`"${article.title}" — mainImage linked`) : warn(`"${article.title}" — no mainImage`);
  }

  // ── 6. Partners ───────────────────────────────────────────────────────────
  console.log('\n── Partners ──');
  const strapiPartners = await getAll('partners', 'logo');
  const expectedPartners = Object.keys({
    Hex: 1, Elite: 1, Mesc: 1, 'Oxford Cavi': 1, '3M': 1, PCE: 1,
    Marechal: 1, 'Legrand Swift': 1, Barton: 1, Decoduct: 1, ABB: 1,
    Hager: 1, 'Eaton (Moeller)': 1, Schneider: 1, Siemens: 1, Breeze: 1,
    'MK Logic Plus': 1, Rayon: 1, Raychem: 1,
  });

  ok(`Strapi has ${strapiPartners.length} partners, expected ${expectedPartners.length}`);
  if (strapiPartners.length !== expectedPartners.length) {
    fail(`Count mismatch`);
  }

  const strapiPartnerNames = new Set(strapiPartners.map(p => p.attributes.name));
  for (const name of expectedPartners) {
    if (!strapiPartnerNames.has(name)) {
      fail(`Partner missing: "${name}"`);
    }
  }

  const withLogo = strapiPartners.filter(p => p.attributes.logo?.data != null);
  ok(`${withLogo.length}/${strapiPartners.length} partners have logos linked`);
  if (withLogo.length < strapiPartners.length) {
    warn(`${strapiPartners.length - withLogo.length} partners are missing logos`);
  }

  // ── 7. Pages ──────────────────────────────────────────────────────────────
  console.log('\n── Pages ──');
  const strapiPages = await getAll('pages');
  const expectedSlugs = ['about-us', 'career-opportunities', 'certificates', 'our-projects'];
  const strapiPageSlugs = new Set(strapiPages.map(p => p.attributes.slug));

  for (const slug of expectedSlugs) {
    strapiPageSlugs.has(slug)
      ? ok(`Page exists: "${slug}"`)
      : fail(`Page missing: "${slug}"`);
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(50));
  console.log(`\nResults: ${passed} passed, ${warnings} warnings, ${failed} failed\n`);
  if (failed > 0) {
    console.log('❌ Spot-check found issues. Review the failures above.');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('⚠️  Spot-check passed with warnings.');
  } else {
    console.log('✅ All checks passed!');
  }
}

check().catch(err => {
  console.error('\n❌ Spot-check error:', err.message);
  process.exit(1);
});
