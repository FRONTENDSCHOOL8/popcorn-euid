import"./tailwind-sBOY__CM.js";import{g as e}from"./delay-JyFhHnao.js";const a=e(".movePageHome"),s=e(".movePageBoard"),c=e(".movePageLocation"),r=e(".movePageChat"),l=e(".movePageProfile"),n=e(".togetherBoard-write-off"),d=e(".togetherBoard-write-on"),m=e(".togetherBoard-plus-menu"),g=e(".write-button");function t(i){const o=i.target.parentNode.className;o.includes("Home")?window.location.href="/src/pages/story/index.html":o.includes("Board")?window.location.href="/src/pages/board/index.html":o.includes("Location")||o.includes("Chat")||(o.includes("Profile")?window.location.href="/src/pages/profile/index.html":o.includes("write")&&(window.location.href="/src/pages/writeBoard/index.html"))}function f(){n.style.display="none",d.style.display="block",v()}function v(){m.style.display="block"}a.addEventListener("click",t);s.addEventListener("click",t);c.addEventListener("click",t);r.addEventListener("click",t);l.addEventListener("click",t);n.addEventListener("click",f);g.addEventListener("click",t);
