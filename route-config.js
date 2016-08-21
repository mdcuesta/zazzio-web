'use strict';

import Root from './controllers/root';
import Authentication from './controllers/authentication';
import Account from './controllers/account';

export function configure(app) {
  
  app.use('/', Root);
  app.use('/login', Authentication);
  app.use('/account', Account);

};