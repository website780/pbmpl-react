import { brochures, flyers } from '../data/brochures';
import { contact } from '../data/managedServices';

function Card({ item, type }) {
  return (
    <div className="bro-card">
      <span className="svc-icon" aria-hidden="true">
        <i className="fa-solid fa-file-pdf" />
      </span>
      <span className="bro-type">{type}</span>
      <h3 className="bro-title">{item.title}</h3>
      <a className="svc-btn" href={item.href} target="_blank" rel="noopener noreferrer">
        Download PDF <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function BrochureBody() {
  return (
    <div className="svc">
      <section className="svc-sec">
        <div className="svc-wrap">
          <div className="svc-head">
            <h6 className="svc-kicker">Service brochures</h6>
            <h2 className="svc-h2">Brochures</h2>
          </div>
          <div className="bro-grid">
            {brochures.map((b) => (
              <Card key={b.href} item={b} type="Brochure" />
            ))}
          </div>
        </div>
      </section>

      <section className="svc-sec svc-alt">
        <div className="svc-wrap">
          <div className="svc-head">
            <h6 className="svc-kicker">Solution flyers</h6>
            <h2 className="svc-h2">Flyers</h2>
          </div>
          <div className="bro-grid">
            {flyers.map((f) => (
              <Card key={f.href} item={f} type="Flyer" />
            ))}
          </div>
        </div>
      </section>

      <section className="svc-sec svc-cta">
        <div className="svc-wrap svc-narrow svc-center">
          <h2 className="svc-h2">Need something specific?</h2>
          <p className="svc-text">
            Tell us what you are looking for. Call <a href={contact.phones[0].href}>{contact.phones[0].label}</a> or{' '}
            <a href={contact.phones[1].href}>{contact.phones[1].label}</a>, or visit{' '}
            <a href={contact.site.href} target="_blank" rel="noreferrer">{contact.site.label}</a>.
          </p>
          <a className="svc-btn svc-btn-light" href="/contact/">
            Request a consultation <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
