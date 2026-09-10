const CANONICAL_URL = 'https://visa.swisscheeseai.au/';
const TITLE = 'Subclass 309 Partner Visa Processing Time Estimator | Swiss Cheese AI';
const DESCRIPTION = 'Estimate when your Subclass 309 partner visa may be decided using a statistical model fitted to Home Affairs processing-time benchmarks.';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.swisscheeseai.com/#organization',
      name: 'Swiss Cheese AI',
      alternateName: 'SCAI',
      url: 'https://www.swisscheeseai.com/'
    },
    {
      '@type': 'WebSite',
      '@id': `${CANONICAL_URL}#website`,
      url: CANONICAL_URL,
      name: 'Subclass 309 Grant Horizon',
      description: DESCRIPTION,
      publisher: { '@id': 'https://www.swisscheeseai.com/#organization' },
      inLanguage: 'en-AU'
    },
    {
      '@type': 'WebApplication',
      '@id': `${CANONICAL_URL}#application`,
      name: 'Subclass 309 Grant Horizon',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: CANONICAL_URL,
      description: 'A statistical scenario model that estimates a likely Subclass 309 partner visa decision window from processing-time benchmarks. It is not an official Department of Home Affairs decision predictor.',
      provider: { '@id': 'https://www.swisscheeseai.com/#organization' },
      isAccessibleForFree: true,
      browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
      inLanguage: 'en-AU'
    }
  ]
};

const SEO_HEAD = `
  <title>${TITLE}</title>
  <meta name="description" content="${DESCRIPTION}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${CANONICAL_URL}">
  <link rel="alternate" hreflang="en-AU" href="${CANONICAL_URL}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_AU">
  <meta property="og:site_name" content="Swiss Cheese AI">
  <meta property="og:title" content="Subclass 309 Partner Visa Processing Time Estimator">
  <meta property="og:description" content="Estimate a likely Subclass 309 partner visa decision window from processing-time benchmarks. Statistical planning model, not an official Home Affairs predictor.">
  <meta property="og:url" content="${CANONICAL_URL}">
  <meta property="og:image" content="https://visa.swisscheeseai.au/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Subclass 309 Grant Horizon by Swiss Cheese AI">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Subclass 309 Partner Visa Processing Time Estimator">
  <meta name="twitter:description" content="Estimate a likely Subclass 309 partner visa decision window from processing-time benchmarks.">
  <meta name="twitter:image" content="https://visa.swisscheeseai.au/og-image.png">
  <script type="application/ld+json">${JSON.stringify(STRUCTURED_DATA)}</script>
`;

function injectSeo(html) {
  let output = html;
  const duplicatePatterns = [
    /<title\b[^>]*>[\s\S]*?<\/title>/gi,
    /<meta\b[^>]*\bname=["']description["'][^>]*>/gi,
    /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,
    /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,
    /<link\b[^>]*\brel=["']alternate["'][^>]*\bhreflang=["'][^"']+["'][^>]*>/gi,
    /<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi,
    /<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi,
    /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
  ];
  for (const pattern of duplicatePatterns) output = output.replace(pattern, '');

  if (/<\/head>/i.test(output)) return output.replace(/<\/head>/i, `${SEO_HEAD}</head>`);
  if (/<html\b[^>]*>/i.test(output)) return output.replace(/<html\b[^>]*>/i, match => `${match}<head>${SEO_HEAD}</head>`);
  return `<!doctype html><html><head>${SEO_HEAD}</head><body>${output}</body></html>`;
}

module.exports = async function handler(req, res) {
  try {
    const upstream = await fetch('https://tuqyajzkaggbclpzpgby.supabase.co/functions/v1/visa-page', {
      headers: { 'User-Agent': 'SwissCheeseAI-Vercel-Proxy/1.0' }
    });
    const upstreamBody = await upstream.text();
    const body = injectSeo(upstreamBody);

    res.statusCode = upstream.ok ? 200 : 502;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large');
    res.setHeader('Link', `<${CANONICAL_URL}>; rel="canonical"`);
    res.end(body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');
    res.end('Unable to load calculator');
  }
};
