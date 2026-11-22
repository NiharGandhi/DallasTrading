'use strict';
const TOKEN = process.env.API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const h = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN };

const data = {
  companyName: 'Dallas Trading Co. LLC',
  tagline: 'Trusted Electrical Products & Industrial Solutions Across the GCC',
  dubaiPhone: '+971 4 363 5500',
  omanPhone: '+968 2 459 3041',
  bahrainPhone: '+973 3398 8702',
  email: 'info@dallastrading.net',
  navigationLinks: [
    { label: 'Home',                 path: '/home' },
    { label: 'About Us',             path: '/about' },
    { label: 'Products',             path: '/products' },
    { label: 'News',                 path: '/news' },
    { label: 'Certificates',         path: '/certificates' },
    { label: 'Career Opportunities', path: '/career-opportunities' },
    { label: 'Contact Us',           path: '/contact-us' },
  ],
  socialLinks: {
    linkedin:  'https://www.linkedin.com/in/dallas-trading-co-llc-723306217/',
    instagram: 'https://www.instagram.com/dallastradingdxb/',
  },
};

async function run() {
  // Check if entry already exists
  const r = await fetch(STRAPI_URL + '/api/site-setting', { headers: h });
  const j = await r.json();
  const hasData = j.data && j.data.attributes && j.data.attributes.companyName;

  if (hasData) {
    console.log('SiteSettings already populated: ' + j.data.attributes.companyName);
    return;
  }

  // PUT to create/update the single type
  const pr = await fetch(STRAPI_URL + '/api/site-setting', {
    method: 'PUT',
    headers: h,
    body: JSON.stringify({ data }),
  });
  const pj = await pr.json();
  if (!pr.ok) {
    console.error('Failed:', JSON.stringify(pj.error));
    process.exit(1);
  }
  console.log('✅ SiteSettings created:');
  console.log('  companyName:   ', pj.data.attributes.companyName);
  console.log('  email:         ', pj.data.attributes.email);
  console.log('  dubaiPhone:    ', pj.data.attributes.dubaiPhone);
  console.log('  omanPhone:     ', pj.data.attributes.omanPhone);
  console.log('  bahrainPhone:  ', pj.data.attributes.bahrainPhone);
  console.log('  navLinks:      ', pj.data.attributes.navigationLinks.length, 'links');
  console.log('  socialLinks:   ', Object.keys(pj.data.attributes.socialLinks).join(', '));
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
