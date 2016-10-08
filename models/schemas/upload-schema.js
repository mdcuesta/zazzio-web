import { Schema } from 'mongoose';

const uploadSchema = new Schema({
  uploadId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    default: '',
  },
  expireStarts: {
    type: Date,
    expires: 3600,
    default: Date.now,
  },
  dateCreated: Date,
});

// hooks
uploadSchema.pre('save', function preSave(next) {
  this.dateCreated = new Date();
  next();
});

export default uploadSchema;
