import csrf from 'csurf';
import { ensureLoggedIn } from 'connect-ensure-login';

const csrfProtection = csrf({ cookie: true });

/**
 * Requires Authentication Middleware
 */
export function Secure(options) {
  let url = '/login';
  if (options) {
    if (typeof options.redirectUrl !== 'undefined') {
      url = options.redirectUrl;
    }

    if (typeof options.returnTo !== 'undefined') {
      url += `?returnTo=${options.returnTo}`;
    }
  }
  return ensureLoggedIn(url);
}

/**
 * Requires Authentication Middleware and
 * the user needs to be a buyer
 */
export function BuyerSecure(options) {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()
      || typeof req.user === 'undefined' || req.user.isBuyer !== true) {
      if (options) {
        let url = '/login';
        if (typeof options.redirectUrl !== 'undefined') {
          url = options.redirectUrl;
        }

        if (typeof options.returnTo !== 'undefined') {
          url += `?returnTo=${options.returnTo}`;
        }

        res.redirect(url);
      } else {
        res.redirect('/login');
      }
    } else {
      next();
    }
  };
}

/**
 * Requires Authentication Middleware and
 * the user needs to be a seller
 */
export function SellerSecure(options) {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()
      || typeof req.user === 'undefined' || req.user.isSeller !== true) {
      if (options) {
        let url = '/login';
        if (typeof options.redirectUrl !== 'undefined') {
          url = options.redirectUrl;
        }

        if (typeof options.returnTo !== 'undefined') {
          url += `?returnTo=${options.returnTo}`;
        }

        res.redirect(url);
      } else {
        res.redirect('/login');
      }
    } else {
      next();
    }
  };
}

/**
 * X-Site Scripting Protection Middleware
 */
export function CsrfProtected() {
  return csrfProtection;
}

/**
 * Checks if the current request is authenticated
 * @param {request} request
 */
export function Authenticated(req) {
  return typeof req.user !== 'undefined';
}
