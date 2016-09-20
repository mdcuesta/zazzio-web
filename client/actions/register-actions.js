import Dispatcher from '../dispatcher';
import * as AccountApi from '../apis/account-api';
import RegisterConstants from '../constants/register-constants';

export class RegisterActions {
  quickRegister(account) {
    AccountApi.quickRegister(account);
  }

  quickRegisterComplete(result) {
    if (result.status === 201) {
      // account successfully created
      Dispatcher.dispatchServerAction({
        actionType: RegisterConstants.QUICK_REGISTER_ACCOUNT_CREATED,
        data: result.data,
      });
    } else {
      // account creation failed
      Dispatcher.dispatchServerAction({
        actionType: RegisterConstants.QUICK_REGISTER_ACCOUNT_FAILED,
        errorMessage: result.data.error,
      });
    }
  }

  checkAccountExistence(email) {
    AccountApi.accountExists(email);
  }

  checkAccountExistenceComplete(result) {
    Dispatcher.dispatchServerAction({
      actionType: RegisterConstants.REGISTER_ACCOUNT_EXISTS,
      exists: result.data.exists,
    });
  }
}

export default new RegisterActions();
