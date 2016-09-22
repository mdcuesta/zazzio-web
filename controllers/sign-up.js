import { Router } from 'express';
import ExpressValidation from 'express-validation';
import { CsrfProtected, Authenticated } from '../utilities/security';
import User from '../models/user';
import * as MailService from '../services/mail-service';
import { SignUpValidation, ValidateSignUp } from './validations/sign-up-validations';

const EMAIL_ADDRESS_INVALID = 'Invalid email address';
const ACCOUNT_CREATION_FAILED = 'Failed to create an account';
const EMAIL_ALREADY_ASSOCIATED = 'There is already an account associated for this email address';

const validateRequest = ExpressValidation;
const validateSignUp = ValidateSignUp;
const mailService = MailService;
const csrfProtected = CsrfProtected;
const authenticated = Authenticated;

/**
 * Sign Up Page
 */
export function signUp(req, res) {
  const isAuthenticated = authenticated(req);
  if (isAuthenticated) {
    if (req.query.returnTo) {
      res.redirect(req.query.returnTo);
    } else {
      res.redirect('/');
    }
  } else {
    res.render('sign-up/index', {
      csrfToken: req.csrfToken(),
      returnTo: req.query.returnTo,
    });
  }
}

/**
 * Sign Up Modal
 */
export function signUpQuick(req, res, next) {
  mailService.emailExists(req.body.email)
  .then((response) => {
    if (!(response.body.result === 'deliverable' || response.body.result === 'risky')) {
      return res.status(200).json({
        error: EMAIL_ADDRESS_INVALID,
      });
    }

    return User.countByLocalEmail(req.body.email)
    .then((count) => {
      if (count > 0) {
        return res.status(200).json({
          error: `${EMAIL_ALREADY_ASSOCIATED} ${req.body.email}`,
        });
      }
      // check first if there is already a facebook integration present
      // if there is we only need to set the local account
      return User.getByEmail(req.body.email)
      .then((account) => {
        if (account === null) {
          // save user if it doesn't exist
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: `${req.body.firstName} ${req.body.lastName}`,
            isSeller: req.body.seller,
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
                mailService.sendUserConfirmationMail(doc, 'buyer')
                .catch(() => {
                  // todo log email error
                  // if confirmation failed
                  // do we need to log the error?
                });
              }
            });
          })
          .catch(() => {
            // TODO log error
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
          // TODO log error
          res.status(400).json({
            error: ACCOUNT_CREATION_FAILED,
          });
        });
      });
    });
  });
}

/**
 * Sign Up Page Post
 */
export function signUpLocal(req, res, next) {
  const data = validateSignUp(req);
  if (data.hasError) {
    res.render('sign-up/index', {
      csrfToken: req.csrfToken(),
      formValues: data,
    });
  } else {
    mailService.emailExists(req.body.email)
    .then((response) => {
      if (!(response.body.result === 'deliverable' || response.body.result === 'risky')) {
        data.email.error = EMAIL_ADDRESS_INVALID;
        return res.render('sign-up/index', {
          csrfToken: req.csrfToken(),
          formValues: data,
        });
      }

      return User.countByLocalEmail(req.body.email)
      .then((count) => {
        if (count > 0) {
          data.email.error = `${EMAIL_ALREADY_ASSOCIATED} ${req.body.email}`;
          data.email.existed = true;
          return res.render('sign-up/index', {
            csrfToken: req.csrfToken(),
            formValues: data,
          });
        }
        // check first if there is already a facebook integration present
        // if there is we only need to set the local account
        return User.getByEmail(req.body.email)
        .then((account) => {
          if (account === null) {
            // save user if it doesn't exist
            const user = new User({
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              displayName: `${req.body.firstName} ${req.body.lastName}`,
              isSeller: req.body.seller,
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
                  res.render('sign-up/complete', {
                    csrfToken: req.csrfToken(),
                    authenticated: true,
                    user: doc.getValuesForSession(),
                  });

                  // send email confirmation, if this fails
                  // the user has the option to resend the email anyway
                  mailService.sendUserConfirmationMail(doc, 'buyer')
                  .catch(() => {
                    // todo log email error
                    // if confirmation failed
                    // do we need to log the error?
                  });
                }
              });
            })
            .catch((err) => {
              next(err);
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
                res.redirect('/');
              }
            });
          })
          .catch((err) => {
            next(err);
          });
        });
      });
    });
  }
}

/**
 * Check if account exists
 */
export function accountExists(req, res) {
  User.countByLocalEmail(req.body.email).then((count) => {
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

router.get('/', signUp);

router.post('/quick',
  csrfProtected(),
  validateRequest(SignUpValidation),
  signUpQuick);

router.post('/local',
  csrfProtected(),
  signUpLocal);

router.get('/local', (req, res) => {
  res.redirect('/sign-up');
});

router.post('/exists',
  csrfProtected(),
  accountExists);

/**
 * Exports router as default
 */
export default router;
