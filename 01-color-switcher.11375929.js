const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){o(t.startBtn),r(t.stopBtn),n=setInterval(e,1e3,t.body)})),t.stopBtn.addEventListener("click",(function(){o(t.stopBtn),r(t.startBtn),clearInterval(n)})),o(t.stopBtn);let n=null;function e(t){t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}function o(t){t.setAttribute("disabled","disabled")}function r(t){t.removeAttribute("disabled")}
//# sourceMappingURL=01-color-switcher.11375929.js.map
