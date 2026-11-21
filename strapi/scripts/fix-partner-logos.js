'use strict';
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const LOGOS_DIR = path.join(__dirname, '..', '..', 'src', 'store', 'our-companies', 'ourCompaniesImages');
const h = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN };

const LOGO_MAP = {
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

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };

async function upload(filePath, fileName) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const form = new FormData();
  form.append('files', new Blob([buf], { type: MIME[ext] || 'application/octet-stream' }), fileName);
  const r = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN },
    body: form,
  });
  const j = await r.json();
  if (!r.ok) throw new Error('Upload failed: ' + JSON.stringify(j.error));
  return j[0];
}

async function run() {
  const partners = await fetch(`${STRAPI_URL}/api/partners?pagination[pageSize]=50`, { headers: h })
    .then(r => r.json()).then(j => j.data);

  for (const partner of partners) {
    const name = partner.attributes.name;
    const logoFile = LOGO_MAP[name];
    if (!logoFile) { console.log(`  no map entry for: ${name}`); continue; }
    const filePath = path.join(LOGOS_DIR, logoFile);
    if (!fs.existsSync(filePath)) { console.log(`  file missing: ${filePath}`); continue; }
    const uploaded = await upload(filePath, logoFile);
    await fetch(`${STRAPI_URL}/api/partners/${partner.id}`, {
      method: 'PUT',
      headers: h,
      body: JSON.stringify({ data: { logo: uploaded.id } }),
    });
    console.log(`  linked: ${name} → ${logoFile} (fileId=${uploaded.id})`);
  }
  console.log('\nDone.');
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
