import UploadSchema from './schemas/upload-schema';
import * as DataProvider from '../utilities/data-provider';
import { generateId } from '../utilities/code-generator';

const uploadSchema = UploadSchema;

// methods
uploadSchema.methods.complete = function complete() {
  return this.remove();
};

// statics
uploadSchema.statics.getByUploadId = function getByUploadId(uploadId) {
  return this.findOne({
    uploadId,
  });
};

uploadSchema.statics.initiateUpload = function initiateUpload(type, uploader = '') {
  const upload = new this({
    uploadId: generateId(),
    type,
    uploader,
  });
  return upload.save();
};

const db = DataProvider.getConnection();
const uploadModel = db.model('Upload', uploadSchema);
export default uploadModel;
