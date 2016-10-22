import { Schema } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  from: {
    type: Schema.ObjectId,
    required: true,
  },
  to: {
    type: Schema.ObjectId,
    required: true,
    index: true,
  },
  dateSent: {
    type: Date,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
});

export default messageSchema;
