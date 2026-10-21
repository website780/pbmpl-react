import {parse} from '/home/claude/pbmpl-react/node_modules/parse5/dist/index.js';
import fs from 'fs';
export const ROOT='/mnt/user-data/uploads/simply-static-1-1792562417';
export function load(rel){ return parse(fs.readFileSync(`${ROOT}/${rel}index.html`,'utf8')); }
export const attr=(n,k)=>{const a=(n.attrs||[]).find(x=>x.name===k);return a?a.value:undefined};
export const cls=n=>(attr(n,'class')||'').split(/\s+/).filter(Boolean);
export function find(n,pred,out=[]){ for(const c of n.childNodes||[]){ if(pred(c))out.push(c); find(c,pred,out);} return out; }
