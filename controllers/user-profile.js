import { Router } from 'express';
import { Secure, CsrfProtected } from '../utilities/security';
import User from '../models/user';
import ProfileValidator from './validations/edit-profile-validations';
import * as ImageService from '../services/image-service';

const validateProfile = ProfileValidator;

export function index(req, res, next) {
  User.getById(req.user.id)
  .then((user) => {
    ImageService.getUploadPhotoCredentials('jpg')
    .then((data) => {
      res.render('user/profile', {
        csrfToken: req.csrfToken(),
        profile: user.profile,
        uploadCredentials: data,
      });
    });
  })
  .catch(next);
}

export function saveProfile(req, res, next) {
  const data = validateProfile(req);
  if (data.errors.length > 0) {
    User.getById(req.user.id)
    .then((user) => {
      data.profile.phoneNumbers = user.profile.phoneNumbers;
      data.profile.profilePhoto = user.profile.profilePhoto;
      res.render('user/profile', {
        csrfToken: req.csrfToken(),
        profile: data.profile,
        errors: data.errors,
      });
    })
    .catch(next);
  } else {
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
