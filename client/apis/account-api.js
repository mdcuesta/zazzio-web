import ErrorActions from '../actions/error-actions';
import SignUpActions from '../actions/register-actions';

/**
 * Buyer quick register
 * Route: /account/sign-up
 * @param  {[object]} data [buyer data]
 */
export function quickRegister(data) {
  $.ajax({
    url: '/sign-up/quick',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  }).done((responseData, statusText, xhr) => {
    SignUpActions.quickRegisterComplete({
      data: responseData,
      statusText,
      status: xhr.status,
    });
  }).fail(() => {
    ErrorActions.error();
  });
}

export function accountExists(email) {
  $.ajax({
    url: '/sign-up/exists',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({
      email: email.trim(),
    }),
    contentType: 'application/json; charset=utf-8',
  }).done((responseData, statusText, xhr) => {
    SignUpActions.checkAccountExistenceComplete({
      data: responseData,
      statusText,
      status: xhr.status,
    });
  }).fail(() => {
    ErrorActions.error();
  });
}
