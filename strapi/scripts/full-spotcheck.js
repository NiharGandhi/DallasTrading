'use strict';

/**
 * Full spot-check: validates every product, page, team member, news article,
 * partner in Strapi against source JSON files and live site data.
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN;
const DATA_DIR = path.join(__dirname, '..', '..', 'public', 'data');

if (!API_TOKEN) { console.error('API_TOKEN required'); process.exit(1); }

const h = { Authorization: 'Bearer ' + API_TOKEN };

async function getAll(endpoint, populate) {
  const qs = populate ? '&populate=' + populate : '';
  const r = await fetch(STRAPI_URL + '/api/' + endpoint + '?pagination[pageSize]=200' + qs, { headers: h });
  const j = await r.json();
  if (!r.ok) throw new Error('GET ' + endpoint + ' failed');
  return j.data;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const OK   = (m) => console.log('  ✅ ' + m);
const WARN = (m) => console.log('  ⚠️  ' + m);
const FAIL = (m) => console.log('  ❌ ' + m);

let passed = 0, warned = 0, failed = 0;
function ok(m)   { OK(m);   passed++; }
function warn(m) { WARN(m); warned++; }
function fail(m) { FAIL(m); failed++; }

async function run() {
  console.log('\n' + '='.repeat(60));
  console.log('FULL SPOT-CHECK — ' + STRAPI_URL);
  console.log('='.repeat(60));

  const sourceCats    = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products-category.json'), 'utf8'));
  const sourceProds   = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products.json'), 'utf8'));
  const sourceDetails = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'product-details.json'), 'utf8'));
  const sourceNews    = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8'));
  const sourceTeam    = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'our-team.json'), 'utf8'));

  const detailMap = {};
  for (const d of sourceDetails) detailMap[d.id] = d;

  // ── 1. PRODUCT CATEGORIES ─────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('1. PRODUCT CATEGORIES');
  console.log('─'.repeat(60));

  const strapiCats = await getAll('product-categories');
  const catByTitle = {};
  for (const c of strapiCats) catByTitle[c.attributes.title] = c;

  for (const cat of sourceCats) {
    const sc = catByTitle[cat.title];
    if (!sc) { fail('Missing category: ' + cat.title); continue; }
    const a = sc.attributes;
    // title
    a.title === cat.title ? ok(cat.title + ' — title ✓') : fail(cat.title + ' — title mismatch');
    // info
    if (cat.info && a.info) {
      a.info.trim() === cat.info.trim()
        ? ok(cat.title + ' — info ✓')
        : warn(cat.title + ' — info differs (may be truncated in seed)');
    }
    // slug
    a.slug ? ok(cat.title + ' — slug: ' + a.slug) : warn(cat.title + ' — no slug');
  }

  // ── 2. PRODUCTS (every single one) ────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('2. PRODUCTS (all ' + sourceProds.length + ')');
  console.log('─'.repeat(60));

  const strapiProds = await getAll('products', 'category,downloadFile');
  const prodBySlug = {};
  for (const p of strapiProds) prodBySlug[p.attributes.slug] = p;

  for (const sp of sourceProds) {
    const slug = slugify(sp.id);
    const sc = prodBySlug[slug];
    if (!sc) { fail('Missing product: ' + sp.title + ' (slug: ' + slug + ')'); continue; }
    const a = sc.attributes;

    // name
    a.name === sp.title ? ok(sp.title + ' — name ✓') : fail(sp.title + ' — name mismatch: got "' + a.name + '"');

    // category
    const catName = (a.category && a.category.data) ? a.category.data.attributes.title : null;
    catName === sp.productCategory
      ? ok(sp.title + ' — category "' + catName + '" ✓')
      : fail(sp.title + ' — category mismatch: expected "' + sp.productCategory + '" got "' + catName + '"');

    // company
    const compName = a.company ? a.company.name : null;
    compName === sp.company
      ? ok(sp.title + ' — company "' + compName + '" ✓')
      : warn(sp.title + ' — company: expected "' + sp.company + '" got "' + compName + '"');

    // product details
    const detail = detailMap[sp.id];
    if (detail) {
      const hasSpecs = a.specifications && JSON.stringify(a.specifications) !== '[]' && JSON.stringify(a.specifications) !== 'null';
      const hasDesc  = a.description && JSON.stringify(a.description) !== '[]' && JSON.stringify(a.description) !== 'null';
      const sourceHasSpecs = detail.Specification && detail.Specification.length > 0;
      const sourceHasDesc  = detail.description && detail.description.length > 0;

      if (sourceHasSpecs) {
        hasSpecs ? ok(sp.title + ' — specifications populated ✓') : fail(sp.title + ' — specifications EMPTY (source has data)');
      }
      if (sourceHasDesc) {
        hasDesc ? ok(sp.title + ' — description populated ✓') : fail(sp.title + ' — description EMPTY (source has data)');
      }

      // PDF
      if (detail.downloadFile) {
        const hasPdf = a.downloadFile && a.downloadFile.data != null;
        hasPdf ? ok(sp.title + ' — PDF linked ✓') : warn(sp.title + ' — PDF not linked (source: ' + detail.downloadFile + ')');
      }
    }
  }

  // Check for extra products in Strapi not in source
  const sourceSlugs = new Set(sourceProds.map(p => slugify(p.id)));
  const extraProds = strapiProds.filter(p => !sourceSlugs.has(p.attributes.slug));
  if (extraProds.length) {
    warn('Extra products in Strapi (not in products.json): ' + extraProds.map(p => p.attributes.name).join(', '));
  }

  // ── 3. PRODUCT DETAILS — deep check per field ─────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('3. PRODUCT DETAILS — deep field check');
  console.log('─'.repeat(60));

  for (const detail of sourceDetails) {
    const slug = slugify(detail.id);
    const sc = prodBySlug[slug];
    if (!sc) { warn('No Strapi product for detail id: ' + detail.id); continue; }
    const a = sc.attributes;
    const name = detail.productName;

    const fields = [
      { key: 'specifications',              src: detail.Specification },
      { key: 'description',                 src: detail.description },
      { key: 'detailDescription',           src: detail.detailDescription },
      { key: 'detailDescriptionAfterTable', src: detail.detailDescriptionAfterTable },
      { key: 'productDetailTableData',      src: detail.productDetailTableData },
      { key: 'customerReviews',             src: detail.customerReviews },
    ];

    let anyData = false;
    for (const f of fields) {
      if (!f.src || f.src.length === 0) continue;
      anyData = true;
      const strapiVal = a[f.key];
      const isEmpty = !strapiVal || (Array.isArray(strapiVal) && strapiVal.length === 0);
      isEmpty
        ? fail(name + ' — ' + f.key + ' EMPTY (source has ' + f.src.length + ' items)')
        : ok(name + ' — ' + f.key + ' has ' + (Array.isArray(strapiVal) ? strapiVal.length : 1) + ' items ✓');
    }
    if (!anyData) ok(name + ' — no detail data in source (expected empty) ✓');
  }

  // ── 4. TEAM MEMBERS ───────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('4. TEAM MEMBERS');
  console.log('─'.repeat(60));

  const strapiTeam = await getAll('team-members', 'photo');
  const teamByName = {};
  for (const t of strapiTeam) teamByName[t.attributes.name] = t;

  for (const member of sourceTeam) {
    const st = teamByName[member.name];
    if (!st) { fail('Missing team member: ' + member.name); continue; }
    const a = st.attributes;

    a.name === member.name ? ok(member.name + ' — name ✓') : fail(member.name + ' — name mismatch');
    a.position === member.position ? ok(member.name + ' — position: "' + a.position + '" ✓') : fail(member.name + ' — position mismatch: expected "' + member.position + '" got "' + a.position + '"');

    const bioDiff = Math.abs((a.bio || '').length - member.bio.length);
    bioDiff < 5 ? ok(member.name + ' — bio matches (' + member.bio.length + ' chars) ✓') : warn(member.name + ' — bio length diff: ' + bioDiff + ' chars');

    const hasPhoto = a.photo && a.photo.data != null;
    hasPhoto ? ok(member.name + ' — photo linked ✓') : fail(member.name + ' — photo NOT linked');
  }

  // ── 5. NEWS ARTICLES ──────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('5. NEWS ARTICLES');
  console.log('─'.repeat(60));

  const strapiNews = await getAll('news-articles', 'mainImage,images');
  const newsByTitle = {};
  for (const n of strapiNews) newsByTitle[n.attributes.title] = n;

  for (const article of sourceNews) {
    const sn = newsByTitle[article.title];
    if (!sn) { fail('Missing article: ' + article.title); continue; }
    const a = sn.attributes;

    // title
    ok(article.title.substring(0, 60) + '... — title ✓');
    // tagline
    a.tagline === article.tagline ? ok('tagline ✓') : fail('tagline mismatch');
    // date
    a.date === article.date ? ok('date: ' + a.date + ' ✓') : fail('date mismatch: expected ' + article.date + ' got ' + a.date);
    // content length
    const contentDiff = Math.abs((a.content || '').length - article.content.length);
    contentDiff < 10 ? ok('content length matches ✓') : warn('content length differs by ' + contentDiff + ' chars');
    // images
    const imgCount = (a.images && a.images.data) ? a.images.data.length : 0;
    imgCount === article.images.length
      ? ok(imgCount + '/' + article.images.length + ' images linked ✓')
      : fail('image count: expected ' + article.images.length + ' got ' + imgCount);
    // main image
    const hasMain = a.mainImage && a.mainImage.data != null;
    hasMain ? ok('mainImage linked ✓') : fail('mainImage NOT linked');
  }

  // ── 6. PARTNERS ───────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('6. PARTNERS');
  console.log('─'.repeat(60));

  const strapiPartners = await getAll('partners', 'logo');
  const expectedPartners = [
    'Hex','Elite','Mesc','Oxford Cavi','3M','PCE','Marechal','Legrand Swift',
    'Barton','Decoduct','ABB','Hager','Eaton (Moeller)','Schneider','Siemens',
    'Breeze','MK Logic Plus','Rayon','Raychem'
  ];
  const partnerByName = {};
  for (const p of strapiPartners) partnerByName[p.attributes.name] = p;

  ok('Total: ' + strapiPartners.length + '/' + expectedPartners.length + ' partners');
  for (const name of expectedPartners) {
    const sp = partnerByName[name];
    if (!sp) { fail('Missing partner: ' + name); continue; }
    const hasLogo = sp.attributes.logo && sp.attributes.logo.data != null;
    hasLogo
      ? ok(name + ' — logo linked ✓')
      : fail(name + ' — logo NOT linked');
  }

  // ── 7. PAGES ──────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('7. PAGES');
  console.log('─'.repeat(60));

  const strapiPages = await getAll('pages', 'sections');
  const pageBySlug = {};
  for (const p of strapiPages) pageBySlug[p.attributes.slug] = p;

  const expectedPages = [
    { slug: 'about-us',            title: 'About Us',              minSections: 1 },
    { slug: 'career-opportunities',title: 'Career Opportunities',  minSections: 1 },
    { slug: 'certificates',        title: 'Certificates',          minSections: 1 },
    { slug: 'our-projects',        title: 'Our Projects',          minSections: 1 },
  ];

  for (const ep of expectedPages) {
    const sp = pageBySlug[ep.slug];
    if (!sp) { fail('Missing page: ' + ep.slug); continue; }
    const a = sp.attributes;

    a.title === ep.title ? ok(ep.title + ' — title ✓') : fail(ep.title + ' — title mismatch: "' + a.title + '"');
    a.slug === ep.slug   ? ok(ep.title + ' — slug ✓')  : fail(ep.title + ' — slug mismatch');
    a.seoTitle ? ok(ep.title + ' — seoTitle: "' + a.seoTitle + '" ✓') : warn(ep.title + ' — no seoTitle');
    a.seoDescription ? ok(ep.title + ' — seoDescription populated ✓') : warn(ep.title + ' — no seoDescription');

    const sections = a.sections || [];
    sections.length >= ep.minSections
      ? ok(ep.title + ' — ' + sections.length + ' section(s) ✓')
      : fail(ep.title + ' — expected ' + ep.minSections + ' sections, got ' + sections.length);

    for (const sec of sections) {
      const comp = sec.__component || 'unknown';
      const hasContent = sec.content && sec.content.length > 50;
      hasContent
        ? ok(ep.title + ' — section "' + comp + '" has content (' + sec.content.length + ' chars) ✓')
        : warn(ep.title + ' — section "' + comp + '" content looks short or empty');
    }
  }

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('RESULTS: ' + passed + ' passed | ' + warned + ' warnings | ' + failed + ' failed');
  console.log('='.repeat(60) + '\n');

  if (failed > 0) {
    console.log('❌ Spot-check found ' + failed + ' failures. Review above.');
    process.exit(1);
  } else if (warned > 0) {
    console.log('⚠️  Passed with ' + warned + ' warnings.');
  } else {
    console.log('✅ All checks passed!');
  }
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
