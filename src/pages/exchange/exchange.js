import { getNode, insertFirst } from '/src/lib/';
import { gsap } from 'gsap';

/* -------------------------------------------------------------------------- */
/*                             toggle plus button                             */
/* -------------------------------------------------------------------------- */

const plusButton = getNode('.exchange-button');
let isUlVisible = false;

function handleButton() {
  if (isUlVisible) {
    gsap.to('.exchange-button-ul > ul > li', {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      onComplete: () => {
        plusButton.classList.add('exchange-button-no');
        gsap.to(plusButton, {
          backgroundColor: 'rgb(55 63 103)',
          duration: 0.2,
        });
        removeList();
        plusButton.classList.remove('exchange-button-active');
      },
    });
  } else {
    gsap.to(plusButton, {
      backgroundColor: 'rgb(255 255 255)',
      duration: 0.6,
    });
    plusButton.classList.remove('exchange-button-no');
    plusButton.classList.add('exchange-button-active');
    addList();
    gsap.from('.exchange-button-ul > ul > li', {
      y: 30,
      opacity: 0,
      stagger: {
        each: 0.05,
        from: 'end',
      },
    });
  }

  isUlVisible = !isUlVisible;
}

function addList() {
  const img = /* html */ `
  <img src="/public/images/plusTapActive.svg" alt="" />
  `;

  const ul = /* html */ `
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
  `;

  plusButton.innerHTML = img;
  insertFirst('.exchange-button-ul', ul);
}

function removeList() {
  const list = document.querySelector('.exchange-button-ul');

  plusButton.innerHTML = '<img src="/public/images/plusTap.svg" alt="" />';
  list.innerHTML = '';
}

plusButton.addEventListener('click', handleButton);
