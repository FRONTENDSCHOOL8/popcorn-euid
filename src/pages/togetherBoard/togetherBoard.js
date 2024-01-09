import gsap from 'gsap';
import { getNode } from '/src/lib/';

const writeButton = getNode('.togetherBoard-write-off');
const writeOnButton = getNode('.togetherBoard-write-on');
const plusMenu = getNode('.togetherBoard-plus-menu');
const writeBoard = getNode('.write-button');

function handleMove() {
  window.location.href = '/src/pages/writeBoard/index.html';
}

function handleWrite() {
  writeButton.style.display = 'none';
  writeOnButton.style.display = 'block';
  toggleMenu();
}

function toggleMenu() {
  plusMenu.style.display = 'block';

  const tl = gsap.timeline({
    defaults: {
      opacity: 0,
    },
  });
  tl.from(plusMenu, { y: 30 })
    // .from(plusMenu, { scaleY: 0 }, '<')
    .from('form > *', { y: 30, stagger: 0.1 });
  // .from(plusMenu, { y: -30 }, '-=0.2');
}

writeButton.addEventListener('click', handleWrite);
writeBoard.addEventListener('click', handleMove);
