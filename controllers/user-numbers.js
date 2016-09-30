import { Router } from 'express';
import ExpressValidation from 'express-validation';
import { AjaxSecure, CsrfProtected } from '../utilities/security';
import * as Validations from './validations/user-numbers-validations';
import User from '../models/user';

const validateRequest = ExpressValidation;

/**
 * Status
 * 0 - Success
 * 1 - Number exists
 * 2 - Number does not exist
 * 3 - Verification Request Failed
 * 4 - Verification Failed
 * 5 - Number is already verified
 * 6 - Number successfully deleted
 */

export function addMobile(req, res, next) {
  User.getById(req.user.id)
  .then((user) => user.addPhoneNumber(req.body.number))
  .then((result) => {
    res.status(200).json({
      status: result.status,
    });
  })
  .catch(next);
}

export function verifyMobile(req, res, next) {
  User.getById(req.user.id)
  .then((user) => user.verifyPhoneNumber(req.body.number, req.body.verificationCode))
  .then((result) => {
    res.status(200).json({
      status: result.status,
    });
  })
  .catch(next);
}

export function getPhoneNumbers(req, res, next) {
  User.getById(req.user.id)
  .then((user) => res.status(200)
    .json(user.profile.phoneNumbers.map(p => ({
      number: p.number,
      isVerified: p.isVerified,
      type: p.type,
    })))
  )
  .catch(next);
}

export function deleteMobile(req, res, next) {
  User.getById(req.user.id)
  .then((user) => user.deletePhoneNumber(req.body.number))
  .then((result) => {
    res.status(200).json({
      status: result.status,
    });
  })
  .catch(next);
}

const ajaxSecure = AjaxSecure;
const csrfProtected = CsrfProtected;
const expressRoute = Router;
const router = expressRoute();

router.post('/mobile/add',
  ajaxSecure(),
  csrfProtected(),
  validateRequest(Validations.AddMobileNumberValidation),
  addMobile);

router.post('/mobile/verify',
  ajaxSecure(),
  csrfProtected(),
  validateRequest(Validations.VerifyMobileNumberValidation),
  verifyMobile);

router.post('/mobile/delete',
  ajaxSecure(),
  csrfProtected(),
  validateRequest(Validations.DeleteMobileNumberValidation),
  deleteMobile);

router.post('/',
  ajaxSecure(),
  getPhoneNumbers);

/**
 * Exports router as default
 */
export default router;
