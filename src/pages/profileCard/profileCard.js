import {
  getNode,
  getStorage,
  getNodes,
  addClass,
  removeClass,
  rendering,
  renderingPhoto,
} from '/src/lib/';
import pb from '/src/api/pocketbase';

//profileCard 닫힘 버튼
const profileCardClose = getNode('.profileCard-button-close');
const profileButtonEdit = getNode('.profileCard-button-edit');
const profileCardEditSubmit = getNode('.profileCard-button-submit');
const buttonMoveProfileDetails = getNode('.profileCard-button-details');
const profileCardEditClose = getNode('.profileCard-button-editClose');
const profileImageInput = getNode('#avatar');

function closeHandler() {
  history.back();
}
profileCardClose.addEventListener('click', closeHandler);

/* -------------------------------------------------------------------------- */
/*                                  유저정보 불러오기                                 */
/* -------------------------------------------------------------------------- */

//현재 로그인한 유저id
const userRecords = await pb.collection('users').getFullList();
const userValid = await getStorage('userId');
let userNow = userRecords.find((item) => item.id === userValid);

/* -------------------------------------------------------------------------- */
/*                                  성별/연령 비공개                                 */
/* -------------------------------------------------------------------------- */

async function privacySetting() {
  const genderPrivacy = await getStorage('genderPrivacy');
  const agePrivacy = await getStorage('agePrivacy');
  if (genderPrivacy === 'true') {
    getNode('.profile-gender-privacy').textContent = '비공개';
  }
  if (agePrivacy === 'true') {
    getNode('.profile-age-privacy').textContent = '비공개';
  }
}

/* -------------------------------------------------------------------------- */
/*                                   랜더링 순서                                   */
/* -------------------------------------------------------------------------- */

async function renderingIndex() {
  await rendering('.rendering-box', userNow);
  privacySetting();
}
renderingIndex();

//유저 정보 랜더링

// rendering('.rendering-box', userNow);

//프로필 사진 랜더링
renderingPhoto('.rendering-photo', userNow);

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
/*                              profile 유저 정보 수정                              */
/* -------------------------------------------------------------------------- */
//input 창 보이기
function showEditUserInfo() {
  addClass('.profileCard-area-info', 'hidden');
  addClass('.profileCard-button-edit', 'hidden');
  removeClass('.profileCard-area-edit', 'hidden');
  removeClass('.profileCard-button-editClose', 'hidden');
}

profileButtonEdit.addEventListener('click', showEditUserInfo);
//input창 닫기

profileCardEditClose.addEventListener('click', () => {
  removeClass('.profileCard-area-info', 'hidden');
  removeClass('.profileCard-button-edit', 'hidden');
  addClass('.profileCard-area-edit', 'hidden');
  addClass('.profileCard-button-editClose', 'hidden');
});

//radio value 값 가져오기
const radios = Array.from(getNodes('.radio-gender'));
function radioValue() {
  const radioChecked = radios.find((item) => item.checked === true);
  return radioChecked.value;
}

//profile image 받기
function inputImageRendering() {
  if (this.files && this.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      getNode('.profile-preview').src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
}
profileImageInput.addEventListener('change', inputImageRendering);

//form validation check

const formInput = Array.from(getNodes('form input'));
function formValidationCheck() {
  let formValidCount = 0;
  formInput.forEach((item) => {
    if (item.value) {
      formValidCount++;
    }
  });
  if (formValidCount >= formInput.length - 1) {
    profileCardEditSubmit.classList.add('profileDetails-buttonAgree-valid');
    profileCardEditSubmit.classList.remove('bg-gray-100');
  } else {
    profileCardEditSubmit.classList.remove('profileDetails-buttonAgree-valid');
    profileCardEditSubmit.classList.add('bg-gray-100');
  }
}
formInput.forEach((item) => {
  item.addEventListener('change', formValidationCheck);
});

//edit 정보 pocketbase 전송

async function userInfoUpdate() {
  const avatar = getNode('#avatar');

  try {
    const newData = new FormData();
    if (avatar.value) {
      newData.append('avatar', avatar.files[0]);
    }
    newData.append('username', getNode('#username').value);
    newData.append('nickName', getNode('#nickName').value);
    newData.append('gender', radioValue());
    newData.append('age', getNode('#age').value);
    newData.append('qualification', getNode('#qualification').value);
    await pb.collection('users').update(userNow.id, newData);
    alert('수정 완료');
    location.href = '/src/pages/profileDetails/';
  } catch {
    alert('정보를 올바르게 입력해주세요');
  }
}
profileCardEditSubmit.addEventListener('click', userInfoUpdate);
buttonMoveProfileDetails.addEventListener('click', () => {
  location.href = '/src/pages/profileDetails/';
});
