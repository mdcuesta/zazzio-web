'use strict';

import Root from './controllers/root';
import Authentication from './controllers/authentication';

export function configure(app) {
  
  app.use('/', Root);
  app.use('/login', Authentication);
  
};