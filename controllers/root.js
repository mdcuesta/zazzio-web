import Url from 'url';
import { Router } from 'express';
import { Authenticated } from '../utilities/security';

const authenticated = Authenticated;

/**
 * Index Page
 */
export function index(req, res) {
  res.render('root/index', {
    authenticated: authenticated(req),
    csrfToken: req.csrfToken(),
  });
}

export function lang(req, res, next) {
  const locale = req.params.locale;
  if (locale !== 'en' &&
    locale !== 'tl' &&
    locale !== 'cx') {
    res.status(404);
    next();
    return;
  }

  const referrer = req.get('Referrer');
  const url = Url.parse(referrer || '');
  res.cookie('locale', locale);

  const hostName = process.env.APP_DOMAIN || 'zazzio.something.awesome.com';

  if (typeof url !== 'undefined' && hostName === url.hostname) {
    res.redirect(referrer);
  } else {
    res.redirect('/');
  }
}
/**
 * Login Page
 */
export function login(req, res) {
  const isAuthenticated = authenticated(req);
  if (isAuthenticated) {
    if (req.query.returnTo) {
      res.redirect(req.query.returnTo);
    } else {
      res.redirect('/');
    }
  } else {
    res.render('authentication/login', {
      csrfToken: req.csrfToken(),
      returnTo: req.query.returnTo,
    });
  }
}

/**
 * Logout
 */
export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Routes Configuration
 */
const expressRouter = Router;
const router = expressRouter();

/**
 * Index page
 */
router.get('/', index);

/**
 * Login Page
 */
router.get('/login', login);

/**
 * Logout
 */
router.get('/logout', logout);

/**
 * Language
 */
router.get('/:locale', lang);

/**
 * Exports router as default
 */
export default router;
