import ErrorActions from '../actions/error-actions';
import SignUpActions from '../actions/register-actions';

/**
 * Buyer quick register
 * Route: /account/sign-up
 * @param  {[object]} data [buyer data]
 */
export function quickRegisterBuyer(data) {
  $.ajax({
    url: '/account/sign-up',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  }).done((responseData, statusText, xhr) => {
    SignUpActions.quickRegisterBuyerComplete({
      data: responseData,
      statusText,
      status: xhr.status,
    });
  }).fail(() => {
    ErrorActions.error();
  });
}

/**
 * Buyer register
 * Route: /account/sign-up
 * @param  {[object]} data [buyer data]
 */
export function registerBuyer(data) {
  $.ajax({
    url: '/account/sign-up',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  }).done((responseData, statusText, xhr) => {
    SignUpActions.quickRegisterBuyerComplete({
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
    url: '/account/exists',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({
      email,
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
