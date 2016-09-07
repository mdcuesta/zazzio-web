import { Router } from 'express';
import { Authenticated } from '../utilities/security';

const authenticated = Authenticated;

export const TITLE = 'Zazzio - Property Finder';

export function index(req, res) {
  res.render('index', {
    title: TITLE,
    isUserAuthenticated: authenticated(req),
    userId: req.user,
  });
}

export function signup(req, res) {
  res.render('register', {
  });
}

export function login(req, res) {
  res.render('login', {
    title: 'Login to experience awesome',
  });
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
