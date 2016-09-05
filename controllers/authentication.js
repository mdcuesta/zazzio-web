import Passport from 'passport';
import { Router } from 'express';

export function authReturn(req, res) {
  if (req.query.returnTo) {
    res.redirect(req.query.returnTo);
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

/**
 * Local Login
 */
router.post('/local',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }), authReturn);

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
/**
 * Exports router as default
 */
export default router;
