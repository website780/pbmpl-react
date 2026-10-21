import { useCallback, useEffect, useState } from 'react';

// Click a certificate card (.image-flip-container) to read it full size.
// Cards with a second page (front/back) get previous/next arrows.
export default function CertLightbox() {
  const [lb, setLb] = useState(null); // { srcs, i, alt, caption }

  const close = useCallback(() => setLb(null), []);
  const step = useCallback((d) => setLb((s) => (s ? { ...s, i: (s.i + d + s.srcs.length) % s.srcs.length } : s)), []);

  useEffect(() => {
    const onClick = (e) => {
      const card = e.target.closest && e.target.closest('.image-flip-container, .pbmpl-flip-container, .pbmpl-2-flip-container');
      if (!card) return;
      const imgs = [...card.querySelectorAll('img')];
      const srcs = [...new Set(imgs.map((im) => im.getAttribute('src')))];
      const col = card.closest('.e-con') || card.closest('.elementor-widget-wrap');
      const h2 = col && col.querySelector('h2');
      setLb({ srcs, i: 0, alt: (imgs[0] && imgs[0].alt) || 'Certificate', caption: h2 ? h2.textContent.trim() : '' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!lb) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lb, close, step]);

  if (!lb) return null;
  const many = lb.srcs.length > 1;
  return (
    <div className="cert-lb" role="dialog" aria-modal="true" aria-label={lb.caption || 'Certificate'} onClick={close}>
      <button type="button" className="cert-lb__close" aria-label="Close" onClick={close}>&times;</button>
      {many && (
        <button type="button" className="cert-lb__nav cert-lb__prev" aria-label="Previous page" onClick={(e) => { e.stopPropagation(); step(-1); }}>&#10094;</button>
      )}
      <figure className="cert-lb__fig" onClick={(e) => e.stopPropagation()}>
        <img src={lb.srcs[lb.i]} alt={lb.alt} />
        {(lb.caption || many) && (
          <figcaption>
            {lb.caption}
            {many ? ' (' + (lb.i + 1) + '/' + lb.srcs.length + ')' : ''}
          </figcaption>
        )}
      </figure>
      {many && (
        <button type="button" className="cert-lb__nav cert-lb__next" aria-label="Next page" onClick={(e) => { e.stopPropagation(); step(1); }}>&#10095;</button>
      )}
    </div>
  );
}
