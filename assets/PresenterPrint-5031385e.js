import{h as _,j as d,k as p,ak as u,c as m,al as h,m as n,am as t,an as o,z as s,F as f,ao as g,ap as v,aq as x,q as r,ar as y,as as P,n as b,at as k,au as N,_ as S}from"./nav-c75e2820.js";import{N as w}from"./NoteDisplay-505cf511.js";import{u as T}from"./index-059dc274.js";const D={class:"m-4"},V={class:"mb-10"},j={class:"text-4xl font-bold mt-2"},F={class:"opacity-50"},L={class:"text-lg"},M={class:"font-bold flex gap-2"},z={class:"opacity-50"},B=t("div",{class:"flex-auto"},null,-1),C={key:0,class:"border-gray-400/50 mb-8"},H=_({__name:"PresenterPrint",setup(R){d(p),u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),T({title:`Notes - ${m.title}`});const i=h(()=>x.slice(0,-1).map(a=>{var l;return(l=a.meta)==null?void 0:l.slide}).filter(a=>a!==void 0&&a.noteHTML!==""));return(a,l)=>(r(),n("div",{id:"page-root",style:v(s(N))},[t("div",D,[t("div",V,[t("h1",j,o(s(m).title),1),t("div",F,o(new Date().toLocaleString()),1)]),(r(!0),n(f,null,g(s(i),(e,c)=>(r(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",L,[t("div",M,[t("div",z,o(e==null?void 0:e.no)+"/"+o(s(y)),1),P(" "+o(e==null?void 0:e.title)+" ",1),B])]),b(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<s(i).length-1?(r(),n("hr",C)):k("v-if",!0)]))),128))])],4))}}),U=S(H,[["__file","/home/runner/work/MUPRO-PFSDK-Tutorial/MUPRO-PFSDK-Tutorial/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{U as default};
