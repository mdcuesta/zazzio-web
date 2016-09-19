import { Router } from 'express';
import { Authenticated } from '../utilities/security';

const authenticated = Authenticated;

export function index(req, res) {
  res.render('index', {
    authenticated: authenticated(req),
    csrfToken: req.csrfToken(),
  });
}

export function signup(req, res) {
  const isAuthenticated = authenticated(req);
  if (isAuthenticated) {
    if (req.query.returnTo) {
      res.redirect(req.query.returnTo);
    } else {
      res.redirect('/');
    }
  } else {
    res.render('account/register', {
      csrfToken: req.csrfToken(),
      returnTo: req.query.returnTo,
    });
  }
}

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
 * Login page
 */
router.get('/login', login);

/**
 * Logout
 */
router.get('/logout', logout);

/**
 * Sign up Page
 */
router.get('/sign-up', signup);

/**
 * Exports router as default
 */
export default router;
