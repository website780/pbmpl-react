import { useEffect, useLayoutEffect, useState } from 'react';
import WhatsAppButton from './components/WhatsAppButton';

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

// The theme loads jQuery 1.8.3 over WP's jQuery 3; 1.8.3 objects are not iterable, which makes
// MetForm's array-destructuring of $scope.find() throw, which aborts Elementor's widget init
// (animated content stays hidden).
function patchJq() {
  const jq = window.jQuery;
  if (jq && jq.fn && !jq.fn[Symbol.iterator]) jq.fn[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

// Elementor's own scroll-reveal (waypoints) never initialises here (it is missing from the original
// export too), so animated blocks stay hidden. Reveal whatever is still invisible when it scrolls in.
function revealInvisible() {
  const els = [...document.querySelectorAll('.elementor-invisible')];
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        let s = {};
        try { s = JSON.parse(el.getAttribute('data-settings') || '{}'); } catch (e) { /* ignore */ }
        const anim = s._animation || s.animation;
        const delay = Number(s._animation_delay || s.animation_delay || 0);
        setTimeout(() => {
          el.classList.remove('elementor-invisible');
          if (anim && anim !== 'none') el.classList.add('animated', anim);
        }, delay);
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => io.observe(el));
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
        el.onload = el.onerror = () => { patchJq(); res(); };
        document.body.appendChild(el);
      } else {
        el.text = s.code;
        document.body.appendChild(el);
        patchJq();
        res();
      }
    });
  }
  window.dispatchEvent(new Event('load'));
  setTimeout(revealInvisible, 800);
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

  return ready ? (
    <>
      <Page />
      <WhatsAppButton />
    </>
  ) : null;
}
