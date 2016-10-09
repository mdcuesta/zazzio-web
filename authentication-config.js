import Passport from 'passport';
import FacebookPassport from './passports/facebook-passport';
import LocalPassport from './passports/local-passport';
import User from './models/user';

const passport = Passport;
const facebookPassport = FacebookPassport;
const localPassport = LocalPassport;

export default function configure(app) {
  facebookPassport();
  localPassport();
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((obj, callback) => {
    User.getById(obj, {
      includePhoneNumbers: false,
      includePhotos: false,
    })
    .then((doc) => {
      if (doc === null) {
        callback(null, null);
        return;
      }
      callback(null, doc.getValuesForSession());
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
