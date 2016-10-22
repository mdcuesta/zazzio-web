import { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  profile: {
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
    gender: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    phoneNumbers: [{
      number: {
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationRequestCode: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'mobile',
        required: true,
      },
    }],
    isModified: Boolean,
    profilePhoto: {
      type: String,
      default: '',
    },
    photos: [{
      photo: {
        type: String,
        required: true,
        unique: true,
      },
    }],
  },
  preferredLanguage: {
    type: String,
    default: 'en',
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true,
  },
  confirmationCode: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateCreated: Date,
  dateModified: Date,
});

// virtuals
userSchema.virtual('profile.displayName').get(function getDisplayName() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// hooks
userSchema.pre('save', function preSave(next) {
  this.dateCreated = new Date();
  next();
});

userSchema.pre('update', function preUpdate(next) {
  this.dateModified = new Date();
  next();
});

export default userSchema;
