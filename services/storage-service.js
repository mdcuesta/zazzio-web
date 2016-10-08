import AWS from 'aws-sdk';
import Promise from 'bluebird';
import { generateFileName } from '../utilities/code-generator';

const S3_BUCKET = process.env.S3_BUCKET || 'zazzio-development';
const S3_BUCKET_CDN = process.env.S3_BUCKET_CDN || `https://${S3_BUCKET}.s3.amazonaws.com`;


export function getUploadCredentials(fileType) { // eslint-disable-line
  const fileName = generateFileName();
  const fileNameWithExtension = `${fileName}.${fileType}`;
  const params = {
    Bucket: S3_BUCKET,
    Key: fileNameWithExtension,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  const s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          fileUploadUrl: data,
          fileUrl: `${S3_BUCKET_CDN}/${fileNameWithExtension}`,
          fileName: fileNameWithExtension,
        });
      }
    });
  });
}
