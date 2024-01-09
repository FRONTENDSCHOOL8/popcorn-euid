import gsap from 'gsap';
import { getNode, getNodes } from '/src/lib/';

const writeButton = getNode('.togetherBoard-write-off');
const writeOnButton = getNode('.togetherBoard-write-on');
const plusMenu = getNode('.togetherBoard-plus-menu');
const writeBoard = getNode('.write-button');
const togetherBoardButton = getNodes('.togetherBoard');
const togetherTitle = getNode('.together-title');

const buttonStates = {};

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
  tl.from(plusMenu, { y: 30 }).from('form > *', { y: 30, stagger: 0.1 });
}
function handleClickOutside(event) {
  if (!writeButton.contains(event.target) && !plusMenu.contains(event.target)) {
    // 버튼과 메뉴 이외의 영역을 클릭했을 때
    writeButton.style.display = 'block';
    writeOnButton.style.display = 'none';
    plusMenu.style.display = 'none';
  }
}

function handleClickMenu(event) {
  const button = event.target;

  if (event.target.className.includes('togetherBoard-border')) {
    button.style.color = '#5a85ee';
    button.style.borderColor = '#5a85ee';
    button.style.borderStyle = 'solid';
    button.style.borderWidth = '2px';
  }
  if (event.target.className.includes('togetherTitle')) {
    button.style.color = '#5a85ee';
  }
}

togetherBoardButton.forEach((button) => {
  button.addEventListener('click', handleClickMenu);
});

writeButton.addEventListener('click', handleWrite);
writeBoard.addEventListener('click', handleMove);
document.addEventListener('click', handleClickOutside);
