import { Router } from 'express';
import { Secure } from '../utilities/security';
import User from '../models/user';

export function index(req, res) {
  User.getById(req.user.id)
  .then((user) => {
    res.render('user/profile', {
      csrfToken: req.csrfToken(),
      user,
    });
  });
}

const secure = Secure;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/user/profile',
  }),
  index);


/**
 * Exports router as default
 */
export default router;
