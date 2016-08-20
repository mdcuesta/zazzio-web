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
}


const passport = Passport;

/**
 * Routes Configuration
 */

const router = Router();
const controller = new AuthenticationController();

router.get('/', controller.index.bind(controller));

router.get('/facebook', (req, res, next) => {
  passport.authenticate('facebook', {
    callbackURL: req.query.return
  })(req,res,next);
});

/**
 * Exports router as default
 */
export default router;


