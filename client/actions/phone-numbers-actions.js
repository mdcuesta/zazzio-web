import Dispatcher from '../dispatcher';
import PhoneNumberConstants from '../constants/phone-numbers-constants';
import * as Api from '../apis/phone-numbers-api';

export class PhoneNumberActions {
  addMobileNumber(number) {
    Api.addMobileNumber(number);
  }

  addMobileNumberComplete(status) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.ADD_MOBILE_NUMBER_COMPLETE,
      status,
    });
  }

  verifyMobileNumber(number, verificationCode) {
    Api.verifyMobileNumber(number, verificationCode);
  }

  verifyMobileNumberComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.VERIFY_MOBILE_NUMBER_COMPLETE,
      data,
    });
  }

  getMobileNumbers() {
    Api.getMobileNumbers();
  }

  getMobileNumbersComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.GET_PHONE_NUMBERS_COMPLETE,
      data,
    });
  }

  deleteMobileNumber(number) {
    Api.deleteMobileNumber(number);
  }

  deleteMobileNumberComplete(data) {
    Api.getMobileNumbers();
    Dispatcher.dispatchServerAction({
      actionType: PhoneNumberConstants.DELETE_MOBILE_NUMBER_COMPLETE,
      data,
    });
  }
}

export default new PhoneNumberActions();
