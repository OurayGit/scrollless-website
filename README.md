# Scrollless

The official website for [scrollless.ch](https://scrollless.ch) — a free screen time app for
iPhone and Android that locks your chosen apps after a timer you set yourself.

## Structure

Static HTML/CSS/JS, no build step. Deployed via GitHub Pages on the custom domain in `CNAME`.

| Path | Page |
| --- | --- |
| `index.html` | Home. Self-contained: its own inline `<style>` and `<script>`, does **not** load `style.css` or `script.js` |
| `how-it-works/` | Step-by-step walkthrough |
| `blog/stop-doomscrolling/` | Blog post |
| `troubleshoot/` + `troubleshoot/xiaomi.html` | Help pages |
| `privacy/`, `terms/` | Policy pages |
| `style.css`, `script.js` | Shared by every page **except** the home page |

### Two themes in one stylesheet

`style.css` still contains the original dark theme. The current light look is layered on top
via `body.lite` overrides (see the "Swiss light theme" and `body.lite .nav` blocks). Every page
except home sets `<body class="lite">`.

Because of this, when changing colours: **inline `style="color: ..."` attributes beat the
`body.lite` overrides**, so a leftover dark-theme inline colour can end up invisible on a light
background. Check contrast after touching the theme.

The home page is intentionally separate — edit its inline `<style>`/`<script>`, not the shared
files. Behaviour it shares with the other pages (hamburger, FAQ, reveal, store routing) is
duplicated there and marked with `mirrors live script.js` comments; changes need applying in
both places.

## Local development

Open `index.html` directly, or serve the folder so root-relative paths and extensionless URLs
behave like production:

```bash
python -m http.server 8000
```

## SEO

`sitemap.xml`, `robots.txt` (explicitly allows AI/LLM crawlers) and `llms.txt` are maintained
by hand — update the `sitemap.xml` `lastmod` dates when page content changes. Footer years come
from the `.current-year` spans, filled in by JS.

## License

© Scrollless. All rights reserved.
