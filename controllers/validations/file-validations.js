import Joi from 'joi';

export const UploadPhotoValidation = {
  body: {
    fileType: Joi.string()
    .lowercase()
    .valid('jpeg', 'jpg', 'png', 'bmp', 'tif', 'tiff', 'pdf', 'eps', 'gif')
    .required(),
  },
};

export const UploadPhotoCompleteValidation = {
  params: {
    uploadId: Joi.string()
      .required(),
  },
  body: {
    public_id: Joi.string()
      .required(),
  },
};
