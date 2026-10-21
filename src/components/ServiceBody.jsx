import { contact } from '../data/managedServices';

const kick = (t) => <h6 className="svc-kicker">{t}</h6>;

function Check({ icon = 'fa-circle-check' }) {
  return (
    <span className="svc-icon" aria-hidden="true">
      <i className={'fa-solid ' + icon} />
    </span>
  );
}

function Item({ it }) {
  return Array.isArray(it) ? (
    <>
      <strong>{it[0]}</strong> {it[1]}
    </>
  ) : (
    it
  );
}

export function ServiceBanner({ bg, name, sub, slug }) {
  return (
    <div className="page-title-area overlay-bg style-1" style={{ backgroundImage: 'url(' + bg + ')' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 text-left">
            <h3 className="title">{name}</h3>
            {sub ? <p>{sub}</p> : null}
          </div>
          <div className="col-sm-12 text-left">
            <ul className="breadcrumb">
              <li className="breadcrumb-list">
                <a href="/" title="Home">Home</a>
              </li>
              <li className="breadcrumb-list">
                <a href={'/' + slug + '/'}>{name}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceBody({ d, image }) {
  return (
    <div className="svc">
      {/* 1. Hero */}
      <section className="svc-sec svc-hero">
        <div className="svc-wrap svc-two">
          <div>
            {kick(d.name)}
            <h2 className="svc-h2">{d.hero.headline}</h2>
            <p className="svc-lead">{d.hero.sub}</p>
            <a className="svc-btn" href="/contact/">
              {d.hero.button} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
          </div>
          {image && (
            <div className="svc-photo">
              <img src={image} alt={d.name} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* 2. What it is */}
      <section className="svc-sec svc-alt">
        <div className="svc-wrap svc-narrow">
          {kick('What it is')}
          <h2 className="svc-h2">{d.name}</h2>
          {d.what.map((p, i) => (
            <p className="svc-text" key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* 3. Problems it solves */}
      <section className="svc-sec">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('Why it matters')}
            <h2 className="svc-h2">Problems it solves</h2>
          </div>
          <div className="svc-grid">
            {d.problems.map((t, i) => (
              <div className="svc-card" key={i}>
                <Check icon="fa-triangle-exclamation" />
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What PACE delivers */}
      <section className="svc-sec svc-dark">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('What you get')}
            <h2 className="svc-h2">What PACE delivers</h2>
          </div>
          <div className="svc-grid svc-grid-3">
            {d.delivers.map((t, i) => (
              <div className="svc-card svc-card-dark" key={i}>
                <Check />
                <p><Item it={t} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="svc-sec">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('Our process')}
            <h2 className="svc-h2">How it works</h2>
          </div>
          <ol className="svc-steps">
            {d.steps.map((t, i) => (
              <li key={i}>
                <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Tools and technologies */}
      <section className="svc-sec svc-alt">
        <div className="svc-wrap svc-center">
          <div className="svc-head">
            {kick('Under the hood')}
            <h2 className="svc-h2">Tools and technologies</h2>
          </div>
          <ul className="svc-chips">
            {d.tools.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Benefits */}
      <section className="svc-sec">
        <div className="svc-wrap">
          <div className="svc-head">
            {kick('The outcome')}
            <h2 className="svc-h2">Benefits</h2>
          </div>
          <ul className="svc-list">
            {d.benefits.map((t, i) => (
              <li key={i}>
                <Check icon="fa-check" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Who it suits */}
      <section className="svc-sec svc-suits">
        <div className="svc-wrap svc-narrow svc-center">
          {kick('Who it suits')}
          <h2 className="svc-h2">Who it suits</h2>
          <p className="svc-text">{d.suits}</p>
        </div>
      </section>

      {/* 9. Call to action */}
      <section className="svc-sec svc-cta">
        <div className="svc-wrap svc-narrow svc-center">
          <h2 className="svc-h2">{d.cta.headline}</h2>
          <p className="svc-text">
            {d.cta.text} Call{' '}
            <a href={contact.phones[0].href}>{contact.phones[0].label}</a> or{' '}
            <a href={contact.phones[1].href}>{contact.phones[1].label}</a>, or visit{' '}
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
