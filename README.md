# Design District Hyd — website

Static site (no build step). Pages: `/` (home · Season 4), `/Season 1/`, `/Season 2/`, `/Season 3/`, `/s3-map`, `/apply`, `/about`, `/join`, `/payments`, plus guest tools `/VIP-rsvp.html`, `/pass.html`, `/checkin.html`, `/scan.html`.

* Every form posts to ONE Google Apps Script web app that writes to ONE Google Sheet — see `Code.gs` (kept in the Apps Script project, not served by the site).
* `site-chrome.js` — shared nav/footer; its contents are inlined in the Season / about / join / payments pages.
* Images: originals in `Season N/`, 480px thumbs in `thumbs/`, 1600px in `web/` (`make_thumbs.py`).
