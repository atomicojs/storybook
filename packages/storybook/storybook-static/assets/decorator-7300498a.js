import{a as K}from"./index-131b54fa.js";function Y(t,s){const r=t.length;if(r!==s.length)return!1;for(let e=0;e<r;e++)if(t[e]!==s[e])return!1;return!0}const E=t=>typeof t=="function",N=t=>typeof t=="object",{isArray:q}=Array,k=t=>"hydrate"in((t==null?void 0:t.dataset)||{});function D(t,s){let r;const e=o=>{let{length:i}=o;for(let u=0;u<i;u++){const l=o[u];if(l&&Array.isArray(l))e(l);else{const a=typeof l;if(l==null||a==="function"||a==="boolean")continue;a==="string"||a==="number"?(r==null&&(r=""),r+=l):(r!=null&&(s(r),r=null),s(l))}}};e(t),r!=null&&s(r)}class F{constructor(s,r,e){this.message=r,this.target=s,this.value=e}}class z extends F{}class W extends F{}const R=null,Z={true:1,"":1,1:1};function G(t,s,r,e,o){const{type:i,reflect:u,event:l,value:a,attr:n=X(s)}=N(r)&&r!=R?r:{type:r},f=!(i==Function||i==R);Object.defineProperty(t,s,{configurable:!0,set(m){const c=this[s],{error:h,value:p}=V(i,f&&E(m)?m(c):m);if(h&&p!=null)throw new z(this,`The value defined for prop '${s}' must be of type '${i.name}'`,p);c!=p&&(this._props[s]=p??void 0,this.update(),l&&Q(this,l),this.updated.then(()=>{u&&(this._ignoreAttr=n,v(this,i,n,this[s]),this._ignoreAttr=null)}))},get(){return this._props[s]}}),a!=null&&(o[s]=a),e[n]={prop:s,type:i}}const Q=(t,{type:s,base:r=CustomEvent,...e})=>t.dispatchEvent(new r(s,e)),X=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase(),v=(t,s,r,e)=>e==null||s==Boolean&&!e?t.removeAttribute(r):t.setAttribute(r,N(e)?JSON.stringify(e):s==Boolean?"":e),x=(t,s)=>t==Boolean?!!Z[s]:t==Number?Number(s):t==Array||t==Object?JSON.parse(s):s,V=(t,s)=>t==null||s==null?{value:s,error:!1}:t!=String&&s===""?{value:void 0,error:!1}:t==Object||t==Array||t==Symbol?{value:s,error:{}.toString.call(s)!==`[object ${t.name}]`}:s instanceof t?{value:s,error:t==Number&&Number.isNaN(s.valueOf())}:t==String||t==Number||t==Boolean?{value:s,error:t==Number?typeof s!="number"?!0:Number.isNaN(s):t==String?typeof s!="string":typeof s!="boolean"}:{value:s,error:!0};let g;const tt=Symbol(),w=Symbol("Effect"),M=Symbol("LayoutEffect"),st=Symbol("InsertionEffect"),B=(t,s,r)=>{const{i:e,hooks:o}=g,i=o[e]=o[e]||{};return i.value=t(i.value),i.effect=s,i.tag=r,g.i++,o[e].value},et=()=>B((t={current:g.host})=>t),Ot=()=>g.update,rt=(t,s,r=0)=>{let e={};function o(l,a){for(const n in e){const f=e[n];f.effect&&f.tag===l&&(f.value=f.effect(f.value,a))}}function i(l){g={host:s,hooks:e,update:t,i:0,id:r};let a;try{a=l()}catch(n){if(n!==tt)throw n}finally{g=null}return a}return{load:i,cleanEffects:l=>(o(st,l),()=>(o(M,l),()=>{o(w,l),l&&(e={})}))}};let ot=0;const it=t=>{var r;const s=((r=(t==null?void 0:t.dataset)||{})==null?void 0:r.hydrate)||"";return s||"c"+ot++},nt=(t,s)=>{const r={},e={},{props:o,styles:i,name:u}=t,l=(u[0]||"").toUpperCase()+u.slice(1);return{[l]:class extends(s||HTMLElement){constructor(){super(),this._setup(),this._render=()=>t({...this._props});for(const n in e)this[n]=e[n]}static get styles(){return[super.styles,i]}async _setup(){if(this._props)return;this._props={};let n,f;this.mounted=new Promise(b=>this.mount=()=>{b(),n!=this.parentNode&&(this.update(),n=this.parentNode)}),this.unmounted=new Promise(b=>this.unmount=()=>{b(),f=f||n,(f!=n||!this.isConnected)&&(m.cleanEffects(!0)()(),f=n)}),this.symbolId=this.symbolId||Symbol();const m=rt(()=>this.update(),this,it(this));let c,h=!0;const p=k(this);this.update=()=>(c||(c=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const b=m.load(this._render),y=m.cleanEffects();return b&&b.render(this,this.symbolId,p),c=!1,h&&(h=!1,!p&&ct(this)),y()}finally{c=!1}}).then(b=>{b&&b()})),this.updated),this.update()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}async disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),await this.mounted,this.unmount()}attributeChangedCallback(n,f,m){if(r[n]){if(n===this._ignoreAttr||f===m)return;const{prop:c,type:h}=r[n];try{this[c]=x(h,m)}catch{throw new W(this,`The value defined as attr '${n}' cannot be parsed by type '${h.name}'`,m)}}else super.attributeChangedCallback(n,f,m)}static get props(){return{...super.props,...o}}static get observedAttributes(){const n=super.observedAttributes||[];for(const f in o)G(this.prototype,f,o[f],r,e);return Object.keys(r).concat(n)}}}[l]};function ct(t){const{styles:s}=t.constructor,{shadowRoot:r}=t;if(r&&s.length){const e=[];D(s,o=>{o&&(o instanceof Element?r.appendChild(o.cloneNode(!0)):e.push(o))}),e.length&&(r.adoptedStyleSheets=e)}}const U=t=>(s,r)=>{B(([e,o]=[])=>((o||!o)&&(o&&Y(o,r)?e=e||!0:(E(e)&&e(),e=null)),[e,r]),([e,o],i)=>i?(E(e)&&e(),[]):[e||s(),o],t)},Pt=U(M),ft=U(w),lt={sheet:!!document.adoptedStyleSheets},at={checked:1,value:1,selected:1},ut={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},ht={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},S={},O=[],I=document;class P extends Text{}const C=Symbol.for,mt=C("Atomico.ID"),$=C("Atomico.$$"),_=C("Atomico.REF"),pt=()=>{};function dt(t,s,r){return H(this,t,s,r)}const bt=(t,s,...r)=>{const e=s||S;let{children:o}=e;if(o=o??(r.length?r:O),t===pt)return o;const i=t?t instanceof Node?1:t.prototype instanceof HTMLElement&&2:0;if(i===!1&&t instanceof Function)return t(o!=O?{children:o,...e}:e);const u=lt.render||dt;return{$$:$,type:t,props:e,children:o,key:e.key,shadow:e.shadowDom,static:e.staticNode,raw:i,is:e.is,clone:e.cloneNode,render:u}};function H(t,s,r=mt,e,o){let i;if(s&&s[r]&&s[r].vnode==t||t.$$!=$)return s;(t||!s)&&(o=o||t.type=="svg",i=t.type!="host"&&(t.raw==1?(s&&t.clone?s[_]:s)!=t.type:t.raw==2?!(s instanceof t.type):s?s[_]||s.localName!=t.type:!s),i&&t.type!=null&&(t.raw==1&&t.clone?(e=!0,s=t.type.cloneNode(!0),s[_]=t.type):s=t.raw==1?t.type:t.raw==2?new t.type:o?I.createElementNS("http://www.w3.org/2000/svg",t.type):I.createElement(t.type,t.is?{is:t.is}:void 0)));const u=s[r]?s[r]:S,{vnode:l=S,cycle:a=0}=u;let{fragment:n,handlers:f}=u;const{children:m=O,props:c=S}=l;if(f=i?{}:f||{},t.static&&!i)return s;if(t.shadow&&!s.shadowRoot&&s.attachShadow({mode:"open"}),t.props!=c&&gt(s,c,t.props,f,o),t.children!==m){const h=t.shadow?s.shadowRoot:s;n=yt(t.children,n,h,r,!a&&e,o&&t.type=="foreignObject"?!1:o)}return s[r]={vnode:t,handlers:f,fragment:n,cycle:a+1},s}function Et(t,s){const r=new P(""),e=new P("");let o;if(t[s?"prepend":"append"](r),s){let{firstElementChild:i}=t;for(;i;){if(k(i)){o=i;break}i=i.nextElementSibling}}return o?t.insertBefore(e,o):t.append(e),{markStart:r,markEnd:e}}function yt(t,s,r,e,o,i){t=t==null?null:q(t)?t:[t];const u=s||Et(r,o),{markStart:l,markEnd:a,keyes:n}=u;let f;const m=n&&new Set;let c=l;if(t&&D(t,h=>{if(typeof h=="object"&&h.$$!=$)return;const p=h.$$&&h.key,b=n&&p!=null&&n.get(p);c!=a&&c===b?m.delete(c):c=c==a?a:c.nextSibling;const y=n?b:c;let d=y;if(h.$$)d=H(h,y,e,o,i);else{const A=h+"";!(d instanceof Text)||d instanceof P?d=new Text(A):d.data!=A&&(d.data=A)}d!=c&&(n&&m.delete(d),!y||n?(r.insertBefore(d,c),n&&c!=a&&m.add(c)):y==a?r.insertBefore(d,a):(r.replaceChild(d,y),c=d)),p!=null&&(f=f||new Map,f.set(p,d))}),c=c==a?a:c.nextSibling,s&&c!=a)for(;c!=a;){const h=c;c=c.nextSibling,h.remove()}return m&&m.forEach(h=>h.remove()),u.keyes=f,u}function gt(t,s,r,e,o){for(const i in s)!(i in r)&&T(t,i,s[i],null,o,e);for(const i in r)T(t,i,s[i],r[i],o,e)}function T(t,s,r,e,o,i){if(s=s=="class"&&!o?"className":s,r=r??null,e=e??null,s in t&&at[s]&&(r=t[s]),!(e===r||ht[s]||s[0]=="_"))if(s[0]=="o"&&s[1]=="n"&&(E(e)||E(r)))Nt(t,s.slice(2),e,i);else if(s=="ref")e&&(E(e)?e(t):e.current=t);else if(s=="style"){const{style:u}=t;r=r||"",e=e||"";const l=N(r),a=N(e);if(l)for(const n in r)if(a)!(n in e)&&L(u,n,null);else break;if(a)for(const n in e){const f=e[n];l&&r[n]===f||L(u,n,f)}else u.cssText=e}else{const u=s[0]=="$"?s.slice(1):s;u===s&&(!o&&!ut[s]&&s in t||E(e)||E(r))?t[s]=e??"":e==null?t.removeAttribute(u):t.setAttribute(u,N(e)?JSON.stringify(e):e)}}function Nt(t,s,r,e){if(e.handleEvent||(e.handleEvent=o=>e[o.type].call(t,o)),r){if(!e[s]){const o=r.capture||r.once||r.passive?Object.assign({},r):null;t.addEventListener(s,e,o)}e[s]=r}else e[s]&&(t.removeEventListener(s,e),delete e[s])}function L(t,s,r){let e="setProperty";r==null&&(e="removeProperty",r=null),~s.indexOf("-")?t[e](s,r):t[s]=r}const{addons:St}=__STORYBOOK_MODULE_ADDONS__,j={tsx:"typescript",html:"html"};function J({story:t,cid:s,args:r,code:e,source:o}){const i=et();ft(()=>{requestAnimationFrame(()=>{St.getChannel().emit(K,{id:s,args:r,source:o==="html"?i.current.innerHTML:e,...j[o]?{format:j[o]}:null})})});const u=t();return i.result=u,bt("host",null,u)}J.props={cid:String,story:Function,originalSource:String,code:String,source:String,args:null};const At=nt(J);customElements.get("atomico-decorator-wrapper")||customElements.define("atomico-decorator-wrapper",At);const Ct=({source:t}={source:"code"})=>(s,r)=>{const e=r.canvasElement;e[r.id]||(e[r.id]=document.createElement("atomico-decorator-wrapper"),e[r.id].setAttribute("cid",r.id));const o=e[r.id];o.story=s,o.args=r.unmappedArgs,o.code=r.parameters.docs.source.originalSource,o.source=t;const i=r.parameters.fileName.match(/\.(\w+)$/);return i&&(r.parameters.docs.source.language=i.at(1)),o};export{tt as I,B as a,et as b,Q as c,Ct as d,ft as e,Pt as f,nt as g,bt as h,E as i,Ot as u};
//# sourceMappingURL=decorator-7300498a.js.map
