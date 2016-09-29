import Passport from 'passport';
import { Router } from 'express';
import { AjaxSecure, CsrfProtected } from '../utilities/security';
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
const secure = AjaxSecure;
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
      User.localEmailExists(req.body.email)
      .then((exists) => {
        if (exists) {
          User.existsAndUnConfirmed(req.body.email)
          .then((unconfirmed) => {
            res.render('authentication/login', {
              csrfToken: req.csrfToken(),
              validEmail: true,
              email: req.body.email,
              unconfirmed,
            });
          })
          .catch(next);
        } else {
          res.render('authentication/login', {
            csrfToken: req.csrfToken(),
            validEmail: false,
            email: req.body.email,
          });
        }
      })
      .catch(next);
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(err);
        } else {
          authReturn(req, res);
        }
      });
    }
  })(req, res, next);
});

router.post('/local/ajax', csrfProtected(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      User.localEmailExists(req.body.email)
      .then((exists) => {
        if (exists) {
          User.existsAndUnConfirmed(req.body.email)
          .then((unconfirmed) => {
            if (unconfirmed) {
              res.status(401).send('Account unconfirmed');
            } else {
              res.status(401).send('Invalid password');
            }
          })
          .catch(next);
        } else {
          res.status(401).send('Invalid username');
        }
      })
      .catch(next);
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(err);
        } else {
          res.status(200).json({
            message: ':)',
          });
        }
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
