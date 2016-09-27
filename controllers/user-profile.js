import { Router } from 'express';
import { Secure, CsrfProtected } from '../utilities/security';
import User from '../models/user';
import ProfileValidator from './validations/edit-profile-validations';

const validateProfile = ProfileValidator;

export function index(req, res, next) {
  User.getById(req.user.id)
  .then((user) => {
    res.render('user/profile', {
      csrfToken: req.csrfToken(),
      user: req.user,
      profile: user.profile,
    });
  })
  .catch(next);
}

export function saveProfile(req, res, next) {
  const data = validateProfile(req);
  if (data.errors.length > 0) {
    res.render('user/profile', {
      csrfToken: req.csrfToken(),
      user: req.user,
      profile: data.profile,
      errors: data.errors,
    });
    return;
  }
  User.getById(req.user.id)
  .then((user) => {
    const form = data.profile;
    const profile = user.profile;

    profile.firstName = form.firstName;
    profile.lastName = form.lastName;
    profile.middleName = form.middleName;
    profile.gender = form.gender;
    profile.dateOfBirth = form.dateOfBirth;

    profile.address = form.address;
    profile.about = form.about;
    return user.save();
  })
  .then(() => {
    res.redirect('profile');
  })
  .catch(next);
}

const secure = Secure;
const csrfProtected = CsrfProtected;
const expressRoute = Router;
const router = expressRoute();

router.get('/',
  secure({
    returnTo: '/user/profile',
  }),
  index);

router.post('/',
  secure({
    returnTo: '/user/profile',
  }),
  csrfProtected(),
  saveProfile);

/**
 * Exports router as default
 */
export default router;
