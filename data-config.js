'use strict';

import * as DB from './data-provider';

const db = DB;

export function configure() {
  db.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zazzio', function(err) {
    if (err) {
      console.log('MongoDB server instance is not available');
      process.exit(1)
    }
  });
};