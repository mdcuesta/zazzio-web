'use strict';

import express from 'express';
import path from 'path';

export function configure(app) {
  app.use(express.static('assets'));
};