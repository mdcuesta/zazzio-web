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

  facebookReturn(req, res) {
    res.redirect(req.query.returnUrl);
  }
}


const passport = Passport;

/**
 * Routes Configuration
 */

const router = Router();
const controller = new AuthenticationController();

router.get('/', controller.index.bind(controller));

router.get('/facebook', (req, res, next) => {
  let callbackUrl = process.env.FB_CALLBACK_URL || 'http://zazzio.something.awesome.com:3000/login/facebook/return'
  passport.authenticate('facebook', {
    callbackURL: callbackUrl + '?returnUrl=' + req.query.return
  })(req,res,next);
});

router.get('/facebook/return', controller.facebookReturn.bind(controller));

/**
 * Exports router as default
 */
export default router;


