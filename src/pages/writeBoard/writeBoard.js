import { getNode } from '/src/lib/';
import gsap from 'gsap';

const nextButton = getNode('.writeBoardSecond-next-button');

function handleNext(event) {
  event.preventDefault();

  //  window.innerWidth는 현재 창의 너비를 나타내는 JavaScript의 내장 속성
  const screens = document.querySelectorAll('.w-screen'); // 모든 w-screen 요소 선택

  if (screens.length >= 2) {
    const currentScreen = document.querySelector('.w-screen:not(.hidden)'); // 현재 띄워져 있는 화면 선택

    const currentIndex = Array.from(screens).indexOf(currentScreen); // 현재 화면의 인덱스 찾기

    if (currentIndex >= 0 && currentIndex < screens.length - 1) {
      const nextScreen = screens[currentIndex + 1]; // 다음 화면 선택
      currentScreen.classList.add('hidden'); // 현재 화면에 hidden 클래스 추가
      nextScreen.classList.remove('hidden'); // 다음 화면에서 hidden 클래스 제거

      const screenWidth = window.innerWidth;
      //   gsap.to('.w-screen', { x: -screenWidth, ease: 'power2.inOut' });
    }

    if (currentIndex === 2) {
      moveChatPage();
      nextButton.textContent = '채팅방으로 이동';
    }
  }
}

function moveChatPage() {
  const moveChatPage = getNode('.writeBoardSecond-next-button');
  moveChatPage.addEventListener('click', () => {
    window.location.href = '/src/pages/chatScreen/index.html';
  });
}

nextButton.addEventListener('click', handleNext);
