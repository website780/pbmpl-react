import { topClients } from '../data/topClients';

// Home page "Our Clients" logo strip: top clients only, with a link to the full list.
export default function ClientsStrip() {
  return (
    <div className="clients-strip">
      <ul className="clients-strip__grid">
        {topClients.map((c) => (
          <li key={c.name} className="clients-strip__card">
            <img src={c.src} alt={c.name} title={c.name} loading="lazy" width="150" height="150" />
          </li>
        ))}
      </ul>
      <div className="clients-strip__cta">
        <a className="clients-strip__btn" href="/clients/">
          View all clients <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
