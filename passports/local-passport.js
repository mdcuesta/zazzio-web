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
    User.getByLocalEmail(email)
    .then((user) => {
      if (user === null) {
        done(null, false);
      } else if (!user.verifyPassword(password)) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
    .catch(done);
  }
));
}
