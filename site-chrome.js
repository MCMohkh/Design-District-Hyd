/*! Design District Hyd — shared site chrome (nav + footer + glint)
 *  Add to ANY page, just before </body>:   <script src="/site-chrome.js" defer></script>
 *  The page needs the CSS variables --black, --off-black, --teal, --teal-dark, --teal-light, --cream, --muted
 *  (all DDH pages already define them). Edit the CONFIG block once; every page updates.
 */
(function () {
  var CONFIG = {
    assets: '/Main%20images/',                 // root-absolute so it works from any folder / page depth
    logo: 'DD%20-%20Logo%20Black%20(for%20web).png',
    mcLogo: 'MC-Joint-Agency-logo-sonu-mohkh.png',
    contactEmail: '',                          // e.g. 'hello@designdistricthyd.com' — hidden while empty
    instagram: 'https://www.instagram.com/designdistrict.hyd/',
    links: [
      ['About',      '/about'],
      ['Season 01',  '/Season%201/'],
      ['Season 02',  '/Season%202/'],
      ['Season 03',  '/Season%203/'],
      ['Floor Map',  'https://www.designdistricthyd.com/s3-map'],
      ['Designers',  '/#collabs'],
      ['Voices',     '/#testimonials']
    ],
    cta: ['Season 4', 'https://www.designdistricthyd.com/apply'],
    rsvp: '/#rsvp'                             // index.html opens its RSVP panel on #rsvp
  };

  var logo = CONFIG.assets + CONFIG.logo;
  var here = location.pathname.replace(/\/+$/, '').toLowerCase();
  function isHere(h) { try { return h.charAt(0) === '/' && h.indexOf('#') < 0 && decodeURI(h).replace(/\/+$/, '').toLowerCase() === decodeURI(here); } catch (e) { return false; } }

  var css = '\
nav#ddh-nav{position:fixed;top:0;left:0;width:100%;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:1.8rem 4rem;transition:background .3s}\
nav#ddh-nav.solid{background:rgba(10,10,10,.92);padding-top:.9rem;padding-bottom:.9rem}\
nav#ddh-nav::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,10,10,.75) 0%,transparent 100%);pointer-events:none;z-index:-1}\
nav#ddh-nav .nav-logo-img{height:90px;width:auto;display:block;filter:invert(1);transition:height .3s}\
nav#ddh-nav.solid .nav-logo-img{height:62px}\
nav#ddh-nav .nav-links{display:flex;gap:2rem;list-style:none;margin:0;padding:0}\
nav#ddh-nav .nav-links a{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--cream);text-decoration:none;opacity:.65;transition:opacity .3s}\
nav#ddh-nav .nav-links a:hover,nav#ddh-nav .nav-links a.here{opacity:1}\
nav#ddh-nav .nav-links a.nav-cta{border:1px solid var(--teal);color:var(--teal);opacity:1;padding:.55rem 1rem;transition:background .3s,color .3s}\
nav#ddh-nav .nav-links a.nav-cta:hover{background:var(--teal);color:var(--black)}\
@media(max-width:1150px){nav#ddh-nav .nav-links{gap:1.1rem}nav#ddh-nav .nav-links a{letter-spacing:.18em}}\
.ddh-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:.5rem;z-index:150;background:none;border:0}\
.ddh-burger span{width:24px;height:1px;background:var(--cream);transition:all .3s;display:block}\
.ddh-burger.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}\
.ddh-burger.open span:nth-child(2){opacity:0}\
.ddh-burger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}\
#ddh-mobile{display:none;position:fixed;inset:0;background:rgba(10,10,10,.97);z-index:120;flex-direction:column;align-items:center;justify-content:center;gap:2rem}\
#ddh-mobile.open{display:flex}\
#ddh-mobile a{font-size:.7rem;letter-spacing:.45em;text-transform:uppercase;color:var(--cream);text-decoration:none;opacity:.7;transition:opacity .3s}\
#ddh-mobile a:hover{opacity:1}\
@media(max-width:900px){nav#ddh-nav{padding:1.5rem 2rem}nav#ddh-nav .nav-links{display:none}.ddh-burger{display:flex}nav#ddh-nav .nav-logo-img{height:64px}}\
footer#ddh-footer{background:var(--off-black);border-top:1px solid rgba(122,173,168,.15);padding:4rem;display:grid;grid-template-columns:1fr auto 1fr;gap:2rem;align-items:center}\
#ddh-footer .footer-left{display:flex;flex-direction:column;gap:.6rem}\
#ddh-footer .footer-right{display:flex;flex-direction:column;align-items:flex-end;gap:.6rem}\
#ddh-footer .footer-link{font-size:.55rem;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .3s}\
#ddh-footer .footer-link:hover{color:var(--teal-light)}\
#ddh-footer .footer-center{text-align:center}\
#ddh-footer .footer-tagline{font-size:.45rem;letter-spacing:.3em;text-transform:uppercase;color:var(--teal);margin-top:.5rem}\
#ddh-footer .footer-copy{font-size:.42rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-top:1.5rem}\
#ddh-footer .footer-mc-logo{height:18px;width:auto;vertical-align:middle;filter:grayscale(1);opacity:.6;transition:filter .4s,opacity .4s}\
#ddh-footer a:hover>.footer-mc-logo{filter:grayscale(0);opacity:1}\
@media(max-width:900px){footer#ddh-footer{grid-template-columns:1fr;text-align:center;padding:3rem 2rem}#ddh-footer .footer-right,#ddh-footer .footer-left{align-items:center}}\
.ddh-glint{position:fixed;z-index:450;pointer-events:none;overflow:hidden}\
.ddh-glint::before{content:"";position:absolute;top:-30%;bottom:-30%;left:0;width:55%;background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.05) 30%,rgba(255,255,255,.30) 50%,rgba(255,255,255,.05) 70%,rgba(255,255,255,0) 100%);transform:translateX(-130%) skewX(-18deg);animation:ddhGlint 1.15s cubic-bezier(.4,.1,.3,1) forwards}\
@keyframes ddhGlint{to{transform:translateX(300%) skewX(-18deg)}}\
@media(prefers-reduced-motion:reduce){.ddh-glint{display:none}}';
  var st = document.createElement('style'); st.id = 'ddh-chrome-css'; st.textContent = css; document.head.appendChild(st);

  function li(l) { return '<li><a href="' + l[1] + '"' + (isHere(l[1]) ? ' class="here"' : '') + '>' + l[0] + '</a></li>'; }
  var nav = document.createElement('nav'); nav.id = 'ddh-nav';
  nav.innerHTML = '<a href="/" class="nav-logo" aria-label="Design District Hyd — home"><img class="nav-logo-img" src="' + logo + '" alt="Design District Hyd Logo"></a>' +
    '<ul class="nav-links">' + CONFIG.links.map(li).join('') + '<li><a href="' + CONFIG.cta[1] + '" class="nav-cta">' + CONFIG.cta[0] + '</a></li></ul>' +
    '<button class="ddh-burger" id="ddhBurger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>';
  var mob = document.createElement('div'); mob.id = 'ddh-mobile';
  mob.innerHTML = CONFIG.links.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') +
    '<a href="' + CONFIG.cta[1] + '" style="color:var(--teal);opacity:1;border:1px solid var(--teal);padding:.8rem 1.6rem">' + CONFIG.cta[0] + '</a>' +
    '<a href="' + CONFIG.rsvp + '" style="color:var(--teal);opacity:1">RSVP — Season 4</a>';
  document.body.insertBefore(mob, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);
  var burger = document.getElementById('ddhBurger');
  function toggle(force) { var o = typeof force === 'boolean' ? force : !mob.classList.contains('open'); mob.classList.toggle('open', o); burger.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; }
  burger.addEventListener('click', function () { toggle(); });
  mob.addEventListener('click', function (e) { if (e.target.closest('a')) toggle(false); });
  addEventListener('scroll', function () { nav.classList.toggle('solid', scrollY > 80); }, { passive: true });

  var igIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;opacity:.7"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var f = document.createElement('footer'); f.id = 'ddh-footer';
  f.innerHTML = '<div class="footer-left">' +
    (CONFIG.contactEmail ? '<a href="mailto:' + CONFIG.contactEmail + '" class="footer-link">' + CONFIG.contactEmail + '</a>' : '') +
    '<a href="' + CONFIG.instagram + '" target="_blank" rel="noopener" class="footer-link" style="display:flex;align-items:center;gap:.6rem">' + igIcon + '@designdistrict.hyd</a>' +
    '<a href="/" class="footer-link">Season 4 · Date TBD</a></div>' +
    '<div class="footer-center"><div style="display:flex;align-items:center;justify-content:center;gap:.8rem;margin-bottom:.8rem"><img src="' + logo + '" alt="Design District Hyd" style="height:52px;width:auto;filter:invert(1);opacity:.85"></div>' +
    '<div class="footer-tagline">One of a Kind Pop Up · Hyderabad</div>' +
    '<div class="footer-copy">© 2026 Design District Hyd. All rights reserved.<br>Website designed by <a href="https://www.mcjoint.in/" class="footer-link" aria-label="MC"><img class="footer-mc-logo" src="' + CONFIG.assets + CONFIG.mcLogo + '" alt="MC"></a></div></div>' +
    '<div class="footer-right"><a href="' + CONFIG.rsvp + '" class="footer-link">RSVP — Season 4 ↗</a>' +
    '<a href="' + CONFIG.cta[1] + '" class="footer-link">Season 4 — Apply ↗</a>' +
    '<a href="https://www.designdistricthyd.com/s3-map" class="footer-link">Floor Map ↗</a></div>';
  var old = document.querySelector('footer:not(#ddh-footer)'); if (old) old.remove();
  var scripts = document.querySelectorAll('body > script'); document.body.insertBefore(f, scripts.length ? scripts[0] : null);

  /* RSVP links: if the page has its own RSVP panel (toggleRsvp), open it instead of leaving the page */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="#rsvp"]');
    if (a && typeof window.toggleRsvp === 'function') { e.preventDefault(); toggle(false); window.toggleRsvp(); }
  });

  /* GLINT — one soft sweep at a time over a random visible element */
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var TEXT = 'h1, h2, h3, .eyebrow, .hero-meta, .footer-tagline';
    var BOXES = 'button, .card, .gal figure, .d, .tab, .chip, input, .stat, .nav-logo-img, .footer-link, .more';
    var cands = function () {
      var vh = innerHeight, vw = innerWidth, out = [];
      document.querySelectorAll(TEXT + ',' + BOXES).forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.width < 24 || r.height < 12 || r.bottom < 40 || r.top > vh - 40 || r.right < 0 || r.left > vw) return;
        var cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < .6) return;
        out.push(el);
      }); return out;
    };
    var rectFor = function (el) { if (el.matches(TEXT)) { var g = document.createRange(); g.selectNodeContents(el); var rr = g.getBoundingClientRect(); if (rr.width > 10) return rr; } return el.getBoundingClientRect(); };
    (function fire() {
      var lb = document.querySelector('.lb.open, .gallery-lightbox.open');
      if (!document.hidden && !lb && !mob.classList.contains('open')) {
        var c = cands();
        if (c.length) {
          var el = c[Math.floor(Math.random() * c.length)], r = rectFor(el), g = document.createElement('div');
          g.className = 'ddh-glint';
          g.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;border-radius:' + getComputedStyle(el).borderRadius;
          document.body.appendChild(g); setTimeout(function () { g.remove(); }, 1300);
        }
      }
      setTimeout(fire, 1800 + Math.random() * 3800);
    })();
  }
})();
