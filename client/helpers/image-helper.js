import cloudinary from 'cloudinary-core';

const environment = process.env.NODE_ENV || 'development';
const secure = environment === 'production';

const Cloudinary = cloudinary.Cloudinary.new();
Cloudinary.init();

class ImageHelper {
  cdn(imageId, transformation = []) {
    return Cloudinary.url(imageId, {
      transformation,
      secure,
    });
  }
}

const helper = new ImageHelper();

export default helper;
