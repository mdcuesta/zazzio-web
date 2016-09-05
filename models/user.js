import { Schema } from 'mongoose';
import * as Crypto from '../utilities/crypto';
import * as DataProvider from '../utilities/data-provider';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  local: {
    email: String,
    password: String,
    passwordSalt: String,
  },
  facebook: {
    id: String,
    token: String,
    refreshToken: String,
    email: String,
    name: String,
  },
  displayName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  isBuyer: {
    type: Boolean,
    default: true,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateCreated: Date,
  dateModified: Date,
});

userSchema.pre('save', function preSave(next) {
  this.dateCreated = new Date();
  next();
});

userSchema.pre('update', function preUpdate(next) {
  this.dateModified = new Date();
  next();
});

/**
 * Confirm account
 */
userSchema.methods.confirm = function confirm() {
  this.confirmed = true;
  return this.confirmed;
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
  const hash = Crypto.sha512(password, this.local.passwordSalt);
  return hash === this.local.password;
};

/**
 * Populate Profile from Facebook
 * @param  {object} profile
 */
userSchema.methods.setProfileFromFacebook = function setProfileFromFacebook(profile) {
  this.email = profile.emails[0].value;
  this.displayName = `${profile.name.givenName} ${profile.name.familyName}`;
  this.firstName = profile.name.givenName;
  this.lastName = profile.name.familyName;
  this.middleName = profile.name.middleName;
  this.gender = profile.gender;
};

userSchema.methods.setFacebookCredentials = function setFacebookCredentials(credentials) {
  this.facebook.id = credentials.id;
  this.facebook.token = credentials.token;
  this.facebook.refreshToken = credentials.refreshToken;
  this.facebook.email = credentials.email;
  this.facebook.name = `${credentials.name.givenName} ${credentials.name.familyName}`;
};

const db = DataProvider.getConnection();
const userModel = db.model('User', userSchema);
export default userModel;
