import { Router } from 'express';
import Validation from 'express-validation';
import Joi from 'joi';
import Promise from 'bluebird';
import User from '../models/user';
import * as Crypto from '../utilities/crypto';
import Mailer from '../utilities/mailer';

const validate = Validation;

export function signUp(req, res) {
  User.count({ email: req.body.email }).then((count) => {
    if (count > 0) {
      return res.status(200).json({
        error: `There is already an account associated for this email address ${req.body.email}`,
      });
    }

    // save user if it doesn't exist
    const salt = Crypto.generateSalt(16);
    const hash = Crypto.sha512(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: 'buyer',
      displayName: `${req.body.firstName} ${req.body.lastName}`,
      local: {
        email: req.body.email,
        password: hash,
        passwordSalt: salt,
      },
    });

    return user.save().then((doc) => {
      // send account created response
      // regardless if an email confirmation is sent
      res.status(201).json({
        email: doc.email,
        displayName: doc.displayName,
      });

      // send email confirmation, if this fails
      // the user has the option to resend the email anyway
      const mailer = new Mailer();
      const sender = Promise.promisify(mailer.send);
      sender(doc.email, null, 'Account Confirmation', 'Hello')
        .catch(() => {
          // todo log email error
          // no need to notify user if email failed
        });
    }).catch(() => {
      res.status(400).json({
        error: 'Failed to create an account',
      });
    });
  });
}

export function accountExists(req, res) {
  User.count({ email: req.body.email }).then((count) => {
    const exists = count > 0;
    return res.json(200, {
      exists,
    });
  });
}

// quick
const quickSignUpValidation = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  },
};

/**
 * Routes Configuration
 */
const expressRouter = Router;
const router = expressRouter();

router.post('/sign-up',
  validate(quickSignUpValidation),
  signUp);

router.post('/exists', accountExists);

/**
 * Exports router as default
 */
export default router;
