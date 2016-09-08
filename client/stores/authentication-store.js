import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import AuthenticationConstants from '../constants/authentication-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class AuthenticationStore extends EventEmitter {
  constructor() {
    super();
    this.error = false;
    this.message = '';

    this.getMessage = this.getMessage.bind(this);
    this.hasError = this.hasError.bind(this);
    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.error = data.hasError;
    this.message = data.message;
  }

  getMessage() {
    return this.message;
  }

  hasError() {
    return this.error;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const authenticationStore = new AuthenticationStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case AuthenticationConstants.LOGIN_SUCCESS:
      authenticationStore.setData({
        hasError: false,
        message: action.data.message,
      });
      break;
    case AuthenticationConstants.LOGIN_FAILED:
      authenticationStore.setData({
        hasError: true,
        message: action.data.message,
      });
      break;
    default:
      return true;
  }
  authenticationStore.emit(CHANGE_EVENT);
  return true;
});

export default authenticationStore;
