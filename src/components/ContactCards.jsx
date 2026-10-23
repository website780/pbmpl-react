// Contact page: the four info cards (offices, email, phone) beside the message form.
const ICONS = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 9h2M14 9h2M8 13h2M14 13h2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
};

const CARDS = [
  { icon: 'pin', title: 'Head Office', text: 'Unit # 401, Dosti Pinnacle, Road # 22, Wagle Industrial Estate, Thane (W) – 400604, Maharashtra. Above New E-Passport Office.' },
  { icon: 'building', title: 'Registered Office', text: 'G-11/S-14, Camps Corner Apt, Gr.Flr, Nr.Shahad Rly.Stn, Shahad(W)-421103. Dist :- Thane, State :- Maharashtra.' },
  { icon: 'mail', title: 'Email', text: 'info@pbmpl.com', href: 'mailto:info@pbmpl.com' },
  { icon: 'phone', title: 'Phone', text: '+91 22-20811955', href: 'tel:+912220811955' },
];

export default function ContactCards() {
  return (
    <ul className="cc">
      {CARDS.map((c) => (
        <li className="cc__card" key={c.title}>
          <span className="cc__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[c.icon]}
            </svg>
          </span>
          <div className="cc__body">
            <h4 className="cc__title">{c.title}</h4>
            {c.href ? (
              <a className="cc__text cc__link" href={c.href}>{c.text}</a>
            ) : (
              <p className="cc__text">{c.text}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
