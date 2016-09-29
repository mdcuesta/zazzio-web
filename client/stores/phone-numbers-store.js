import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import PhoneNumbersConstants from '../constants/phone-numbers-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class PhoneNumbersStore extends EventEmitter {
  constructor() {
    super();
    this.addMobileNumberStatus = 0;
    this.verifyMobileNumberStatus = 0;
    this.getAddMobileNumberStatus = this.getAddMobileNumberStatus.bind(this);
    this.getVerifyMobileNumberStatus = this.getVerifyMobileNumberStatus.bind(this);
    this.setAddMobileNumberStatus = this.setAddMobileNumberStatus.bind(this);
    this.setVerifyMobileNumberStatus = this.setVerifyMobileNumberStatus.bind(this);
  }

  getAddMobileNumberStatus() {
    return this.addMobileNumberStatus;
  }

  getVerifyMobileNumberStatus() {
    return this.verifyMobileNumberStatus;
  }

  setAddMobileNumberStatus(status) {
    this.addMobileNumberStatus = status;
  }

  setVerifyMobileNumberStatus(status) {
    this.verifyMobileNumberStatus = status;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const phoneNumbersStore = new PhoneNumbersStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case PhoneNumbersConstants.ADD_MOBILE_NUMBER_COMPLETE:
      phoneNumbersStore.setAddMobileNumberStatus(action.status);
      break;
    case PhoneNumbersConstants.VERIFY_MOBILE_NUMBER_COMPLETE:
      phoneNumbersStore.setVerifyMobileNumberStatus(action.status);
      break;
    default:
      return true;
  }
  phoneNumbersStore.emit(CHANGE_EVENT);
  return true;
});

export default phoneNumbersStore;
