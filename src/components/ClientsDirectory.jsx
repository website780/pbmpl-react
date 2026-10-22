import { useEffect, useMemo, useState } from 'react';
import { clients, GROUP_ORDER, GOV_SUBGROUPS } from '../data/clientGroups';

const slug = (s) => s.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const count = (n) => n + (n === 1 ? ' organisation' : ' organisations');

function Logos({ items }) {
  return (
    <ul className="clients-strip__grid">
      {items.map((c, i) => (
        <li key={c.src + i} className="clients-strip__card" title={c.name === 'Client' ? undefined : c.name}>
          <img src={c.src} alt={c.name === 'Client' ? 'Client logo' : c.name + ' logo'} loading="lazy" width="150" height="150" />
        </li>
      ))}
    </ul>
  );
}

// /clients/ : every client logo, filterable by industry.
export default function ClientsDirectory() {
  const groups = useMemo(
    () => GROUP_ORDER.map((g) => ({ name: g, key: slug(g), items: clients.filter((c) => c.group === g) })).filter((g) => g.items.length),
    []
  );
  const industries = groups.filter((g) => g.name !== 'More clients').length;

  const fromHash = () => {
    const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return groups.some((g) => g.key === h) ? h : 'all';
  };
  const [current, setCurrent] = useState(fromHash);

  useEffect(() => {
    const onHash = () => setCurrent(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (key) => {
    setCurrent(key);
    try { window.history.replaceState(null, '', key === 'all' ? window.location.pathname : '#' + key); } catch (e) { /* ignore */ }
    const bar = document.getElementById('clients-filter');
    if (bar) window.scrollTo({ top: Math.max(0, bar.getBoundingClientRect().top + window.scrollY - 100), behavior: 'smooth' });
  };

  const shown = current === 'all' ? groups : groups.filter((g) => g.key === current);

  return (
    <div className="cd">
      <p className="cd-stats">
        <strong>{clients.length}</strong> organisations across <strong>{industries}</strong> industries
      </p>

      <div id="clients-filter" className="cd-filter" role="group" aria-label="Filter clients by industry">
        <button type="button" className="cd-chip" aria-pressed={current === 'all'} onClick={() => choose('all')}>
          All <span>{clients.length}</span>
        </button>
        {groups.map((g) => (
          <button key={g.key} type="button" className="cd-chip" aria-pressed={current === g.key} onClick={() => choose(g.key)}>
            {g.name} <span>{g.items.length}</span>
          </button>
        ))}
      </div>

      {shown.map((g) => (
        <section className="cd-group" id={g.key} key={g.key}>
          <header className="cd-head">
            <h2>{g.name}</h2>
            <span className="cd-count">{count(g.items.length)}</span>
          </header>
          {g.name === 'Government & PSU' ? (
            GOV_SUBGROUPS.map((sg) => {
              const items = g.items.filter((c) => c.sub === sg);
              if (!items.length) return null;
              return (
                <div className="cd-sub" key={sg}>
                  <h3>
                    {sg} <span>{items.length}</span>
                  </h3>
                  <Logos items={items} />
                </div>
              );
            })
          ) : (
            <Logos items={g.items} />
          )}
        </section>
      ))}
    </div>
  );
}
