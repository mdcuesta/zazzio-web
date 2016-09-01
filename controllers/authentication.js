import Passport from 'passport';
import { Router } from 'express';

/**
 * AuthenticationController
 */
export class AuthenticationController {
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
   * Facebook Login Return URL
   * @param  {Request}
   * @param  {Response}
   * @return {Redirect}
   */
  facebookReturn(req, res) {
    if (req.query.returnUrl) {
      res.redirect(req.query.returnUrl);
    } else {
      res.redirect('/');
    }
  }
}


const passport = Passport;

/**
 * Routes Configuration
 */

const expressRoute = Router;
const router = expressRoute();
const controller = new AuthenticationController();

router.get('/', controller.index.bind(controller));

/**
 * Facebook Login
 */
router.get('/facebook', (req, res, next) => {
  const callbackUrl = process.env.FB_CALLBACK_URL || 'http://zazzio.something.awesome.com:3000/login/facebook/return';
  passport.authenticate('facebook', {
    callbackURL: `${callbackUrl}?returnUrl=${req.query.return}`,
  })(req, res, next);
});

router.get('/facebook/return', controller.facebookReturn.bind(controller));

/**
 * Local Account Login
 */

/**
 * Exports router as default
 */
export default router;
