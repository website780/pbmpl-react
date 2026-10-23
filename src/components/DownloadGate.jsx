import { useEffect, useRef, useState } from 'react';
import { sendEnquiry } from '../lib/sendEnquiry';

// Pop-up asked before a brochure / flyer opens: name, email and phone are emailed to the team,
// then the PDF opens in a new tab.
export default function DownloadGate({ item, type, onClose }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', _honey: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });
  const first = useRef(null);

  useEffect(() => {
    first.current && first.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (values._honey) return;
    // open the tab now, inside the click, so the browser does not treat it as a pop-up
    const tab = window.open('', '_blank');
    setStatus({ state: 'sending', text: '' });
    const { _honey, ...data } = values;
    try {
      await sendEnquiry({ ...data, brochure: item.title, type, link: item.href }, type + ' download: ' + item.title + ' – ' + data.name);
      if (tab) { tab.opener = null; tab.location.href = item.href; } else { window.location.href = item.href; }
      onClose();
    } catch (err) {
      if (tab) tab.close();
      setStatus({ state: 'error', text: 'We could not send your details just now.' });
    }
  }

  return (
    <div className="dg" role="dialog" aria-modal="true" aria-labelledby="dg-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dg__panel">
        <button type="button" className="dg__close" aria-label="Close" onClick={onClose}>
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <span className="dg__icon" aria-hidden="true"><i className="fa-solid fa-file-pdf" /></span>
        <h3 className="dg__title" id="dg-title">{item.title}</h3>
        <p className="dg__sub">Tell us who you are and the {type.toLowerCase()} opens straight away.</p>
        <form className="dg__form" onSubmit={submit}>
          <input ref={first} name="name" type="text" placeholder="Your name *" aria-label="Your name" autoComplete="name" required value={values.name} onChange={set} />
          <input name="email" type="email" placeholder="Email *" aria-label="Email" autoComplete="email" required value={values.email} onChange={set} />
          <input name="phone" type="tel" placeholder="Phone (+91) *" aria-label="Phone" autoComplete="tel" required minLength="7" value={values.phone} onChange={set} />
          <input className="dg__trap" name="_honey" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" value={values._honey} onChange={set} />
          <button type="submit" className="dg__btn" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Please wait…' : 'Get the PDF'} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
          {status.state === 'error' ? (
            <p className="dg__err" role="alert">
              {status.text} <a href={item.href} target="_blank" rel="noopener noreferrer">Open the PDF anyway</a>
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
