import {
  getNode,
  getNodes,
  getStorage,
  setStorage,
  getPbImageURL,
  insertLast,
  deleteStorage,
  removeElement,
  rendering,
  renderingPhoto,
  addClass,
  timeAgo,
} from '/src/lib/';
import { gsap } from 'gsap';
import pb from '/src/api/pocketbase';

const profileClose = getNode('.profile-button-close');
const profileList = getNodes('.profile-listBox-button');
const commentMore = getNode('.profile-button-more');
const temperatureBox = getNode('.profile-temperatureBar-container');
const logOutButton = getNode('.profile-button-logOut');

// 좋아요 수
let likeCount = 0;
//상품의 수
let productCount = 0;

/* -------------------------------------------------------------------------- */
/*                             profile;                                      */
/* -------------------------------------------------------------------------- */

//profile 닫힘 버튼
function closeHandler() {
  history.back();
}
profileClose.addEventListener('click', closeHandler);

//profile listBox 버튼
function listHandler() {
  const hiddenBox = this.nextElementSibling;
  const direction = this.querySelector('button');
  hiddenBox.classList.toggle('hidden');
  direction.classList.toggle('rotate-90');
}

profileList.forEach((item) => {
  item.addEventListener('click', listHandler);
});

/* -------------------------------------------------------------------------- */
/*                             pocketbase profile;                            */
/* -------------------------------------------------------------------------- */

//현재 로그인한 유저id
const records = await pb.collection('users').getFullList();
const userValid = await getStorage('userId');
let userNow = records.find((item) => item.id === userValid);

//프로필 사진 랜더링
renderingPhoto('.rendering-photo', userNow);

//프로필 랜더링
rendering('.rendering-box', userNow);
//profile 유저네임 프라이버시
function userNamePrivacy() {
  const textPrivacy = Array.from(getNodes('.profile-textPrivacy'));
  textPrivacy.forEach((item) => {
    let sliceName = `${item.textContent.slice(0, 4)}***`;
    item.textContent = sliceName;
  });
}
userNamePrivacy();

/* -------------------------------------------------------------------------- */
/*                                 temperature                                */
/* -------------------------------------------------------------------------- */

const likes = await pb.collection('likes').getFullList({
  expand: 'product',
});
const products = await pb.collection('products').getFullList({
  expand: 'user',
});

async function temperatureBar() {
  likes.forEach((item) => {
    if (item.expand && userValid === item.expand.product.userPost) {
      likeCount++;
    }
  });

  let myTemperature = 36.5 + likeCount * 0.5;

  const template = /*html*/ `
  <div class="flex">
            <span
              class="profile-temperture-start text-sm ml-[25%] text-Contents-contentSecondary after:bg-temperatureAngle after:w-[0.625rem] after:h-[0.375rem] after:inline-block after:absolute after:bottom-0 after:left-[50%] after:bg-no-repeat relative"
            >
              첫 온도 36.5
            </span>
            <span
              class="profile-temperature-now text-secondary text-base font-semibold ml-auto inline-block"
              >${myTemperature} 🥰</span
            >
          </div>
          <div
            class="profile-temperature-box w-full h-2 bg-Contents-contentSecondary rounded-full overflow-hidden mt-1"
          >
            <div
              class="profile-temperture-bar h-full  bg-primary"
            ></div>
          </div>
          `;
  insertLast(temperatureBox, template);
  const bar = getNode('.profile-temperture-bar');
  bar.style.width = `${myTemperature}%`;
  const data = { mannerTemp: `${myTemperature}` };
  await pb.collection('users').update(userNow.id, data);
}

temperatureBar();

/* -------------------------------------------------------------------------- */
/*                                    like                                    */
/* -------------------------------------------------------------------------- */

async function likeCounting() {
  products.forEach((item) => {
    if (userValid === item.userPost) {
      productCount++;
    }
  });
  if (productCount !== 0) {
    let likePercentage = Math.floor((likeCount / productCount) * 100);
    const template = /*html*/ `
    <p class=" text-base">받은 좋아요 ${likePercentage}%</p>
    <p class=" text-base text-Contents-contentSecondary">
      ${productCount}개 중 ${likeCount}명이 만족
    </p>
    `;
    insertLast('.profile-like-Box', template);
  } else {
    const template = /*html*/ `
    <p class=" text-base">회원님을 좋아하는 건 팝콘뿐🥰</p>
    <p class=" text-base text-Contents-contentSecondary">
      ${productCount}개 중 ${likeCount}명이 만족
    </p>
    `;
    insertLast('.profile-like-Box', template);
  }
}

likeCounting();

/* -------------------------------------------------------------------------- */
/*                                active badge                                */
/* -------------------------------------------------------------------------- */
const badges = await pb.collection('badges').getFullList({
  expand: 'user',
});
function renderingBadge() {
  const userBadges = badges.filter((item) => item.user === userNow.id);
  if (userBadges.length === 0) {
    insertLast('.profile-listBox-hiddenArea', '뱃지가 없네요😳');
  }
  userBadges.forEach((item) => {
    const template =
      /*html*/
      `
      <div class="w-10 h-10 rounded-full bg-secondary">
      <img src="${getPbImageURL(item)}" tite="${item.title}" alt="${
        item.title
      }" />
      </div>
    `;
    insertLast('.profile-listBox-hiddenArea', template);
  });
  insertLast('.badge-count', `${userBadges.length}`);
}
renderingBadge();

/* -------------------------------------------------------------------------- */
/*                              exchange Product                              */
/* -------------------------------------------------------------------------- */

async function renderingMyProducts() {
  const myPostList = [];
  products.forEach((item) => {
    if (userValid === item.userPost) {
      myPostList.push(item);
    }
  });
  insertLast('.profile-myProductList', `${productCount}`);
  myPostList.forEach((item) => {
    const template = /*html*/ `
                <a href="/src/pages/exchangeBoard/index.html#${
                  item.id
                }" class="flex gap-2 items-center relative">
                  <div class="w-12 h-12  rounded-lg overflow-hidden">
                    <img
                    class="w-full h-full object-center"
                    src="${getPbImageURL(item, 'images')}"
                    alt="${item.alt}"
                    />
                  </div>
                  <p class="font-semibold text-base">${item.title}</p>
                  <span
                    class="profile-myProduct-state text-sm bg-gray-200 px-1.5 py-0.5 rounded-full absolute right-0"
                    >${item.state}</span
                  >
                </a>
    `;
    insertLast('.profile-myPostList-container', template);
  });
  if (productCount == 0) {
    const templateNone =
      /*html*/
      `
    <a href="/src/pages/exchangePost/ " >
    <p class="text-base text-secondary ">상품을 등록해주세요</p>
    </a>
    `;
    insertLast('.profile-myPostList-container', templateNone);
  }
}
renderingMyProducts();

//product state에 따른 상태표시창

function myProductState() {
  const state = getNodes('.profile-myProduct-state');
  state.forEach((item) => {
    if (item.textContent === 'done') {
      item.textContent = '거래완료';
      item.classList.add('bg-secondary', 'text-background');
    } else if (item.textContent === 'reservation') {
      item.textContent = '예약중';
      item.classList.add('bg-bluelight-300');
    } else {
      item.textContent = '';
      item.classList.remove('bg-gray-200');
    }
  });
}

myProductState();
/* -------------------------------------------------------------------------- */
/*                              Product reviews                              */
/* -------------------------------------------------------------------------- */
const reviews = await pb.collection('reviews').getFullList({
  expand: 'user, post',
});
let reviewCount = 0;

function reveiwerRendering() {
  reviews.forEach((item) => {
    const reviewer = item.expand.user;
    const review = item;
    const post = item.expand.post;
    const reviewLink = getNode('.profile-review-link');

    if (post.userPost === userNow.id) {
      reviewCount++;
      renderingPhoto('.reviewer-photo', reviewer);
      rendering('.reviewer-box', reviewer);
      rendering('.review-box', review);
      reviewLink.href = `/src/pages/exchangeBoard/index.html#${post.id}`;
      getNode('.review-time').textContent = timeAgo(review.created);
    }
  });
  if (reviewCount === 0) {
    addClass('.review-textBox', 'hidden');
    addClass(commentMore, 'hidden');
    getNode('.review-box-content').textContent = '남겨진 후기가 없어요';
  }
}
reveiwerRendering();
commentMore.addEventListener('click', (e) => {
  e.currentTarget.nextElementSibling.classList.toggle('hidden');
});

/* -------------------------------------------------------------------------- */
/*                                   logOut                                   */
/* -------------------------------------------------------------------------- */

async function userLogOut() {
  deleteStorage();
  let isAuth = { isAuth: false };
  setStorage('auth', isAuth);
  window.location.href = '/';
}

logOutButton.addEventListener('click', userLogOut);

/* -------------------------------------------------------------------------- */
/*                                    탈퇴하기                                    */
/* -------------------------------------------------------------------------- */

function deleteUser() {
  getNode('.delete-modal').showModal();
}
getNode('.profile-delete-button').addEventListener('click', deleteUser);
getNode('.profile-button-cancel').addEventListener('click', () => {
  getNode('.delete-modal').close();
});
getNode('.profile-button-userDelete').addEventListener('click', async () => {
  await pb.collection('users').delete(userNow.id);
  deleteStorage();
  window.location.href = '/';
});
