import { getNode } from '/src/lib/';

//profileCard 닫힘 버튼
const ProfileCardClose = getNode('.profileCard-button-close');

function closeHandler() {
  history.back();
}
ProfileCardClose.addEventListener('click', closeHandler);
