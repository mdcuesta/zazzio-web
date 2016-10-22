import { Schema } from 'mongoose';

const userNotificationSchema = new Schema({
  to: {
    type: Schema.ObjectId,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    from: Schema.ObjectId,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
});

export default userNotificationSchema;
