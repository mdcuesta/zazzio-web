import Passport from 'passport';
import { Router } from 'express';

export function index(req, res) {
  res.redirect('/login/facebook');
}

export function facebookReturn(req, res) {
  if (req.query.returnUrl) {
    res.redirect(req.query.returnUrl);
  } else {
    res.redirect('/');
  }
}

const passport = Passport;

/**
 * Routes Configuration
 */
const expressRoute = Router;
const router = expressRoute();

router.get('/', index);

/**
 * Facebook Login
 */
router.get('/facebook', (req, res, next) => {
  const callbackUrl = process.env.FB_CALLBACK_URL || 'http://zazzio.something.awesome.com:3000/login/facebook/return';
  passport.authenticate('facebook', {
    callbackURL: `${callbackUrl}?returnUrl=${req.query.return}`,
  })(req, res, next);
});

router.get('/facebook/return', facebookReturn);

/**
 * Exports router as default
 */
export default router;
