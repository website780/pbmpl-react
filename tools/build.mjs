import {load,attr,cls,find,ROOT} from './serialize.mjs';
import {nodesToJsx,ctxNew} from './h2j.mjs';
import fs from 'fs'; import path from 'path'; import crypto from 'crypto';
const OUT='/home/claude/pbmpl-react';
const analysis=JSON.parse(fs.readFileSync('analysis.json','utf8'));
const rels=analysis.map(p=>p.rel).sort((a,b)=>a.length-b.length||a.localeCompare(b));
fs.mkdirSync(`${OUT}/src/pages`,{recursive:true}); fs.mkdirSync(`${OUT}/src/components`,{recursive:true}); fs.mkdirSync(`${OUT}/public/css-inline`,{recursive:true});
const text=n=>(n.childNodes||[]).map(c=>c.value||'').join('');
const md5=s=>crypto.createHash('md5').update(s).digest('hex').slice(0,10);
const clean=u=>u.replace(/^(https?:)?\/\/pbmpl\.alphabetasolution\.co\.in/,'').replace(/[?#].*$/,'');
const isGoogleFont=h=>/fonts\.googleapis\.com/.test(h);
const ACTIVE_RE=/^(current[-_].*|page_item|page-item-\d+)$/;
const slugOf=rel=>rel.replace(/\/$/,'').replace(/\//g,'__')||'home';
const compName=rel=>'Page_'+slugOf(rel).replace(/[^A-Za-z0-9]+/g,'_');
let headerJsx=null, footerJsx=null;
const routes=[]; const stats={files:0};
for(const rel of rels){
  const doc=load(rel);
  const html=find(doc,n=>n.nodeName==='html')[0], head=find(doc,n=>n.nodeName==='head')[0], body=find(doc,n=>n.nodeName==='body')[0];
  const info=analysis.find(p=>p.rel===rel);
  // ---- head
  const meta=[]; let title=''; const icons=[]; let canonical=null; const styles=[]; const scripts=[];
  const pushStyleLink=(c,where)=>{
    let href=attr(c,'href')||''; if(!href) return;
    if(isGoogleFont(href)) { if(!styles.some(s=>s.href==='/fonts/fonts.css')) styles.push({href:'/fonts/fonts.css',id:'pbmpl-google-fonts-local'}); return; }
    href=clean(href);
    if(/\/akd-essentials\/post-[0-9a-f]+\.css$/.test(href)) return;
    const e={href}; const id=attr(c,'id'); if(id) e.id=id; const m=attr(c,'media'); if(m&&m!=='all') e.media=m; styles.push(e);
  };
  for(const c of head.childNodes){
    if(c.nodeName==='title') title=text(c);
    else if(c.nodeName==='meta'){ const n=attr(c,'name'); if(n&&!['viewport','generator'].includes(n)) meta.push({name:n,content:clean0(attr(c,'content'))}); const pr=attr(c,'property'); if(pr) meta.push({property:pr,content:clean0(attr(c,'content'))}); }
    else if(c.nodeName==='link'){
      const r=attr(c,'rel');
      if(r==='stylesheet') pushStyleLink(c,'head');
      else if(r==='canonical') canonical=attr(c,'href');
      else if(r==='icon'||r==='apple-touch-icon') icons.push({rel:r,href:attr(c,'href'),sizes:attr(c,'sizes')});
    }
    else if(c.nodeName==='style'){ const css=text(c); const h=md5(css); fs.writeFileSync(`${OUT}/public/css-inline/${h}.css`,css); styles.push({href:`/css-inline/${h}.css`,id:attr(c,'id')||undefined}); }
    else if(c.nodeName==='script') addScript(c);
  }
  function clean0(v){ return v&&v.replace(/^(https?:)?\/\/pbmpl\.alphabetasolution\.co\.in/,''); }
  function addScript(c){
    const src=attr(c,'src'), type=attr(c,'type'), id=attr(c,'id');
    if(type==='speculationrules'||type==='application/json'||type==='module'||id==='wp-emoji-settings') return;
    if(src){ const s=clean(src); if(/wp-emoji-release|comment-reply/.test(s)) return; scripts.push({src:s}); }
    else { const code=text(c); if(code.trim()) scripts.push({code,id:id||undefined}); }
  }
  // ---- body
  const page=body.childNodes.find(n=>attr(n,'id')==='page');
  const header=find(body,n=>n.nodeName==='div'&&cls(n).includes('navbar-area')&&n.parentNode===page)[0];
  const footer=find(body,n=>n.nodeName==='footer'&&cls(n).includes('footer-area'))[0];
  // active menu state
  const active={}, aria={};
  find(header,n=>n.nodeName==='li'&&/^menu-item-\d+$/.test(attr(n,'id')||'')).forEach(li=>{
    const toks=cls(li); const act=toks.filter(t=>ACTIVE_RE.test(t));
    if(act.length){ active[attr(li,'id')]=act.join(' '); li.attrs.find(a=>a.name==='class').value=toks.filter(t=>!ACTIVE_RE.test(t)).join(' '); }
    const a=li.childNodes.find(c=>c.nodeName==='a'); if(a&&attr(a,'aria-current')){ aria[attr(li,'id')]=attr(a,'aria-current'); a.attrs=a.attrs.filter(x=>x.name!=='aria-current'); }
  });
  if(!headerJsx){
    const hc=ctxNew(); headerJsx=nodesToJsx([header],hc);
    headerJsx=headerJsx.replace(/<li id="(menu-item-\d+)" className="([^"]*)">/g,(m,id,c)=>`<li id="${id}" className={cx(${JSON.stringify(c)}, active[${JSON.stringify(id)}])}>`)
      .replace(/<li id="(menu-item-\d+)" className="([^"]*)"><a /g,(m)=>m);
    // aria-current on <a> inside active li: handled via regex pass
    headerJsx=headerJsx.replace(/(<li id="(menu-item-\d+)" className=\{cx\([^}]*\)\}>)<a /g,(m,li,id)=>`${li}<a {...(aria[${JSON.stringify(id)}]?{"aria-current":aria[${JSON.stringify(id)}]}:{})} `);
    const fc=ctxNew(); footerJsx=nodesToJsx([footer],fc);
  }
  const ctx=ctxNew();
  ctx.replace=new Map([[header,`<Header active={${JSON.stringify(active)}} aria={${JSON.stringify(aria)}} />`],[footer,'<Footer />']]);
  // collect body-level stylesheet links in order
  const kids=body.childNodes.filter(n=>n.nodeName!=='#comment'&&!(n.nodeName==='#text'&&!n.value.trim()));
  const bodyScripts=[];
  find(body,n=>n.nodeName==='link'&&attr(n,'rel')==='stylesheet').forEach(l=>pushStyleLink(l,'body'));
  find(body,n=>n.nodeName==='script').forEach(addScript);
  let jsx=nodesToJsx(kids,ctx);
  jsx=jsx.replace(/https:\/\/designingmedia\.com\/technofy\/wp-content\/uploads\//g,'/wp-content/uploads/').replace(/https:\/\/pbmpl\.alphabetasolution\.co\.in\/wp-comments-post\.php/g,'#');
  const name=compName(rel);
  const bodyAttrs=Object.fromEntries(body.attrs.map(a=>[a.name,a.value]));
  const htmlAttrs=Object.fromEntries(html.attrs.map(a=>[a.name,a.value]));
  const canon = canonical? clean0(canonical):null;
  const mod=`// Generated from WordPress page "${rel||'/'}" – content, classes and markup kept 1:1.
import Header from '../components/Header';
import Footer from '../components/Footer';
${ctx.usesInl?"import { inl } from '../lib/inl';\n":''}
export const page = ${JSON.stringify({path:'/'+rel,title,lang:htmlAttrs.lang||'en-US',bodyClass:bodyAttrs.class||'',canonical:canon,meta,icons,styles,scripts},null,1)};

export default function ${name}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
  fs.writeFileSync(`${OUT}/src/pages/${slugOf(rel)}.jsx`,mod); stats.files++;
  routes.push({path:'/'+rel,slug:slugOf(rel),name});
  if(ctx.stats.dropped) console.log('dropped attrs',rel,ctx.stats.dropped);
}
// components
fs.writeFileSync(`${OUT}/src/components/Header.jsx`,`// Site header (navigation, search popup, mobile toggle) – markup kept 1:1 from the WordPress theme.
import { cx } from '../lib/inl';

export default function Header({ active = {}, aria = {} }) {
  return (
    <>
      ${headerJsx}
    </>
  );
}
`);
fs.writeFileSync(`${OUT}/src/components/Footer.jsx`,`// Site footer – markup kept 1:1 from the WordPress theme.
export default function Footer() {
  return (
    <>
      ${footerJsx}
    </>
  );
}
`);
fs.writeFileSync(`${OUT}/src/routes.js`,`// Route table (generated). One lazy-loaded React page component per WordPress page.
import { lazy } from 'react';

export const routes = [
${routes.map(r=>`  { path: ${JSON.stringify(r.path)}, load: () => import('./pages/${r.slug}.jsx') },`).join('\n')}
];
`);
console.log('pages',stats.files);
