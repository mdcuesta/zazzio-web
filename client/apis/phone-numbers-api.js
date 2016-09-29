import * as Utils from './utils';
import PhoneNumbersActions from '../actions/phone-numbers-actions';
import Url from '../helpers/url-helper';

export function addMobileNumber(countryCode, number) {
  Utils.post(Url.action('user/numbers/mobile/add'), {
    countryCode,
    number,
  })
  .done((responseData) => {
    PhoneNumbersActions.addMobileNumberComplete(responseData.status);
  })
  .fail(Utils.fail);
}

export function verifyMobileNumber(number, verificationCode) {
  Utils.post(Url.action('user/numbers/mobile/verify'), {
    number,
    verificationCode,
  })
  .done((responseData) => {
    PhoneNumbersActions.verifyMobileNumberComplete(responseData.status);
  })
  .fail(Utils.fail);
}

export function getPhoneNumbers() {
  Utils.post(Url.action('user/numbers'))
  .done((responseData) => {
    PhoneNumbersActions.getPhoneNumbersComplete(responseData);
  })
  .fail(Utils.fail);
}
