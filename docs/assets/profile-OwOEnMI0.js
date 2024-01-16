import"./tailwind-NE021wVL.js";import{a as g}from"./css-LUmow4Y_.js";import{g as o,a as u}from"./delay-g6vF19wW.js";import{i as s}from"./insert-vWB_d1l7.js";import{g as y,d as m,s as L}from"./storage-eNv634Ip.js";import{a as h,r as f}from"./rendering-oARfkKZz.js";import{g as b}from"./getPbImageURL-99Z79ldm.js";import{t as k}from"./timeAgo-WbyvHha8.js";import{p as a}from"./pocketbase-UOLpUAtS.js";const P=o(".profile-button-close"),$=u(".profile-listBox-button"),v=o(".profile-button-more"),C=o(".profile-temperatureBar-container"),E=o(".profile-button-logOut");let l=0,n=0;function B(){history.back()}P.addEventListener("click",B);function S(){const t=this.nextElementSibling,e=this.querySelector("button");t.classList.toggle("hidden"),e.classList.toggle("rotate-90")}$.forEach(t=>{t.addEventListener("click",S)});const A=await a.collection("users").getFullList(),p=await y("userId");let i=A.find(t=>t.id===p);h(".rendering-photo",i);f(".rendering-box",i);function N(){Array.from(u(".profile-textPrivacy")).forEach(e=>{let r=`${e.textContent.slice(0,4)}***`;e.textContent=r})}N();const F=await a.collection("likes").getFullList({expand:"product"}),w=await a.collection("products").getFullList({expand:"user"});async function M(){F.forEach(d=>{d.expand&&p===d.expand.product.userPost&&l++});let t=36.5+l*.5;const e=`
  <div class="flex">
            <span
              class="profile-temperture-start text-sm ml-[25%] text-Contents-contentSecondary after:bg-temperatureAngle after:w-[0.625rem] after:h-[0.375rem] after:inline-block after:absolute after:bottom-0 after:left-[50%] after:bg-no-repeat relative"
            >
              첫 온도 36.5
            </span>
            <span
              class="profile-temperature-now text-secondary text-base font-semibold ml-auto inline-block"
              >${t} 🥰</span
            >
          </div>
          <div
            class="profile-temperature-box w-full h-2 bg-Contents-contentSecondary rounded-full overflow-hidden mt-1"
          >
            <div
              class="profile-temperture-bar h-full  bg-primary"
            ></div>
          </div>
          `;s(C,e);const r=o(".profile-temperture-bar");r.style.width=`${t}%`;const c={mannerTemp:`${t}`};await a.collection("users").update(i.id,c)}M();async function O(){if(w.forEach(t=>{p===t.userPost&&n++}),n!==0){const e=`
    <p class=" text-base">받은 좋아요 ${Math.floor(l/n*100)}%</p>
    <p class=" text-base text-Contents-contentSecondary">
      ${n}개 중 ${l}명이 만족
    </p>
    `;s(".profile-like-Box",e)}else{const t=`
    <p class=" text-base">회원님을 좋아하는 건 팝콘뿐🥰</p>
    <p class=" text-base text-Contents-contentSecondary">
      ${n}개 중 ${l}명이 만족
    </p>
    `;s(".profile-like-Box",t)}}O();const T=await a.collection("badges").getFullList({expand:"user"});function H(){const t=T.filter(e=>e.user===i.id);t.length===0&&s(".profile-listBox-hiddenArea","뱃지가 없네요😳"),t.forEach(e=>{const r=`
      <div class="w-10 h-10 rounded-full bg-secondary">
      <img src="${b(e)}" tite="${e.title}" alt="${e.title}" />
      </div>
    `;s(".profile-listBox-hiddenArea",r)}),s(".badge-count",`${t.length}`)}H();async function I(){const t=[];w.forEach(e=>{p===e.userPost&&t.push(e)}),s(".profile-myProductList",`${n}`),t.forEach(e=>{const r=`
                <a href="/src/pages/exchangeBoard/index.html#${e.id}" class="flex gap-2 items-center relative">
                  <div class="w-12 h-12  rounded-lg overflow-hidden">
                    <img
                    class="w-full h-full object-center"
                    src="${b(e,"images")}"
                    alt="${e.alt}"
                    />
                  </div>
                  <p class="font-semibold text-base">${e.title}</p>
                  <span
                    class="profile-myProduct-state text-sm bg-gray-200 px-1.5 py-0.5 rounded-full absolute right-0"
                    >${e.state}</span
                  >
                </a>
    `;s(".profile-myPostList-container",r)}),n==0&&s(".profile-myPostList-container",`
    <a href="/src/pages/exchangePost/ " >
    <p class="text-base text-secondary ">상품을 등록해주세요</p>
    </a>
    `)}I();function R(){u(".profile-myProduct-state").forEach(e=>{e.textContent==="done"?(e.textContent="거래완료",e.classList.add("bg-secondary","text-background")):e.textContent==="reservation"?(e.textContent="예약중",e.classList.add("bg-bluelight-300")):(e.textContent="",e.classList.remove("bg-gray-200"))})}R();const U=await a.collection("reviews").getFullList({expand:"user, post"});let x=0;function j(){U.forEach(t=>{const e=t.expand.user,r=t,c=t.expand.post,d=o(".profile-review-link");c.userPost===i.id&&(x++,h(".reviewer-photo",e),f(".reviewer-box",e),f(".review-box",r),d.href=`/src/pages/exchangeBoard/index.html#${c.id}`,o(".review-time").textContent=k(r.created))}),x===0&&(g(".review-textBox","hidden"),g(v,"hidden"),o(".review-box-content").textContent="남겨진 후기가 없어요")}j();v.addEventListener("click",t=>{t.currentTarget.nextElementSibling.classList.toggle("hidden")});async function q(){m(),L("auth",{isAuth:!1}),window.location.href="/"}E.addEventListener("click",q);function D(){o(".delete-modal").showModal()}o(".profile-delete-button").addEventListener("click",D);o(".profile-button-cancel").addEventListener("click",()=>{o(".delete-modal").close()});o(".profile-button-userDelete").addEventListener("click",async()=>{await a.collection("users").delete(i.id),m(),window.location.href="/"});
