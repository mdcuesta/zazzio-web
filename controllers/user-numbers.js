import { Router } from 'express';
import ExpressValidation from 'express-validation';
import { Secure, CsrfProtected } from '../utilities/security';
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
 */

export function addMobile(req, res, next) {
  User.getById(req.user.id)
  .then((user) => user.addPhoneNumber(req.body.countryCode, req.body.number))
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


const secure = Secure;
const csrfProtected = CsrfProtected;
const expressRoute = Router;
const router = expressRoute();

router.post('/mobile/add',
  secure({
    returnTo: '/user/dashboard',
  }),
  csrfProtected(),
  validateRequest(Validations.AddMobileNumberValidation),
  addMobile);

router.post('/mobile/verify',
  secure({
    returnTo: '/user/dashboard',
  }),
  csrfProtected(),
  validateRequest(Validations.VerifyMobileNumberValidation),
  verifyMobile);
/**
 * Exports router as default
 */
export default router;
