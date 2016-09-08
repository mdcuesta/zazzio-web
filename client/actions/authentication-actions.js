import Dispatcher from '../dispatcher';
import AuthApi from '../apis/authentication-api';
import AuthenticationConstants from '../constants/authentication-constants';

const login = AuthApi;

export class AuthenticationActions {
  login(email, password) {
    login(email, password);
  }

  loginComplete(result) {
    if (result.status === 401) {
      Dispatcher.dispatchServerAction({
        actionType: AuthenticationConstants.LOGIN_FAILED,
        data: result.data,
      });
    } else {
      Dispatcher.dispatchServerAction({
        actionType: AuthenticationConstants.LOGIN_SUCCESS,
        data: result.data,
      });
    }
  }
}

export default new AuthenticationActions();

