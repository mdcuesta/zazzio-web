'use strict';

import Controller from './controller';
import {Router} from 'express';

const TITLE = 'Zazzio - Property Finder';
/**
 * RootController
 */
export class RootController extends Controller  {

  constructor() {
    super();
  }

  /**
   * Renders Index View
   * Route: '/'
   * @param  {Request}
   * @param  {Response}
   */
  index(req, res) {
    res.render('index', {
      title: TITLE
    });
  }

  /**
   * Renders Signup View
   * Route: '/signup'
   * @param  {Request} 
   * @param  {Response}
   */
  signup(req, res) {
    res.render('register', {
    });
  }
}

/**
 * Routes Configuration
 */
const router = Router();
const controller = new RootController();

router.get('/', controller.index.bind(controller));

/**
 * Exports router as default
 */
export default router;