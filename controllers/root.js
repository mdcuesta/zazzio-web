'use strict';

import Controller from './controller';
import {Router} from 'express';

/**
 * RootController
 */
export class RootController extends Controller {
  /**
   * Renders Index View
   * Route: '/'
   * @param  {Request}
   * @param  {Response}
   */
  index(req, res) {
    res.render('index', {
      title: 'Zazzio is Awesome'
    });
  }
}

/**
 * Routes Configuration
 */
const router = Router();
const controller = new RootController();

router.get('/', controller.index);

/**
 * Exports router as default
 */
export default router;