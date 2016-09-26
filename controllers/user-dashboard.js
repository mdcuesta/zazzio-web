import { Router } from 'express';
import { Secure } from '../utilities/security';

export function index(req, res) {
  res.render('user/dashboard', {
    csrfToken: req.csrfToken(),
    user: req.user,
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/user/dashboard',
  }),
  index);

/**
 * Exports router as default
 */
export default router;
