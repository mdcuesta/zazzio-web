import cloudinary from 'cloudinary-core';

const Cloudinary = cloudinary.Cloudinary.new();
Cloudinary.init();

class ImageHelper {
  cdn(imageId, options = {}) {
    return Cloudinary.url(imageId, options);
  }
}

const helper = new ImageHelper();

export default helper;
