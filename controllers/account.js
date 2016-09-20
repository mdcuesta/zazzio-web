import { Router } from 'express';
import { Secure } from '../utilities/security';

export function index(req, res) {
  res.render('account/index');
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/account',
  }),
  index);

/**
 * Exports router as default
 */
export default router;
