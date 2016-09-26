import ErrorActions from '../actions/error-actions';
import AuthActions from '../actions/authentication-actions';
import Url from '../helpers/url-helper';

export default function login(email, password) {
  $.ajax({
    url: Url.action('auth/local/ajax'),
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({
      email,
      password,
    }),
    contentType: 'application/json; charset=utf-8',
  }).done((responseData, statusText, xhr) => {
    AuthActions.loginComplete({
      data: { message: responseData.message },
      statusText,
      status: xhr.status,
    });
  }).fail((xhr, statusText) => {
    if (xhr.status === 401) {
      AuthActions.loginComplete({
        data: { message: xhr.responseText },
        statusText,
        status: xhr.status,
      });
    } else {
      ErrorActions.error();
    }
  });
}
