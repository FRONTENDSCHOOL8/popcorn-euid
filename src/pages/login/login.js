import { addClass, removeClass } from '../../lib/dom/css';
import { getNode, toggleClass, setStorage } from '/src/lib/';
import pb from '/src/api/pocketbase';

/* -------------------------------------------------------------------------- */
/*                               버튼으로 페이지 이동                              */
/* -------------------------------------------------------------------------- */
const goBack = getNode('.button-goBack');
const moveBack = getNode('.button-moveBack');
const loginContainer = getNode('.login-container');
const loginFormBefore = getNode('.login-form-before');

// 첫번째 페이지 뒤로가기
function handleButton() {
  history.back();
}

// 두번째 페이지 뒤로가기
function handlePageButton() {
  loginContainer.style.transform = 'translateX(0%)';
}

goBack.addEventListener('click', handleButton);
moveBack.addEventListener('click', handlePageButton);
loginFormBefore.addEventListener('submit', (e) => {
  e.preventDefault();
  loginContainer.style.transform = 'translateX(-50%)';
});

/* -------------------------------------------------------------------------- */
/*                      휴대폰 번호 valid 검사 후 버튼 활성화                        */
/* -------------------------------------------------------------------------- */
// 1. 정규식이랑 input.value 비교 후
// 2. 유효성 검사 통과하면 버튼 활성화

const phoneNumberInput = document.getElementById('phoneNumber'); // 핸드폰번호 input
const verifyButton = getNode('.login-button-verify'); // 인증번호 받기 button
const agreeButton = document.getElementById('agree'); // 동의하고 시작하기 button
const regex = /^010\d{4}\d{4}$/;

function validCheckPhoneNumber(e) {
  const phoneNumber = e.target.value;
  console.log(phoneNumber);
  const isValidPhoneNumber = regex.test(phoneNumber);

  if (isValidPhoneNumber) {
    console.log('성공');
    removeClass(verifyButton, 'text-gray-500');
    toggleClass(verifyButton, 'signUp-verify-valid');
  } else {
    console.log('실패');
    removeClass(verifyButton, 'signUp-verify-valid');
  }
}

phoneNumberInput.addEventListener('input', validCheckPhoneNumber);

/* -------------------------------------------------------------------------- */
/*             휴대폰 번호 중복 검사 및 localStorage에 저장 / 인증번호 받아오기           */
/* -------------------------------------------------------------------------- */
const randomNumber = Math.floor(Math.random() * 900000) + 100000;
const setVerifyNumber = sessionStorage.setItem('verifyNumber', randomNumber);
const getVerifyNumber = sessionStorage.getItem('verifyNumber');

async function checkDuplicate() {
  const phoneNumberValue = getNode('.login-input-phoneNumber').value;
  console.log(phoneNumberValue);
  const test = await pb.collection('users').getFullList('phoneNumber');
  const ArrayPhoneNumber = test.map((row) => row.phoneNumber);
  const duplicatePhoneNumber = ArrayPhoneNumber.includes(phoneNumberValue);
  console.log(duplicatePhoneNumber);
  try {
    if (duplicatePhoneNumber) {
      // 인증번호 받아오기
      alert(getVerifyNumber);
      console.log(getVerifyNumber);
      // localStorage에 저장
      const sendPhoneNumber = JSON.stringify(phoneNumberValue);
      localStorage.setItem('phoneNumber', sendPhoneNumber);
      console.log('저장 완료');
    } else {
      alert('등록되지 않은 번호입니다. 회원가입 페이지로 이동합니다! 😃');
      window.location.href = '/src/pages/signUp/';
    }

    // 입력한 번호 화면에 랜더링
    const showPhoneNumber = getNode('.login-input-after');
    const getPhoneNumber = localStorage.getItem('phoneNumber');
    showPhoneNumber.textContent = JSON.parse(getPhoneNumber);
  } catch {
    alert('핸드폰번호가 일치하지 않습니다.');
  }
}

verifyButton.addEventListener('click', checkDuplicate);

/* -------------------------------------------------------------------------- */
/*                             입력번호 유효성 검사                                */
/* -------------------------------------------------------------------------- */

const verifyNumberInput = getNode('.login-input-verifyNumber');

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

  const records = await pb.collection('users').getFullList();
  console.log(phoneNumberInput.value);

  if (agreeButtonValid) {
    //pb 에서 로컬스토리지로 저장
    let isAuth = { isAuth: true };
    let userNow = records.find(
      (item) => item.phoneNumber === phoneNumberInput.value
    );
    setStorage('userId', userNow.id);
    setStorage('auth', isAuth);

    //story 페이지로 이동
    window.location.href = '/src/pages/story/';
  } else {
    alert('인증번호가 잘못되었습니다.');
  }
}

agreeButton.addEventListener('click', allValidCheck);
