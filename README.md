# ORR GAMZ

Static browser game site. The repository root is the deployable website root: `index.html`, `css/`, and `js/` must be copied directly into Hostinger's `public_html` directory.

## Hostinger Git deployment

Configure Hostinger Git deployment with:

- Repository: `https://github.com/cameronorr2011-beep/game-website.git`
- Branch: `main`
- Deployment directory: `public_html`
- Build command: none (this is a static site)
- Publish/copy source: repository root (`.`), not `game-website/` and not a build directory

Every push to `main` should deploy the repository contents so that `public_html/index.html` exists at the document root. Do not configure a nested destination such as `public_html/game-website`.

The site uses root-relative asset paths (`/css/style.css` and `/js/game.js`) so it works when served from the production domain root.

## Local smoke test

```bash
node smoke-test.mjs
```
