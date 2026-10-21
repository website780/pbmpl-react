# CLAUDE.md â€“ pbmpl React rebuild (handoff)

## Goal
Owner: Alpha Beta (Alphabet Beta Solution, Mumbai). Prefers brief, direct replies ("caveman mode").
Rebuild WordPress/Elementor site https://pbmpl.alphabetasolution.co.in/ (Pace Business Machines Pvt. Ltd., Technofy theme) as React, **100% identical** (content, images, colors, design, effects). WordPress will be deleted â†’ everything local, no link to the WP site. **Keep every `#` placeholder link exactly as is** (site in development; user adds real links later).

## Source
Simply Static export: `C:\Users\ADMIN\Desktop\simply-static-1-1792562417` (60 pages, `<slug>/index.html`, wp-content, wp-includes). Stale `_transfer/` folder inside it can be deleted.

## Status: DONE, verified\n- (Later: 26 WP demo pages deleted - blog posts, category/tag/studies archives, author, metform-form; 34 pages remain.)\n- 60 pages generated â†’ `src/pages/<slug>.jsx` (parse5 HTMLâ†’JSX, markup/classes 1:1). `src/routes.js` lists routes.
- `src/components/Header.jsx` (takes `active`/`aria` props for current-menu state), `Footer.jsx`.
- `src/PageShell.jsx`: sets body class/title/meta/icons/canonical, loads page CSS in original order (gates render until loaded), renders static React tree, then runs original WP/theme scripts sequentially in original order, then dispatches synthetic `load`. jQuery/Elementor/slick/owl/etc. do the effects, so React tree must stay static (no re-render, no StrictMode).
- `src/main.jsx`: picks route from `location.pathname`; no router lib; links are normal `<a>` (hard navigation). `NotFound.jsx` for unknown.
- `public/assets/`: `css/{theme,pages,plugins,elementor}`, `js/{theme,wp,plugins}`, `images/` (flat, deduped), `fonts/`, `vendor/{elementor,elementor-pro,metform}` (kept intact: Elementor lazy-loads chunks relative to `urls.assets`, config strings in pages point at `/assets/vendor/elementor/`). `css/pages/*.css` = original head `<style>` blocks. Vite `assetsDir` is `bundle` so it does not clash with `public/assets`. WordPress folders (wp-content/wp-includes) no longer exist.
- `scripts/postbuild.mjs`: copies `dist/index.html` into each route folder + `404.html` (static hosting).
- Verified with Playwright + pixelmatch vs. original export (fonts localised) at 1440 and 390 px: 56/60 pages <0.5% diff. Diffs left: `/pricing/`, `/services/` (my placeholder images vs broken originals), `/team/` ~1%.
- Original site's own console errors ("Invalid attempt to destructure non-iterable instance") exist in the original too â€“ ignore.

## Open items
1. Blog card images were hotlinked from `designingmedia.com/technofy/.../2023/01/article-{1,2,3}.jpg` (unreachable from sandbox). Currently **gray placeholders** at `public/assets/images/article-N.jpg`. Replace with real images (ask user).
2. Forms (MetForm, Contact Form 7, comment form) posted to WP `wp-json`/`wp-comments-post.php`. Comment form action set to `#`. Forms will not submit until a backend/form service is wired. Ask user which.
3. Page `<title>` is the staging text `pbmpl.alphabetasolution.co.in` as in original â€“ change in each page's `export const page = {...}` when user wants.
4. DONE: `public/wp-content` + `public/wp-includes` pruned to files referenced by pages (src/, css-inline, CSS `url()` closure) plus Elementor lazy chunks. Verified by crawling all 60 pages against a 404-logging server. If a new page/feature 404s on a plugin file, restore it from git history.
5. Google Maps iframe and social links (facebook, x, instagram, linkedin, youtube) stay external by nature.
6. Slider autoplay and mobile menu toggle not explicitly tested in React build (pixel parity suggests fine) â€“ check manually.

## Commands
`npm install` Â· `npm run dev` Â· `npm run build` (vite build + postbuild) Â· `npm run preview`

## Regenerating pages
Pages were generated (not hand-written) by Node scripts using parse5 (`build.mjs`, `h2j.mjs`, `serialize.mjs`, `analyze.mjs`, `mkref.mjs`, in the zip `pbmpl-tools.zip` if provided). Hand edits to `src/pages/*.jsx` are fine; re-running the generator overwrites them.

## Gotchas learned
- Preserve `&nbsp;` text nodes (empty `<p>&nbsp;</p>` has height); JS `.trim()` strips nbsp â€“ use HTML-whitespace regex only.
- Some CSS href has `widgets//assets` (double slash); PageShell normalises with `fix()`.
- Footer sits nested in `#content` on 17 pages, sibling on 43 â€“ handled per page.
- Menu current-item classes (`current-menu-item`, etc.) are computed per page into `active` prop.

