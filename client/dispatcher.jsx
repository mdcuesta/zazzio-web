'use strict';

import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {

  dispatchViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action,
    });
  }

  dispatchServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action,
    });
  }
}

export default new AppDispatcher();
