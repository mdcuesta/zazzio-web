import Dispatcher from '../dispatcher';
import LoginModalConstants from '../constants/login-modal-constants';

export class LoginModalActions {
  setModalType(modalType) {
    Dispatcher.dispatchViewAction({
      actionType: LoginModalConstants.SET_MODAL_TYPE,
      modalType,
    });
  }
}

export default new LoginModalActions();
