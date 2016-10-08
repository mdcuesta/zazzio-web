import cloudinary from 'cloudinary-core';

const Cloudinary = cloudinary.Cloudinary.new();
Cloudinary.init();

class ImageHelper {
  cdn(imageId, transformation = []) {
    return Cloudinary.url(imageId, {
      transformation,
    });
  }
}

const helper = new ImageHelper();

export default helper;
