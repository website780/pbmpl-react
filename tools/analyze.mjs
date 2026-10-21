import {parse} from '/home/claude/pbmpl-react/node_modules/parse5/dist/index.js';
import fs from 'fs'; import path from 'path'; import crypto from 'crypto';
const ROOT='/mnt/user-data/uploads/simply-static-1-1792562417';
function walk(d,o=[]){for(const f of fs.readdirSync(d)){const p=path.join(d,f); if(f==='_transfer'||f==='wp-content'||f==='wp-includes')continue; const s=fs.statSync(p); if(s.isDirectory())walk(p,o); else if(f==='index.html')o.push(p);} return o}
const files=walk(ROOT);
const attr=(n,k)=>{const a=(n.attrs||[]).find(x=>x.name===k);return a?a.value:undefined};
const text=n=>(n.childNodes||[]).map(c=>c.value||'').join('');
const stat={onattr:new Set(),tags:{},scriptsHead:{},linkRel:{},mediaAttrs:new Set(),inlineScriptKinds:{}};
const pages=[];
for(const f of files){
  const rel=path.relative(ROOT,f).replace(/\\/g,'/').replace(/index\.html$/,'');
  const doc=parse(fs.readFileSync(f,'utf8'));
  const html=doc.childNodes.find(c=>c.nodeName==='html');
  const head=html.childNodes.find(c=>c.nodeName==='head'), body=html.childNodes.find(c=>c.nodeName==='body');
  const info={rel,htmlAttrs:html.attrs.map(a=>[a.name,a.value]),bodyClass:attr(body,'class'),links:[],styles:[],scripts:[]};
  const visit=(n,where)=>{
    for(const c of n.childNodes||[]){
      if(c.nodeName==='link'){const rel2=attr(c,'rel');stat.linkRel[rel2]=(stat.linkRel[rel2]||0)+1; if(attr(c,'media')&&attr(c,'media')!=='all')stat.mediaAttrs.add(attr(c,'media')); if(rel2==='stylesheet')info.links.push({where,href:attr(c,'href'),id:attr(c,'id'),media:attr(c,'media')});}
      if(c.nodeName==='style')info.styles.push({where,id:attr(c,'id'),len:text(c).length});
      if(c.nodeName==='script'){info.scripts.push({where,src:attr(c,'src'),id:attr(c,'id'),type:attr(c,'type'),len:text(c).length,async:attr(c,'async')!==undefined,defer:attr(c,'defer')!==undefined});}
      for(const a of c.attrs||[]) if(/^on/.test(a.name)) stat.onattr.add(c.nodeName+':'+a.name+'='+a.value.slice(0,60));
      if(c.nodeName!=='script') visit(c,where);
    }
  };
  visit(head,'head'); visit(body,'body');
  pages.push(info);
}
fs.writeFileSync('analysis.json',JSON.stringify(pages,null,1));
console.log(pages.length,'pages');
console.log('on* attrs',[...stat.onattr].slice(0,30));
console.log('rels',stat.linkRel,'media',[...stat.mediaAttrs]);
// uniformity of script lists
const sig=p=>p.scripts.filter(s=>s.src).map(s=>s.src.split('?')[0]).join('|');
const sigs={};pages.forEach(p=>{(sigs[sig(p)]??=[]).push(p.rel)});
console.log('distinct external script lists',Object.keys(sigs).length,Object.values(sigs).map(v=>v.length));
const home=pages.find(p=>p.rel==='');
console.log('home script order:');home.scripts.forEach(s=>console.log(' ',s.where,s.src?s.src.split('?')[0].replace('/wp-content/','').replace('/wp-includes/','').slice(0,80):('inline '+s.len+(s.id?' #'+s.id:'')+(s.type?' ['+s.type+']':'')),s.async?'async':'',s.defer?'defer':''));
