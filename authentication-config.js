'use strict';

import Passport from 'passport';
import {Strategy} from 'passport-facebook';

const passport = Passport;



export function configure(app) {

  passport.use(new Strategy({
      clientID: process.env.FB_CLIENT_ID || '606312066216240',
      clientSecret: process.env.FB_CLIENT_SECRET || '0835a4afb7f3dd3a0211e98b8072fdcb',
      callbackURL: process.env.FB_CALLBACK_URL || 'http://zazzio.something.awesome.com:3000/login/facebook/return'
    }, (accessToken, refreshToken, profile, cb) => {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
  }));


  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};