import{r as n,u as g,j as e,A as j,m}from"./index-MdT7cJF2.js";/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=(...a)=>a.filter((r,s,i)=>!!r&&i.indexOf(r)===s).join(" ");/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n.forwardRef(({color:a="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:d="",children:c,iconNode:x,...f},t)=>n.createElement("svg",{ref:t,...w,width:r,height:r,stroke:a,strokeWidth:i?Number(s)*24/Number(r):s,className:y("lucide",d),...f},[...x.map(([u,l])=>n.createElement(u,l)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(a,r)=>{const s=n.forwardRef(({className:i,...d},c)=>n.createElement(N,{ref:c,iconNode:r,className:y(`lucide-${v(a)}`,i),...d}));return s.displayName=`${a}`,s};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=h("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=h("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=h("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=h("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function p(){const{theme:a,toggleTheme:r}=g();return e.jsx("button",{onClick:r,className:"soft-btn p-2","aria-label":"Toggle theme",children:a==="light"?e.jsx(E,{size:18}):e.jsx(M,{size:18})})}const b="/assets/resume-oEK3Iv0X.pdf",k=["intro","work","values","background","about","blog","contact"];function z(){const[a,r]=n.useState(!1),[s,i]=n.useState(!1),[d,c]=n.useState("intro"),x=n.useRef(null);g(),n.useEffect(()=>{const t=()=>i(window.scrollY>20);return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]),n.useEffect(()=>{const t={root:null,rootMargin:"-50% 0px -50% 0px",threshold:0};x.current=new IntersectionObserver(l=>{l.forEach(o=>o.isIntersecting&&c(o.target.id))},t);const u=document.querySelectorAll("section[id]");return u.forEach(l=>{var o;return(o=x.current)==null?void 0:o.observe(l)}),()=>u.forEach(l=>{var o;return(o=x.current)==null?void 0:o.unobserve(l)})},[]);const f=t=>d===t;return e.jsxs(e.Fragment,{children:[e.jsx(j,{mode:"wait",children:a&&e.jsx(m.div,{initial:{opacity:0,x:"-100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"-100%"},transition:{duration:.3},className:"lg:hidden fixed top-0 left-0 right-0 h-screen z-[100] bg-cream dark:bg-dark-bg",children:e.jsx(m.div,{className:"h-full flex flex-col justify-center items-start px-8 pb-8",children:e.jsxs("div",{className:"space-y-6 w-full",children:[k.map(t=>e.jsxs(m.a,{href:`#${t}`,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3,delay:.1},className:`block font-body text-lg font-medium tracking-wide leading-none py-2 flex items-center gap-3 transition-colors ${f(t)?"text-accent dark:text-dark-accent":"text-ink/60 dark:text-dark-text/60 hover:text-ink dark:hover:text-dark-text"}`,onClick:()=>r(!1),children:[f(t)&&e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-accent dark:bg-dark-accent inline-block"}),e.jsx("span",{children:t.charAt(0).toUpperCase()+t.slice(1)})]},t)),e.jsx("div",{className:"pt-6 mt-4 w-full border-t border-card-border dark:border-dark-border",children:e.jsx("a",{href:b,download:!0,onClick:()=>r(!1),className:"soft-btn-accent inline-block",children:"Resume ↓"})})]})})},"mobile-menu")}),e.jsx(m.nav,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8},className:"fixed left-0 top-0 z-[101] hidden w-full lg:block",children:e.jsx("div",{className:"px-8 pt-6",children:e.jsxs("div",{className:`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all ${s?"border-[#4d3833]/15 bg-[#f2efe8]/90 shadow-soft backdrop-blur dark:border-[#cbd5e1]/10 dark:bg-[#172033]/90":"border-transparent bg-transparent"} `,children:[e.jsx("a",{href:"#intro",className:"font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#4d3833] dark:text-[#f8fafc]",children:"Rishib"}),e.jsx("div",{className:"flex items-center gap-5",children:k.map(t=>e.jsx("a",{href:`#${t}`,className:`text-sm font-medium tracking-wide transition-colors ${f(t)?"text-[#3b2b29] dark:text-[#f8fafc]":"text-[#4d3833]/55 hover:text-[#3b2b29] dark:text-[#cbd5e1]/70 dark:hover:text-[#f8fafc]"}`,children:t.charAt(0).toUpperCase()+t.slice(1)},t))}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("a",{href:b,download:!0,className:"rounded-full bg-[#3b2b29] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f6f1e8] transition hover:bg-[#2f2321] dark:bg-[#f8fafc] dark:text-[#172033] dark:hover:bg-[#e2e8f0]",children:"Resume"}),e.jsx(p,{})]})]})})}),e.jsxs(m.div,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6},className:"lg:hidden fixed top-0 left-0 right-0 z-[101] flex items-center justify-between px-5 py-4",children:[e.jsx("a",{href:"#intro",className:"font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#4d3833] dark:text-[#f8fafc]",children:"Rishib"}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(p,{}),e.jsx("button",{onClick:()=>r(!a),"aria-label":a?"Close menu":"Open menu",className:"soft-btn p-2",children:a?e.jsx(A,{size:18}):e.jsx(C,{size:18})})]})]})]})}export{z as default};
