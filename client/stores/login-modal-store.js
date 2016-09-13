import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import LoginModalConstants from '../constants/login-modal-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class LoginModalStore extends EventEmitter {
  constructor() {
    super();
    this.modalType = '';
    this.getModalType = this.getModalType.bind(this);
    this.setModalType = this.setModalType.bind(this);
  }

  getModalType() {
    return this.modalType;
  }

  setModalType(modalType) {
    this.modalType = modalType;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const loginModalStore = new LoginModalStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case LoginModalConstants.SET_MODAL_TYPE:
      loginModalStore.setModalType(action.modalType);
      break;
    default:
      return true;
  }
  loginModalStore.emit(CHANGE_EVENT);
  return true;
});

export default loginModalStore;
