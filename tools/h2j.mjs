// parse5 node -> JSX source serializer
const INLINE = new Set(['a','span','i','b','strong','em','img','button','label','input','svg','small','sup','sub','u','abbr','code','br','select','textarea','font','s','del','ins','mark','time','cite','q','kbd','samp','var','bdi','bdo','wbr','picture','video','audio','canvas','iframe','object']);
const NO_TEXT_PARENT = new Set(['table','thead','tbody','tfoot','tr','colgroup','select','optgroup','html','head','dl_']);
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const ATTR_MAP = {class:'className','for':'htmlFor',tabindex:'tabIndex',colspan:'colSpan',rowspan:'rowSpan',srcset:'srcSet',maxlength:'maxLength',minlength:'minLength',readonly:'readOnly',autocomplete:'autoComplete',autofocus:'autoFocus',autoplay:'autoPlay',frameborder:'frameBorder',allowfullscreen:'allowFullScreen',cellpadding:'cellPadding',cellspacing:'cellSpacing',crossorigin:'crossOrigin',datetime:'dateTime',enctype:'encType',formaction:'formAction',hreflang:'hrefLang',inputmode:'inputMode',contenteditable:'contentEditable',spellcheck:'spellCheck',novalidate:'noValidate',usemap:'useMap',playsinline:'playsInline',accesskey:'accessKey',charset:'charSet',srclang:'srcLang',referrerpolicy:'referrerPolicy',fetchpriority:'fetchPriority',allowtransparency:'allowTransparency',marginwidth:'marginWidth',marginheight:'marginHeight','accept-charset':'acceptCharset','http-equiv':'httpEquiv',bgcolor:'bgcolor',itemprop:'itemProp',itemscope:'itemScope',itemtype:'itemType',itemid:'itemID',nomodule:'noModule'};
const BOOL = new Set(['checked','disabled','selected','required','readonly','autofocus','autoplay','controls','loop','muted','multiple','hidden','open','async','defer','allowfullscreen','playsinline','novalidate','reversed','itemscope','nomodule','formnovalidate','default','ismap']);
const SVG_SPECIAL = {'xlink:href':'xlinkHref','xlink:title':'xlinkTitle','xlink:role':'xlinkRole','xlink:show':'xlinkShow','xlink:type':'xlinkType','xlink:arcrole':'xlinkArcrole','xlink:actuate':'xlinkActuate','xmlns:xlink':'xmlnsXlink','xml:space':'xmlSpace','xml:lang':'xmlLang','xml:base':'xmlBase','xmlns':'xmlns'};
const camel = s => s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
function styleObj(css){
  const out=[];
  for(const decl of splitDecls(css)){
    const i=decl.indexOf(':'); if(i<0) continue;
    let k=decl.slice(0,i).trim(), v=decl.slice(i+1).trim();
    if(!k) continue;
    let key;
    if(k.startsWith('--')) key=JSON.stringify(k);
    else { if(/^-ms-/.test(k)) k=k.slice(1); key=/^-/.test(k)? camel(k.replace(/^-/,'').replace(/^(.)/,c=>c.toUpperCase())) : camel(k); key=/^[A-Za-z_$][\w$]*$/.test(key)?key:JSON.stringify(key); }
    v=v.replace(/\s*!important\s*$/i,m=>m); // keep
    out.push(`${key}: ${JSON.stringify(v)}`);
  }
  return `{{${out.join(', ')}}}`;
}
function splitDecls(css){ const res=[]; let cur='',depth=0,q=null; for(const ch of css){ if(q){cur+=ch; if(ch===q)q=null; continue;} if(ch==='"'||ch==="'"){q=ch;cur+=ch;continue;} if(ch==='(')depth++; if(ch===')')depth--; if(ch===';'&&depth===0){res.push(cur);cur='';continue;} cur+=ch;} if(cur.trim())res.push(cur); return res; }
const jsStr = s => JSON.stringify(s);
export function ctxNew(){ return {stats:{dropped:0,svg:0}}; }
function attrsOf(n, inSvg, ctx, tag){
  const parts=[];
  for(const a of n.attrs||[]){
    let name=a.name, val=a.value;
    if(/^on[a-z]+$/.test(name)){ ctx.inlineHandlers=(ctx.inlineHandlers||0)+1; const EV={onclick:'onClick',onchange:'onChange',onsubmit:'onSubmit',onmouseover:'onMouseOver',onmouseout:'onMouseOut',onfocus:'onFocus',onblur:'onBlur',onkeyup:'onKeyUp',onkeydown:'onKeyDown',oninput:'onInput',onload:'onLoad',onerror:'onError'}; ctx.usesInl=true; parts.push(`${EV[name]||('on'+name[2].toUpperCase()+name.slice(3))}={inl(${jsStr(val)})}`); continue; }
    let jn;
    if(inSvg){
      if(SVG_SPECIAL[name]) jn=SVG_SPECIAL[name];
      else if(name==='class') jn='className';
      else if(name==='style') jn='style';
      else if(/^(data|aria)-/.test(name)) jn=name;
      else if(name==='viewbox') jn='viewBox';
      else jn=camel(name);
    } else {
      if(name==='style'){ parts.push(`style=${styleObj(val)}`); continue; }
      if(/^(data|aria)-/.test(name)) jn=name;
      else if(name==='value' && (tag==='input'||tag==='textarea'||tag==='select')) jn='defaultValue';
      else if(name==='checked' && tag==='input') jn='defaultChecked';
      else if(ATTR_MAP[name]) jn=ATTR_MAP[name];
      else jn=name;
    }
    if(!inSvg && BOOL.has(name) && (val===''||val===name)) { parts.push(jn); continue; }
    if(jn==='style' && inSvg){ parts.push(`style=${styleObj(val)}`); continue; }
    if(!/^[A-Za-z_][\w:.-]*$/.test(jn)) { ctx.stats.dropped++; continue; }
    // attribute value: use {"..."} when it contains quote/newline/{ or non-trivial
    if(/^[^"\\\n\r{}&<>]*$/.test(val)) parts.push(`${jn}="${val}"`);
    else parts.push(`${jn}={${jsStr(val)}}`);
  }
  return parts.length? ' '+parts.join(' '):'';
}
function textNode(v){
  return `{${jsStr(v)}}`;
}
export function nodesToJsx(nodes, ctx, opts={}){
  const out=[]; const parentTag=opts.parentTag||''; const inSvg=!!opts.inSvg;
  const list=(nodes||[]).filter(n=>n.nodeName!=='#comment');
  for(let i=0;i<list.length;i++){
    const n=list[i];
    if(n.nodeName==='#text'){
      const v=n.value;
      if(/^[ \t\n\r\f]*$/.test(v)){
        if(NO_TEXT_PARENT.has(parentTag)) continue;
        if(!v.includes('\n')&&!v.includes('\t')&&v.length>0&&v===' ' ){ /* keep single space */ }
        const prev=list[i-1], next=list[i+1];
        const isInl=x=>x&&(x.nodeName==='#text'||INLINE.has(x.nodeName)||inSvg);
        if(inSvg) continue;
        if(prev&&next&&isInl(prev)&&isInl(next)&&INLINE.has(prev.nodeName)&&INLINE.has(next.nodeName)) { out.push('{" "}'); }
        continue;
      }
      if(NO_TEXT_PARENT.has(parentTag)) continue;
      // collapse whitespace like HTML would (but keep leading/trailing single space)
      let t=v.replace(/[ \t\r\n\f]+/g,' ');
      if(parentTag==='pre'||parentTag==='textarea') t=v;
      out.push(simpleText(t));
      continue;
    }
    if(ctx.replace&&ctx.replace.has(n)){ out.push(ctx.replace.get(n)); continue; }
    const tag=n.nodeName;
    if(tag==='script') { (ctx.scripts??=[]).push(n); continue; }
    if(tag==='style'){
      const css=(n.childNodes||[]).map(c=>c.value||'').join('');
      const idA=(n.attrs||[]).find(a=>a.name==='id');
      const key=ctx.styleSink? ctx.styleSink(css, idA&&idA.value, n.attrs):null;
      if(key){ out.push(key); continue; }
      out.push(`<style${idA?` id=${jsStr(idA.value)}`:''} dangerouslySetInnerHTML={{__html: ${jsStr(css)}}} />`); continue;
    }
    if(tag==='link' || tag==='meta') { if(ctx.keepBodyLinks){} else { (ctx.bodyLinks??=[]).push(n); continue; } }
    if(tag==='template'){ continue; }
    const svgHere = inSvg || tag==='svg';
    const jtag = tag;
    const attrs=attrsOf(n, svgHere, ctx, tag);
    const kids=(tag==='template')?n.content.childNodes:n.childNodes;
    if(VOID.has(tag)) { out.push(`<${jtag}${attrs} />`); continue; }
    if(tag==='textarea'){ const t=(kids||[]).map(c=>c.value||'').join(''); out.push(`<textarea${attrs}${t?` defaultValue=${jsStr(t)}`:''} />`); continue; }
    if(tag==='select'){
      let sel; const strip=x=>{for(const c of x.childNodes||[]){ if(c.nodeName==='option'){ const has=(c.attrs||[]).some(a=>a.name==='selected'); if(has){ const va=(c.attrs||[]).find(a=>a.name==='value'); sel= va?va.value:(c.childNodes||[]).map(z=>z.value||'').join('').trim(); c.attrs=c.attrs.filter(a=>a.name!=='selected'); } } strip(c);} }; strip(n);
      const a2 = sel!==undefined? attrs+` defaultValue=${jsStr(sel)}`:attrs;
      const inner=nodesToJsx(kids,ctx,{parentTag:tag,inSvg:false});
      out.push(`<select${a2}>${inner}</select>`); continue;
    }
    const inner=nodesToJsx(kids,ctx,{parentTag:tag,inSvg:svgHere && tag!=='foreignObject'});
    if(!inner) out.push(`<${jtag}${attrs}></${jtag}>`.replace(/><\/\w+>$/,' />'));
    else out.push(`<${jtag}${attrs}>${inner}</${jtag}>`);
  }
  return out.join('');
}
function simpleText(t){
  if(/^[^{}<>&"\\]*$/.test(t) && !/^\s|\s$/.test(t)) return t;
  return textNode(t);
}
