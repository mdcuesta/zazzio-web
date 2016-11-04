import { Router } from 'express';
import { Secure } from '../utilities/security';

export function newWizard(req, res) {
  res.render('listings/new-wizard', {
    csrfToken: req.csrfToken(),
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/new/wizard',
  secure({
    returnTo: '/listings/new/wizard',
  }),
  newWizard);


/**
 * Exports router as default
 */
export default router;
