import"./tailwind-sBOY__CM.js";import{g as o}from"./delay-JyFhHnao.js";const n=o(".movePageHome"),i=o(".movePageBoard"),c=o(".movePageLocation"),s=o(".movePageChat"),r=o(".movePageProfile"),d=o(".board-together-button");function t(a){console.log(a.target.parentNode.className);const e=a.target.parentNode.className;e.includes("Home")?window.location.href="/src/pages/story/index.html":e.includes("Board")?window.location.href="/src/pages/board/index.html":e.includes("Location")||e.includes("Chat")||(e.includes("Profile")?window.location.href="/src/pages/profile/index.html":e.includes("board-together")&&(a.preventDefault(),window.location.href="/src/pages/togetherBoard/index.html"))}n.addEventListener("click",t);i.addEventListener("click",t);c.addEventListener("click",t);s.addEventListener("click",t);r.addEventListener("click",t);d.addEventListener("click",t);
