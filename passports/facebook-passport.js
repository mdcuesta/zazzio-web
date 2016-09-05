import Passport from 'passport';
import { Strategy } from 'passport-facebook';
import User from '../models/user';

const profileFields = [
  'id',
  'name',
  'gender',
  'picture',
  'emails',
  'hometown',
  'interested_in',
  'location',
];

const passport = Passport;

export default function configure() {
  passport.use(new Strategy({
    clientID: process.env.FB_CLIENT_ID || '606312066216240',
    clientSecret: process.env.FB_CLIENT_SECRET || '0835a4afb7f3dd3a0211e98b8072fdcb',
    callbackURL: process.env.FB_CALLBACK_URL || 'http://zazzio.something.awesome.com:3000/auth/facebook/return',
    profileFields,
  }, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    User.findOne({
      'facebook.email': email,
    }, (error, user) => { // eslint-disable-line
      if (error) {
        return done(error);
      } else if (user === null) {
        // check first if there is already
        // a local account using the email
        User.findOne({ email }).then((account) => {
          if (account == null) {
            // create new user since there is
            // no account associated with the email
            const newUser = new User();
            newUser.setProfileFromFacebook(profile);
            newUser.setFacebookCredentials({
              id: profile.id,
              name: profile.name,
              token: accessToken,
              refreshToken,
              email,
            });
            /* eslint-disable */
            newUser.save()
            .then((doc) => {
              return done(null, doc);
            })
            .catch((err) => {
              return done(err);
            });
            /* eslint-enable */
          } else {
            // need to update facebook credentials only
            account.setFacebookCredentials({
              id: profile.id,
              name: profile.name,
              token: accessToken,
              refreshToken,
              email,
            });
            /* eslint-disable */
            account.save().then((doc) => {
              return done(null, doc);
            })
            .catch((err) => {
              return done(err);
            });
            /* eslint-enable */
          }
        });
      } else {
        // update the facebook credentials
        user.setFacebookCredentials({
          id: profile.id,
          name: profile.name,
          token: accessToken,
          refreshToken,
          email,
        });
        /* eslint-disable */
        user.save().then((doc) => {
          return done(null, doc);
        });
        /* eslint-enable */
      }
    });
  }));
}
