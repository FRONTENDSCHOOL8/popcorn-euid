import"./tailwind-md187qH2-sjl9nnAU.js";import{o}from"./delay-JyFhHnao-rzhtmnxh.js";const c=o(".writeBoardSecond-next-button");function i(r){r.preventDefault();const e=document.querySelectorAll(".w-screen");if(e.length>=2){const n=document.querySelector(".w-screen:not(.hidden)"),t=Array.from(e).indexOf(n);if(t>=0&&t<e.length-1){const d=e[t+1];n.classList.add("hidden"),d.classList.remove("hidden")}t===2&&(s(),c.textContent="채팅방으로 이동")}}function s(){o(".writeBoardSecond-next-button").addEventListener("click",()=>{window.location.href="/src/pages/chatScreen/index.html"})}c.addEventListener("click",i);