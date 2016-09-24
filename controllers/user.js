import { Router } from 'express';
import { Secure } from '../utilities/security';

export function dashboard(req, res) {
  res.render('user/dashboard', {
    csrfToken: req.csrfToken(),
    user: req.user,
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/dashboard',
  secure({
    returnTo: '/user/dashboard',
  }),
  dashboard);

/**
 * Exports router as default
 */
export default router;
