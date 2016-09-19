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

export function facebookAuthReturn(req, res) {
  res.render('authentication/fb-login-return-popup');
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
router.get('/local', (req, res) => {
  res.redirect('/login');
});

router.post('/local', csrfProtected(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      User.countByLocalEmail(req.body.email)
      .then((count) => {
        res.render('authentication/login', {
          csrfToken: req.csrfToken(),
          validEmail: count > 0,
          email: req.body.email,
        });
      });
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          return next(err);
        }
        return authReturn(req, res);
      });
    }
  })(req, res, next);
});

router.post('/local/ajax', csrfProtected(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      User.countByLocalEmail(req.body.email)
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
// TODO: returnTo doesn't work with FB, issue with passport-facebook
router.get('/facebook', (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['email'],
    callbackURL: '/auth/facebook/return/app',
    failureRedirect: '/login',
  })(req, res, next);
});

router.get('/facebook/return/app', (req, res, next) => {
  passport.authenticate('facebook', {
    callbackURL: '/auth/facebook/return/app',
    failureRedirect: '/login',
  })(req, res, next);
}, authReturn);

router.get('/popup/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
    display: 'popup',
  }));
router.get('/facebook/return',
  passport.authenticate('facebook'),
  facebookAuthReturn);

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
