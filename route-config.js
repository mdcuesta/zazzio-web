'use strict';

import Root from './controllers/root';

export function configure(app) {
  
  app.use('/', Root);
  
};