import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

  dispatchViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  }

  dispatchServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action,
    });
  }
}

export default new AppDispatcher();
