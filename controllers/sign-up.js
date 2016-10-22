import { Router } from 'express';
import ExpressValidation from 'express-validation';
import { CsrfProtected, Authenticated } from '../utilities/security';
import User from '../models/user';
import LogError from '../utilities/logger';
import * as Validations from './validations/sign-up-validations';
import * as CodeGenerator from '../utilities/code-generator';
import * as MailService from '../services/mail-service';

const EMAIL_ADDRESS_INVALID = 'EmailAddress.Invalid';
const ACCOUNT_CREATION_FAILED = 'Failed to create an account';
const EMAIL_ALREADY_ASSOCIATED = 'Email.Exists';

const validateRequest = ExpressValidation;
const validateSignUp = Validations.validateSignUp;
const csrfProtected = CsrfProtected;
const authenticated = Authenticated;
const mailService = MailService;
const log = LogError;

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
      res.status(200).json({
        error: EMAIL_ADDRESS_INVALID,
      });
      return;
    }
    User.localEmailExists(req.body.email)
    .then((exists) => {
      if (exists) {
        res.status(200).json({
          error: `${EMAIL_ALREADY_ASSOCIATED} ${req.body.email}`,
        });
      } else {
        // check first if there is already a facebook integration present
        // if there is we only need to set the local account
        User.getByFacebookEmail(req.body.email)
        .then((account) => {
          if (account === null) {
            // save user if it doesn't exist
            const user = new User({
              email: req.body.email,
              profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
              },
              isSeller: req.body.seller,
              confirmationCode: CodeGenerator.generateConfirmationCode(),
            });
            user.setUserName(req.body.email);
            user.setPassword(req.body.password);
            return user.save();
          }
          // just update the existing account
          account.setUserName(req.body.email);
          account.setPassword(req.body.password);
          return account.save();
        })
        .then((doc) => {
          // send account created response
          // regardless if an email confirmation is sent
          res.status(201).json({
            email: doc.email,
            displayName: doc.profile.displayName,
            confirmationSent: true,
          });
          // send email confirmation
          return doc.sendEmailConfirmation();
        })
        .catch((err) => {
          log(err);
          if (res.headersSent) {
            return;
          }
          res.status(400).json({
            error: ACCOUNT_CREATION_FAILED,
          });
        });
      }
    })
    .catch(next);
  })
  .catch(next);
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
    return;
  }
  mailService.emailExists(req.body.email)
  .then((response) => {
    if (!(response.body.result === 'deliverable' || response.body.result === 'risky')) {
      data.email.error = EMAIL_ADDRESS_INVALID;
      res.render('sign-up/index', {
        csrfToken: req.csrfToken(),
        formValues: data,
      });
    }
    User.localEmailExists(req.body.email)
    .then((exists) => {
      if (exists) {
        data.email.error = EMAIL_ALREADY_ASSOCIATED;
        data.email.existed = true;
        res.render('sign-up/index', {
          csrfToken: req.csrfToken(),
          formValues: data,
        });
      } else {
        // check first if there is already a facebook integration present
        // if there is we only need to set the local account
        User.getByFacebookEmail(req.body.email)
        .then((account) => {
          if (account === null) {
            // save user if it doesn't exist
            const user = new User({
              email: req.body.email,
              profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
              },
              isSeller: req.body.seller,
              confirmationCode: CodeGenerator.generateConfirmationCode(),
            });
            user.setUserName(req.body.email);
            user.setPassword(req.body.password);
            return user.save();
          }
          // just update the existing account
          account.setUserName(req.body.email);
          account.setPassword(req.body.password);
          return account.save();
        })
        .then((doc) => {
          res.render('sign-up/complete', {
            csrfToken: req.csrfToken(),
            authenticated: false,
            user: null,
          });

          // send email confirmation
          doc.sendEmailConfirmation();
        });
      }
    })
    .catch(next);
  })
  .catch(next);
}

/**
 * Check if account exists
 */
export function accountExists(req, res, next) {
  User.localEmailExists(req.body.email)
  .then(
    (exists) => res.status(200).json({
      exists,
    }
  ))
  .catch(next);
}

/**
 * Confirm account
 */
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
          res.render('sign-up/account-confirmation');
        }
      })
      .catch(next);
    }
  })
  .catch(next);
}

/**
 * Sign up cancel
 */
export function signUpCancel(req, res, next) {
  const confirmationCode = req.params.confirmationCode;
  User.getByConfirmationCode(confirmationCode)
  .then((user) => {
    if (user === null) {
      res.status(404);
      next();
    } else {
      res.render('sign-up/sign-up-cancel', {
        confirmationCode,
        csrfToken: req.csrfToken(),
      });
    }
  })
  .catch(next);
}

export function confirmSignUpCancel(req, res, next) {
  const confirmationCode = req.params.confirmationCode;
  User.getByConfirmationCode(confirmationCode)
  .then((user) => {
    if (user === null) {
      res.status(404);
      next();
    } else if (req.body.email !== user.email) {
      res.render('sign-up/sign-up-cancel', {
        confirmationCode,
        csrfToken: req.csrfToken(),
      });
    } else {
      user.cancelSignUp()
      .then(() => {
        res.redirect('/');
      })
      .catch(next);
    }
  })
  .catch(next);
}
/**
 * Routes Configuration
 */
const expressRouter = Router;
const router = expressRouter();

router.get('/', signUp);

router.post('/quick',
  csrfProtected(),
  validateRequest(Validations.SignUpValidation),
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

router.get('/account/confirm/:confirmationCode',
  confirmAccount);

router.get('/account/cancel/:confirmationCode',
  signUpCancel);

router.post('/account/cancel/:confirmationCode',
  csrfProtected(),
  confirmSignUpCancel);

/**
 * Exports router as default
 */
export default router;
