import { ensureLoggedIn } from 'connect-ensure-login';


export function Secure(options) {
  let url = '/login';
  if (options) {
    if (typeof options.redirectUrl !== 'undefined') {
      url = options.redirectUrl;
    }
  }
  return ensureLoggedIn(url);
}

// TODO: need to do additional check if user is buyer
export function BuyerSecure(options) {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (options.redirectUrl) {
        res.redirect(options.redirectUrl);
      } else {
        res.redirect('/login');
      }
    } else {
      next();
    }
  };
}

/**
 * Checks if the current request is authenticated
 * @param {request} request
 */
export function Authenticated(req) {
  return typeof req.user !== 'undefined';
}
