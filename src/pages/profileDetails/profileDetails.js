import { getNode } from '/src/lib/';

const ProfileDetailsClose = getNode('.profileDetails-button-close');
const profileToggleButtonWrap = getNode('.profileDetails-buttonWrap');
//profileDetails 닫힘 버튼

function closeHandler() {
  history.back();
}
ProfileDetailsClose.addEventListener('click', closeHandler);

//profileDetailes toggle button
// let toggleBoolean = false;
// function toggleHandler(e) {
//   const classList = e.target.classList;
//   const classListArray = Array.from(classList);
//   console.log(classListArray);
//   // if (!toggleBoolean) {
//   //   classList.remove('profileDetails-button-valid');
//   //   toggleBoolean = true;
//   // } else {
//   //   classList.remove('profileDetails-button-valid');
//   // }
// }
// profileToggleButtonWrap.addEventListener('click', toggleHandler);

// const array = ['one', 'two'];
// console.log(array.includes('one'));
