# Pace Business Machines – React site

1:1 React port of the WordPress/Elementor site (Technofy theme).

- `npm install && npm run dev` – develop
- `npm run build` – outputs `dist/` (one folder per page, deploy on any static host)
- `src/pages/*.jsx` – one component per page (markup identical to original, `#` links kept as-is)
- `src/components/Header.jsx`, `Footer.jsx` – shared header/footer
- `public/wp-content`, `public/wp-includes` – original CSS/JS/images (served locally, no WordPress needed)
- `scripts/` – none needed at runtime; `src/PageShell.jsx` loads page CSS then runs the original scripts in order.

Notes: contact/MetForm/CF7 forms need a backend endpoint (they posted to WordPress). Blog slider images
`public/wp-content/uploads/2023/01/article-{1,2,3}.jpg` are placeholders – replace with the real images.
