'use strict';
/**
 * Seeds sections content for the 4 static pages in Strapi.
 * Content is extracted from the React component source files.
 */

const TOKEN = process.env.API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const h = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN };

const PAGE_SECTIONS = {
  'about-us': [
    {
      __component: 'sections.rich-text-block',
      content: `Welcome to **Dallas Group of Companies** - a trusted name in the trading and distribution of high-quality electrical products and industrial solutions across the GCC.

## Our Story — Since 1995

Founded in 1995 under the visionary leadership of Mr. Prakash Ahuja, Dallas Group has evolved from its roots in Dubai into a multi-regional enterprise with a strong presence in the UAE, Oman, and Bahrain, and a growing footprint through an associated company in Dammam, Saudi Arabia.

## Our Excellence

Over the years, Dallas has built a reputation for reliability, efficiency, and customer-focused service. Guided by a well-structured management framework - with Mr. Prakash Ahuja at the helm and each division led by experienced General Managers and Directors - the Group ensures streamlined operations and consistent excellence across all regions.

## Our Approach

At Dallas, we believe in partnership-driven growth. Our customers are our collaborators, and we go beyond supplying products by offering technical expertise, cost-effective solutions, and end-to-end support. Our centralized sales coordination and sourcing teams based in Dubai, Oman, and Bahrain work closely to ensure timely deliveries, technical assistance, and superior after-sales service.

## Our Commitment

We are deeply committed to innovation, sustainability, and alignment with government initiatives aimed at building a more energy-efficient and sustainable future. Through continuous research, collaboration with consultants, and a focus on operational efficiency, Dallas Group continues to expand its capabilities — delivering value, fostering trust, and driving long-term success across the Middle East.`,
    },
  ],

  'career-opportunities': [
    {
      __component: 'sections.rich-text-block',
      content: `Dallas requires a dynamic Sales Head for its newly formed Oil & Gas Division. The ideal candidate should have about 10 year experience in Sales of electrical in Gulf region including a minimum of 4 to 5 years of sales experience to Oil & Gas sector.

**Key responsibilities would include:**

- Product portfolio & Customer development in Oil & Gas Segment.
- Strategic Relationship Management.
- Design and implement Sales strategies.
- Implementing and Supervising Sales process.

To apply for one of the above positions, email or post to the below addresses. Should you have questions, please do not hesitate to contact the HR Department on the specified email address.

Dallas Group
PO Box: 2028, Dubai, United Arab Emirates
Email: **info@dallastrading.net**

We have a working environment in which all individuals are able to make the best use of their skills, free from discrimination or harassment, and in which all decisions are based on merit.`,
    },
  ],

  'certificates': [
    {
      __component: 'sections.rich-text-block',
      content: `Our commitment to quality is demonstrated through internationally recognized certifications, ensuring excellence in every aspect of our operations.

## ISO 9001:2015 — United Arab Emirates

Dallas Trading Co. LLC holds the ISO 9001:2015 certification for its UAE operations, affirming our quality management systems meet international standards.

## ISO 9001:2015 — Oman

Our Oman operations are also ISO 9001:2015 certified, demonstrating our consistent commitment to quality across all regional offices.

## Quality Assurance

Our ISO 9001:2015 certifications demonstrate our dedication to maintaining the highest standards in quality management systems across all our regional operations.`,
    },
  ],

  'our-projects': [
    {
      __component: 'sections.rich-text-block',
      content: `Showcasing our portfolio of successful projects and achievements across the UAE and the wider Middle East region.

## Featured Projects

- **Al Habtoor City** — Dubai, UAE
- **Dubai Fountain Project** — Downtown Dubai, UAE
- **Future Museum (Museum of the Future)** — Dubai, UAE
- **Jumeirah Park Villas** — Dubai, UAE
- **Jumeirah Park Villas Phase 2** — Dubai, UAE
- **Palm Jumeirah** — Dubai, UAE
- **The Atlantis Royal** — Palm Jumeirah, Dubai, UAE

Dallas Group has supplied high-quality electrical products and industrial solutions to some of the most iconic and landmark projects in the UAE, cementing our reputation as a trusted partner for large-scale construction and infrastructure developments.`,
    },
  ],
};

async function run() {
  const r = await fetch(STRAPI_URL + '/api/pages?pagination[pageSize]=20', { headers: h });
  const j = await r.json();
  const pages = j.data;

  for (const [slug, sections] of Object.entries(PAGE_SECTIONS)) {
    const page = pages.find(p => p.attributes.slug === slug);
    if (!page) { console.log('  ❌ Page not found: ' + slug); continue; }

    const existing = page.attributes.sections || [];
    if (existing.length > 0) {
      console.log('  ⏭  Skip (already has sections): ' + slug);
      continue;
    }

    const pr = await fetch(STRAPI_URL + '/api/pages/' + page.id, {
      method: 'PUT',
      headers: h,
      body: JSON.stringify({ data: { sections } }),
    });
    const pj = await pr.json();
    if (!pr.ok) {
      console.log('  ❌ Failed: ' + slug, JSON.stringify(pj.error));
    } else {
      const count = pj.data?.attributes?.sections?.length || 0;
      console.log('  ✅ ' + slug + ' — ' + count + ' section(s) seeded');
    }
  }
  console.log('\nDone.');
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
