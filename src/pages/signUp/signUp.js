import { addClass, removeClass } from '../../lib/dom/css';
import { getNode, toggleClass } from '/src/lib/';
import PocketBase from 'pocketbase';
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

function validCheckPhoneNumber(e) {
  const phoneNumber = e.target.value;
  console.log(phoneNumber);
  const isValidPhoneNumber = regex.test(phoneNumber);

  if (isValidPhoneNumber) {
    removeClass(verifyButton, 'text-gray-500');
    toggleClass(verifyButton, 'signUp-verify-valid');
  } else {
    removeClass(verifyButton, 'signUp-verify-valid');
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
    // 인증번호 비교 위해 콘솔로 불러오기 -> 로컬이라 변수 설정 다시 하기!
    console.log(getVerifyNumber);
  }
}

// verifyButton.addEventListener('click', handelverifyNumber);

/* -------------------------------------------------------------------------- */
/*              입력한 휴대폰 번호값 localStorage에 저장하고 화면에 랜더링               */
/* -------------------------------------------------------------------------- */

async function validPhoneNumber() {
  const phoneNumberValue = getNode('.signUp-input-phoneNumber').value;
  console.log(phoneNumberValue);

  const test = await pb.collection('users').getFullList('phoneNumber');
  const ArrayPhoneNumber = test.map((row) => row.phoneNumber);
  const duplicatePhoneNumber = ArrayPhoneNumber.includes(phoneNumberValue);
  console.log(duplicatePhoneNumber);

  if (duplicatePhoneNumber === true) {
    alert('이미 회원가입 된 번호입니다. 로그인 페이지로 이동합니다! 😃');
    window.location.href = '/src/pages/login/';
  } else {
    handelverifyNumber();
    const sendPhoneNumber = JSON.stringify(phoneNumberValue);

    localStorage.setItem('phoneNumber', sendPhoneNumber);
    console.log('저장 완료');

    const showPhoneNumber = getNode('.signUp-input-after');
    const getPhoneNumber = localStorage.getItem('phoneNumber');
    showPhoneNumber.textContent = JSON.parse(getPhoneNumber);
  }
}

verifyButton.addEventListener('click', validPhoneNumber);

/* -------------------------------------------------------------------------- */
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
async function allValidCheck() {
  const agreeButtonValid = Array.from(agreeButton.classList).includes(
    'signUp-agree-valid'
  );

  if (agreeButtonValid) {
    const userName = Math.floor(Math.random() * 1000) + 1000;
    const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));

    const data = {
      username: `${userName}`,
      phoneNumber: `${phoneNumber}`,
      password: '12345678',
      passwordConfirm: '12345678',
    };

    await pb.collection('users').create(data);
    window.location.href = '/src/pages/story/';
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
/*                             휴대폰 번호 중복 검사                               */
/* -------------------------------------------------------------------------- */

// const test = await pb.collection('users').getFullList('phoneNumber');
// const ArrayPhoneNumber = test.map((row) => row.phoneNumber);
// const duplicatePhoneNumber = ArrayPhoneNumber.includes(phoneNumberValue);
// console.log(duplicatePhoneNumber);

/* -------------------------------------------------------------------------- */
/*                               인증번호 타이머                                  */
/* -------------------------------------------------------------------------- */
// 타이머 초기값 설정 (5분)
let minutes = 0;
let seconds = 5;

// 타이머 업데이트 함수
function updateTimer() {
  // 남은 시간 표시 엘리먼트 가져오기
  const remainingMin = document.getElementById('remaining__min');
  const remainingSec = document.getElementById('remaining__sec');

  // 남은 시간 갱신
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      // 타이머 종료 후 처리할 작업 추가하기 (예: 인증문자 재요청 처리)
      const verifyAgainButton = getNode('.signUp-button-Reverify');
      verifyButton.disabled = true; // 버튼 비활성화
      addClass(agreeButton, 'bg-bluegray-500'); // 버튼 비활성화
      addClass(verifyAgainButton, 'bg-gray-500'); // 버튼 색상 변경
      addClass(verifyAgainButton, 'text-background'); // 버튼 색상 변경
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  // 남은 시간 표시 업데이트
  remainingMin.textContent = `(${minutes.toString().padStart(2, '0')}`;
  remainingSec.textContent = `${seconds.toString().padStart(2, '0')})`;
}

// 1초마다 타이머 업데이트
const timer = setInterval(updateTimer, 1000);
let isTimerEnded = false;

// 타이머 종료 조건
if (minutes === 0 && seconds === 0) {
  clearInterval(timer);
  // 타이머 종료 후 처리할 작업 추가하기 (예: 인증문자 재요청 처리)
  // 여기에 작성해주세요
  isTimerEnded = true;
}

verifyButton.addEventListener('click', function () {
  if (isTimerEnded) {
    alert('버튼이 클릭되었습니다!');
  }
});

// verifyButton.addEventListener('click', updateTimer);
