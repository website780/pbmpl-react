import {chromium} from 'playwright-core';
import http from 'http'; import fs from 'fs'; import path from 'path';
import pixelmatch from 'pixelmatch'; import {PNG} from 'pngjs';
import {routes} from '/home/claude/pbmpl-react/src/routes.js';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.json':'application/json','.webp':'image/webp','.gif':'image/gif','.ico':'image/x-icon','.ttf':'font/ttf'};
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(root,p);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){res.statusCode=404;return res.end('nf');}res.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);}).listen(0,()=>r(s));});
const A=await serve('/home/claude/pbmpl-react/dist'), B=await serve('/home/claude/refsite');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const [si,sn]=(process.argv[2]||'0/1').split('/').map(Number); const list=routes.filter((r,i)=>i%sn===si);
const sizes={desktop:{width:1440,height:900},mobile:{width:390,height:844}};
fs.mkdirSync('shots',{recursive:true});
async function shot(port,p,vp,name){
  const ctx=await b.newContext({viewport:vp}); const pg=await ctx.newPage();
  await pg.route(u=>!/localhost/.test(u.host),r=>r.abort());
  await pg.addStyleTag?.call;
  await pg.goto(`http://localhost:${port}${p}`,{waitUntil:'load'}).catch(()=>{});
  await pg.waitForTimeout(3500);
  await pg.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
  await pg.waitForTimeout(300);
  const png=await pg.screenshot({fullPage:true}); await ctx.close(); return png;
}
const out=[];
for(const r of list) for(const [k,vp] of Object.entries(sizes)){
  const [a,c]=[await shot(A.address().port,r.path,vp),await shot(B.address().port,r.path,vp)];
  const pa=PNG.sync.read(a), pc=PNG.sync.read(c);
  const w=Math.min(pa.width,pc.width), h=Math.min(pa.height,pc.height);
  const crop=(p)=>{const o=new PNG({width:w,height:h});PNG.bitblt(p,o,0,0,w,h,0,0);return o;};
  const d=new PNG({width:w,height:h}); const n=pixelmatch(crop(pa).data,crop(pc).data,d.data,w,h,{threshold:0.15});
  const res={path:r.path,vp:k,reactH:pa.height,refH:pc.height,diffPct:+(100*n/(w*h)).toFixed(2)};
  out.push(res); console.log(JSON.stringify(res));
  if(res.diffPct>1||pa.height!==pc.height){const t=r.path.replace(/\W+/g,'_');fs.writeFileSync(`shots/${t}_${k}_react.png`,a);fs.writeFileSync(`shots/${t}_${k}_ref.png`,c);fs.writeFileSync(`shots/${t}_${k}_diff.png`,PNG.sync.write(d));}
}
fs.writeFileSync(`cmp_result_${si}.json`,JSON.stringify(out,null,1));
await b.close();A.close();B.close();
