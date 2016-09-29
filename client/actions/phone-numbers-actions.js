import Dispatcher from '../dispatcher';
import PhoneNumberConstants from '../constants/phone-numbers-constants';
import * as Api from '../apis/phone-numbers-api';

export class PhoneNumberActions {
  addMobileNumber(countryCode, number) {
    Api.addMobileNumber(countryCode, number);
  }

  verifyMobileNumber(number, verificationCode) {
    Api.verifyMobileNumber(number, verificationCode);
  }

  addMobileNumberComplete(status) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.ADD_MOBILE_NUMBER_COMPLETE,
      status,
    });
  }

  verifyMobileNumberComplete(status) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.VERIFY_MOBILE_NUMBER_COMPLETE,
      status,
    });
  }

  getPhoneNumbers() {
    Api.getPhoneNumbers();
  }

  getPhoneNumbersComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.GET_PHONE_NUMBERS_COMPLETE,
      data,
    });
  }
}

export default new PhoneNumberActions();
