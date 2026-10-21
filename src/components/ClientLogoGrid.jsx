// Logo cards used on the home page (top clients) and the /clients/ page (all clients).
// Plain images: no links, no lightbox.
export default function ClientLogoGrid({ logos }) {
  return (
    <ul className="clients-strip__grid">
      {logos.map((c, i) => (
        <li key={c.src + i} className="clients-strip__card">
          <img src={c.src} alt={c.name} loading="lazy" width="150" height="150" />
        </li>
      ))}
    </ul>
  );
}
