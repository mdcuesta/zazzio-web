import { Router } from 'express';

export const TITLE = 'Zazzio - Property Finder';

export function index(req, res) {
  res.render('index', {
    title: TITLE,
  });
}

export function signup(req, res) {
  res.render('register', {
  });
}

/**
 * Routes Configuration
 */
const expressRouter = Router;
const router = expressRouter();

router.get('/', index);

/**
 * Exports router as default
 */
export default router;
