import { Router } from 'express';
import { Secure } from '../utilities/security';

export function index(req, res) {
  res.render('user/listings', {
    csrfToken: req.csrfToken(),
    listingType: 'all',
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/user/listings',
  }),
  index);

/**
 * Exports router as default
 */
export default router;
