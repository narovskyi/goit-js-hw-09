const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){o(t.startBtn),r=t.stopBtn,r.removeAttribute("disabled"),e=setInterval(n,1e3,t.body);var r})),t.stopBtn.addEventListener("click",onStopBtnClick),o(t.stopBtn);let e=null;function n(t){t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}function o(t){t.setAttribute("disabled","disabled")}
//# sourceMappingURL=01-color-switcher.8c5d9118.js.map