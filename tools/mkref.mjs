import fs from 'fs'; import path from 'path';
const SRC='/mnt/user-data/uploads/simply-static-1-1792562417', OUT='/home/claude/refsite';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(['wp-content','wp-includes','_transfer'].includes(e.name)?[]:walk(path.join(d,e.name))):e.name==='index.html'?[path.join(d,e.name)]:[]);
let n=0;
for(const f of walk(SRC)){
  let h=fs.readFileSync(f,'utf8');
  h=h.replace(/<link[^>]+fonts\.googleapis\.com[^>]*>/g,m=>m.includes('stylesheet')?'<link rel="stylesheet" href="/fonts/fonts.css">':'')
     .replace(/<link[^>]+(fonts\.gstatic|preconnect)[^>]*>/g,'')
     .replace(/https?:\/\/pbmpl\.alphabetasolution\.co\.in/g,'').replace(/\\\/\\\/pbmpl\.alphabetasolution\.co\.in/g,'')
     .replace(/\/wp-content\/plugins\/akd-essentials\/widgets\/\/assets/g,'/wp-content/plugins/akd-essentials/widgets//assets');
  const rel=path.relative(SRC,f); const o=path.join(OUT,rel); fs.mkdirSync(path.dirname(o),{recursive:true}); fs.writeFileSync(o,h); n++;
}
console.log('ref pages',n);
