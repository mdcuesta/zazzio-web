import { Router } from 'express';
import { Secure } from '../utilities/security';
import User from '../models/user';

export function dashboard(req, res) {
  res.render('user/dashboard', {
    csrfToken: req.csrfToken(),
    user: req.user,
  });
}

export function confirmAccount(req, res, next) {
  const confirmationCode = req.params.confirmationCode;
  User.getByConfirmationCode(confirmationCode)
  .then((user) => {
    if (user === null) {
      res.status(404);
      next();
    } else {
      // TODO
      // add notification
      user.confirm();
      user.save()
      .then(() => {
        if (typeof req.user !== 'undefined'
          && req.user.email === user.email) {
          res.redirect('/user/dashboard');
        } else {
          req.logout();
          res.render('user/account-confirmation');
        }
      });
    }
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

router.get('/account/confirm/:confirmationCode',
  confirmAccount);

/**
 * Exports router as default
 */
export default router;
