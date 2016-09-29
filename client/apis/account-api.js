import SignUpActions from '../actions/register-actions';
import Url from '../helpers/url-helper';
import * as Utils from './utils';

/**
 * Buyer quick register
 * Route: /account/sign-up
 * @param  {[object]} data [buyer data]
 */
export function quickRegister(data) {
  Utils.post(Url.action('sign-up/quick'), JSON.stringify(data))
  .done((responseData, statusText, xhr) => {
    SignUpActions.quickRegisterComplete({
      data: responseData,
      statusText,
      status: xhr.status,
    });
  })
  .fail(Utils.fail);
}

export function accountExists(email) {
  Utils.post(Url.action('sign-up/exists'),
    JSON.stringify({
      email: email.trim(),
    }
  ))
  .done((responseData, statusText, xhr) => {
    SignUpActions.checkAccountExistenceComplete({
      data: responseData,
      statusText,
      status: xhr.status,
    });
  })
  .fail(Utils.fail);
}
