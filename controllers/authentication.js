import Passport from 'passport';
import { Router } from 'express';
import { Secure, CsrfProtected } from '../utilities/security';
import User from '../models/user';

export function authReturn(req, res) {
  if (req.query.returnTo) {
    res.redirect(req.query.returnTo);
  } else {
    res.redirect('/');
  }
}

const passport = Passport;
const secure = Secure;
const csrfProtected = CsrfProtected;
/**
 * Routes Configuration
 */
const expressRoute = Router;
const router = expressRoute();

/**
 * Local Login
 */
router.post('/local', csrfProtected(),
  passport.authenticate('local', {
    failureRedirect: '/login',
  }), authReturn);

router.post('/local/ajax', csrfProtected(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      User.count({ 'local.email': req.body.email })
      .then((count) => {
        if (count > 0) {
          return res.status(401).send('Invalid password');
        }
        return res.status(401).send('Invalid username');
      });
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          return next(err);
        }
        return res.status(200).json({
          message: ':)',
        });
      });
    }
  })(req, res, next);
});

/**
 * Facebook Login
 */
/** Do not remove this commented block
/** This is supposed to be the right code but
/** there is a bug in facebook passport **/
/**
router.get('/facebook', (req, res, next) => {
  passport.authenticate('facebook', {
    callbackURL: `/auth/facebook/return?returnTo=${req.query.returnTo}`,
    failureRedirect: '/login',
    session: false,
  })(req, res, next);
});

router.get('/facebook/return', (req, res, next) => {
  passport.authenticate('facebook', {
    callbackURL: `/auth/facebook/return?returnTo=${req.query.returnTo}`,
    failureRedirect: '/login',
    session: false,
  })(req, res, next);
}, authReturn); **/

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authReturn);

router.get('/popup/facebook',
  passport.authenticate('facebook', { display: 'popup' }));

// User Authenticated Check for client side
router.get('/authenticated', secure(), (req, res) => {
  res.status(200).json({
    authenticated: true,
  });
});

/**
 * Exports router as default
 */
export default router;
