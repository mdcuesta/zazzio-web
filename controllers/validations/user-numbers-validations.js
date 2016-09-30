import Joi from 'joi';

export const AddMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
  },
};

export const VerifyMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
    verificationCode: Joi.string().required(),
  },
};

export const DeleteMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
  },
};
