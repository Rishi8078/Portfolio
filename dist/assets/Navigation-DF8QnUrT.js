import{r as n,u as g,j as e,A as k,m}from"./index-fiKSSR0l.js";/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=(...r)=>r.filter((i,s,a)=>!!i&&a.indexOf(i)===s).join(" ");/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var j={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:d="",children:l,iconNode:h,...x},t)=>n.createElement("svg",{ref:t,...j,width:i,height:i,stroke:r,strokeWidth:a?Number(s)*24/Number(i):s,className:y("lucide",d),...x},[...h.map(([u,c])=>n.createElement(u,c)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(r,i)=>{const s=n.forwardRef(({className:a,...d},l)=>n.createElement(N,{ref:l,iconNode:i,className:y(`lucide-${v(r)}`,a),...d}));return s.displayName=`${r}`,s};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=p("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=p("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=p("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=p("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function b(){const{theme:r,toggleTheme:i}=g();return e.jsx("button",{onClick:i,className:"soft-btn p-2","aria-label":"Toggle theme",children:r==="light"?e.jsx(E,{size:18}):e.jsx(M,{size:18})})}const f="/assets/resume-oEK3Iv0X.pdf",w=["intro","work","values","background","about","blog","contact"];function $(){const[r,i]=n.useState(!1),[s,a]=n.useState(!1),[d,l]=n.useState("intro"),h=n.useRef(null);g(),n.useEffect(()=>{const t=()=>a(window.scrollY>20);return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]),n.useEffect(()=>{const t={root:null,rootMargin:"-50% 0px -50% 0px",threshold:0};h.current=new IntersectionObserver(c=>{c.forEach(o=>o.isIntersecting&&l(o.target.id))},t);const u=document.querySelectorAll("section[id]");return u.forEach(c=>{var o;return(o=h.current)==null?void 0:o.observe(c)}),()=>u.forEach(c=>{var o;return(o=h.current)==null?void 0:o.unobserve(c)})},[]);const x=t=>d===t;return e.jsxs(e.Fragment,{children:[e.jsx(k,{mode:"wait",children:r&&e.jsx(m.div,{initial:{opacity:0,x:"-100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"-100%"},transition:{duration:.3},className:"lg:hidden fixed top-0 left-0 right-0 h-screen z-[100] bg-[#040810]/95 backdrop-blur-xl",children:e.jsx(m.div,{className:"h-full flex flex-col justify-center items-start px-8 pb-8",children:e.jsxs("div",{className:"space-y-6 w-full",children:[w.map(t=>e.jsxs(m.a,{href:`#${t}`,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3,delay:.1},className:`block font-body text-lg font-medium tracking-wide leading-none py-2 flex items-center gap-3 transition-colors ${x(t)?"text-white":"text-white/40 hover:text-white/80"}`,onClick:()=>i(!1),children:[x(t)&&e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-white/80 inline-block"}),e.jsx("span",{children:t.charAt(0).toUpperCase()+t.slice(1)})]},t)),e.jsx("div",{className:"pt-6 mt-4 w-full border-t border-white/10",children:e.jsx("a",{href:f,download:!0,onClick:()=>i(!1),className:"inline-block rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-white/80 transition-all hover:bg-white/[0.08] hover:text-white",children:"Resume ↓"})})]})})},"mobile-menu")}),e.jsx(m.nav,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8},className:"fixed left-0 top-0 z-[101] hidden w-full lg:block",children:e.jsx("div",{className:"px-8 pt-6",children:e.jsxs("div",{className:`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 ${s?"border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]":"border-transparent bg-transparent"} `,children:[e.jsx("a",{href:"#intro",className:"font-mono text-sm font-bold uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-white",children:"Rishib"}),e.jsx("div",{className:"flex items-center gap-5",children:w.map(t=>e.jsx("a",{href:`#${t}`,className:`text-sm font-medium tracking-wide transition-colors duration-300 ${x(t)?"text-white":"text-white/40 hover:text-white/90"}`,children:t.charAt(0).toUpperCase()+t.slice(1)},t))}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("a",{href:f,download:!0,className:"rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white",children:"Resume"}),e.jsx(b,{})]})]})})}),e.jsxs(m.div,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6},className:`lg:hidden fixed top-0 left-0 right-0 z-[101] flex items-center justify-between px-5 py-4 transition-all duration-500 ${s||r?"border-b border-white/10 bg-[#040810]/70 backdrop-blur-md":"bg-transparent"}`,children:[e.jsx("a",{href:"#intro",className:"font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/90",children:"Rishib"}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(b,{}),e.jsx("button",{onClick:()=>i(!r),"aria-label":r?"Close menu":"Open menu",className:"rounded-full border border-white/10 bg-white/[0.02] p-2 text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white",children:r?e.jsx(A,{size:18}):e.jsx(C,{size:18})})]})]})]})}export{$ as default};
