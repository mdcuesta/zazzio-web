import Promise from 'bluebird';
import * as AutoIncrement from 'mongoose-auto-increment';
import UserSchema from './schemas/user-schema';
import * as Crypto from '../utilities/crypto';
import * as DataProvider from '../utilities/data-provider';
import * as MailService from '../services/mail-service';


const userSchema = UserSchema;
const mailService = MailService;

// Business Model Methods
/**
 * Confirm account
 */
userSchema.methods.confirm = function confirm() {
  this.isConfirmed = true;
  return this.isConfirmed;
};

/**
 * Set User name or email
 * @param  {string} email
 */
userSchema.methods.setUserName = function setUserName(email) {
  this.local.email = email;
  this.email = email;
};

/**
 * Set User Password
 * @param  {string} password
 */
userSchema.methods.setPassword = function setPassword(password) {
  const salt = Crypto.generateSalt(16);
  const hash = Crypto.sha512(password, salt);
  this.local.password = hash;
  this.local.passwordSalt = salt;
};

/**
 * Validates password
 * @param  {string} password
 */
userSchema.methods.verifyPassword = function verifyPassword(password) {
  if (!this.isConfirmed) {
    return false;
  }
  const hash = Crypto.sha512(password, this.local.passwordSalt);
  return hash === this.local.password;
};


/**
 * Populate Profile from Facebook
 * @param {object} profile
 */
userSchema.methods.setProfileFromFacebook = function setProfileFromFacebook(profile) {
  this.email = profile.emails[0].value;
  this.profile.firstName = profile.name.givenName;
  this.profile.lastName = profile.name.familyName;
  this.profile.middleName = profile.name.middleName;
  this.profile.gender = profile.gender;
};

userSchema.methods.setFacebookCredentials = function setFacebookCredentials(credentials) {
  this.facebook.id = credentials.id;
  this.facebook.token = credentials.token;
  this.facebook.refreshToken = credentials.refreshToken;
  this.facebook.email = credentials.email;
  this.facebook.name = `${credentials.name.givenName} ${credentials.name.familyName}`;
};

userSchema.methods.getValuesForSession = function getValuesForSession() {
  return {
    id: this.id,
    email: this.email,
    firstName: this.profile.firstName,
    displayName: this.profile.displayName,
    isBuyer: this.isBuyer,
    isSeller: this.isSeller,
  };
};

userSchema.methods.sendEmailConfirmation = function sendEmailConfirmation() {
  return mailService.sendUserConfirmationMail(this, 'buyer');
};

// statics
userSchema.statics.existsAndUnConfirmed = function existAndUnConfirmed(email) {
  return new Promise((resolve, reject) => {
    this.count({
      'local.email': email,
      isConfirmed: false,
    }, (err, count) => {
      if (err) {
        reject(err);
      } else {
        resolve(count > 0);
      }
    });
  });
};

userSchema.statics.localEmailExists = function localEmailExists(email) {
  return new Promise((resolve, reject) => {
    this.count({
      'local.email': email,
    }, (err, count) => {
      if (err) {
        reject(err);
      } else {
        resolve(count > 0);
      }
    });
  });
};

userSchema.statics.getById = function getById(id) {
  return this.findOne({
    _id: id,
  });
};

userSchema.statics.getByEmail = function getByEmail(email) {
  return this.findOne({
    email,
  });
};

userSchema.statics.getByLocalEmail = function getByLocalEmail(email) {
  return this.findOne({
    'local.email': email,
  });
};

userSchema.statics.getByFacebookEmail = function getByFacebookEmail(email) {
  return this.findOne({
    'facebook.email': email,
  });
};

userSchema.statics.getByConfirmationCode =
  function getByConfirmationCode(confirmationCode, isConfirmed = false) {
    return this.findOne({
      confirmationCode,
      isConfirmed,
    });
  };

userSchema.statics.getUserProfile = function getUserProfile(userId) {
  return new Promise((resolve, reject) => {
    this.findOne({ _id: userId }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          email: doc.email,
          firstName: doc.profile.firstName,
          lastName: doc.profile.lastName,
          middleName: doc.profile.middleName,
          displayName: doc.profile.displayName,
          gender: doc.gender,
          isBuyer: doc.isBuyer,
          isConfirmed: doc.isConfirmed,
        });
      }
    });
  });
};

// export
const db = DataProvider.getConnection();
AutoIncrement.initialize(db);
userSchema.plugin(AutoIncrement.plugin, 'User');
const userModel = db.model('User', userSchema);
export default userModel;
