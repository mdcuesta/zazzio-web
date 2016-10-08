import cloudinary from 'cloudinary-core';

const Cloudinary = cloudinary.Cloudinary.new();
Cloudinary.init();

class ImageHelper {
  cdn(imageId, transformations = []) {
    return Cloudinary.url(imageId, transformations);
  }
}

const helper = new ImageHelper();

export default helper;
