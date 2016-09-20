import { Router } from 'express';
import { Authenticated } from '../utilities/security';

const authenticated = Authenticated;

/**
 * Index Page
 */
export function index(req, res) {
  res.render('index', {
    authenticated: authenticated(req),
    csrfToken: req.csrfToken(),
    user: req.user,
  });
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
 * Exports router as default
 */
export default router;
