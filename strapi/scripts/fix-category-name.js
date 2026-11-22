'use strict';
const TOKEN = process.env.API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const h = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN };

async function run() {
  const r = await fetch(STRAPI_URL + '/api/product-categories?pagination[pageSize]=50', { headers: h });
  const j = await r.json();
  const cat = j.data.find(x => x.attributes.title === 'Cable Jointing Kit/ Termination');
  if (!cat) { console.log('Not found (may already be fixed)'); return; }

  console.log('Found id=' + cat.id + ' title="' + cat.attributes.title + '"');
  const pr = await fetch(STRAPI_URL + '/api/product-categories/' + cat.id, {
    method: 'PUT',
    headers: h,
    body: JSON.stringify({ data: { title: 'Cable Jointing Kit / Termination' } }),
  });
  const pj = await pr.json();
  console.log('Updated to:', pj.data?.attributes?.title);
}

run().catch(err => { console.error(err.message); process.exit(1); });
