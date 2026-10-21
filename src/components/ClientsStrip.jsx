import ClientLogoGrid from './ClientLogoGrid';
import { topClients } from '../data/topClients';

// Home page "Our Clients" logo strip: top clients only, with a link to the full list.
export default function ClientsStrip() {
  return (
    <div className="clients-strip">
      <ClientLogoGrid logos={topClients} />
      <div className="clients-strip__cta">
        <a className="clients-strip__btn" href="/clients/">
          View all clients <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
