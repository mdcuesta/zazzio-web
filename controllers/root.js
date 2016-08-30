import { Router } from 'express';
import Controller from './controller';

export const TITLE = 'Zazzio - Property Finder';

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
      title: TITLE,
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
const expressRouter = Router;
const router = expressRouter();
const controller = new RootController();

router.get('/', controller.index.bind(controller));

/**
 * Exports router as default
 */
export default router;
