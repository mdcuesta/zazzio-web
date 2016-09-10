import Passport from 'passport';
import FacebookPassport from './passports/facebook-passport';
import LocalPassport from './passports/local-passport';

const passport = Passport;
const facebookPassport = FacebookPassport;
const localPassport = LocalPassport;

export default function configure(app) {
  facebookPassport();
  localPassport();
  passport.serializeUser((user, callback) => {
    callback(null, {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      isBuyer: user.isBuyer,
    });
  });

  passport.deserializeUser((obj, callback) => {
    callback(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
