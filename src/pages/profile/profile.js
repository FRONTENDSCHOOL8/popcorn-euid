import { getNode } from '/src/lib/';


//profile 닫힘 버튼

const ProfileClose = getNode('.profile-button-close');

function closeHandler() {
  history.back();
}
ProfileClose.addEventListener('click', closeHandler);
