// Copies dist/index.html into every route folder so any static host serves each page URL directly.
import fs from 'fs';
import path from 'path';
import { routes } from '../src/routes.js';
const dist = path.resolve('dist');
const html = fs.readFileSync(path.join(dist, 'index.html'));
for (const r of routes) {
  const dir = path.join(dist, r.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('route folders:', routes.length);
