module.exports = async function visa309(req, res) {
  // Temporary bypass: the direct submission flow on HowLong is not working.
  // Send HowLong visitors to the original working visa application instead.
  // Do not redirect requests from visa.swisscheeseai.au or other hosts.
  const hostname = String(req.headers.host || '').split(':')[0].toLowerCase();
  if (hostname === 'howlong.au' || hostname === 'www.howlong.au') {
    res.statusCode = 307;
    res.setHeader('Location', 'https://visa.swisscheeseai.au/');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('X-Robots-Tag', 'noindex');
    return res.end();
  }
  try {
    const upstream = await fetch("https://tuqyajzkaggbclpzpgby.supabase.co/functions/v1/visa-page", {
      headers: { "User-Agent": "Howlong-Visa-Proxy/1.0" },
      signal: AbortSignal.timeout(25000)
    });
    if (!upstream.ok) throw new Error("Upstream " + upstream.status);
    let html = await upstream.text();

    // Retain the established calculator, inputs, statistical model and scripts,
    // changing only HowLong-specific branding and canonical metadata.
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/ig,
      '<link rel="canonical" href="https://howlong.au/visa/309">');
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/ig,
      '<meta property="og:url" content="https://howlong.au/visa/309">');
    html = html.replace(/<link\s+rel=["']icon["'][^>]*>/ig,
      '<link rel="icon" type="image/avif" href="/assets/howlong-logo.avif">');
    html = html.replace(/<link\s+rel=["']apple-touch-icon["'][^>]*>/ig,
      '<link rel="apple-touch-icon" href="/assets/howlong-logo.avif">');
    html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/ig,
      '<meta property="og:image" content="https://howlong.au/assets/howlong-logo.avif">');
    html = html.replaceAll('https://tuqyajzkaggbclpzpgby.supabase.co/functions/v1/visa-page?asset=logo',
      '/assets/howlong-logo.avif');

    // Keep all original estimator components intact. Mirror corporate site's
    // colour tokens, while its own script continues to manage the theme toggle.
    const howlongStyle = `<style id="howlong-identity">
      :root { --bg:#fff; --panel:#f9f9f9; --hover:#f2f2f2; --ink:#0d0d0d;
        --ink-2:#2d2d2d; --muted:#6e6e80; --line:#e5e5e5;
        --btn:#0d0d0d; --btn-ink:#fff; --accent:#0d8168; --accent-ink:#0d8168; }
      html[data-theme="dark"] { --bg:#212121; --panel:#2a2a2c; --hover:#303032;
        --ink:#ececf1; --ink-2:#d5d5db; --muted:#b4b4be; --line:#3a3a3d;
        --btn:#fff; --btn-ink:#0d0d0d; --accent:#3fd39a; --accent-ink:#3fd39a; }
      .howlong-return { box-sizing:border-box; width:min(940px,calc(100% - 44px));
        margin:14px auto 0; padding:10px 0; font:500 13px/1.5 Inter,system-ui,sans-serif;
        border-bottom:1px solid var(--line); }
      .howlong-return a { color:var(--ink); text-decoration:none;
        display:inline-flex; align-items:center; gap:10px; }
      .howlong-return a:hover { text-decoration:underline; text-underline-offset:4px; }
      .howlong-return img { width:32px; height:32px; border-radius:8px; object-fit:cover; }
    </style>`;
    html = html.replace('</head>', howlongStyle + '</head>');
    html = html.replace(/<body([^>]*)>/i, (match, attrs) =>
      '<body' + attrs + '><nav class="howlong-return" aria-label="HowLong navigation">' +
      '<a href="/"><img src="/assets/howlong-logo.avif" width="32" height="32" alt="">' +
      '<span>← Back to HowLong Australia</span></a></nav>');

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(html);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("The Subclass 309 estimator is temporarily unavailable.");
  }
};
