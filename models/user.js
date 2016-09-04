import { Schema } from 'mongoose';
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
    email: String,
    name: String,
  },
  displayName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
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

userSchema.methods.confirm = () => {
  this.confirmed = true;
  return this.confirmed;
};

const db = DataProvider.getConnection();

const userModel = db.model('User', userSchema);

export default userModel;
