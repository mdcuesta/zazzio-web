import Passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';

const passport = Passport;

export default function configure() {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  (email, password, done) => {
    User.findOne({
      'local.email': email,
    }, (error, user) => {
      if (error) {
        return done(error);
      }
      if (user === null) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
}
