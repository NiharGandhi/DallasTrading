'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Seed script: populates Strapi with existing JSON data.
 * Usage: STRAPI_URL=https://cms.dallastrading.net API_TOKEN=<token> node scripts/seed.js
 *
 * Create an API token in Strapi Admin → Settings → API Tokens → Create new token
 * (Full access, unlimited duration)
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.error('ERROR: API_TOKEN env variable is required.');
  console.error('Create one in Strapi Admin → Settings → API Tokens → Create new token');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_TOKEN}`,
};

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = path.join(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT, 'public', 'data');
const NEWS_DIR = path.join(ROOT, 'public', 'news');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');
const LOGOS_DIR = path.join(ROOT, 'src', 'store', 'our-companies', 'ourCompaniesImages');
const TEAM_PHOTOS_DIR = path.join(ROOT, 'src', 'store', 'our-team', 'ourTeamImages');

// ─── Source JSON data (read from disk) ────────────────────────────────────────

const productCategoriesJson = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products-category.json'), 'utf8'));
const productsJson          = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products.json'), 'utf8'));
const productDetailsJson    = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'product-details.json'), 'utf8'));
const newsJson              = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8'));
const teamJson              = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'our-team.json'), 'utf8'));

// ─── Static data not in JSON files ───────────────────────────────────────────

// Partner logos: map name → logo file (source: ourCompaniesImages.ts)
const PARTNER_LOGO_MAP = {
  'Hex':             'hex.png',
  'Elite':           'elite.png',
  'Mesc':            'MESC.jpg',
  'Oxford Cavi':     'oxford.png',
  '3M':              '3M.png',
  'PCE':             'pce.png',
  'Marechal':        'marechal_electric.jpg',
  'Legrand Swift':   'legrand-logo.png',
  'Barton':          'barton.png',
  'Decoduct':        'decoduct.png',
  'ABB':             'ABB.png',
  'Hager':           'hager.png',
  'Eaton (Moeller)': 'eaton.png',
  'Schneider':       'schneider-logo.png',
  'Siemens':         'Siemens_logo.png',
  'Breeze':          'breeze.png',
  'MK Logic Plus':   'mk-logo.jpg',
  'Rayon':           'rayan.png',
  'Raychem':         'raychem-logo.png',
};

const PARTNER_URLS = {
  '3M':              'https://www.3m.com',
  'PCE':             'https://www.pce-instruments.com',
  'Marechal':        'https://www.marechal.com',
  'Legrand Swift':   'https://www.legrand.com',
  'ABB':             'https://www.abb.com',
  'Hager':           'https://www.hager.com',
  'Eaton (Moeller)': 'https://www.eaton.com',
  'Schneider':       'https://www.se.com',
  'Siemens':         'https://www.siemens.com',
};

// Team photo map: name → file (source: ourTeamImages.ts)
const TEAM_PHOTO_MAP = {
  'Prakash Ahuja': 'Prakash_Ahuja.png',
  'Ibrahim Somji': 'Ibrahim_Somji.jpeg',
  'Jay Ahuja':     'Jay-Ahuja.jpg',
  'Vijay Ahuja':   'Vijay-Ahuja.jpg',
  'Amjad Ali':     'Amjad-Ali.jpg',
};

// Pages: hardcoded as no source JSON exists for these
const pages = [
  {
    title: 'About Us',
    slug: 'about-us',
    seoTitle: 'About Us | Dallas Trading Co. LLC',
    seoDescription: 'Learn about Dallas Group of Companies — a trusted name in trading and distribution of high-quality electrical products across the GCC since 1995.',
    sections: [
      {
        __component: 'sections.rich-text-block',
        content: `## Welcome to Dallas Group of Companies

Welcome to **Dallas Group of Companies** — a trusted name in the trading and distribution of high-quality electrical products and industrial solutions across the GCC.

## Our Story

Founded in 1995 under the visionary leadership of Mr. Prakash Ahuja, Dallas Group has evolved from its roots in Dubai into a multi-regional enterprise with a strong presence in the UAE, Oman, and Bahrain, and a growing footprint through an associated company in Dammam, Saudi Arabia.

## Our Excellence

Over the years, Dallas has built a reputation for reliability, efficiency, and customer-focused service. Guided by a well-structured management framework — with Mr. Prakash Ahuja at the helm and each division led by experienced General Managers and Directors — the Group ensures streamlined operations and consistent excellence across all regions.

## Our Approach

At Dallas, we believe in partnership-driven growth. Our customers are our collaborators, and we go beyond supplying products by offering technical expertise, cost-effective solutions, and end-to-end support. Our centralized sales coordination and sourcing teams based in Dubai, Oman, and Bahrain work closely to ensure timely deliveries, technical assistance, and superior after-sales service.

## Our Commitment

We are deeply committed to innovation, sustainability, and alignment with government initiatives aimed at building a more energy-efficient and sustainable future. Through continuous research, collaboration with consultants, and a focus on operational efficiency, Dallas Group continues to expand its capabilities — delivering value, fostering trust, and driving long-term success across the Middle East.`,
      },
    ],
  },
  {
    title: 'Career Opportunities',
    slug: 'career-opportunities',
    seoTitle: 'Career Opportunities | Dallas Trading Co. LLC',
    seoDescription: 'Explore career opportunities at Dallas Trading Co. LLC. Join our dynamic team across UAE, Oman, and Bahrain.',
    sections: [
      {
        __component: 'sections.rich-text-block',
        content: `## Career Opportunities

Dallas requires a dynamic Sales Head for its newly formed Oil & Gas Division. The ideal candidate should have about 10 years experience in Sales of electrical in Gulf region including a minimum of 4 to 5 years of sales experience to Oil & Gas sector.

**Key responsibilities would include:**

- Product portfolio & Customer development in Oil & Gas Segment.
- Strategic Relationship Management.
- Design and implement Sales strategies.
- Implementing and Supervising Sales process.

To apply for one of the above positions, email or post to the below addresses. Should you have questions, please do not hesitate to contact the HR Department on the specified email address.

**Dallas Group**
PO Box: 2028, Dubai, United Arab Emirates
Email: **info@dallastrading.net**

We have a working environment in which all individuals are able to make the best use of their skills, free from discrimination or harassment, and in which all decisions are based on merit.`,
      },
    ],
  },
  {
    title: 'Certificates',
    slug: 'certificates',
    seoTitle: 'Certificates | Dallas Trading Co. LLC',
    seoDescription: 'Dallas Trading Co. LLC holds ISO 9001:2015 certifications for UAE and Oman operations.',
    sections: [
      {
        __component: 'sections.rich-text-block',
        content: `## Our Certifications

Our commitment to quality is demonstrated through internationally recognized certifications, ensuring excellence in every aspect of our operations.

**ISO 9001:2015 — United Arab Emirates**
Our UAE operations are certified to ISO 9001:2015, demonstrating our dedication to maintaining the highest standards in quality management systems.

**ISO 9001:2015 — Oman**
Our Oman operations hold the ISO 9001:2015 certification, affirming our consistent quality standards across all regional branches.`,
      },
    ],
  },
  {
    title: 'Our Projects',
    slug: 'our-projects',
    seoTitle: 'Our Projects | Dallas Trading Co. LLC',
    seoDescription: "Explore Dallas Trading Co. LLC's portfolio of successful projects across the UAE and GCC.",
    sections: [
      {
        __component: 'sections.rich-text-block',
        content: `## Our Projects

Showcasing our portfolio of successful projects and achievements across the UAE and the wider GCC region.

Dallas Trading Co. LLC has proudly supplied electrical products and solutions to some of the most prestigious projects in the region, including:

- **Al Habtoor City** — Dubai
- **Dubai Fountain Project** — Downtown Dubai
- **Museum of the Future** — Dubai
- **Jumeirah Park Villas** — Dubai
- **Palm Jumeirah** — Dubai
- **The Atlantis Royal** — Palm Jumeirah, Dubai`,
      },
    ],
  },
];

// ─── API helpers ──────────────────────────────────────────────────────────────

async function post(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`POST /api/${endpoint} failed: ${JSON.stringify(json.error)}`);
  return json.data;
}

async function put(endpoint, id, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`PUT /api/${endpoint}/${id} failed: ${JSON.stringify(json.error)}`);
  return json.data;
}

async function getAll(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200`, { headers });
  const json = await res.json();
  if (!res.ok) throw new Error(`GET /api/${endpoint} failed`);
  return json.data;
}

async function getMediaFiles() {
  const res = await fetch(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=500`, { headers });
  const json = await res.json();
  const list = Array.isArray(json) ? json : [];
  const byName = {};
  for (const f of list) byName[f.name] = f;
  return byName;
}

async function uploadFile(filePath, fileName) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp',
    '.pdf': 'application/pdf',
  };
  const mime = mimeTypes[ext] || 'application/octet-stream';
  const form = new FormData();
  form.append('files', new Blob([fileBuffer], { type: mime }), fileName);
  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    body: form,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Upload ${fileName} failed: ${JSON.stringify(json.error)}`);
  return json[0];
}

async function ensureUploaded(filePath, fileName, mediaByName) {
  if (mediaByName[fileName]) {
    console.log(`  skip upload (exists): ${fileName}`);
    return mediaByName[fileName].id;
  }
  if (!fs.existsSync(filePath)) {
    console.warn(`  WARN: file not found: ${filePath}`);
    return null;
  }
  const uploaded = await uploadFile(filePath, fileName);
  mediaByName[fileName] = uploaded;
  console.log(`  uploaded: ${fileName} (fileId=${uploaded.id})`);
  return uploaded.id;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding Strapi at ${STRAPI_URL}\n`);

  // ── 1. Product Categories (from products-category.json) ───────────────────
  console.log('── Product Categories ──');
  const existingCats = await getAll('product-categories');
  const categoryIdMap = {}; // legacyId → strapiNumericId

  for (const existing of existingCats) {
    const match = productCategoriesJson.find(c => c.title === existing.attributes.title);
    if (match) categoryIdMap[match.id] = existing.id;
  }

  for (let i = 0; i < productCategoriesJson.length; i++) {
    const cat = productCategoriesJson[i];
    if (categoryIdMap[cat.id]) {
      console.log(`  skip (exists): ${cat.title}`);
      continue;
    }
    const created = await post('product-categories', {
      title: cat.title,
      slug: slugify(cat.title),
      info: cat.info || '',
      order: i + 1,
      publishedAt: new Date().toISOString(),
    });
    categoryIdMap[cat.id] = created.id;
    console.log(`  created: ${cat.title} (id=${created.id})`);
  }

  // ── 2. Products (from products.json) ──────────────────────────────────────
  console.log('\n── Products ──');
  const existingProds = await getAll('products');
  const existingProdSlugs = new Set(existingProds.map(p => p.attributes.slug));

  for (const prod of productsJson) {
    const slug = slugify(prod.id);
    if (existingProdSlugs.has(slug)) {
      console.log(`  skip (exists): ${prod.title}`);
      continue;
    }
    const categoryId = categoryIdMap[prod.productCategoryId];
    if (!categoryId) {
      console.warn(`  WARN: no category for product ${prod.id} (categoryId=${prod.productCategoryId})`);
      continue;
    }
    const created = await post('products', {
      name: prod.title,
      slug,
      info: prod.info || '',
      company: { name: prod.company },
      category: categoryId,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${prod.title} (id=${created.id})`);
  }

  // ── 3. Team Members (from our-team.json) ──────────────────────────────────
  console.log('\n── Team Members ──');
  const existingTeam = await getAll('team-members');
  const existingTeamNames = new Set(existingTeam.map(t => t.attributes.name));

  for (const member of teamJson) {
    if (existingTeamNames.has(member.name)) {
      console.log(`  skip (exists): ${member.name}`);
      continue;
    }
    const created = await post('team-members', {
      name: member.name,
      position: member.position,
      bio: member.bio,
      order: member.id,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${member.name} (id=${created.id})`);
  }

  // ── 4. News Articles (from news.json) ─────────────────────────────────────
  console.log('\n── News Articles ──');
  const existingNews = await getAll('news-articles');
  const existingNewsTitles = new Set(existingNews.map(n => n.attributes.title));

  for (const article of newsJson) {
    if (existingNewsTitles.has(article.title)) {
      console.log(`  skip (exists): ${article.title}`);
      continue;
    }
    const created = await post('news-articles', {
      title: article.title,
      slug: slugify(article.title),
      tagline: article.tagline,
      date: article.date,
      content: article.content,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${article.title} (id=${created.id})`);
  }

  // ── 5. Partners (derived from ourCompaniesImages.ts) ──────────────────────
  console.log('\n── Partners ──');
  const existingPartners = await getAll('partners');
  const existingPartnerNames = new Set(existingPartners.map(p => p.attributes.name));
  let mediaByName = await getMediaFiles();

  for (const [i, [name, logoFile]] of Object.entries(PARTNER_LOGO_MAP).entries()) {
    if (existingPartnerNames.has(name)) {
      console.log(`  skip (exists): ${name}`);
      continue;
    }
    const logoId = await ensureUploaded(path.join(LOGOS_DIR, logoFile), logoFile, mediaByName);
    const created = await post('partners', {
      name,
      websiteUrl: PARTNER_URLS[name] || null,
      order: i + 1,
      logo: logoId,
    });
    console.log(`  created: ${name} (id=${created.id})`);
  }

  // ── 6. Pages (hardcoded — no source JSON) ─────────────────────────────────
  console.log('\n── Pages ──');
  const existingPages = await getAll('pages');
  const existingPageSlugs = new Set(existingPages.map(p => p.attributes.slug));

  for (const page of pages) {
    if (existingPageSlugs.has(page.slug)) {
      console.log(`  skip (exists): ${page.title}`);
      continue;
    }
    const created = await post('pages', {
      title: page.title,
      slug: page.slug,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      sections: page.sections,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${page.title} (id=${created.id})`);
  }

  // ── 7. News Images (from public/news/) ────────────────────────────────────
  console.log('\n── News Images ──');
  mediaByName = await getMediaFiles();
  const allNews = await getAll('news-articles');

  for (const article of allNews) {
    const sourceArticle = newsJson.find(n => n.title === article.attributes.title);
    if (!sourceArticle) continue;

    const folderPath = path.join(NEWS_DIR, sourceArticle.id);
    if (!fs.existsSync(folderPath)) {
      console.log(`  WARN: no image folder for "${sourceArticle.id}"`);
      continue;
    }

    const imageFiles = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f));
    const uploadedIds = [];
    let mainImageId = null;

    for (const imgFile of imageFiles) {
      const fileId = await ensureUploaded(path.join(folderPath, imgFile), imgFile, mediaByName);
      if (fileId) {
        uploadedIds.push(fileId);
        if (imgFile === sourceArticle.mainImage) mainImageId = fileId;
      }
    }

    await put('news-articles', article.id, { mainImage: mainImageId, images: uploadedIds });
    console.log(`  linked ${uploadedIds.length} images to: ${article.attributes.title}`);
  }

  // ── 8. Product PDFs (from public/uploads/) ────────────────────────────────
  console.log('\n── Product PDFs ──');
  mediaByName = await getMediaFiles();
  const allProductsForPdf = await getAll('products');
  const productBySlug = {};
  for (const p of allProductsForPdf) productBySlug[p.attributes.slug] = p;

  for (const detail of productDetailsJson) {
    if (!detail.downloadFile) continue;
    const product = productBySlug[slugify(detail.id)];
    if (!product) {
      console.warn(`  WARN: no product for ${detail.id}`);
      continue;
    }
    const fileId = await ensureUploaded(
      path.join(UPLOADS_DIR, detail.downloadFile),
      detail.downloadFile,
      mediaByName
    );
    if (fileId) {
      await put('products', product.id, { downloadFile: fileId });
      console.log(`  linked PDF to: ${detail.productName}`);
    }
  }

  // ── 9. Team Member Photos ─────────────────────────────────────────────────
  console.log('\n── Team Member Photos ──');
  mediaByName = await getMediaFiles();
  const allTeam = await getAll('team-members');

  for (const member of allTeam) {
    const photoFile = TEAM_PHOTO_MAP[member.attributes.name];
    if (!photoFile) continue;
    const fileId = await ensureUploaded(path.join(TEAM_PHOTOS_DIR, photoFile), photoFile, mediaByName);
    if (fileId) {
      await put('team-members', member.id, { photo: fileId });
      console.log(`  linked photo to: ${member.attributes.name}`);
    }
  }

  // ── 10. Product Details (from product-details.json) ───────────────────────
  console.log('\n── Product Details ──');
  const allProducts = await getAll('products');
  const productBySlugForDetails = {};
  for (const p of allProducts) productBySlugForDetails[p.attributes.slug] = p;

  for (const detail of productDetailsJson) {
    const existing = productBySlugForDetails[slugify(detail.id)];
    if (!existing) {
      console.warn(`  WARN: no product for slug "${slugify(detail.id)}", skipping`);
      continue;
    }
    await put('products', existing.id, {
      specifications:              detail.Specification              || [],
      description:                 detail.description                || [],
      detailDescription:           detail.detailDescription          || [],
      detailDescriptionAfterTable: detail.detailDescriptionAfterTable || [],
      productDetailTableData:      detail.productDetailTableData      || [],
      customerReviews:             detail.customerReviews             || [],
    });
    console.log(`  updated: ${detail.productName} (id=${existing.id})`);
  }

  console.log('\n✅ Seed complete!\n');
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
