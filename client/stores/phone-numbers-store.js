import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import PhoneNumbersConstants from '../constants/phone-numbers-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class PhoneNumbersStore extends EventEmitter {
  constructor() {
    super();
    this.addMobileNumberStatus = -1;
    this.verifyMobileNumberStatus = [];
    this.phoneNumbers = [];
    this.getAddMobileNumberStatus = this.getAddMobileNumberStatus.bind(this);
    this.getVerifyMobileNumberStatus = this.getVerifyMobileNumberStatus.bind(this);
    this.setAddMobileNumberStatus = this.setAddMobileNumberStatus.bind(this);
    this.setVerifyMobileNumberStatus = this.setVerifyMobileNumberStatus.bind(this);
    this.getPhoneNumbers = this.getPhoneNumbers.bind(this);
    this.setPhoneNumbers = this.setPhoneNumbers.bind(this);
  }

  getAddMobileNumberStatus() {
    return this.addMobileNumberStatus;
  }

  getVerifyMobileNumberStatus(number) {
    const entry = this.verifyMobileNumberStatus.find(s => s.number === number);
    if (typeof entry === 'undefined') {
      return -1;
    }
    return entry.status;
  }

  setAddMobileNumberStatus(status) {
    this.addMobileNumberStatus = status;
  }

  setVerifyMobileNumberStatus(number, status) {
    const existing = this.verifyMobileNumberStatus.find(n => n.number === number);
    if (typeof existing !== 'undefined') {
      existing.status = status;
    } else {
      this.verifyMobileNumberStatus.push({
        number,
        status,
      });
    }
  }

  getPhoneNumbers() {
    return this.phoneNumbers;
  }

  setPhoneNumbers(numbers) {
    this.phoneNumbers = numbers;
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
      phoneNumbersStore.setVerifyMobileNumberStatus(action.data.number, action.data.status);
      break;
    case PhoneNumbersConstants.GET_PHONE_NUMBERS_COMPLETE:
      phoneNumbersStore.setPhoneNumbers(action.data);
      break;
    default:
      return true;
  }
  phoneNumbersStore.emit(CHANGE_EVENT);
  return true;
});

export default phoneNumbersStore;
