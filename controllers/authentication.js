'use strict';

import Controller from './controller';
import Passport from 'passport';
import {Router} from 'express';

/**
 * AuthenticationController
 */
export class AuthenticationController extends Controller {
  
  /** 
   * Redirects to '/login/facebook'
   * Route: '/login'
   * @param  {Request}
   * @param  {Response}
   * @return {Redirect}
   */
  index(req, res) {
    res.redirect('/login/facebook');
  }

  /**
   * Redirects to '/'
   * Route: '/login/facebook/return'
   * @param  {Request}
   * @param  {Response}
   * @return {Redirect}
   */
  redirectToIndex(req, res) {
    res.redirect('/');
  }

}

const passport = Passport;

/**
 * Redirects to Facebook Login
 * Route: '/login/facebook'
 */
AuthenticationController.prototype.facebook = passport.authenticate('facebook');

/**
 * Redirects to Facebook Login if not authorized
 * Route: '/login/facebook/return'
 */
AuthenticationController.prototype.facebookReturn = passport.authenticate('facebook', {
  failureRedirect: '/login'
})

/**
 * Routes Configuration
 */
const router = Router();
const controller = new AuthenticationController();

router.get('/', controller.index);
router.get('/facebook', controller.facebook);
router.get('/facebook/return', controller.facebookReturn, 
  controller.redirectToIndex);

/**
 * Exports router as default
 */
export default router;


