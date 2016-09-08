import { Router } from 'express';
import Validation from 'express-validation';
import Promise from 'bluebird';
import { CsrfProtected } from '../utilities/security';
import User from '../models/user';
import * as MailService from '../services/mail-service';
import { BuyerQuickSignUpValidation } from './validations/sign-up-validations';

const EMAIL_ADDRESS_INVALID = 'Invalid email address';
const ACCOUNT_CREATION_FAILED = 'Failed to create an account';
const EMAIL_ALREADY_ASSOCIATED = 'There is already an account associated for this email address';

const validate = Validation;
const mailService = MailService;
const csrfProtected = CsrfProtected;

export function signUp(req, res, next) {
  const emailExists = Promise.promisify(mailService.emailExists);
  emailExists(req.body.email)
  .then((response) => {
    if (!(response.body.result === 'deliverable' || response.body.result === 'risky')) {
      return res.status(200).json({
        error: EMAIL_ADDRESS_INVALID,
      });
    }

    return User.count({ 'local.email': req.body.email })
    .then((count) => {
      if (count > 0) {
        return res.status(200).json({
          error: `${EMAIL_ALREADY_ASSOCIATED} ${req.body.email}`,
        });
      }
      // check first if there is already a facebook integration present
      // if there is we only need to set the local account
      return User.findOne({ email: req.body.email })
      .then((account) => {
        if (account === null) {
          // save user if it doesn't exist
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: `${req.body.firstName} ${req.body.lastName}`,
          });
          user.setUserName(req.body.email);
          user.setPassword(req.body.password);

          return user.save()
          .then((doc) => {
            // send account created response
            // regardless if an email confirmation is sent
            req.login(doc, (err) => {
              if (err) {
                next(err);
              } else {
                res.status(201).json({
                  email: doc.email,
                  displayName: doc.displayName,
                  confirmationSent: true,
                });

                // send email confirmation, if this fails
                // the user has the option to resend the email anyway
                const sender = Promise.promisify(mailService.sendAccountConfirmationMail);
                sender(doc, 'buyer')
                .catch(() => {
                  // todo log email error
                  // if confirmation failed
                  // do we need to log the error?
                });
              }
            });
          })
          .catch(() => {
            res.status(400).json({
              error: ACCOUNT_CREATION_FAILED,
            });
          });
        }
        // just update the existing account
        account.setUserName(req.body.email);
        account.setPassword(req.body.password);
        return account.save()
        .then((doc) => {
          req.login(doc, (err) => {
            if (err) {
              next(err);
            } else {
              res.status(201).json({
                email: doc.email,
                displayName: doc.displayName,
                confirmationSent: false, // no need of confirmation email
              });
            }
          });
        })
        .catch(() => {
          res.status(400).json({
            error: ACCOUNT_CREATION_FAILED,
          });
        });
      });
    });
  });
}

export function accountExists(req, res) {
  User.count({ 'local.email': req.body.email }).then((count) => {
    const exists = count > 0;
    return res.json(200, {
      exists,
    });
  });
}

/**
 * Routes Configuration
 */
const expressRouter = Router;
const router = expressRouter();

router.post('/sign-up',
  csrfProtected(),
  validate(BuyerQuickSignUpValidation),
  signUp);

router.post('/exists',
  csrfProtected(),
  accountExists);

/**
 * Exports router as default
 */
export default router;
