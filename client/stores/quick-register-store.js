import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import RegisterConstants from '../constants/register-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class QuickRegisterStore extends EventEmitter {
  constructor() {
    super();
    this.error = '';
    this.account = null;
    this.setError = this.setError.bind(this);
    this.getError = this.getError.bind(this);
    this.hasError = this.hasError.bind(this);
    this.accountExists = this.accountExists.bind(this);
    this.accountCreated = this.accountCreated.bind(this);
  }

  getError() {
    return this.error;
  }

  hasError() {
    return this.error !== '';
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  setError(msg) {
    this.error = msg;
  }

  accountExists(exists) {
    this.error = exists
      ? 'Account exists'
      : '';
  }

  accountCreated(data) {
    this.account = data;
  }

  getCreatedAccount() {
    return this.account;
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const quickRegisterStore = new QuickRegisterStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case RegisterConstants.QUICK_REGISTER_ACCOUNT_CREATED:
      quickRegisterStore.accountCreated(action.data);
      break;
    case RegisterConstants.QUICK_REGISTER_ACCOUNT_FAILED:
      quickRegisterStore.setError(action.errorMessage);
      break;
    case RegisterConstants.REGISTER_ACCOUNT_EXISTS:
      quickRegisterStore.accountExists(action.exists);
      break;
    default:
      return true;
  }
  quickRegisterStore.emit(CHANGE_EVENT);
  return true;
});

export default quickRegisterStore;
