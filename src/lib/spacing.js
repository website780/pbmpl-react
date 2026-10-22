// Gives every content band the same space above and below its content, whatever the original
// Elementor padding / inner margins were. Measures the real content edges and tops the section's own
// padding up or down to the target.
const SECTIONS = '#content .elementor > section, #content .elementor > .elementor-element, #content [data-elementor-type] > .elementor-element, #content .svc-sec, #content .ins-sec';
const SKIP = '.elementor-element-f0abbf6, .elementor-element-04c74cf, .elementor-element-54d24255, footer, .footer-area';
const LEAF = 'h1,h2,h3,h4,h5,h6,p,li,img,svg,a,button,input,textarea,select,iframe,figure,blockquote,.elementor-icon,.elementor-button';

function target() {
  const w = window.innerWidth;
  return w >= 1025 ? 80 : w >= 768 ? 64 : 48;
}

function inFlow(el, sec) {
  for (let p = el; p && p !== sec; p = p.parentElement) {
    const cs = getComputedStyle(p);
    if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') return false;
  }
  return true;
}

// a card / panel: something with its own visible background, border or shadow
function hasBox(el) {
  const cs = getComputedStyle(el);
  const bg = cs.backgroundColor.match(/[\d.]+/g) || [];
  const alpha = bg.length > 3 ? parseFloat(bg[3]) : bg.length ? 1 : 0;
  return alpha > 0.03 || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0 || cs.boxShadow !== 'none';
}

function fit(sec, t) {
  sec.style.removeProperty('padding-top');
  sec.style.removeProperty('padding-bottom');
  sec.style.removeProperty('margin-bottom');
  sec.style.removeProperty('margin-top');
  const sb = sec.getBoundingClientRect();
  if (sb.height < 40) return;
  let top = Infinity;
  let bot = -Infinity;
  sec.querySelectorAll('*').forEach((el) => {
    const b = el.getBoundingClientRect();
    if (b.width < 8 || b.height < 8) return;
    if (!el.matches(LEAF) && !(b.width < sb.width * 0.98 && hasBox(el))) return;
    if (!inFlow(el, sec)) return;
    top = Math.min(top, b.top);
    bot = Math.max(bot, b.bottom);
  });
  if (top === Infinity) return;
  const cs = getComputedStyle(sec);
  const pt = parseFloat(cs.paddingTop) || 0;
  const pb = parseFloat(cs.paddingBottom) || 0;
  const gapTop = top - sb.top;
  const gapBot = sb.bottom - bot;
  // gaps this large mean the content could not be measured (sticky/absolute layouts): leave the section alone
  if (gapTop > 400 || gapBot > 400) return;
  const nt = Math.round(pt + t - gapTop);
  const nb = Math.round(pb + t - gapBot);
  sec.style.setProperty('padding-top', Math.max(0, nt) + 'px', 'important');
  sec.style.setProperty('padding-bottom', Math.max(0, nb) + 'px', 'important');
  // more empty space than the padding can remove (inner margins): pull the next section up
  if (nb < 0 && nb > -300) sec.style.setProperty('margin-bottom', nb + 'px', 'important');
  if (nt < 0 && nt > -300) sec.style.setProperty('margin-top', nt + 'px', 'important');
}

export function normaliseSpacing() {
  const t = target();
  document.querySelectorAll(SECTIONS).forEach((sec) => {
    if (sec.matches(SKIP) || sec.closest(SKIP)) return;
    if (sec.parentElement && sec.parentElement.closest('.elementor-element, .svc-sec, .ins-sec')) return;
    fit(sec, t);
  });
}

export function watchSpacing() {
  let timer;
  const run = () => { clearTimeout(timer); timer = setTimeout(normaliseSpacing, 250); };
  setTimeout(normaliseSpacing, 2600);
  window.addEventListener('resize', run);
  window.addEventListener('orientationchange', run);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(normaliseSpacing, 400));
}
