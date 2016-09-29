import AuthActions from '../actions/authentication-actions';
import Url from '../helpers/url-helper';
import * as Utils from './utils';

export default function login(email, password) {
  Utils.post(Url.action('auth/local/ajax'), {
    email,
    password,
  })
  .done((responseData, statusText, xhr) => {
    AuthActions.loginComplete({
      data: { message: responseData.message },
      statusText,
      status: xhr.status,
    });
  })
  .fail((xhr, statusText, error) => {
    if (xhr.status === 401) {
      AuthActions.loginComplete({
        data: { message: xhr.responseText },
        statusText,
        status: xhr.status,
      });
    } else {
      Utils.fail(xhr, statusText, error);
    }
  });
}
