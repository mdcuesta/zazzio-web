import { Router } from 'express';
import { Secure } from '../utilities/security';

export function index(req, res) {
  res.render('user/messages', {
    csrfToken: req.csrfToken(),
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/user/messages',
  }),
  index);

/**
 * Exports router as default
 */
export default router;
