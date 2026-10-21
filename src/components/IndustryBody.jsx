import { contact } from '../data/managedServices';

const kick = (t) => <h6 className="svc-kicker">{t}</h6>;

function Icon({ name = 'fa-circle-check' }) {
  return (
    <span className="svc-icon" aria-hidden="true">
      <i className={'fa-solid ' + name} />
    </span>
  );
}

const Lead = ({ it }) => (
  <>
    <strong>{it[0]}</strong> {it[1]}
  </>
);

export default function IndustryBody({ d }) {
  return (
    <div className="svc">
      {/* 1. Hero */}
      <section className="svc-sec">
        <div className="svc-wrap svc-narrow svc-center">
          {kick(d.name)}
          <h2 className="svc-h2">{d.hero.headline}</h2>
          <p className="svc-lead">{d.hero.sub}</p>
          {d.hero.button && (
            <a className="svc-btn" href="/contact/">
              {d.hero.button} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      {/* 2. Industry challenges */}
      <section className="svc-sec svc-alt">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('What the industry faces')}
            <h2 className="svc-h2">Industry challenges</h2>
          </div>
          <div className="svc-grid">
            {d.challenges.map((it, i) => (
              <div className="svc-card" key={i}>
                <Icon name="fa-triangle-exclamation" />
                <p><Lead it={it} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PACE solutions */}
      <section className="svc-sec svc-dark">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('How we help')}
            <h2 className="svc-h2">PACE solutions</h2>
          </div>
          <div className={'svc-grid' + (d.solutions.length === 4 ? '' : ' svc-grid-3')}>
            {d.solutions.map((it, i) => (
              <div className="svc-card svc-card-dark" key={i}>
                <Icon />
                <p><Lead it={it} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Relevant technologies */}
      <section className="svc-sec">
        <div className="svc-wrap svc-center">
          <div className="svc-head">
            {kick('Under the hood')}
            <h2 className="svc-h2">Relevant technologies</h2>
          </div>
          <ul className="svc-chips">
            {d.tech.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Services */}
      <section className="svc-sec svc-alt">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('What we offer')}
            <h2 className="svc-h2">Services</h2>
          </div>
          <ul className="svc-list">
            {d.services.map((t, i) => (
              <li key={i}>
                <Icon name="fa-check" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Call to action */}
      <section className="svc-sec svc-cta">
        <div className="svc-wrap svc-narrow svc-center">
          <h2 className="svc-h2">{d.cta.headline}</h2>
          <p className="svc-text">
            {d.cta.text} Call <a href={contact.phones[0].href}>{contact.phones[0].label}</a> or{' '}
            <a href={contact.phones[1].href}>{contact.phones[1].label}</a>,{' '}
            {d.cta.contact === 'write' ? 'or write to us through' : 'or visit'}{' '}
            <a href={contact.site.href} target="_blank" rel="noreferrer">{contact.site.label}</a>.
          </p>
          <a className="svc-btn svc-btn-light" href="/contact/">
            {d.cta.button} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
