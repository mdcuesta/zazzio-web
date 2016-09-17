import { Router } from 'express';
import { Authenticated } from '../utilities/security';

export const TITLE = 'Zazzio - Property Finder';

const authenticated = Authenticated;

export function index(req, res) {
  res.render('index', {
    title: TITLE,
    authenticated: authenticated(req),
    csrfToken: req.csrfToken(),
  });
}

export function signup(req, res) {
  res.render('register', {
  });
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
    res.render('login', {
      title: 'Login to experience awesome',
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
