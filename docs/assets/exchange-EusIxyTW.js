import"./tailwind-6aAOAmML.js";import{g as l}from"./delay-JyFhHnao.js";import{g as n}from"./index-35H_NU9g.js";function o(e,a){typeof e=="string"&&(e=l(e)),e.insertAdjacentHTML("afterbegin",a)}const c="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.1666%2015.1644H15.1666V22.1644H12.8333V15.1644H5.83325V12.8311H12.8333V5.83105H15.1666V12.8311H22.1666V15.1644Z'%20fill='black'/%3e%3c/svg%3e",s="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.1668%2015.1644H15.1668V22.1644H12.8335V15.1644H5.8335V12.8311H12.8335V5.83105H15.1668V12.8311H22.1668V15.1644Z'%20fill='white'/%3e%3c/svg%3e",t=l(".exchange-button");let i=!1;function u(){i?n.to(".exchange-button-ul > ul > li",{y:30,opacity:0,stagger:.05,onComplete:()=>{t.classList.add("exchange-button-no"),n.to(t,{backgroundColor:"rgb(55 63 103)",duration:.2}),b(),t.classList.remove("exchange-button-active")}}):(n.to(t,{backgroundColor:"rgb(255 255 255)",duration:.6}),t.classList.remove("exchange-button-no"),t.classList.add("exchange-button-active"),g(),n.from(".exchange-button-ul > ul > li",{y:30,opacity:0,stagger:{each:.05,from:"end"}})),i=!i}function g(){const e=`
  <img src="${c}" alt="" />
  `,a=`
  <ul>
    <li class="exchange-headset exchange-li-button">
      <button type="button" aria-label="헤드셋 품목만 정렬">
      🎧헤드셋
      </button>
    </li>
    <li class="exchange-keyboard exchange-li-button">
      <button type="button" aria-label="키보드 품목만 정렬">
      ⌨키보드
      </button>
    </li>
    <li class="exchange-mouse exchange-li-button">
      <button type="button" aria-label="마우스 품목만 정렬">
      🖱️마우스
      </button>
    </li>
    <li class="exchange-computer exchange-li-button">
      <button type="button" aria-label="컴퓨터 품목만 정렬">
      💻컴퓨터
      </button>
    </li>
    <li class="exchange-etc exchange-li-button">
      <button type="button" aria-label="기타 품목만 정렬">
      🎈기타 등등
      </button>
    </li>
    <li class="exchange-write exchange-li-write">
      <button type="button" aria-label="글쓰기">
      📃작성하기
      </button>
    </li>
  </ul>
  `;t.innerHTML=e,o(".exchange-button-ul",a)}function b(){const e=document.querySelector(".exchange-button-ul");t.innerHTML=`<img src="${s}" alt="" />`,e.innerHTML=""}t.addEventListener("click",u);
