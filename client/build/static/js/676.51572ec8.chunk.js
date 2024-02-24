"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[676],{740:(e,s,l)=>{l.r(s),l.d(s,{default:()=>d});var a=l(60),t=l(372),n=l(560),c=l(12);const r=l.p+"static/media/logo.b21d60f58e1a618f3761.png";var o=l(496);const i=(0,a.lazy)((()=>l.e(88).then(l.bind(l,88))));const d=function(){const[e,s]=(0,a.useState)({storedUsername:"",username:"",password:"",mpin:"",isPassSelected:!1,next:!1,passClass:"bg-gray-300 translate-x-0",pinClass:"bg-indigo-900 text-white translate-x-0.5"}),l=l=>s({...e,username:l}),d=l=>s({...e,mpin:l}),x=(0,n.i6)();(0,a.useEffect)((()=>{const e=localStorage.getItem("username"),s=localStorage.getItem("smpin");e&&s&&(l(e),d(s))}),[]);const u=a=>{const{name:t,value:n}=a.target;switch(t){case"username":l(n);break;case"password":(l=>{s({...e,password:l})})(n);break;case"mpin":d(n);break;default:console.warn("Unexpected input name: ".concat(t))}},m=()=>{s({...e,isPassSelected:!e.isPassSelected,pinClass:e.passClass,passClass:e.pinClass})};return(0,o.jsxs)("div",{className:"flex flex-col justify-start h-full items-center text-blue-900",children:[(0,o.jsxs)("div",{className:"flex flex-col w-full",children:[(0,o.jsx)("div",{onClick:()=>{console.log("Skipp clicked")},className:"flex flex-row  justify-end p-3 font-normal text-lg",children:(0,o.jsx)("p",{className:"cursor-pointer",children:"Skip"})}),(0,o.jsx)("div",{className:"logo w-full flex flex-row justify-center mt-20",children:(0,o.jsx)("img",{src:r,alt:"logo",className:"h-20"})})]}),e.next?(0,o.jsxs)("div",{className:"flex flex-col justify-evenly h-full w-full rounded px-10  text-lg",children:[(0,o.jsxs)("div",{className:" flex flex-row items-center rounded bg-gray-300 ",children:[(0,o.jsx)("button",{className:"".concat(e.pinClass," py-1 w-full rounded "),onClick:m,children:"MPIN"}),(0,o.jsx)("button",{className:"".concat(e.passClass," py-1 w-full rounded"),onClick:m,children:"Password"})]}),(0,o.jsxs)("div",{className:"flex flex-col px-10 text-lg",children:[(0,o.jsxs)("label",{className:"py-1",children:["Enter your ",e.isPassSelected?"Password":"MPIN"]}),e.isPassSelected?(0,o.jsx)("input",{type:"password",name:"password",value:e.password,onChange:u,className:"p-2 rounded text-gray-500"}):(0,o.jsx)(i,{maxlength:6,background:"white",dashColor:"indigo-900",onChange:d})]}),(0,o.jsxs)("div",{className:"flex flex-col items-center",children:[(0,o.jsxs)(c.cH,{to:"../forgot-username",children:["Forgot ",e.isPassSelected?"Password":"MPIN"," ?"]}),(0,o.jsx)("button",{onClick:()=>{if(e.isPassSelected)t.c.post("your_api_url",{username:e.username,password:e.password}).then((e=>{x("/")})).catch((e=>{}));else{const s=localStorage.getItem("smpin");e.mpin===s?x("/"):x("/login")}},className:"bg-indigo-900 my-5 py-2 px-4 text-white rounded",children:"Login"}),(0,o.jsx)(c.cH,{to:"../login",children:"Login as diffrent User"})]})]}):(0,o.jsxs)("div",{className:"flex flex-col justify-evenly h-full w-full px-10 text-lg",children:[(0,o.jsxs)("div",{className:"flex flex-col px-10 text-lg",children:[(0,o.jsx)("label",{className:"py-1",children:"Enter your username"}),(0,o.jsx)("input",{type:"text",name:"username",value:e.username,onChange:u,className:"p-2 rounded text-gray-500"})]}),(0,o.jsxs)("div",{className:"flex flex-col items-center",children:[(0,o.jsx)(c.cH,{to:"../forgot-username",children:"Forgot Username ?"}),(0,o.jsx)("button",{onClick:()=>s({...e,next:!e.next}),className:"bg-indigo-900 my-5 py-2 px-4 text-white rounded",children:"Next"}),(0,o.jsx)(c.cH,{to:"../register",children:"Create an Account?"})]})]})]})}}}]);
//# sourceMappingURL=676.51572ec8.chunk.js.map