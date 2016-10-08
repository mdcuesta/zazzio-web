import Cloudinary from 'cloudinary';

const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  Cloudinary.config({
    cloud_name: 'hrhmiavwh',
    api_key: '738961442143111',
    api_secret: 'Es1oDlgw58iFfeYPCINEsN-Q5Pc',
  });
}

class ImageHelper {
  cdn(imageId, transformation = []) {
    return Cloudinary.url(imageId, {
      transformation,
    });
  }
}

const helper = new ImageHelper();

export default helper;
