module.exports=async function visa309(req,res){
 try {
  const u=await fetch("https://tuqyajzkaggbclpzpgby.supabase.co/functions/v1/visa-page",{headers:{"User-Agent":"Howlong-Visa-Proxy/1.0"},signal:AbortSignal.timeout(25000)});
  if(!u.ok)throw new Error("Upstream "+u.status);
  let html=await u.text();
  html=html.replace(/<link\s+rel=["']canonical["'][^>]*>/ig,'<link rel="canonical" href="https://howlong.au/visa/309">');
  html=html.replace(/<meta\s+property=["']og:url["'][^>]*>/ig,'<meta property="og:url" content="https://howlong.au/visa/309">');
  html=html.replace(/<body([^>]*)>/i,(m,a)=>'<body'+a+'><div style="width:min(940px,calc(100% - 44px));margin:15px auto 0;font:13px Inter,system-ui,sans-serif"><a href="/" style="text-decoration:none;color:#10a37f">← Browse all visas on howlong.au</a></div>');
  res.statusCode=200;res.setHeader("Content-Type","text/html; charset=utf-8");res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");res.end(html);
 }catch(e){res.statusCode=502;res.setHeader("Content-Type","text/plain; charset=utf-8");res.end("The Subclass 309 estimator is temporarily unavailable.");}
};