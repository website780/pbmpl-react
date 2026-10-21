import { useEffect, useLayoutEffect, useState } from 'react';

const fix = (u) => u.replace(/\/{2,}/g, '/');

function applyHead(page) {
  document.documentElement.lang = page.lang;
  document.title = page.title;
  document.body.className = page.bodyClass;
  const add = (tag, attrs) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => v != null && el.setAttribute(k, v));
    document.head.appendChild(el);
    return el;
  };
  page.meta.forEach((m) => add('meta', m));
  page.icons.forEach((i) => add('link', i));
  if (page.canonical) add('link', { rel: 'canonical', href: page.canonical });
}

// Loads all stylesheets in their original order; resolves once all settled.
function loadStyles(styles) {
  return Promise.all(
    styles.map(
      (s) =>
        new Promise((res) => {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = fix(s.href);
          if (s.id) l.id = s.id;
          if (s.media) l.media = s.media;
          l.onload = l.onerror = () => res();
          document.head.appendChild(l);
        })
    )
  );
}

// Runs the original scripts sequentially, in the original order.
async function runScripts(scripts) {
  for (const s of scripts) {
    await new Promise((res) => {
      const el = document.createElement('script');
      el.async = false;
      if (s.id) el.id = s.id;
      if (s.src) {
        el.src = fix(s.src);
        el.onload = el.onerror = () => res();
        document.body.appendChild(el);
      } else {
        el.text = s.code;
        document.body.appendChild(el);
        res();
      }
    });
  }
  window.dispatchEvent(new Event('load'));
}

export default function PageShell({ mod }) {
  const { page, default: Page } = mod;
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    applyHead(page);
    let alive = true;
    loadStyles(page.styles).then(() => alive && setReady(true));
    return () => { alive = false; };
  }, [page]);

  useEffect(() => {
    if (ready) runScripts(page.scripts);
  }, [ready, page]);

  return ready ? <Page /> : null;
}
