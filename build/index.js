!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("DelmaResourceCalculatorCore",[],e):"object"==typeof exports?exports.DelmaResourceCalculatorCore=e():t.DelmaResourceCalculatorCore=e()}(window,function(){return function(r){var n={};function u(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,u),e.l=!0,e.exports}return u.m=r,u.c=n,u.d=function(t,e,r){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="",u(u.s=0)}([function(t,e,r){"use strict";function g(t,e){for(var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,n=e,u=!1,o=0;!u;){n<=0&&(u=!0);var i=t.find(function(t){return Number(t.length)===Number(n.toFixed(r))});void 0!==i&&(u=!0,o=i),n-=Math.pow(10,-r)}return o}function p(t,e){var r=t.findIndex(function(t){return t.index===e.index});0<=r&&t.splice(r,1)}function d(t){return t.map(function(t){return function(u){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},e=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),e.forEach(function(t){var e,r,n;e=u,n=o[r=t],r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n})}return u}({},t)})}function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,u=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){u=!0,o=t}finally{try{n||null==s.return||s.return()}finally{if(u)throw o}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.r(e),r.d(e,"DelmaResourceCalculatorCore",function(){return n});var n=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.output=null,this.logger=function(){}}var t,r,n;return t=e,(r=[{key:"setLogger",value:function(t){return this.logger=t,this}},{key:"setAssetLength",value:function(t){return this.assetLength=t,this.logger({step:1,status:1}),this}},{key:"setCuttingEdgeWidth",value:function(t){return this.cuttingEdge=t,this.logger({step:2,status:1}),this}},{key:"setCalculationAccuracy",value:function(t){return this.calculationAccuracy=t,this.logger({step:3,status:1}),this}},{key:"calculate",value:function(t){try{var e=function(t){try{var o=[];return t.forEach(function(t,e){for(var r=t.length,n=t.number,u=0;u<n;u++)o.push({index:e,length:r})}),o.sort(function(t,e){return e.length-t.length}),{err:null,result:o}}catch(t){return{err:t,result:null}}}(this.data),r=e.err,n=e.result;if(r)return this.logger({step:4,status:0,error:r}),this;this.logger({step:4,status:1});var u=function(t,e){var r,n=e.assetLength,u=e.cuttingEdge,o=e.calculationAccuracy;try{var i=d(t),s=[],l=[];do{if(0<l.length){var a=0===(r=l).length?0:r.reduce(function(t,e){return t+e.length},0),c=n-u*l.length-a;if(0<c){var f=g(i,c,o);f?(p(i,f),l.push(f)):(s.push(l),l=[])}else s.push(l),l=[]}else{var h=y(i,1)[0];l.push(h),p(i,h)}0===i.length&&s.push(l)}while(0<i.length);return{err:null,result:s}}catch(t){return{err:t,result:null}}}(n,{assetLength:this.assetLength,cuttingEdge:this.cuttingEdge,calculationAccuracy:this.calculationAccuracy}),o=u.err,i=u.result;if(o)return this.logger({step:5,status:0,error:o}),this;this.logger({step:5,status:1});var s=function(t){try{var r={},e=[];return t.forEach(function(t){var e="";t.forEach(function(t){e+=t.index}),e in r?r[e].push(t):r[e]=[t]}),Object.values(r).forEach(function(t){e.push({group:t[0],number:t.length})}),{err:null,result:e}}catch(t){return{err:t,result:null}}}(i),l=s.err,a=s.result;if(l)return this.logger({step:6,status:0,error:l}),this;this.logger({step:6,status:1});var c=function(t,u){try{var o=[];return t.forEach(function(t){var e=t.group,r=t.number,n=[];e.forEach(function(t){var e=t.index;n.push(u[e])}),o.push({group:n,number:r})}),{err:null,result:o}}catch(t){return{err:t,result:null}}}(a,this.data),f=c.err,h=c.result;if(f)return this.logger({step:7,status:0,error:f}),this;this.logger({step:7,status:1}),t(this.output=h),this.logger({step:8,status:1})}catch(t){this.output=null,this.logger({step:8,status:0,error:t})}return this}},{key:"analyze",value:function(t){var u=this;if(null===this.output)return this;try{var e=null,r=null;try{this.logger({step:9,status:1}),e=this.output.reduce(function(t,e){return t+e.number},0),r=this.output.reduce(function(t,e){var r=e.group,n=r.reduce(function(t,e){return t+e.length},0);return t+(u.assetLength-n-(r.length-u.cuttingEdge))},0)}catch(t){this.logger({step:9,status:0,error:t})}t({totalConsumption:e,totalWaste:r}),this.logger({step:10,status:1})}catch(t){this.logger({step:10,status:0,error:t})}return this}}])&&u(t.prototype,r),n&&u(t,n),e}()}])});