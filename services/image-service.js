import Cloudinary from 'cloudinary';
import Promise from 'bluebird';
import Crypto from 'crypto';

const crypto = Crypto;
const environment = process.env.NODE_ENV || 'development';
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET || 'Es1oDlgw58iFfeYPCINEsN-Q5Pc';

if (environment === 'development') {
  Cloudinary.config({
    cloud_name: 'hrhmiavwh',
    api_key: '738961442143111',
    api_secret: 'Es1oDlgw58iFfeYPCINEsN-Q5Pc',
  });
}

export function getUploadPhotoCredentials(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const uploadUrl = Cloudinary.uploader.upload_url({
        resource_type: 'image',
      });

      const uploadParams = Cloudinary.uploader.upload_tag_params(options);

      resolve({
        uploadUrl,
        uploadParams: JSON.parse(uploadParams),
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function uploadImage(image) {
  return new Promise((resolve, reject) => {
    try {
      Cloudinary.uploader.upload(image, (result) => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function verifyImageUploadSignature(data, timestamp, signature) {
  const hash = crypto.createHash('sha1');
  hash.update(`${JSON.stringify(data)}${timestamp}${cloudinarySecret}`);
  const hex = hash.digest('hex');
  return hex === signature;
}
