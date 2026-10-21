import './fixes.css';
import { createRoot } from 'react-dom/client';
import { routes } from './routes';
import PageShell from './PageShell';
import NotFound from './NotFound';

const norm = (p) => (p.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '') + '/';
const here = norm(decodeURIComponent(window.location.pathname));
const route = routes.find((r) => norm(r.path) === here);

async function boot() {
  const mod = route ? await route.load() : null;
  createRoot(document.getElementById('root')).render(
    mod ? <PageShell mod={mod} /> : <NotFound />
  );
}
boot();
