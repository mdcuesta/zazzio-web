import * as Utils from './utils';
import PhoneNumbersActions from '../actions/phone-numbers-actions';
import Url from '../helpers/url-helper';

export function addMobileNumber(number) {
  Utils.post(Url.action('user/numbers/mobile/add'), {
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
    PhoneNumbersActions.verifyMobileNumberComplete({
      number,
      status: responseData.status,
    });
  })
  .fail(Utils.fail);
}

export function getMobileNumbers() {
  Utils.post(Url.action('user/numbers'))
  .done((responseData) => {
    PhoneNumbersActions.getMobileNumbersComplete(responseData);
  })
  .fail(Utils.fail);
}

export function deleteMobileNumber(number) {
  Utils.post(Url.action('user/numbers/mobile/delete'), {
    number,
  })
  .done((responseData) => {
    PhoneNumbersActions.deleteMobileNumberComplete({
      number,
      status: responseData.status,
    });
  })
  .fail(Utils.fail);
}

export function resendMobileNumberVerification(number) {
  Utils.post(Url.action('user/numbers/mobile/confirmation'), {
    number,
  })
  .done((responseData) => {
    PhoneNumbersActions.resendMobileNumberVerificationComplete({
      number,
      status: responseData.status,
    });
  })
  .fail(Utils.fail);
}
