(this.webpackJsonpsudokuboard=this.webpackJsonpsudokuboard||[]).push([[0],[,,,,,,,,,,,,,,,,,function(n,l,t){},function(n,l,t){},function(n,l,t){},function(n,l,t){},function(n,l,t){},,function(n,l,t){},function(n,l,t){"use strict";t.r(l);var e=t(1),u=t.n(e),r=t(8),o=t.n(r),c=(t(17),t(18),t(2)),a=t(4),i=t(7),s=(t(19),t(20),t(9)),p=t(10),d=t(12),h=t(11),v=(t(21),t(0)),f=function(n){Object(d.a)(t,n);var l=Object(h.a)(t);function t(n){var e;return Object(s.a)(this,t),(e=l.call(this,n)).sectionLength=Math.sqrt(e.props.boardLength),e.lastOfSection=(e.props.column+1)%e.sectionLength===0,e}return Object(p.a)(t,[{key:"render",value:function(){var n,l,t=this;return Object(v.jsxs)("div",{className:"column column-".concat(this.props.column," ")+"section-".concat(Math.floor((this.props.column+this.sectionLength)/this.sectionLength)," ")+"".concat(this.lastOfSection?"section-last":""," ")+"".concat((null===(n=this.props)||void 0===n?void 0:n.hasError)?"error":""),children:[Object(v.jsx)("input",{id:"input-".concat(this.props.row,"-").concat(this.props.column),type:"text",value:this.props.value,ref:this.inputRef,onChange:function(n){t.props.changeHandler(t.props.column,n.target.value)}}),Object(v.jsx)("div",{className:"possibles",children:(null===(l=this.props)||void 0===l?void 0:l.possible.length)>0&&this.props.possible.map((function(n){return Object(v.jsx)("div",{className:"possible",children:"".concat(n)})}))})]})}}]),t}(u.a.Component),b=function(n){var l=n.columns,t=n.row,e=n.changeHandler,u=n.boardLength,r=n.activeRow,o=n.activeColumn,c=(n.columnErrors,Math.sqrt(u)),a=(t+1)%c===0,i=function(n,l){e(t,n,l)};return Object(v.jsx)("div",{className:"row row-".concat(t," ").concat(a?"row-section-last":""),children:l.map((function(n,l){return Object(v.jsx)(f,{value:(null===n||void 0===n?void 0:n.value)||"",column:l,row:t,boardLength:u,changeHandler:i,isActive:r===t&&o===l,hasError:(null===n||void 0===n?void 0:n.error)||!1,possible:(null===n||void 0===n?void 0:n.possible)||[]})}))})},j=function(n){var l=n.length,t={value:null,error:!0,possible:[]},u=(Math.sqrt(l),Object(e.useState)([0,0])),r=Object(i.a)(u,2),o=r[0],s=r[1],p=Object(e.useState)([[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null]]),d=Object(i.a)(p,2),h=d[0],f=d[1],j=function(n,l,t){return t.indexOf(n)!==l},m=function(n,l,t){return t.indexOf(n)===l},O=function(n,e,u){var r=h.slice();void 0!==r[n][e]&&(r[n][e]=Object(a.a)(Object(a.a)({},t),{value:parseInt(u),error:!1}),r=L(r)),f(r),w(n,e);var o=n,c=e+1;c>=l&&(o+=1,c=0),o>=l&&(o=0),s([o,c])},g=function(n){return(h[n]||[]).map((function(n){return(null===n||void 0===n?void 0:n.value)?parseInt(n.value):null})).filter((function(n){return!!n}))},x=function(n){var l=[];return h.slice().map((function(t){return l.push(t[n]||null)})),l.map((function(n){return(null===n||void 0===n?void 0:n.value)?parseInt(n.value):null})).filter((function(n){return!!n}))},w=function(n,t){var e=[],u=Math.sqrt(l),r=Math.floor(n/u)*u,o=Math.floor(t/u)*u;return h.slice(r,r+u).map((function(n){return e.push.apply(e,Object(c.a)(n.slice(o,o+u)))})),e.map((function(n){return(null===n||void 0===n?void 0:n.value)?parseInt(n.value):null})).filter((function(n){return!!n}))},L=function(n){return n.map((function(n){return n.map((function(n){return Object(a.a)(Object(a.a)({},t),{error:!1,value:(null===n||void 0===n?void 0:n.value)||null})}))})).map((function(n,t){return n.map((function(n,e){n.value&&(n.error=!!(g(t).filter(j).includes(n.value)||x(e).filter(j).includes(n.value)||w(t,e).filter(j).includes(n.value)));var u=[];u.push.apply(u,Object(c.a)(g(t))),u.push.apply(u,Object(c.a)(x(e))),u.push.apply(u,Object(c.a)(w(t,e)));var r=u.filter(m);return n.possible=Object(c.a)(Array(l).keys()).map((function(n){return n+1})).filter((function(n){return!r.includes(n)})),n}))}))};return Object(v.jsx)("div",{className:"sudoku-board",children:h.map((function(n,t){return Object(v.jsx)(b,{columns:n,row:t,boardLength:l,changeHandler:O,activeRow:o[0],activeColumn:o[1]})}))})},m=(t(23),function(n){var l=n.onChange,t=n.text;return Object(v.jsxs)("div",{className:"toogle-button",children:[Object(v.jsx)("span",{children:t}),Object(v.jsxs)("label",{children:[Object(v.jsx)("input",{type:"checkbox",value:"1",onChange:l}),Object(v.jsx)("span",{children:"\xa0"})]})]})});var O=function(){return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("div",{className:"settings",children:[Object(v.jsx)(m,{text:"Dark theme",onChange:function(n){var l=document.body;n.target.checked?l.classList.add("dark"):l.classList.remove("dark")}}),Object(v.jsx)(m,{text:"Show tips",onChange:function(n){var l=document.body;n.target.checked?l.classList.add("show-tips"):l.classList.remove("show-tips")}})]}),Object(v.jsx)(j,{length:9})]})},g=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,25)).then((function(l){var t=l.getCLS,e=l.getFID,u=l.getFCP,r=l.getLCP,o=l.getTTFB;t(n),e(n),u(n),r(n),o(n)}))};o.a.render(Object(v.jsx)(u.a.StrictMode,{children:Object(v.jsx)(O,{})}),document.getElementById("root")),g()}],[[24,1,2]]]);
//# sourceMappingURL=main.97109846.chunk.js.map