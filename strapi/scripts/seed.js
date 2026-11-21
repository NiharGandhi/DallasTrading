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

async function post(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`POST /api/${endpoint} failed: ${JSON.stringify(json.error)}`);
  }
  return json.data;
}

async function getAll(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200`, { headers });
  const json = await res.json();
  if (!res.ok) throw new Error(`GET /api/${endpoint} failed`);
  return json.data;
}

async function uploadFile(filePath, fileName) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp',
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
  return json[0]; // returns the uploaded file object
}

async function put(endpoint, id, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`PUT /api/${endpoint}/${id} failed: ${JSON.stringify(json.error)}`);
  }
  return json.data;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const productCategories = [
  { id: 'industrial_plugs_and_sockets', title: 'Industrial Plugs & Sockets', info: 'Industrial Plugs & Sockets provide a connection to the electrical mains rated at higher voltages and currents than household Plugs & Sockets.', order: 1 },
  { id: 'cable_jointing_kit', title: 'Cable Jointing Kit/ Termination', info: '3M™ Wire Pulling Lubricants are designed for specific applications such as cable pulling, moisture and corrosion protection, and preventing build up of glues, wax, inks, and paint.', order: 2 },
  { id: 'flexiblerigid_conduit_and_accessories', title: 'Flexible/Rigid Conduit & Accessories', info: 'Rigid metal conduit is a thick-walled threaded tubing, usually made of coated steel, stainless steel or aluminum.', order: 3 },
  { id: 'Resin_Jointing_Kits', title: 'Resin Jointing Kits', info: 'Resin-filled joints Type TSJ-SC for armoured and unarmoured power and control cables up to 1kV', order: 4 },
  { id: 'gi_boxes', title: 'GI Boxes', info: 'Re-galvanised switch & socket boxes are available with or without brass earth terminals and with or without adjustable lug.', order: 5 },
  { id: 'scotch_tapes_and_mastics', title: 'Scotch Tapes & Mastics', info: 'All Premium Tapes for industrial and factory used are available with wide range according to the various application', order: 6 },
  { id: 'industrial_cable_glands', title: 'Industrial Cable Glands', info: 'Cable Glands are suitable for terminating any types of armored or unarmored cables.', order: 7 },
  { id: 'industrial_cable_lugs_and_connectors', title: 'Industrial Cable Lugs & Connectors', info: 'The unique design of the inspection hole, helps the conductor to insert fully.', order: 8 },
  { id: 'high_voltage_connectors', title: 'High Voltage Connectors', info: 'High Voltage Connectors are designed for hazardous areas, with protection mode.', order: 9 },
  { id: 'cables', title: 'Cables', info: 'Can be used indoors or outdoors in cable ducts, cable trays, conduits or underground locations.', order: 10 },
  { id: 'cable_management_system', title: 'Cable Management System', info: 'Each system is supported by a fully integrated range of time saving fixings and fittings.', order: 11 },
  { id: 'wires', title: 'Wires', info: 'These cables are used for the purpose of lighting in residential and commercial building.', order: 12 },
  { id: 'pvc_conduits', title: 'PVC Conduits', info: 'Decoduct conduits are manufactured from super high impact uPVC compound suitable to withstand harsh environments.', order: 13 },
  { id: 'cable_ties', title: 'Cable Ties', info: 'Cable Ties are manufactured with special additives imparting resistant to UV radiation.', order: 14 },
  { id: 'industrial_fans', title: 'Industrial Fans', info: 'As a leading supplier of Industrial and Commercial Grade Air Circulators, BREEZE® is recognized throughout the industry.', order: 15 },
  { id: 'wiring_devices', title: 'Wiring Devices', info: 'They are easy to install and available through our extensive distributor network.', order: 16 },
  { id: 'switchgear_assembly', title: 'Switchgear Assembly', info: 'We have successfully supplied to challenging projects in reputable organizations like DEWA, ADDC, MEDC, PDO, MOD, KAHRAMAA.', order: 17 },
  { id: 'switchgear_accessories', title: 'Switchgear Accessories', info: 'Construction, Power distribution and Automation systems.', order: 18 },
  { id: 'laser_marking_machine', title: 'Laser Marking Machine', info: 'Laser Machines are ideally used for itching & marking over any metal or PVC Plates.', order: 19 },
];

const products = [
  { id: 'armoured_cables', categoryId: 'cables', name: 'Armoured Cables', info: '', company: { name: 'Mesc' } },
  { id: 'control_cables', categoryId: 'cables', name: 'Control Cables', info: '', company: { name: 'Mesc' } },
  { id: 'multi_conductor', categoryId: 'cables', name: 'Multi Conductor, XLPE, Unshielded', info: '', company: { name: 'Mesc' } },
  { id: 'rubber_cable', categoryId: 'cables', name: 'Rubber Cable Ho7RNF', info: '', company: { name: 'Oxford Cavi' } },
  { id: 'resin_filled', categoryId: 'Resin_Jointing_Kits', name: 'Resin-filled joints Type TSJ-SC', info: '', company: { name: 'Raychem' } },
  { id: 'A1A2_Cable_Gland', categoryId: 'industrial_cable_glands', name: 'A1/A2 Cable Gland', info: 'As a leading supplier of Industrial and Commercial Grade Air Circulators, BREEZE® is recognized throughout the industry.', company: { name: 'Elite' } },
  { id: 'A1A2_Cable_Glands', categoryId: 'industrial_cable_glands', name: 'A1/A2 Cable Glands', info: 'Decoduct conduits are manufactured from super high impact uPVC compound.', company: { name: 'Hex' } },
  { id: 'BW_Cable_Gland', categoryId: 'industrial_cable_glands', name: 'BW Cable Gland', info: 'Can be used indoors or outdoors in cable ducts, cable trays, conduits or underground locations.', company: { name: 'Elite' } },
  { id: 'BW_Cable_Glands', categoryId: 'industrial_cable_glands', name: 'BW Cable Gland', info: 'Cable Ties are manufactured with special additives imparting resistant to UV radiation.', company: { name: 'Hex' } },
  { id: 'CW_Cable_Gland', categoryId: 'industrial_cable_glands', name: 'CW Cable Gland', info: '', company: { name: 'Elite' } },
  { id: 'CW_Cable_Glands', categoryId: 'industrial_cable_glands', name: 'CW Cable Gland', info: '', company: { name: 'Hex' } },
  { id: 'E1W_Cable_Gland', categoryId: 'industrial_cable_glands', name: 'E1W Cable Gland', info: 'Can be used indoors or outdoors in cable ducts, cable trays, conduits or underground locations.', company: { name: 'Elite' } },
  { id: 'E1W_Cable_Glands', categoryId: 'industrial_cable_glands', name: 'E1W Cable Gland', info: 'Can be used indoors or outdoors in cable ducts, cable trays, conduits or underground locations.', company: { name: 'Hex' } },
  { id: 'Panel_Wire', categoryId: 'wires', name: 'Panel Wire', info: '', company: { name: 'Mesc' } },
  { id: 'PVC_Flexible_Wire', categoryId: 'wires', name: 'PVC Flexible Wire', info: '', company: { name: 'Mesc' } },
  { id: 'Building_Wire', categoryId: 'wires', name: 'Single Core Wire/Building Wire', info: '', company: { name: 'Mesc' } },
  { id: '3M_LV_Resin_Joint_Kit', categoryId: 'cable_jointing_kit', name: '3M LV Resin Joint Kit', info: '', company: { name: '3M' } },
  { id: '3M_Wire_Pulling_Lubricant', categoryId: 'cable_jointing_kit', name: '3M Wire Pulling Lubricant', info: '', company: { name: '3M' } },
  { id: 'Cold_Shrink_Termination', categoryId: 'cable_jointing_kit', name: 'Cold Shrink Termination', info: '', company: { name: '3M' } },
  { id: 'Heat_Shrink_Accessories', categoryId: 'cable_jointing_kit', name: 'Heat Shrink Accessories', info: '', company: { name: '3M' } },
  { id: 'Heat_Shrink_Termination', categoryId: 'cable_jointing_kit', name: 'Heat Shrink Termination', info: '', company: { name: '3M' } },
  { id: 'LV_3M_Cold_Shrink_Straight_Cable_Joint', categoryId: 'cable_jointing_kit', name: 'LV 3M Cold Shrink Straight Cable Joint', info: '', company: { name: '3M' } },
  { id: 'Nylon_Cable_Tie', categoryId: 'cable_ties', name: 'Nylon Cable Tie', info: '', company: { name: '3M' } },
  { id: 'Industrial_Plug_And_Socket', categoryId: 'industrial_plugs_and_sockets', name: 'Industrial Plug & Socket', info: '', company: { name: 'PCE' } },
  { id: 'DS4_High_Current_Connectors', categoryId: 'high_voltage_connectors', name: 'DS4 High Current Connectors', info: '', company: { name: 'Marechal' } },
  { id: 'DX_Metal_Decontactor', categoryId: 'high_voltage_connectors', name: 'DX Metal Decontactor', info: '', company: { name: 'Marechal' } },
  { id: 'PF_High_Current_Plugs_and_Socket_Outlets', categoryId: 'high_voltage_connectors', name: 'PF High Current Plugs and Socket Outlets', info: '', company: { name: 'Marechal' } },
  { id: 'Single_Pole_Power_Connectors', categoryId: 'high_voltage_connectors', name: 'Single Pole Power Connectors', info: '', company: { name: 'Marechal' } },
  { id: 'Cable_Ladder', categoryId: 'cable_management_system', name: 'Cable Ladder', info: '', company: { name: 'Legrand Swift' } },
  { id: 'Cable_Tray', categoryId: 'cable_management_system', name: 'Cable Tray', info: '', company: { name: 'Legrand Swift' } },
  { id: 'Flexible_Conduit_And_Accessories', categoryId: 'flexiblerigid_conduit_and_accessories', name: 'Flexible Conduit & Accessories', info: '', company: { name: 'Barton' } },
  { id: 'Rigid_Conduit_And_Accessories', categoryId: 'flexiblerigid_conduit_and_accessories', name: 'Rigid Conduit & Accessories', info: '', company: { name: 'Barton' } },
  { id: 'PVC_Conduits', categoryId: 'pvc_conduits', name: 'PVC Conduits', info: '', company: { name: 'Decoduct' } },
  { id: 'Switchgear_Accessories', categoryId: 'switchgear_accessories', name: 'Switchgear Accessories', info: '', company: { name: 'ABB' } },
  { id: 'Switchgear_Accessories1', categoryId: 'switchgear_accessories', name: 'Switchgear Accessories', info: '', company: { name: 'Hager' } },
  { id: 'Switchgear_Assembly', categoryId: 'switchgear_assembly', name: 'Switchgear Assembly', info: '', company: { name: 'ABB, Eaton (Moeller), Hager, Legrand, Schneider, Siemens' } },
  { id: 'Industrial_Fans', categoryId: 'industrial_fans', name: 'Industrial Fans', info: '', company: { name: 'Breeze' } },
  { id: 'GI_Switch_And_Socket_Boxes', categoryId: 'gi_boxes', name: 'SWITCH AND SOCKET BOXES', info: '', company: { name: 'Barton' } },
  { id: 'Laser_Marking_Machine', categoryId: 'laser_marking_machine', name: 'Laser Marking Machine', info: '', company: { name: 'Rayon' } },
  { id: 'Arteor', categoryId: 'wiring_devices', name: 'Arteor', info: '', company: { name: 'Legrand' } },
  { id: 'Belanko', categoryId: 'wiring_devices', name: 'Belanko', info: '', company: { name: 'Legrand' } },
  { id: 'Ceiling_Rose', categoryId: 'wiring_devices', name: 'Ceiling Rose', info: '', company: { name: 'MK Logic Plus' } },
  { id: 'Mallia', categoryId: 'wiring_devices', name: 'Mallia', info: '', company: { name: 'Legrand' } },
  { id: 'Plexo', categoryId: 'wiring_devices', name: 'Plexo', info: '', company: { name: 'Legrand' } },
  { id: 'Synergy', categoryId: 'wiring_devices', name: 'Synergy', info: '', company: { name: 'Legrand' } },
  { id: 'Wiring_Devices', categoryId: 'wiring_devices', name: 'Wiring Devices', info: '', company: { name: 'MK Logic Plus' } },
  { id: 'PCS_Phase_Identification_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'PCS Phase Identification Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_22_Heavy_Duty_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch 22 Heavy Duty Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_33_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch 33 Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_35_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch 35 Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_Super_88_All_Weather_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch Super 88 All Weather Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_T2228_Rubber_Mastic_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch T2228 Rubber Mastic Tape', info: '', company: { name: '3M' } },
  { id: 'Scotch_Vinyl_Mastic_Tape', categoryId: 'scotch_tapes_and_mastics', name: 'Scotch Vinyl Mastic Tape', info: '', company: { name: '3M' } },
  { id: 'Scotchfil_Insulation_Putty', categoryId: 'scotch_tapes_and_mastics', name: 'Scotchfil Insulation Putty', info: '', company: { name: '3M' } },
];

const teamMembers = [
  { name: 'Prakash Ahuja', position: 'Chairman & Founder', bio: 'Prakash Ahuja is a pioneering figure in the electrical industry with over three decades of entrepreneurial experience. Known for his visionary leadership and deep business acumen, he has built Dallas Group of Companies on the foundations of trust, innovation, and excellence. Business is not just a profession for him — It is his passion and lifelong pursuit.', order: 0 },
  { name: 'Ibrahim Somji', position: 'Director', bio: 'A first-generation entrepreneur, Ibrahim Somji has made his mark in the electrical products sector as well as the real estate industry, having developed several prestigious towers. Highly regarded within the business community, he is known for his integrity, strategic insight, and straightforward approach to leadership.', order: 1 },
  { name: 'Jay Ahuja', position: 'Executive Director', bio: 'As Executive Director of Dallas Group, Jay Ahuja brings over two decades of diverse experience within the organization. He oversees the Group\'s overall operations and IT infrastructure across all branches in the Middle East. His hands-on leadership and commitment to operational excellence have been instrumental in strengthening Dallas\'s regional presence and efficiency.', order: 2 },
  { name: 'Vijay Ahuja', position: 'Director – Oman Operations', bio: 'Vijay Ahuja has an educational background in Management Information Systems and Accounting, combined with extensive training and experience in branding, business development, and marketing in both the US and Indian markets. Since 2015, as the leader of operations in Oman, his experience includes strategic planning, team management, and fostering relationships with key stakeholders.', order: 3 },
  { name: 'Amjad Ali', position: 'General Manager – UAE & Bahrain', bio: 'Amjad Ali, a qualified Electrical Engineer, has been an integral part of Dallas for over 30 years. Widely recognized by clients for his articulate technical guidance, his solutions have consistently delivered cost efficiency, reliability, and performance optimization. His long-standing commitment and deep product knowledge make him one of the most respected professionals in the industry.', order: 4 },
];

const LOGOS_DIR = path.join(__dirname, '..', '..', 'src', 'store', 'our-companies', 'ourCompaniesImages');

const partners = [
  { name: 'Hex',           logoFile: 'hex.png',              websiteUrl: '',                            order: 1 },
  { name: 'Elite',         logoFile: 'elite.png',            websiteUrl: '',                            order: 2 },
  { name: 'Mesc',          logoFile: 'MESC.jpg',             websiteUrl: '',                            order: 3 },
  { name: 'Oxford Cavi',   logoFile: 'oxford.png',           websiteUrl: '',                            order: 4 },
  { name: '3M',            logoFile: '3M.png',               websiteUrl: 'https://www.3m.com',          order: 5 },
  { name: 'PCE',           logoFile: 'pce.png',              websiteUrl: 'https://www.pce-instruments.com', order: 6 },
  { name: 'Marechal',      logoFile: 'marechal_electric.jpg',websiteUrl: 'https://www.marechal.com',   order: 7 },
  { name: 'Legrand Swift', logoFile: 'legrand-logo.png',     websiteUrl: 'https://www.legrand.com',    order: 8 },
  { name: 'Barton',        logoFile: 'barton.png',           websiteUrl: '',                            order: 9 },
  { name: 'Decoduct',      logoFile: 'decoduct.png',         websiteUrl: '',                            order: 10 },
  { name: 'ABB',           logoFile: 'ABB.png',              websiteUrl: 'https://www.abb.com',         order: 11 },
  { name: 'Hager',         logoFile: 'hager.png',            websiteUrl: 'https://www.hager.com',       order: 12 },
  { name: 'Eaton (Moeller)',logoFile: 'eaton.png',           websiteUrl: 'https://www.eaton.com',       order: 13 },
  { name: 'Schneider',     logoFile: 'schneider-logo.png',   websiteUrl: 'https://www.se.com',          order: 14 },
  { name: 'Siemens',       logoFile: 'Siemens_logo.png',     websiteUrl: 'https://www.siemens.com',     order: 15 },
  { name: 'Breeze',        logoFile: 'breeze.png',           websiteUrl: '',                            order: 16 },
  { name: 'MK Logic Plus', logoFile: 'mk-logo.jpg',          websiteUrl: '',                            order: 17 },
  { name: 'Rayon',         logoFile: 'rayan.png',            websiteUrl: '',                            order: 18 },
  { name: 'Raychem',       logoFile: 'raychem-logo.png',     websiteUrl: '',                            order: 19 },
];

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
    seoDescription: 'Explore Dallas Trading Co. LLC\'s portfolio of successful projects across the UAE and GCC.',
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

const newsArticles = [
  {
    title: 'A Proud Moment: Dallas Trading Co. LLC Honored with the 3M Best Award',
    tagline: 'Dallas Trading Co. LLC recognized with the 3M Best Award for outstanding contribution to the 3M Electrical Market Business for 2024',
    date: '2025-04-15',
    content: 'At Dallas Trading Co. LLC, moments like these remind us why dedication, collaboration, and trust truly matter.\n\nWe are proud to share that our long-standing partner, 3M, has recognized Dallas Trading Co. LLC with the 3M Best Award for our outstanding contribution to the 3M Electrical Market Business for 2024.\n\nThe recognition was presented during a special ceremony in Dubai, where our leadership team — Mr. Jay Ahuja (Executive Director), Mr. Vijay Ahuja (Director – Oman Operations), and Mr. Amjad Ali (General Manager) — had the privilege of accepting the award on behalf of our entire organization.\n\nThis honor is more than a milestone; it reflects the strength of our partnership with 3M and our shared vision of driving innovation, reliability, and growth in the electrical market. Behind every achievement stands a dedicated team, supportive partners, and loyal customers — and this recognition belongs to all of them.\n\nWe extend our sincere gratitude to 3M for this acknowledgment and to every member of the Dallas Trading family for their relentless commitment to excellence. Together, we continue to power progress and build a brighter, more connected future.',
  },
  {
    title: 'Strengthening Partnerships Through Knowledge | Barton Engineering x Dallas Trading Co. LLC',
    tagline: 'Engaging product training session strengthens partnership and technical expertise',
    date: '2025-09-10',
    content: 'We had the pleasure of hosting our valued principal supplier, Barton Engineering, at our Dubai warehouse for an engaging and hands-on product training session!\n\nLed by Mr. Rajnish Kapoor (Chief Operating Officer), the Barton team brought a wealth of expertise and enthusiasm to the session.\n\nWelcomed by our General Manager, Mr. Amjad Ali, and the Dallas Trading Co. team, the day was filled with collaboration, learning, and practical demonstrations focused on:\n⚙ Enhancing technical know-how of Barton\'s conduit and cable management systems\n🔍 Understanding quality testing and global product standards\n💪 Live conduit bending demos showcasing Barton\'s product strength and durability\n\nWe\'re truly grateful to the Barton Engineering team for their time, insights, and commitment to empowering our people. Sessions like these strengthen our partnership and enable us to deliver even greater value and technical excellence to our customers.\n\nHere\'s to continuous learning, collaboration, and growth together! 🌟',
  },
  {
    title: 'Strengthening Partnerships at Middle East Energy (MEE) 2025 – Dubai',
    tagline: 'Dallas Trading Co. LLC reconnects with PCE Austria at MEE 2025 to strengthen collaboration and explore new opportunities',
    date: '2025-04-05',
    content: 'There\'s something special about meeting long-time partners face-to-face — especially in an environment buzzing with innovation and opportunity.\n\nAt Middle East Energy (MEE) 2025, held at the Dubai World Trade Centre, the Dallas Trading Co. LLC team had the pleasure of reconnecting with our valued principal partner, PCE Austria.\n\nRepresented by Mr. Jay Ahuja (Executive Director), Mr. Vijay Ahuja (Director – Oman), Mr. Amjad Ali (General Manager), and Mr. Navjot (Sales Manager – Bahrain), the Dallas team visited the PCE Austria booth to discuss new ideas, strengthen collaboration, and explore ways to expand our shared footprint in the energy and electrical sectors.\n\nIt was an inspiring exchange — a reflection of the strong relationship built over years of mutual trust and growth.\n\nHere\'s to continued success and new milestones together with PCE Austria!',
  },
  {
    title: 'Ramadan Celebration with the Dallas Team',
    tagline: 'Celebrating Ramadan with the Dallas Team',
    date: '2025-03-28',
    content: 'The holy month of Ramadan is a time for reflection, togetherness, and gratitude. Dallas Trading Co. LLC marked this special occasion with a warm and joyous Ramadan celebration attended by our leadership and team members.\n\nThe event was graced by the presence of Mr. Prakash Ahuja (Chairman), Mr. Jay Ahuja (Executive Director), Mr. Vijay Ahuja (Director – Oman Operations), and Mr. Amjad Ali (General Manager), along with team members from various departments.\n\nIt was a wonderful evening filled with heartfelt conversations, laughter, and the spirit of unity that defines the Dallas family.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding Strapi at ${STRAPI_URL}\n`);

  // 1. Product Categories
  console.log('── Product Categories ──');
  const existingCats = await getAll('product-categories');
  const categoryIdMap = {}; // legacyId → strapiNumericId

  for (const existing of existingCats) {
    const match = productCategories.find(c => c.title === existing.attributes.title);
    if (match) categoryIdMap[match.id] = existing.id;
  }

  for (const cat of productCategories) {
    if (categoryIdMap[cat.id]) {
      console.log(`  skip (exists): ${cat.title}`);
      continue;
    }
    const created = await post('product-categories', {
      title: cat.title,
      slug: slugify(cat.title),
      info: cat.info,
      order: cat.order,
      publishedAt: new Date().toISOString(),
    });
    categoryIdMap[cat.id] = created.id;
    console.log(`  created: ${cat.title} (id=${created.id})`);
  }

  // 2. Products
  console.log('\n── Products ──');
  const existingProds = await getAll('products');
  const existingProdSlugs = new Set(existingProds.map(p => p.attributes.slug));

  for (const prod of products) {
    const slug = slugify(prod.id);
    if (existingProdSlugs.has(slug)) {
      console.log(`  skip (exists): ${prod.name}`);
      continue;
    }
    const categoryId = categoryIdMap[prod.categoryId];
    if (!categoryId) {
      console.warn(`  WARN: no category found for ${prod.id} (categoryId=${prod.categoryId}), skipping`);
      continue;
    }
    const created = await post('products', {
      name: prod.name,
      slug: slugify(prod.id), // use legacy id — guaranteed unique
      info: prod.info || '',
      company: prod.company,
      category: categoryId,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${prod.name} (id=${created.id})`);
  }

  // 3. Team Members
  console.log('\n── Team Members ──');
  const existingTeam = await getAll('team-members');
  const existingTeamNames = new Set(existingTeam.map(t => t.attributes.name));

  for (const member of teamMembers) {
    if (existingTeamNames.has(member.name)) {
      console.log(`  skip (exists): ${member.name}`);
      continue;
    }
    const created = await post('team-members', {
      name: member.name,
      position: member.position,
      bio: member.bio,
      order: member.order,
      publishedAt: new Date().toISOString(),
    });
    console.log(`  created: ${member.name} (id=${created.id})`);
  }

  // 4. News Articles
  console.log('\n── News Articles ──');
  const existingNews = await getAll('news-articles');
  const existingNewsTitles = new Set(existingNews.map(n => n.attributes.title));

  for (const article of newsArticles) {
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

  // 5. Partners
  console.log('\n── Partners ──');
  const existingPartners = await getAll('partners');
  const existingPartnerNames = new Set(existingPartners.map(p => p.attributes.name));

  for (const partner of partners) {
    if (existingPartnerNames.has(partner.name)) {
      console.log(`  skip (exists): ${partner.name}`);
      continue;
    }

    // Upload logo
    let logoId = null;
    if (partner.logoFile) {
      const logoPath = path.join(LOGOS_DIR, partner.logoFile);
      if (fs.existsSync(logoPath)) {
        const uploaded = await uploadFile(logoPath, partner.logoFile);
        logoId = uploaded.id;
        console.log(`  uploaded logo: ${partner.logoFile} (fileId=${logoId})`);
      } else {
        console.warn(`  WARN: logo file not found: ${logoPath}`);
      }
    }

    const created = await post('partners', {
      name: partner.name,
      websiteUrl: partner.websiteUrl || null,
      order: partner.order,
      logo: logoId,
    });
    console.log(`  created: ${partner.name} (id=${created.id})`);
  }

  // 6. Pages
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

  // 7. News images — upload and link to existing news articles
  console.log('\n── News Images ──');
  const newsDir = path.join(__dirname, '..', '..', 'public', 'news');
  const allNews = await getAll('news-articles');

  // Build a map of existing media filenames to avoid re-uploading
  const existingMediaRes = await fetch(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=500`, { headers });
  const existingMediaJson = await existingMediaRes.json();
  const uploadedFileNames = new Set((existingMediaJson.map ? existingMediaJson : []).map(f => f.name));

  for (const article of allNews) {
    const slugId = article.attributes.slug; // e.g. "a-proud-moment-..."
    // Find matching news folder by title keyword match
    const newsDataPath = path.join(__dirname, '..', '..', 'public', 'data', 'news.json');
    const newsData = JSON.parse(fs.readFileSync(newsDataPath, 'utf8'));
    const match = newsData.find(n => article.attributes.title === n.title);
    if (!match) continue;

    const folderPath = path.join(newsDir, match.id);
    if (!fs.existsSync(folderPath)) {
      console.log(`  WARN: no image folder for news "${match.id}"`);
      continue;
    }

    const imageFiles = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f));
    const uploadedIds = [];
    let mainImageId = null;

    for (const imgFile of imageFiles) {
      if (uploadedFileNames.has(imgFile)) {
        // already uploaded — find its id
        const found = (existingMediaJson.map ? existingMediaJson : []).find(f => f.name === imgFile);
        if (found) {
          uploadedIds.push(found.id);
          if (imgFile === match.mainImage) mainImageId = found.id;
        }
        console.log(`  skip upload (exists): ${imgFile}`);
        continue;
      }
      const uploaded = await uploadFile(path.join(folderPath, imgFile), imgFile);
      uploadedFileNames.add(imgFile);
      uploadedIds.push(uploaded.id);
      if (imgFile === match.mainImage) mainImageId = uploaded.id;
      console.log(`  uploaded: ${imgFile} (fileId=${uploaded.id})`);
    }

    await put('news-articles', article.id, {
      mainImage: mainImageId,
      images: uploadedIds,
    });
    console.log(`  linked images to: ${article.attributes.title}`);
  }

  // 8. PDFs — upload and link to products by downloadFile field
  console.log('\n── Product PDFs ──');
  const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');
  const productDetailsForPdf = JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', '..', 'public', 'data', 'product-details.json'), 'utf8'
  ));
  const allProductsForPdf = await getAll('products');
  const productBySlugForPdf = {};
  for (const p of allProductsForPdf) productBySlugForPdf[p.attributes.slug] = p;

  // Re-fetch media to include any newly uploaded files
  const mediaRes2 = await fetch(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=500`, { headers });
  const allMedia = await mediaRes2.json();
  const mediaByName = {};
  for (const f of (allMedia.map ? allMedia : [])) mediaByName[f.name] = f;

  for (const detail of productDetailsForPdf) {
    if (!detail.downloadFile) continue;
    const pdfPath = path.join(uploadsDir, detail.downloadFile);
    if (!fs.existsSync(pdfPath)) {
      console.log(`  WARN: PDF not found: ${detail.downloadFile}`);
      continue;
    }

    const product = productBySlugForPdf[slugify(detail.id)];
    if (!product) {
      console.log(`  WARN: no product for ${detail.id}`);
      continue;
    }

    let fileId;
    if (mediaByName[detail.downloadFile]) {
      fileId = mediaByName[detail.downloadFile].id;
      console.log(`  skip upload (exists): ${detail.downloadFile}`);
    } else {
      const uploaded = await uploadFile(pdfPath, detail.downloadFile);
      fileId = uploaded.id;
      mediaByName[detail.downloadFile] = uploaded;
      console.log(`  uploaded PDF: ${detail.downloadFile} (fileId=${fileId})`);
    }

    await put('products', product.id, { downloadFile: fileId });
    console.log(`  linked PDF to: ${detail.productName}`);
  }

  // 10. Team member photos
  console.log('\n── Team Member Photos ──');
  const TEAM_PHOTOS_DIR = path.join(__dirname, '..', '..', 'src', 'store', 'our-team', 'ourTeamImages');
  const teamPhotoMap = {
    'Prakash Ahuja':  'Prakash_Ahuja.png',
    'Ibrahim Somji':  'Ibrahim_Somji.jpeg',
    'Jay Ahuja':      'Jay-Ahuja.jpg',
    'Vijay Ahuja':    'Vijay-Ahuja.jpg',
    'Amjad Ali':      'Amjad-Ali.jpg',
  };
  const allTeam = await getAll('team-members');
  // Re-fetch media
  const mediaRes3 = await fetch(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=500`, { headers });
  const allMedia3 = await mediaRes3.json();
  const mediaByName3 = {};
  for (const f of (allMedia3.map ? allMedia3 : [])) mediaByName3[f.name] = f;

  for (const member of allTeam) {
    const photoFile = teamPhotoMap[member.attributes.name];
    if (!photoFile) continue;
    const photoPath = path.join(TEAM_PHOTOS_DIR, photoFile);
    if (!fs.existsSync(photoPath)) {
      console.log(`  WARN: photo not found: ${photoFile}`);
      continue;
    }
    let fileId;
    if (mediaByName3[photoFile]) {
      fileId = mediaByName3[photoFile].id;
      console.log(`  skip upload (exists): ${photoFile}`);
    } else {
      const uploaded = await uploadFile(photoPath, photoFile);
      fileId = uploaded.id;
      console.log(`  uploaded: ${photoFile} (fileId=${fileId})`);
    }
    await put('team-members', member.id, { photo: fileId });
    console.log(`  linked photo to: ${member.attributes.name}`);
  }

  // 12. Product Details — update existing products with detail JSON fields
  console.log('\n── Product Details ──');
  const detailsPath = path.join(__dirname, '..', '..', 'public', 'data', 'product-details.json');
  if (!fs.existsSync(detailsPath)) {
    console.log('  SKIP: product-details.json not found at', detailsPath);
  } else {
    const productDetails = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    const allProducts = await getAll('products');
    const productBySlug = {};
    for (const p of allProducts) {
      productBySlug[p.attributes.slug] = p;
    }

    for (const detail of productDetails) {
      const slug = slugify(detail.id);
      const existing = productBySlug[slug];
      if (!existing) {
        console.log(`  WARN: no product found for slug "${slug}" (id=${detail.id}), skipping`);
        continue;
      }
      await put('products', existing.id, {
        specifications: detail.Specification || [],
        description: detail.description || [],
        detailDescription: detail.detailDescription || [],
        detailDescriptionAfterTable: detail.detailDescriptionAfterTable || [],
        productDetailTableData: detail.productDetailTableData || [],
        customerReviews: detail.customerReviews || [],
      });
      console.log(`  updated: ${detail.productName} (id=${existing.id})`);
    }
  }

  console.log('\n✅ Seed complete!\n');
  console.log('NOTE: Images were not seeded. Upload them manually via the Strapi Media Library,');
  console.log('then assign them to each content entry.');
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
