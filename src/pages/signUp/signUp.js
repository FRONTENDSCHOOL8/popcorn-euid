<<<<<<< Updated upstream
import { addClass, removeClass } from '../../lib/dom/css';
import {
  getNode,
  toggleClass,
  setStorage,
  getNodes,
  getStorage,
} from '/src/lib/';
=======
import { removeClass } from '../../lib/dom/css';
import { getNode, toggleClass } from '/src/lib/';
import PocketBase from 'pocketbase';
>>>>>>> Stashed changes
import pb from '/src/api/pocketbase';

/* -------------------------------------------------------------------------- */
/*                               버튼으로 페이지 이동                              */
/* -------------------------------------------------------------------------- */
const goBack = getNode('.button-goBack');
const moveBack = getNode('.button-moveBack');
const signUpContainer = getNode('.signUp-container');
const signUpFormBefore = getNode('.signUp-form-before');

// 첫번째 페이지 뒤로가기
function handleButton() {
  history.back();
}

// 두번째 페이지 뒤로가기
function handlePageButton() {
  signUpContainer.style.transform = 'translateX(0%)';
}

goBack.addEventListener('click', handleButton);
moveBack.addEventListener('click', handlePageButton);
signUpFormBefore.addEventListener('submit', (e) => {
  e.preventDefault();
  signUpContainer.style.transform = 'translateX(-50%)';
});

/* -------------------------------------------------------------------------- */
/*                         휴대폰 번호 valid 상태로 변경                            */
/* -------------------------------------------------------------------------- */
// 1. input.value랑 정규식 활용하여 유효성 검사
// 2. 조건에 충족하면 버튼에 'signUp-verify-valid' 클래스 추가

const phoneNumberInput = document.getElementById('phoneNumber');
const verifyButton = getNode('.signUp-button-verify');
const agreeButton = document.getElementById('agree');
const regex = /^010\d{4}\d{4}$/;
const error = getNode('.signUp-errorMsg');

function validCheckPhoneNumber(e) {
  const phoneNumber = e.target.value;
  console.log(phoneNumber);
  const isValidPhoneNumber = regex.test(phoneNumber);

  if (isValidPhoneNumber) {
    removeClass(verifyButton, 'text-gray-500');
    addClass(verifyButton, 'signUp-verify-valid');
    verifyButton.removeAttribute('disabled');
    error.style.display = 'none';
  } else {
    removeClass(verifyButton, 'signUp-verify-valid');
    verifyButton.setAttribute('disabled', '');
    error.style.display = 'block';
    error.textContent = '핸드폰 번호를 제대로 입력해주세요';
  }
}

phoneNumberInput.addEventListener('input', validCheckPhoneNumber);

/* -------------------------------------------------------------------------- */
/*                              인증번호 받아오기                                 */
/* -------------------------------------------------------------------------- */
const randomNumber = Math.floor(Math.random() * 900000) + 100000;
const setVerifyNumber = sessionStorage.setItem('verifyNumber', randomNumber);
const getVerifyNumber = sessionStorage.getItem('verifyNumber');

function handelverifyNumber() {
  const buttonValid = Array.from(verifyButton.classList).includes(
    'signUp-verify-valid'
  );

  if (buttonValid) {
    alert(getVerifyNumber);
    // console.log(getVerifyNumber);
  }
}

// verifyButton.addEventListener('click', handelverifyNumber);
// 아래 함수에 실행되게 설정해둠

/* -------------------------------------------------------------------------- */
/*              입력한 휴대폰 번호값 localStorage에 저장하고 화면에 랜더링               */
/* -------------------------------------------------------------------------- */

async function validPhoneNumber() {
  const phoneNumberValue = getNode('.signUp-input-phoneNumber').value;
  // console.log(phoneNumberValue);

  const test = await pb.collection('users').getFullList('phoneNumber');
  // console.log(test);
  const ArrayPhoneNumber = test.map((row) => row.phoneNumber);
  const duplicatePhoneNumber = ArrayPhoneNumber.includes(phoneNumberValue);
  // console.log(duplicatePhoneNumber);

  if (duplicatePhoneNumber) {
    alert('이미 회원가입 된 번호입니다. 로그인 페이지로 이동합니다! 😃');
    window.location.href = '/src/pages/login/';
  } else {
    handelverifyNumber();
    const randomUserName = Math.floor(Math.random() * 9000) + 1000;

    setStorage('userName', randomUserName);
    setStorage('phoneNumber', phoneNumberValue);
    // console.log('저장 완료');

    const showPhoneNumber = getNode('.signUp-input-after');
    const getPhoneNumber = localStorage.getItem('phoneNumber');
    showPhoneNumber.textContent = JSON.parse(getPhoneNumber);
  }
}

verifyButton.addEventListener('click', validPhoneNumber);

/* -------------------------------------------------------------------------- */
<<<<<<< Updated upstream
/*                             인증번호 유효성 검사                                */
=======
/*                             입력번호 유효성 검사                                */
/* -------------------------------------------------------------------------- */

const verifyNumberInput = getNode('.signUp-input-verifyNumber');

function ValidVerifyNumber(e) {
  const verifyNumber = e.target.value;
  console.log(verifyNumber);

  if (getVerifyNumber === verifyNumber) {
    console.log('성공!');
    removeClass(agreeButton, 'bg-gray-500');
    toggleClass(agreeButton, 'signUp-agree-valid');
  } else {
    console.log('실패!');
    removeClass(agreeButton, 'signUp-agree-valid');
    addClass(agreeButton, 'bg-gray-500');
  }
}

verifyNumberInput.addEventListener('input', ValidVerifyNumber);

/* -------------------------------------------------------------------------- */
/*                            유효성 검사 끝나고 이동                               */
/* -------------------------------------------------------------------------- */
function allValidCheck() {
  const agreeButtonValid = Array.from(agreeButton.classList).includes(
    'signUp-agree-valid'
  );

  if (agreeButtonValid) {
    const userName = Math.floor(Math.random() * 1000) + 1000;
    const phoneNumber = localStorage.getItem('phoneNumber');

    const data = {
      username: userName,
      phoneNumber: phoneNumber,
    };

    pb.collection('users').create(data);
    window.location.href = '/src/pages/story/';
  } else {
    alert('인증번호가 잘못되었습니다.');
  }
}

agreeButton.addEventListener('click', allValidCheck);

/* -------------------------------------------------------------------------- */
/*                              pb로 데이터 전송                                 */
>>>>>>> Stashed changes
/* -------------------------------------------------------------------------- */

const verifyNumberInput = getNode('.signUp-input-verifyNumber');
const errorSecond = getNode('.signUp-errorMsg-second');

function ValidVerifyNumber(e) {
  const verifyNumber = e.target.value;
  // console.log(verifyNumber);

  if (getVerifyNumber === verifyNumber) {
    errorSecond.style.display = 'none';
    removeClass(agreeButton, 'bg-gray-500');
    toggleClass(agreeButton, 'bg-tertiary');
  } else {
    errorSecond.style.display = 'block';
    errorSecond.textContent = '인증번호를 제대로 입력해주세요';
    removeClass(agreeButton, 'bg-tertiary');
    addClass(agreeButton, 'bg-gray-500');
  }
}

verifyNumberInput.addEventListener('input', ValidVerifyNumber);

/* -------------------------------------------------------------------------- */
/*                            유효성 검사 끝나고 이동                               */
/* -------------------------------------------------------------------------- */
async function allValidCheck() {
  // pb로 새로운 핸드폰 번호 post
  const agreeButtonValid = Array.from(agreeButton.classList).includes(
    'bg-tertiary'
  );

  if (agreeButtonValid) {
    // const userName = Math.floor(Math.random() * 1000) + 1000;
    // const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));

    // const data = {
    //   username: `${userName}`,
    //   phoneNumber: `${phoneNumber}`,
    //   password: `${phoneNumber}`,
    //   passwordConfirm: `${phoneNumber}`,
    // };

    // await pb.collection('users').create(data);

    // //pb 에서 로컬스토리지로 저장
    // const records = await pb.collection('users').getFullList();
    // let isAuth = { isAuth: true };
    // let userNow = records.find(
    //   (item) => item.phoneNumber === phoneNumberInput.value
    // );
    // setStorage('userId', userNow.id);
    // setStorage('auth', isAuth);

    //story 페이지로 이동
    window.location.href = '/src/pages/category/';
  } else {
    alert('인증번호가 잘못되었습니다.');
  }
}

agreeButton.addEventListener('click', allValidCheck);

/* -------------------------------------------------------------------------- */
/*                              pb로 데이터 전송                                 */
/* -------------------------------------------------------------------------- */
// const userName = Math.floor(Math.random() * 1000) + 1000;
// const phoneNumber = localStorage.getItem('phoneNumber');
// console.log(userName);
// console.log(phoneNumber);

// async function sendData() {
//   const data = {
//     userName: `${userName}`,
//     phoneNumber: phoneNumber,
//     password: '12345678',
//     passwordConfirm: '12345678',
//   };

//   const record = await pb.collection('users').create(data);
// }

// agreeButton.addEventListener('click', sendData);

/* -------------------------------------------------------------------------- */
/*                                 타이머 설정                                   */
/* -------------------------------------------------------------------------- */
const reVerifyButton = getNode('.signUp-button-Reverify');
const timerButton = getNodes('.timer-button');
let timer = null;
let isRunning = false;

// 타이머를 업데이트하는 함수를 정의합니다.

function updateTimer() {
  const display = getNode('.target__time');
  // 유효시간 설정
  const leftSec = 60;

  // 버튼 클릭 시 시간 연장
  if (isRunning) {
    clearInterval(timer);
    display.textContent = '';
    startTimer(leftSec, display);
    handelverifyNumber();
  } else {
    startTimer(leftSec, display);
  }
}

// 타이머에 필요한 변수들을 초기화합니다.
function startTimer(count, display) {
  let minutes;
  let seconds;
  timer = setInterval(function () {
    minutes = parseInt(count / 60, 10);
    seconds = parseInt(count % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = `${minutes} : ${seconds}`;

    // 타이머 끝
    if (--count < 0) {
      clearInterval(timer);
      addClass(reVerifyButton, 'bg-gray-500');
      addClass(reVerifyButton, 'text-background');
      alert('시간초과! 인증번호를 다시 받아주세요 ⏳');
      isRunning = false;
    }
  }, 1000);
  isRunning = true;
}

// 타이머를 표시할 span 태그를 가져옵니다.
timerButton.forEach((item) => {
  item.addEventListener('click', updateTimer);
});

/* -------------------------------------------------------------------------- */
/*                       인증번호 다시 받기 클릭 시 재전송                            */
/* -------------------------------------------------------------------------- */

function resendVerifyNumber() {
  const reVerifyButtonValid =
    Array.from(reVerifyButton.classList).includes('bg-gray-500') &&
    Array.from(reVerifyButton.classList).includes('text-background');

  if (reVerifyButtonValid) {
    // 1. 새로운 인증번호 전송 (session에서 새로운 인증번호 받고 보내주기)
    // 2. 인증번호랑 Input값이랑 일치하는지 확인
    // 3. 일치하면 인증하기 버튼 활성화
    // 4. 타이머 다시 실행
    alert(getVerifyNumber);
  }
}
reVerifyButton.addEventListener('click', resendVerifyNumber);
