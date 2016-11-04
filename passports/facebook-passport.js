import Passport from 'passport';
import { Strategy } from 'passport-facebook';
import User from '../models/user';
import { generateConfirmationCode } from '../utilities/code-generator';

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
    User.getByFacebookEmail(email)
    .then((user) => {
      if (user === null) {
        User.getByLocalEmail(email).then((account) => {
          if (account == null) {
            // create new user since there is
            // no account associated with the email
            const newUser = new User({
              confirmationCode: generateConfirmationCode(),
            });
            newUser.setProfileFromFacebook(profile);
            newUser.setFacebookCredentials({
              id: profile.id,
              name: profile.name,
              token: accessToken,
              refreshToken,
              email,
            });
            /* eslint-disable */
            newUser.loginAttempt = 0;
            newUser.loginCount++;
            newUser.save()
            .then((doc) => { 
              done(null, doc); 
              doc.sendEmailConfirmation();
            })
            .catch(done);
          } else {
            // need to update facebook credentials only
            account.setFacebookCredentials({
              id: profile.id,
              name: profile.name,
              token: accessToken,
              refreshToken,
              email,
            });
            account.loginAttempt = 0;
            account.loginCount++;
            account.save().then((doc) => done(null, doc))
            .catch(done);
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
        user.loginAttempt = 0;
        user.loginCount++;
        user.save().then((doc) => done(null, doc));
      }
    })
    .catch(done);
  }));
}
